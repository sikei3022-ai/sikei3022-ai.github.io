#!/usr/bin/env bash
APP=/root/Skride-server
cd "$APP" || { echo "нет папки $APP"; exit 1; }
echo "== Бэкап server.js =="
cp server.js "server.js.bak_predeploy_$(date +%s)"
echo "== Качаю новый server.js =="
wget -q -O server.js https://sikei3022-ai.github.io/server.js || { echo "не скачался"; exit 1; }
echo "== Ставлю dotenv =="
npm i dotenv --no-audit --no-fund >/dev/null 2>&1
echo "== Пишу .env (ЮKassa) =="
cat > "$APP/.env" <<'ENVEOF'
YOOKASSA_SHOP_ID=1376640
PREMIUM_PRICE_RUB=100.00
PREMIUM_DAYS=30
TRIAL_DAYS=14
PUBLIC_RETURN_URL=https://sikei3022-ai.github.io/?paid=1
YOOKASSA_SEND_RECEIPT=1
ALLOW_ORIGIN=*
REQUIRE_AUTH_AI=0
GATE_AI_PREMIUM=0
ENVEOF
while true; do
  echo ""
  read -p "Секретный ключ ЮKassa (live_...): " YK
  echo "Введено: [$YK]"
  read -p "Верно? y/n: " ok
  [ "$ok" = "y" ] && break
done
echo "YOOKASSA_SECRET_KEY=$YK" >> "$APP/.env"
echo "== Перезапуск =="
pm2 restart skride
sleep 3
echo ""; echo "=== Проверка ==="
curl -s https://api.skride.ru/ ; echo ""
echo "ГОТОВО. Если выше видно 7.0-pay и pay:true — оплата подключена."