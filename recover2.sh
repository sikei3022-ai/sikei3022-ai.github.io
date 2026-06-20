#!/usr/bin/env bash
cd /root/Skride-server || exit 1
H=/root/.bash_history
KEYS="DATABASE_URL JWT_SECRET YANDEX_API_KEY YANDEX_FOLDER_ID LLM_PROVIDER YANDEX_GPT_MODEL ELEVENLABS_API_KEY ELEVEN_VOICE_ID YANDEX_TTS_KEY YANDEX_VOICE ANTHROPIC_API_KEY ANTHROPIC_MODEL OPENAI_API_KEY OPENAI_MODEL PORT"
n=0; got=""
for K in $KEYS; do
  L=$(grep -E "echo '$K=" "$H" | tail -1)
  if [ -n "$L" ]; then
    V=$(echo "$L" | sed -E "s/.*echo '$K=//; s/'.*//")
    if [ -n "$V" ]; then echo "$K=$V" >> .env; n=$((n+1)); got="$got $K"; fi
  fi
done
echo "Восстановлено: $n ->$got"
pm2 restart skride
sleep 3
echo "=== Проверка ==="
curl -s https://api.skride.ru/ ; echo ""
echo "Нужно: accounts:true И pay:true"