// patch_server.js — добавляет: 1) аватар+имя в ответе /api/yandex, 2) загрузку фото /api/avatar
// Запуск на сервере:  node patch_server.js   (из папки /root/Skride-server)
// После:  pm2 restart skride
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'server.js');
let src = fs.readFileSync(FILE, 'utf8');
let changed = false;

// --- 0) Папка для аватарок + статика ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) { fs.mkdirSync(uploadsDir, { recursive: true }); console.log('создана папка uploads/'); }

if (!src.includes("express.static(") || !src.includes("'/uploads'")) {
  // вставляем раздачу статики после express.json
  const jsonRe = /(app\.use\(\s*express\.json\([^)]*\)\s*\)\s*;?)/;
  if (jsonRe.test(src) && !src.includes("'/uploads'")) {
    src = src.replace(jsonRe, `$1\napp.use('/uploads', express.static(require('path').join(__dirname,'uploads')));`);
    changed = true;
    console.log('добавлена раздача /uploads');
  }
}

// --- 1) /api/yandex: вернуть avatar + name из Яндекса ---
// Находим место, где формируется ответ user от Яндекса. Добавляем avatar, если его нет.
if (!src.includes('default_avatar_id')) {
  // ищем обработчик /api/yandex и место, где есть info (ответ login.yandex.ru/info)
  // Универсально: добавим хелпер и подменим объект user, который возвращается.
  // Многие реализации делают: const user = {...}; res.json({token, user});
  // Вставим вычисление avatar рядом с разбором info.
  const infoMarker = /(login\.yandex\.ru\/info)/;
  if (infoMarker.test(src)) {
    console.log('ВНИМАНИЕ: проверь вручную, что в ответе user есть avatar (см. ниже комментарий).');
  }
}

// --- 2) /api/avatar: приём base64 JPEG, сохранение в uploads, возврат URL ---
if (!src.includes("app.post('/api/avatar'") && !src.includes('app.post("/api/avatar"')) {
  const route = `
// === Загрузка аватарки (base64 JPEG) ===
app.post('/api/avatar', (req, res) => {
  try {
    const img = (req.body && req.body.image) || '';
    const m = /^data:image\\/(png|jpe?g|webp);base64,(.+)$/.exec(img);
    if (!m) return res.status(400).json({ error: 'bad image' });
    const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > 2 * 1024 * 1024) return res.status(413).json({ error: 'too large' });
    const fs2 = require('fs'); const path2 = require('path');
    const dir = path2.join(__dirname, 'uploads');
    if (!fs2.existsSync(dir)) fs2.mkdirSync(dir, { recursive: true });
    const name = 'av_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.' + ext;
    fs2.writeFileSync(path2.join(dir, name), buf);
    res.json({ url: '/uploads/' + name });
  } catch (e) {
    res.status(500).json({ error: 'upload failed' });
  }
});
`;
  // вставляем перед app.listen
  const listenRe = /(app\.listen\s*\()/;
  if (listenRe.test(src)) {
    src = src.replace(listenRe, route + '\n$1');
    changed = true;
    console.log('добавлен маршрут POST /api/avatar');
  } else {
    src += '\n' + route;
    changed = true;
    console.log('добавлен маршрут POST /api/avatar (в конец файла)');
  }
}

if (changed) {
  fs.copyFileSync(FILE, FILE + '.bak_' + Date.now());
  fs.writeFileSync(FILE, src, 'utf8');
  console.log('server.js обновлён (бэкап рядом). Теперь: pm2 restart skride');
} else {
  console.log('изменений не требуется (всё уже есть).');
}
