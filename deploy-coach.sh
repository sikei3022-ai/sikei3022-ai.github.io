#!/bin/bash
# Обновление мозга тренера: умная модель yandexgpt + разговорный промпт
cd /root/Skride-server || { echo "НЕТ папки /root/Skride-server"; exit 1; }
echo "== бэкап текущего server.js =="
cp server.js server.js.bak_coach 2>/dev/null
echo "== качаю новый server.js =="
wget -q -O server.new.js "https://sikei3022-ai.github.io/server.js" || { echo "НЕ СКАЧАЛ"; exit 1; }
if node -c server.new.js; then mv server.new.js server.js; echo "server.js обновлён ОК"; else echo "СИНТАКС-ОШИБКА — откат"; rm -f server.new.js; exit 1; fi
echo "== ставлю модель yandexgpt (pro) в .env =="
touch .env
sed -i '/^YANDEX_GPT_MODEL=/d' .env
echo 'YANDEX_GPT_MODEL=yandexgpt' >> .env
echo "== рестарт =="
pm2 restart skride
sleep 2
echo "================================"
echo "ГОТОВО. Проверь: https://api.skride.ru/  и поговори с тренером."
