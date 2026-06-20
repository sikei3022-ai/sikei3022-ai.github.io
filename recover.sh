#!/usr/bin/env bash
node -e '
const fs=require("fs");
let env={};
try{
  const d=JSON.parse(fs.readFileSync("/root/.pm2/dump.pm2","utf8"));
  const arr=Array.isArray(d)?d:(d.apps||[]);
  const p=arr.find(x=>x&&x.name==="skride")||{};
  env=p.env||(p.pm2_env&&p.pm2_env.env)||{};
}catch(e){ console.log("dump err:",e.message); }
const keys=["DATABASE_URL","JWT_SECRET","YANDEX_API_KEY","YANDEX_FOLDER_ID","LLM_PROVIDER","YANDEX_GPT_MODEL","ELEVENLABS_API_KEY","ELEVEN_VOICE_ID","YANDEX_TTS_KEY","YANDEX_VOICE","ANTHROPIC_API_KEY","ANTHROPIC_MODEL","OPENAI_API_KEY","OPENAI_MODEL","PORT"];
let out=""; let found=[];
keys.forEach(k=>{ const v=env[k]; if(v!==undefined&&v!==""){ out+=k+"="+v+"\n"; found.push(k); } });
if(out) fs.appendFileSync("/root/Skride-server/.env","\n"+out);
console.log("ВОССТАНОВЛЕНО: "+found.length+" -> "+found.join(","));
'
pm2 restart skride
sleep 3
echo "=== Проверка ==="
curl -s https://api.skride.ru/ ; echo ""
echo "Нужно: accounts:true И pay:true"