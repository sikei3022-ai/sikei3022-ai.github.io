try { require('dotenv').config(); } catch (e) {}   // читаем переменные из .env (DATABASE_URL, ключи и т.д.)
// Skride backend — посредник между приложением и облачными сервисами.
// Хранит ключи у себя (в переменных окружения), приложение к ключам доступа не имеет.
//
// Эндпоинты:
//   GET  /              — проверка, что сервер жив
//   POST /api/coach     — умный тренер (Yandex/Claude/GPT)   [нужен вход]
//   POST /api/tts       — живой голос (ElevenLabs/Yandex)     [нужен вход]
//   POST /api/ocr       — распознавание табло тренажёра        [нужен вход]
//   POST /api/register  /api/login  /api/yandex — аккаунты
//   GET/POST /api/sync  — облачная история тренировок          [нужен вход]
//   GET  /api/me /api/rank
//   POST /api/pay/create   — создать платёж ЮKassa            [нужен вход]
//   POST /api/pay/webhook  — уведомление ЮKassa (premium ON)
//
// === НОВЫЕ переменные окружения (задать на сервере) ===
//   ALLOW_ORIGIN           — список доменов через запятую (по умолчанию skride.ru + github.io)
//   YOOKASSA_SHOP_ID       — идентификатор магазина ЮKassa
//   YOOKASSA_SECRET_KEY    — секретный ключ ЮKassa (НИКОГДА не в клиенте!)
//   PREMIUM_PRICE_RUB      — цена подписки, по умолчанию 100.00
//   PREMIUM_DAYS           — на сколько дней даётся премиум за платёж, по умолчанию 30
//   TRIAL_DAYS             — бесплатный пробный период от регистрации, по умолчанию 14
//   PUBLIC_RETURN_URL      — куда вернуть из оплаты, по умолчанию https://skride.ru/?paid=1
//   REQUIRE_AUTH_AI        — '1' (по умолч.): coach/tts/ocr только для вошедших (защита от слива денег)
//   GATE_AI_PREMIUM        — '1': пускать к ИИ только премиум/триал. По умолчанию '0' (включишь, когда готов)
//   YOOKASSA_SEND_RECEIPT  — '1': слать чек 54-ФЗ в запросе платежа (нужен e-mail пользователя)
//
// Запуск локально:  npm install && npm start
// Деплой: тот же VPS (pm2 restart skride) — добавь новые env и перезапусти.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '6mb' }));  // увеличено для фото табло (OCR)

// ---- Базовые security-заголовки (без доп. зависимостей) ----
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// ---- CORS: только доверенные источники (а не '*') ----
// Можно переопределить переменной ALLOW_ORIGIN (через запятую). '*' тоже поддерживается, но не рекомендуется.
const ALLOW_LIST = (process.env.ALLOW_ORIGIN ||
  'https://skride.ru,https://www.skride.ru,https://sikei3022-ai.github.io')
  .split(',').map(s => s.trim()).filter(Boolean);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Нативное приложение (TWA/WebView) часто шлёт запрос без Origin — это нормально, пропускаем.
  if (origin) {
    if (ALLOW_LIST.includes('*')) res.setHeader('Access-Control-Allow-Origin', '*');
    else if (ALLOW_LIST.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---- простой лимит: не больше N запросов в минуту с одного IP ----
const hits = new Map();
function rateLimit(max) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'x';
    const key = ip + '|' + (req.path || '');
    const now = Date.now();
    const rec = hits.get(key) || { n: 0, t: now };
    if (now - rec.t > 60000) { rec.n = 0; rec.t = now; }
    rec.n++; hits.set(key, rec);
    if (rec.n > max) return res.status(429).json({ error: 'Слишком много запросов, подожди минуту.' });
    next();
  };
}
// общий мягкий лимит на все POST
app.use((req, res, next) => (req.method === 'POST' ? rateLimit(40)(req, res, next) : next()));

// ===================== АККАУНТЫ + БАЗА + СИНХРОНИЗАЦИЯ =====================
const DATABASE_URL = process.env.DATABASE_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || '';
const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || '14', 10);
const PREMIUM_DAYS = parseInt(process.env.PREMIUM_DAYS || '30', 10);
const pool = DATABASE_URL ? new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } }) : null;

