/* Skride: clear voice controls, preserving the existing training experience. */
(()=>{
const labels={
ru:['Сопровождение тренировки','Объявления километров, темпа, старта и паузы. Без постоянно включённого микрофона.','Включить сопровождение','Сопровождение включено','Голосовой разговор','Тренер ответит на вопросы. Микрофон включается только после нажатия.','Подключаем тренера… Можно отменить.','Тренер на связи · микрофон включён','Обычный голосовой режим','Выключить микрофон','Включить микрофон','Микрофон выключен · тренер остаётся на связи','Отменить подключение','Готов к разговору','Повторить ответ','Остановить озвучку'],
en:['Workout guidance','Distance, pace, start and pause announcements. No always-on microphone.','Enable guidance','Guidance is on','Voice conversation','Ask your coach a question. The microphone starts only when you tap.','Connecting… You can cancel.','Coach connected · microphone on','Standard voice mode','Mute microphone','Unmute microphone','Microphone muted · coach connected','Cancel connection','Ready to talk','Replay answer','Stop playback'],
es:['Guía del entrenamiento','Avisos de distancia, ritmo, inicio y pausa. Sin micrófono siempre activo.','Activar guía','Guía activada','Conversación por voz','Pregunta al entrenador. El micrófono se activa al pulsar.','Conectando… Puedes cancelar.','Entrenador conectado · micrófono activo','Modo de voz estándar','Silenciar micrófono','Activar micrófono','Micrófono silenciado · entrenador conectado','Cancelar conexión','Listo para hablar','Repetir respuesta','Detener audio'],
it:['Guida all’allenamento','Avvisi su distanza, ritmo, avvio e pausa. Senza microfono sempre attivo.','Attiva la guida','Guida attiva','Conversazione vocale','Fai una domanda al coach. Il microfono si attiva solo al tocco.','Connessione… Puoi annullare.','Coach connesso · microfono attivo','Modalità vocale standard','Disattiva microfono','Attiva microfono','Microfono disattivato · coach connesso','Annulla connessione','Pronto a parlare','Ripeti risposta','Interrompi audio'],
ja:['ワークアウトガイド','距離・ペース・開始・一時停止を音声でお知らせ。マイクの常時使用はありません。','ガイドを有効にする','ガイド有効','音声会話','コーチに質問できます。タップしてからマイクが起動します。','接続中…キャンセルできます。','コーチ接続済み・マイク有効','通常の音声モード','マイクをオフ','マイクをオン','マイクオフ・コーチ接続中','接続をキャンセル','会話を開始できます','回答を再生','再生を停止']
};
const t=i=>(labels[coachLanguage()]||labels.en)[i];
const controls=document.querySelector('.coach-ctrls');
const guide=document.createElement('div');guide.className='coach-guidance';
guide.innerHTML='<div class="coach-mode-title" id="guidanceTitle"></div><p id="guidanceHint"></p><button type="button" id="coachGuidance" aria-pressed="false"></button>';
controls.before(guide);
const title=document.createElement('div');title.className='coach-mode-title';title.id='conversationTitle';controls.before(title);
const hint=document.createElement('p');hint.id='conversationHint';hint.className='coach-mode-hint';controls.before(hint);
const status=document.createElement('div');status.id='coachConnectionStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');controls.after(status);
const mute=document.createElement('button');mute.type='button';mute.id='coachMute';mute.hidden=true;controls.append(mute);
const secondary=document.createElement('div');secondary.className='coach-secondary';
secondary.innerHTML='<button type="button" id="coachReplay"></button><button type="button" id="coachSilence"></button>';document.getElementById('coachThread').after(secondary);
window.updateCoachControls=()=>{
const muted=liveCoach.active&&liveCoach.stream&&!liveCoach.stream.getAudioTracks().some(x=>x.enabled);
$('guidanceTitle').textContent=t(0);$('guidanceHint').textContent=t(1);
$('coachGuidance').textContent=t(voiceCoach?3:2);$('coachGuidance').setAttribute('aria-pressed',String(voiceCoach));
$('conversationTitle').textContent=t(4);$('conversationHint').textContent=t(5);
status.textContent=t(coachConnecting?6:liveCoach.active?(muted?11:7):convoMode?8:13);
status.dataset.active=String(convoMode);
$('coachConvo').setAttribute('aria-pressed',String(convoMode));$('coachConvo').textContent=coachConnecting?t(12):regionText(convoMode?'stop':'talk').replace(/^[^\p{L}]+/u,'');
mute.hidden=!liveCoach.active;mute.textContent=t(muted?10:9);mute.setAttribute('aria-pressed',String(muted));
$('coachReplay').textContent=t(14);$('coachReplay').disabled=convoMode;
$('coachSilence').textContent=t(15);
};
$('coachGuidance').onclick=()=>{unlockAudio();if(!voiceCoach&&listenMode==='music'){listenMode='both';sSet(LISTEN_KEY,listenMode);applyListen();}setVoice(!voiceCoach,false)};
mute.onclick=()=>{if(!liveCoach.stream)return;const tracks=liveCoach.stream.getAudioTracks();const enable=!tracks.some(x=>x.enabled);tracks.forEach(x=>x.enabled=enable);updateCoachControls()};
$('coachReplay').onclick=()=>{unlockAudio();playLastCoach()};
$('coachSilence').onclick=()=>{stopSpeaking();if(convoMode)stopConvo()};
const oldApply=applyLang;applyLang=function(l){oldApply(l);updateCoachControls()};
const oldSpeak=speak;
speak=async function(text){
if(!voiceCoach||convoMode)return; // prevent device TTS speaking over the live coach
const l=coachLanguage(),phrases={
'Поехали!':['Let’s go!','¡Vamos!','Partiamo!','始めましょう！'],
'Пауза':['Paused','Pausa','Pausa','一時停止'],
'Продолжаем':['Let’s continue','Continuamos','Continuiamo','再開します']
};
if(l!=='ru'){
 const i=['en','es','it','ja'].indexOf(l);
 if(phrases[text])text=phrases[text][i];
 else if(/^\d+ /.test(text)||text.startsWith('Стоп. Дистанция')){
 const d=liveDist().toFixed(1),p=metricStr(liveDist(),elapsedSec(),activityType)||'';
 text=[d+' kilometers. '+(activityType==='bike'?'Speed ':'Pace ')+p,d+' kilómetros. '+(activityType==='bike'?'Velocidad ':'Ritmo ')+p,d+' chilometri. '+(activityType==='bike'?'Velocità ':'Passo ')+p,d+'キロメートル。'+(activityType==='bike'?'速度':'ペース')+p][i];
 }else text=window.skTranslate?window.skTranslate(text,l):text;
}
return oldSpeak(text);
};
updateCoachControls();
})();
(()=>{
const copy={
ru:['Фото табло','Подключить дорожку','Подключить пульс','Поддерживаются датчики с трансляцией пульса Bluetooth HR и дорожки FTMS. Это не синхронизация тренировок, шагов или сна с Apple Watch, Garmin и Mi Band.','Bluetooth недоступен в этой версии приложения. Для совместимых датчиков открой Skride в Chrome на Android.','Сфотографируй табло. Распознанные цифры нужно проверить перед сохранением.','Маршрут записывается, пока приложение открыто. Фоновая запись в текущей версии не поддерживается.'],
en:['Scan display','Connect treadmill','Connect heart rate','Supports Bluetooth HR broadcasts and FTMS treadmills. This does not sync workouts, steps or sleep from Apple Watch, Garmin or Mi Band.','Bluetooth is unavailable in this app version. Use Skride in Chrome on Android for compatible sensors.','Photograph the display. Check recognized numbers before saving.','Keep the app open to record your route. Background recording is not supported in this version.'],
es:['Escanear pantalla','Conectar cinta','Conectar pulso','Compatible con sensores Bluetooth HR y cintas FTMS. No sincroniza entrenamientos, pasos ni sueño de Apple Watch, Garmin o Mi Band.','Bluetooth no está disponible en esta versión. Usa Skride en Chrome para Android con sensores compatibles.','Fotografía la pantalla y revisa los números antes de guardar.','Mantén la aplicación abierta para grabar la ruta. Esta versión no graba en segundo plano.'],
it:['Scansiona display','Collega tapis roulant','Collega frequenza cardiaca','Supporta sensori Bluetooth HR e tapis roulant FTMS. Non sincronizza allenamenti, passi o sonno da Apple Watch, Garmin o Mi Band.','Bluetooth non è disponibile in questa versione. Usa Skride in Chrome per Android con sensori compatibili.','Fotografa il display e verifica i numeri prima di salvare.','Tieni aperta l’app per registrare il percorso. La registrazione in background non è supportata.'],
ja:['ディスプレイを撮影','トレッドミルを接続','心拍センサーを接続','Bluetooth HRの心拍配信とFTMSトレッドミルに対応。Apple Watch、Garmin、Mi Bandの運動・歩数・睡眠の同期ではありません。','このアプリ版ではBluetoothを利用できません。対応センサーにはAndroid版ChromeでSkrideを開いてください。','ディスプレイを撮影し、保存前に認識結果を確認してください。','経路の記録中はアプリを開いたままにしてください。この版はバックグラウンド記録に対応していません。']
};
const available=!!(BLE||navigator.bluetooth);
const note=document.createElement('p');note.className='device-availability';$('treadSec').append(note);
const gpsNote=document.createElement('p');gpsNote.className='device-availability';$('mapBar').after(gpsNote);
function refresh(){
 const a=copy[coachLanguage()]||copy.en;
 $('machPhotoLbl').textContent=a[0];
 // Replace decorative emoji text nodes, preserving the translated span.
 for(const n of [...$('treadPhoto').childNodes])if(n.nodeType===3)n.textContent='';
 $('treadBt').textContent=a[1];for(const id of ['watchBt','bandBt','hrConnect'])$(id).textContent=a[2];
 document.querySelector('.dev-note').textContent=a[3];note.textContent=available?'':a[4];
 const p=document.querySelector('.mach-card > p');if(p)p.textContent=a[5];
 gpsNote.textContent=(isNative&&window.Capacitor?.Plugins?.BackgroundGeolocation)?'':a[6];
 if(!available)for(const id of ['watchBt','bandBt','hrConnect','treadBt'])$(id).onclick=()=>toast(a[4]);
}
const prev=applyLang;applyLang=function(l){prev(l);refresh()};
const machine=updateMachineCard;
if(typeof machine==='function')updateMachineCard=function(){machine();refresh()};
refresh();
})();
