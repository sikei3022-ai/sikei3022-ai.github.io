/* Native BLE is injected by Skride Flutter only on the trusted top-level page. */
(()=>{
 const bridge=window.SkrideBluetooth;if(!bridge)return;
 const states=new Map(),busy=new Set();
 const words={
 ru:['Подключено','Ожидаю данные','Отключить','Отключено','Подключаю…','Нет данных датчика'],
 en:['Connected','Waiting for data','Disconnect','Disconnected','Connecting…','Sensor data unavailable'],
 es:['Conectado','Esperando datos','Desconectar','Desconectado','Conectando…','Datos no disponibles'],
 it:['Connesso','In attesa dei dati','Disconnetti','Disconnesso','Connessione…','Dati non disponibili'],
 ja:['接続済み','データ待機中','切断','未接続','接続中…','センサーデータを取得できません']
 };
 const w=i=>(words[coachLanguage()]||words.en)[i];
 async function clear(kind,disconnect=true){
  const old=states.get(kind);if(!old)return;
  states.delete(kind);
  for(const handle of old.handles)await handle.remove();
  if(disconnect)await bridge.disconnect({deviceId:old.id}).catch(()=>{});
  $(old.stateId).textContent=w(3);$(old.stateId).classList.remove('on');
  old.button.remove();
  if(kind==='hr'){hrDeviceId=null;liveBpm=null;updateHrTile()}
 }
 async function connect(kind,stateId){
  if(busy.has(kind))return;
  busy.add(kind);
  const ids=kind==='hr'?['hrConnect','watchBt','bandBt']:['treadBt'];
  ids.forEach(id=>$(id).disabled=true);
  let id,handles=[];
  try{
   await bridge.initialize();
   const service=kind==='hr'?HR_SVC:FTMS_SVC,characteristic=kind==='hr'?HR_CHR:TREAD_CHR;
   const dev=await bridge.requestDevice(kind==='hr'?{optionalServices:[service]}:{services:[service]});
   id=dev.deviceId;
   await clear(kind);
   $(stateId).textContent=w(4);
   await bridge.connect({deviceId:id});await bridge.discoverServices({deviceId:id});
   const button=document.createElement('button');button.type='button';button.className='chip';button.textContent=w(2);
   button.onclick=()=>clear(kind);
   const item={id,stateId,handles,button,name:dev.name||'Bluetooth'};
   states.set(kind,item);
   handles.push(await bridge.addListener('notification|'+id+'|'+service+'|'+characteristic,e=>{
    if(states.get(kind)!==item)return;
    const bytes=bleBytes(e.value);
    if(kind==='hr'){const bpm=hrFromBytes(bytes);if(bpm==null)return;pushHr(bpm);$(stateId).textContent=item.name+' · '+bpm+' bpm'}
    else {const speed=treadSpeed(bytes);if(speed==null)return;$(stateId).textContent=item.name+' · '+speed.toFixed(1)+' km/h'}
   }));
   await bridge.startNotifications({deviceId:id,service,characteristic});
   if(states.get(kind)!==item)throw new Error(w(5));
   $(stateId).textContent=w(0)+': '+item.name+' · '+w(1);$(stateId).classList.add('on');
   $(stateId).closest('.dev-card').append(button);
   if(kind==='hr')hrDeviceId=id;
  }catch(e){
   if(id){await clear(kind);await bridge.disconnect({deviceId:id}).catch(()=>{})}
   if(id||!states.has(kind))$(stateId).textContent=w(3);toast(String(e.message||e));
  }finally{busy.delete(kind);ids.forEach(id=>$(id).disabled=false)}
 }
 bridge.addListener('disconnected',e=>{for(const[k,v]of states)if(v.id===e.deviceId)clear(k,false)});
 bridge.addListener('notificationError',e=>{toast(w(5));for(const[k,v]of states)if(v.id===e.deviceId)clear(k)});
 connectHr=(stateId)=>connect('hr',stateId||'hrConnState');
 $('treadBt').onclick=()=>{if(requirePremium())connect('tread','treadState')};
 const prev=applyLang;applyLang=function(l){prev(l);for(const v of states.values())v.button.textContent=w(2)};
})();