async function initDb() {
  if (!pool) { console.warn('Нет DATABASE_URL — аккаунты выключены'); return; }
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    email text UNIQUE,
    pass_hash text,
    yandex_id text UNIQUE,
    name text,
    runs jsonb DEFAULT '[]'::jsonb,
    week_km double precision DEFAULT 0,
    total_km double precision DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  )`);
  // НОВОЕ: премиум-доступ + журнал платежей (миграция безопасна для существующей базы)
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS premium_until timestamptz`);
  await pool.query(`CREATE TABLE IF NOT EXISTS payments(
    id text PRIMARY KEY,
    user_id integer REFERENCES users(id),
    amount numeric,
    status text,
    created_at timestamptz DEFAULT now(),
    paid_at timestamptz
  )`);
  console.log('База готова');
}
initDb().catch(e => console.error('initDb error:', e.message));

function dbReady(res) {
  if (!pool) { res.status(503).json({ error: 'Аккаунты не настроены на сервере (нет DATABASE_URL)' }); return false; }
  if (!JWT_SECRET) { res.status(503).json({ error: 'Аккаунты не настроены на сервере (нет JWT_SECRET)' }); return false; }
  return true;
}
function makeToken(u) { return jwt.sign({ uid: u.id }, JWT_SECRET, { expiresIn: '180d' }); }

// premium активен, если premium_until в будущем ЛИБО ещё идёт пробный период от регистрации
function premiumInfo(u) {
  const now = Date.now();
  const until = u.premium_until ? new Date(u.premium_until).getTime() : 0;
  const created = u.created_at ? new Date(u.created_at).getTime() : now;
  const trialUntil = created + TRIAL_DAYS * 86400000;
  const paid = until > now;
  const trial = !paid && trialUntil > now;
  return {
    premium: paid || trial,
    paid,
    trial,
    premium_until: until ? new Date(until).toISOString() : null,
    trial_until: new Date(trialUntil).toISOString()
  };
}
function publicUser(u) {
  const p = premiumInfo(u);
  return { id: u.id, email: u.email || null, name: u.name || null, yandex: !!u.yandex_id,
    premium: p.premium, paid: p.paid, trial: p.trial, premium_until: p.premium_until, trial_until: p.trial_until };
}
async function auth(req, res) {
  const h = req.headers['authorization'] || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!tok) { res.status(401).json({ error: 'Нужен вход' }); return null; }
  try {
    const p = jwt.verify(tok, JWT_SECRET);
    const r = await pool.query('SELECT * FROM users WHERE id=$1', [p.uid]);
    if (!r.rows[0]) { res.status(401).json({ error: 'Сессия не найдена' }); return null; }
    return r.rows[0];
  } catch (e) { res.status(401).json({ error: 'Сессия истекла, войди заново' }); return null; }
}
function computeKm(runs) {
  let total = 0, week = 0; const wk = Date.now() - 7 * 86400000;
  (Array.isArray(runs) ? runs : []).forEach(r => {
    const km = +r.km || 0; total += km;
    const d = r.date ? new Date(r.date + 'T00:00').getTime() : 0;
    if (d >= wk) week += km;
  });
  return { total: Math.round(total * 100) / 100, week: Math.round(week * 100) / 100 };
}
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// ===================== ЗАЩИТА ИИ-ЭНДПОИНТОВ =====================
// Чтобы чужие не жгли твои деньги на YandexGPT/OCR/синтезе речи.
const REQUIRE_AUTH_AI = (process.env.REQUIRE_AUTH_AI || '1') === '1';
const GATE_AI_PREMIUM = (process.env.GATE_AI_PREMIUM || '0') === '1';
// возвращает пользователя (или null + уже отправленный ответ об ошибке)
async function aiGate(req, res) {
  if (!REQUIRE_AUTH_AI) return { id: 0, _anon: true };
  if (!dbReady(res)) return null;
  const u = await auth(req, res); if (!u) return null;
  if (GATE_AI_PREMIUM && !premiumInfo(u).premium) {
    res.status(402).json({ error: 'Нужна подписка Skride Premium', code: 'premium_required' });
    return null;
  }
  return u;
}

// ===================== МОЗГ ТРЕНЕРА =====================
const LLM_PROVIDER = (process.env.LLM_PROVIDER || 'yandex').toLowerCase(); // 'yandex' | 'anthropic' | 'openai'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const YANDEX_API_KEY = process.env.YANDEX_API_KEY || '';
const YANDEX_FOLDER_ID = process.env.YANDEX_FOLDER_ID || '';
const YANDEX_GPT_MODEL = process.env.YANDEX_GPT_MODEL || 'yandexgpt';

