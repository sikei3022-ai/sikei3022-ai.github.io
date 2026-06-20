#!/usr/bin/env bash
cd /root/Skride-server || exit 1
SID=$(grep '^YOOKASSA_SHOP_ID=' .env | head -1 | cut -d= -f2- | tr -d '\r')
SEC=$(grep '^YOOKASSA_SECRET_KEY=' .env | head -1 | cut -d= -f2- | tr -d '\r')
if [ -z "$SID" ] || [ -z "$SEC" ]; then echo "В .env нет ключей ЮKassa"; exit 1; fi
AUTH=$(printf '%s:%s' "$SID" "$SEC" | base64 -w0)
URL="https://api.skride.ru/api/pay/webhook"
for EV in payment.succeeded payment.canceled refund.succeeded; do
  echo "== Регистрирую событие: $EV =="
  curl -s -X POST https://api.yookassa.ru/v3/webhooks \
    -H "Authorization: Basic $AUTH" \
    -H "Idempotence-Key: wh-$(date +%s)-$RANDOM" \
    -H "Content-Type: application/json" \
    -d "{\"event\":\"$EV\",\"url\":\"$URL\"}"
  echo ""
done
echo ""
echo "== Текущие вебхуки магазина =="
curl -s https://api.yookassa.ru/v3/webhooks -H "Authorization: Basic $AUTH"
echo ""
echo "ГОТОВО. Должны быть события payment.succeeded и url api.skride.ru/api/pay/webhook"