const SYSTEM_PROMPT =
`Ты — Skride, личный ИИ-тренер по бегу и велоспорту. Общайся как живой человек в голосовом разговоре: тепло, на «ты», естественно, без канцелярита и без формальных приветствий вроде «Здравствуйте» и дежурного «Удачи вам в тренировках».
Веди именно РАЗГОВОР, а не выдавай шаблонные советы. Помни, о чём шла речь выше (имя, цифры, цели пользователя), и отвечай на КОНКРЕТНЫЙ вопрос, а не общими словами. Если в диалоге называли имя — обращайся по имени. Когда уместно — задай короткий встречный вопрос, чтобы продолжить беседу.
Отвечай на языке пользователя (обычно русский), коротко и по делу: 1–3 предложения, как в живой беседе.
Помогай с планом тренировок, объёмом и его ростом (~10% в неделю), пульсовыми зонами, восстановлением и сном, техникой бега и педалирования, питанием и водой, мотивацией, подготовкой к стартам.
Ты НЕ врач: при боли, травмах или тревожных симптомах мягко советуй осторожность, отдых и визит к специалисту — без диагнозов и схем лечения.
Учитывай данные пользователя (километраж, темп, пульс), но не выдумывай цифры, которых не было.`;

async function askLLM(messages, context) {
  const sys = context ? (SYSTEM_PROMPT + '\n\nДанные пользователя: ' + context) : SYSTEM_PROMPT;

  if (LLM_PROVIDER === 'yandex') {
    if (!YANDEX_API_KEY) throw new Error('Нет YANDEX_API_KEY');
    if (!YANDEX_FOLDER_ID) throw new Error('Нет YANDEX_FOLDER_ID');
    const ymsgs = [{ role: 'system', text: sys },
      ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', text: m.content }))];
    const r = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Api-Key ' + YANDEX_API_KEY },
      body: JSON.stringify({
        modelUri: 'gpt://' + YANDEX_FOLDER_ID + '/' + YANDEX_GPT_MODEL + '/latest',
        completionOptions: { stream: false, temperature: 0.7, maxTokens: '500' },
        messages: ymsgs
      })
    });
    if (!r.ok) throw new Error('YandexGPT ' + r.status + ' ' + (await r.text()).slice(0, 300));
    const d = await r.json();
    return (d.result && d.result.alternatives && d.result.alternatives[0] && d.result.alternatives[0].message.text || '').trim();
  }

  if (LLM_PROVIDER === 'openai') {
    if (!OPENAI_API_KEY) throw new Error('Нет OPENAI_API_KEY');
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_API_KEY },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_tokens: 500,
        messages: [{ role: 'system', content: sys }, ...messages]
      })
    });
    if (!r.ok) throw new Error('OpenAI ' + r.status + ' ' + (await r.text()).slice(0, 300));
    const d = await r.json();
    return d.choices?.[0]?.message?.content?.trim() || '';
  }

  if (!ANTHROPIC_API_KEY) throw new Error('Нет ANTHROPIC_API_KEY');
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({ model: ANTHROPIC_MODEL, max_tokens: 500, system: sys, messages: messages })
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status + ' ' + (await r.text()).slice(0, 300));
  const d = await r.json();
  return (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
}

app.post('/api/coach', rateLimit(20), async (req, res) => {
  const u = await aiGate(req, res); if (!u) return;
  try {
    let { messages, context } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'messages required' });
    messages = messages.slice(-12).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000)
    }));
    const reply = await askLLM(messages, context ? String(context).slice(0, 500) : '');
    res.json({ reply: reply || 'Извини, не смог сформулировать ответ. Попробуй переспросить.' });
  } catch (e) {
    console.error('coach error:', e.message);
    res.status(502).json({ error: 'Тренер недоступен', detail: e.message });
  }
});

// ===================== ЖИВОЙ ГОЛОС =====================
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
const ELEVEN_VOICE_ID = process.env.ELEVEN_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
const YANDEX_TTS_KEY = process.env.YANDEX_TTS_KEY || YANDEX_API_KEY;
const YANDEX_VOICE = process.env.YANDEX_VOICE || 'alena';

app.post('/api/tts', rateLimit(30), async (req, res) => {
  const u = await aiGate(req, res); if (!u) return;
  try {
    const text = String((req.body && req.body.text) || '').slice(0, 800);
    if (!text) return res.status(400).json({ error: 'text required' });
    const voice = (req.body && req.body.voice) ? String(req.body.voice).slice(0, 30) : YANDEX_VOICE;

    if (ELEVENLABS_API_KEY) {
      const r = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + ELEVEN_VOICE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVENLABS_API_KEY, 'Accept': 'audio/mpeg' },
        body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
      });
      if (!r.ok) throw new Error('ElevenLabs ' + r.status + ' ' + (await r.text()).slice(0, 200));
      res.setHeader('Content-Type', 'audio/mpeg');
      const buf = Buffer.from(await r.arrayBuffer());
      return res.send(buf);
    }

    if (YANDEX_TTS_KEY) {
      const params = new URLSearchParams({ text, lang: 'ru-RU', voice: voice, format: 'oggopus', speed: '1.0' });
      if (YANDEX_FOLDER_ID) params.set('folderId', YANDEX_FOLDER_ID);
      const r = await fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
        method: 'POST',
        headers: { 'Authorization': 'Api-Key ' + YANDEX_TTS_KEY, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      if (!r.ok) throw new Error('Yandex ' + r.status + ' ' + (await r.text()).slice(0, 200));
      res.setHeader('Content-Type', 'audio/ogg');
      const buf = Buffer.from(await r.arrayBuffer());
      return res.send(buf);
    }

    res.status(501).json({ error: 'Голос не настроен: добавь ELEVENLABS_API_KEY или YANDEX_TTS_KEY' });
  } catch (e) {
    console.error('tts error:', e.message);
    res.status(502).json({ error: 'Голос недоступен', detail: e.message });
  }
});

// --- Регистрация: почта + пароль ---
app.post('/api/register', async (req, res) => {
  if (!dbReady(res)) return;
  try {
    let { email, password, name } = req.body || {};
    email = String(email || '').trim().toLowerCase();
    password = String(password || '');
    if (!emailRe.test(email)) return res.status(400).json({ error: 'Неверный e-mail' });
    if (password.length < 6) return res.status(400).json({ error: 'Пароль минимум 6 символов' });
    const ex = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (ex.rows[0]) return res.status(409).json({ error: 'Такая почта уже зарегистрирована' });
    const hash = await bcrypt.hash(password, 10);
    const r = await pool.query(
      'INSERT INTO users(email, pass_hash, name) VALUES($1,$2,$3) RETURNING *',
      [email, hash, String(name || '').slice(0, 40) || null]);
    const u = r.rows[0];
    res.json({ token: makeToken(u), user: publicUser(u) });
  } catch (e) { console.error('register:', e.message); res.status(500).json({ error: 'Ошибка регистрации' }); }
});

// --- Вход: почта + пароль ---
app.post('/api/login', async (req, res) => {
  if (!dbReady(res)) return;
  try {
    let { email, password } = req.body || {};
    email = String(email || '').trim().toLowerCase();
    password = String(password || '');
    const r = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const u = r.rows[0];
    if (!u || !u.pass_hash) return res.status(401).json({ error: 'Почта или пароль неверны' });
    const ok = await bcrypt.compare(password, u.pass_hash);
    if (!ok) return res.status(401).json({ error: 'Почта или пароль неверны' });
    res.json({ token: makeToken(u), user: publicUser(u) });
  } catch (e) { console.error('login:', e.message); res.status(500).json({ error: 'Ошибка входа' }); }
});

// --- Вход через Яндекс ID (приложение присылает access_token) ---
app.post('/api/yandex', async (req, res) => {
  if (!dbReady(res)) return;
  try {
    const token = String((req.body && req.body.token) || '');
    if (!token) return res.status(400).json({ error: 'Нет токена Яндекса' });
    const yr = await fetch('https://login.yandex.ru/info?format=json', { headers: { 'Authorization': 'OAuth ' + token } });
    if (!yr.ok) return res.status(401).json({ error: 'Яндекс не подтвердил вход' });
    const info = await yr.json();
    const yid = String(info.id || ''); if (!yid) return res.status(401).json({ error: 'Яндекс не вернул профиль' });
    const yemail = (info.default_email || '').toLowerCase() || null;
    const yname = info.real_name || info.display_name || info.first_name || null;
    let r = await pool.query('SELECT * FROM users WHERE yandex_id=$1', [yid]);
    let u = r.rows[0];
    if (!u && yemail) {
      const byMail = await pool.query('SELECT * FROM users WHERE email=$1', [yemail]);
      if (byMail.rows[0]) { u = (await pool.query('UPDATE users SET yandex_id=$1 WHERE id=$2 RETURNING *', [yid, byMail.rows[0].id])).rows[0]; }
    }
    if (!u) { u = (await pool.query('INSERT INTO users(yandex_id, email, name) VALUES($1,$2,$3) RETURNING *', [yid, yemail, yname])).rows[0]; }
    res.json({ token: makeToken(u), user: publicUser(u) });
  } catch (e) { console.error('yandex:', e.message); res.status(500).json({ error: 'Ошибка входа через Яндекс' }); }
});

// --- Кто я (включая статус премиума) ---
app.get('/api/me', async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  res.json({ user: publicUser(u) });
});

// --- Получить мои тренировки из облака ---
app.get('/api/sync', async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  res.json({ runs: u.runs || [], updated_at: u.updated_at });
});

// --- Сохранить мои тренировки в облако ---
app.post('/api/sync', async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  try {
    let runs = (req.body && req.body.runs) || [];
    if (!Array.isArray(runs)) runs = [];
    runs = runs.slice(0, 5000);
    const km = computeKm(runs);
    await pool.query('UPDATE users SET runs=$1, week_km=$2, total_km=$3, updated_at=now() WHERE id=$4',
      [JSON.stringify(runs), km.week, km.total, u.id]);
    res.json({ ok: true, count: runs.length, week_km: km.week, total_km: km.total });
  } catch (e) { console.error('sync:', e.message); res.status(500).json({ error: 'Ошибка синхронизации' }); }
});

// --- Анонимный рейтинг среди пользователей (по недельному объёму) ---
app.get('/api/rank', async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  try {
    const totalR = await pool.query('SELECT count(*)::int AS n FROM users WHERE total_km > 0');
    const total = Math.max(1, totalR.rows[0].n);
    const my = +u.week_km || 0;
    const ahead = await pool.query('SELECT count(*)::int AS n FROM users WHERE week_km > $1', [my]);
    const position = ahead.rows[0].n + 1;
    const better = total > 1 ? Math.round((total - position) / (total - 1) * 100) : 50;
    res.json({ position, total, percentile: Math.max(0, Math.min(100, better)), week_km: my });
  } catch (e) { console.error('rank:', e.message); res.status(500).json({ error: 'Ошибка рейтинга' }); }
});

// ===================== ОПЛАТА ЮKassa (ПРЕМИУМ) =====================
// Поток: приложение -> POST /api/pay/create (нужен вход) -> сервер создаёт платёж в ЮKassa,
//        возвращает confirmation_url -> пользователь платит -> ЮKassa шлёт уведомление на /api/pay/webhook
//        -> сервер ПЕРЕПРОВЕРЯЕТ платёж по API ЮKassa и включает премиум в базе.
const YK_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YK_SECRET = process.env.YOOKASSA_SECRET_KEY || '';
const PREMIUM_PRICE = (process.env.PREMIUM_PRICE_RUB || '100.00');
const RETURN_URL = process.env.PUBLIC_RETURN_URL || 'https://sikei3022-ai.github.io/?paid=1';
const SEND_RECEIPT = (process.env.YOOKASSA_SEND_RECEIPT || '0') === '1';
const ykAuth = () => 'Basic ' + Buffer.from(YK_SHOP_ID + ':' + YK_SECRET).toString('base64');
const ykReady = () => !!(YK_SHOP_ID && YK_SECRET);

// получить платёж из ЮKassa по id (для надёжной проверки статуса — не доверяем телу вебхука)
async function ykGetPayment(id) {
  const r = await fetch('https://api.yookassa.ru/v3/payments/' + encodeURIComponent(id), {
    headers: { 'Authorization': ykAuth() }
  });
  if (!r.ok) throw new Error('ЮKassa get ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}

async function grantPremium(userId, paymentId, amount) {
  // продлеваем от max(сейчас, текущий premium_until) на PREMIUM_DAYS
  const ur = await pool.query('SELECT premium_until FROM users WHERE id=$1', [userId]);
  if (!ur.rows[0]) return false;
  const cur = ur.rows[0].premium_until ? new Date(ur.rows[0].premium_until).getTime() : 0;
  const base = Math.max(Date.now(), cur);
  const until = new Date(base + PREMIUM_DAYS * 86400000);
  await pool.query('UPDATE users SET premium_until=$1, updated_at=now() WHERE id=$2', [until, userId]);
  await pool.query(
    `INSERT INTO payments(id, user_id, amount, status, paid_at) VALUES($1,$2,$3,'succeeded',now())
     ON CONFLICT (id) DO UPDATE SET status='succeeded', paid_at=now()`,
    [paymentId, userId, amount]);
  return until;
}

// создать платёж
app.post('/api/pay/create', rateLimit(10), async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  if (!ykReady()) return res.status(503).json({ error: 'Оплата не настроена на сервере (нет YOOKASSA_*)' });
  try {
    const body = {
      amount: { value: PREMIUM_PRICE, currency: 'RUB' },
      capture: true,
      confirmation: { type: 'redirect', return_url: RETURN_URL },
      description: 'Skride Premium — подписка на ' + PREMIUM_DAYS + ' дней',
      metadata: { userId: String(u.id) }
    };
    if (SEND_RECEIPT && u.email) {
      body.receipt = {
        customer: { email: u.email },
        items: [{
          description: 'Подписка Skride Premium',
          quantity: '1.00',
          amount: { value: PREMIUM_PRICE, currency: 'RUB' },
          vat_code: 1, payment_subject: 'service', payment_mode: 'full_payment'
        }]
      };
    }
    const r = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': ykAuth(),
        'Content-Type': 'application/json',
        'Idempotence-Key': 'sk_' + u.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10)
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    if (!r.ok) { console.error('yk create:', r.status, JSON.stringify(d).slice(0, 300)); return res.status(502).json({ error: 'ЮKassa отклонила платёж', detail: d.description || r.status }); }
    // фиксируем в журнале как ожидающий
    await pool.query(`INSERT INTO payments(id, user_id, amount, status) VALUES($1,$2,$3,$4)
      ON CONFLICT (id) DO NOTHING`, [d.id, u.id, PREMIUM_PRICE, d.status || 'pending']);
    res.json({ id: d.id, confirmation_url: d.confirmation && d.confirmation.confirmation_url });
  } catch (e) { console.error('pay create:', e.message); res.status(500).json({ error: 'Ошибка создания платежа' }); }
});

// вебхук от ЮKassa — включаем премиум только после перепроверки по API
app.post('/api/pay/webhook', async (req, res) => {
  // отвечаем 200 максимально быстро; ошибки логируем, но не раскрываем
  try {
    if (!pool || !ykReady()) return res.sendStatus(200);
    const ev = req.body || {};
    const obj = ev.object || {};
    const pid = obj.id;
    if (!pid) return res.sendStatus(200);
    // НЕ доверяем телу: тянем платёж напрямую из ЮKassa
    const p = await ykGetPayment(pid).catch(() => null);
    if (!p || p.status !== 'succeeded' || !(p.paid === true)) return res.sendStatus(200);
    const userId = parseInt((p.metadata && p.metadata.userId) || '0', 10);
    if (!userId) return res.sendStatus(200);
    const amount = p.amount && p.amount.value;
    await grantPremium(userId, pid, amount);
    console.log('premium granted: user', userId, 'payment', pid);
    res.sendStatus(200);
  } catch (e) { console.error('webhook:', e.message); res.sendStatus(200); }
});

// приложение может опросить статус после возврата с оплаты
app.get('/api/pay/status', async (req, res) => {
  if (!dbReady(res)) return; const u = await auth(req, res); if (!u) return;
  res.json({ user: publicUser(u) });
});

app.get('/api/voicecheck', async (req, res) => {
  try {
    if (!YANDEX_TTS_KEY) return res.json({ ok: false, where: 'config', error: 'нет ключа YANDEX_API_KEY' });
    const v = (req.query.voice ? String(req.query.voice) : YANDEX_VOICE);
    const params = new URLSearchParams({ text: 'тест', lang: 'ru-RU', voice: v, format: 'oggopus' });
    if (YANDEX_FOLDER_ID) params.set('folderId', YANDEX_FOLDER_ID);
    const r = await fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
      method: 'POST',
      headers: { 'Authorization': 'Api-Key ' + YANDEX_TTS_KEY, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    if (!r.ok) { const t = await r.text(); return res.json({ ok: false, where: 'yandex', status: r.status, voice: v, error: t.slice(0, 300) }); }
    const buf = Buffer.from(await r.arrayBuffer());
    res.json({ ok: true, voice: v, bytes: buf.length });
  } catch (e) { res.json({ ok: false, where: 'exception', error: String(e.message) }); }
});

// ===================== РАСПОЗНАВАНИЕ ТАБЛО ТРЕНАЖЁРА (Yandex Vision OCR) =====================
function parseBoard(text){
  const t = String(text || '');
  let sec = null, best = -1;
  const re = /(\d{1,2}):(\d{2})(?::(\d{2}))?/g; let m;
  while ((m = re.exec(t))) {
    const mm = +m[2], ss = m[3] !== undefined ? +m[3] : 0;
    if (mm > 59 || ss > 59) continue;
    const total = m[3] !== undefined ? (+m[1]) * 3600 + mm * 60 + ss : (+m[1]) * 60 + mm;
    if (total > best) { best = total; sec = total; }
  }
  let km = null;
  let mm2 = t.match(/(\d{1,3}[.,]\d{1,2})\s*(?:km|км)/i)
        || t.match(/(?:dist[a-zа-я]*|дист[а-я]*)\D{0,10}(\d{1,3}[.,]\d{1,2})/i);
  if (mm2) km = parseFloat(mm2[1].replace(',', '.'));
  if (km == null) {
    const decs = [...t.matchAll(/(\d{1,3}[.,]\d{1,2})/g)]
      .map(x => parseFloat(x[1].replace(',', '.')))
      .filter(v => v >= 0.1 && v <= 300);
    if (decs.length) km = decs[0];
  }
  return {
    km: (km != null && isFinite(km)) ? +km.toFixed(2) : null,
    sec: (sec != null && sec > 0) ? sec : null
  };
}

app.post('/api/ocr', rateLimit(20), async (req, res) => {
  const u = await aiGate(req, res); if (!u) return;
  try {
    if (!YANDEX_API_KEY) return res.status(400).json({ error: 'Нет YANDEX_API_KEY' });
    if (!YANDEX_FOLDER_ID) return res.status(400).json({ error: 'Нет YANDEX_FOLDER_ID' });
    let img = (req.body && req.body.image) || '';
    if (!img) return res.status(400).json({ error: 'Нет изображения' });
    if (typeof img !== 'string' || img.length > 8 * 1024 * 1024) return res.status(413).json({ error: 'Слишком большое изображение' });
    let mime = 'image/jpeg';
    if (img.startsWith('data:')) {
      const mh = img.match(/^data:([^;]+)/); if (mh) mime = mh[1];
      const c = img.indexOf(','); if (c >= 0) img = img.slice(c + 1);
    }
    if (!/^image\/(jpeg|png)$/.test(mime)) mime = 'image/jpeg';
    const r = await fetch('https://ocr.api.cloud.yandex.net/ocr/v1/recognizeText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Api-Key ' + YANDEX_API_KEY,
        'x-folder-id': YANDEX_FOLDER_ID,
        'x-data-logging-enabled': 'false'
      },
      body: JSON.stringify({ mimeType: mime, languageCodes: ['ru', 'en'], model: 'page', content: img })
    });
    if (!r.ok) {
      const tx = await r.text();
      console.error('ocr yandex:', r.status, tx.slice(0, 200));
      return res.status(502).json({ error: 'OCR ' + r.status, detail: tx.slice(0, 300) });
    }
    const j = await r.json();
    const full = (j.result && j.result.textAnnotation && j.result.textAnnotation.fullText) || '';
    const parsed = parseBoard(full);
    res.json({ km: parsed.km, sec: parsed.sec, raw: full.slice(0, 400) });
  } catch (e) {
    console.error('ocr:', e.message);
    res.status(500).json({ error: 'Ошибка распознавания' });
  }
});

app.get('/', (req, res) => res.json({
  ok: true,
  service: 'Skride backend',
  version: '7.0-pay',
  accounts: !!(pool && JWT_SECRET),
  pay: ykReady()
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Skride backend на порту ' + PORT));
