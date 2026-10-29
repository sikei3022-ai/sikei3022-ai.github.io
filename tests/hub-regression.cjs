/* Offline regression tests. No provider requests, account data or hardware required.
 * node tests/hub-regression.cjs
 * SKRIDE_TEST_ROOT selects an unmodified baseline; SKRIDE_TEST_RESULTS selects JSON output.
 */
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
let playwright;try{playwright=require('playwright')}catch{playwright=require(process.env.PLAYWRIGHT_MODULE||'/home/dev/ai/connectors/play-browser/node_modules/playwright')}
const root=process.env.SKRIDE_TEST_ROOT||path.resolve(__dirname,'..');
const output=process.env.SKRIDE_TEST_RESULTS||path.join(root,'regression-results.json');
const results=[];
(async()=>{
 const browser=await playwright.chromium.launch({headless:true});
 async function test(name,fn){
  const context=await browser.newContext({viewport:{width:390,height:844}});
  const errors=[],requests=[];let handleCoach=null,handleTTS=null;
  await context.route('**/*',async route=>{
   const req=route.request(),url=new URL(req.url());
   if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type,authorization'}});
   if(url.pathname==='/api/coach'&&handleCoach)return handleCoach(route);
   if(url.pathname==='/api/tts'&&handleTTS)return handleTTS(route);
   if(url.hostname==='skride.audit'){
    const file=path.join(root,url.pathname==='/'?'index.html':url.pathname);
    if(file.startsWith(root+path.sep)&&fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({path:file,contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'});
   }
   return route.abort();
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(new URL(r.url()).pathname==='/api/coach')requests.push(new URL(r.url()).pathname)});
  await page.addInitScript(()=>{
   window.__now=Date.now();Date.now=()=>__now;
   window.__gps={next:0,callbacks:{},active:new Set()};
   Object.defineProperty(navigator,'geolocation',{value:{
    watchPosition(cb){const id=++__gps.next;__gps.callbacks[id]=cb;__gps.active.add(id);return id;},
    clearWatch(id){__gps.active.delete(id)},
    getCurrentPosition(cb){cb({coords:{latitude:25.2,longitude:55.27,accuracy:5}})}
   }});
  });
  try{
   await page.goto('http://skride.audit');await page.waitForFunction(()=>window.__skrideBooted===true);
   await page.evaluate(()=>obFinish());
   await fn({page,requests,onCoach:fn=>handleCoach=fn,onTTS:fn=>handleTTS=fn});
   assert.deepEqual(errors,[],'browser page errors');
   results.push({name,status:'PASS'});console.log('PASS '+name);
  }catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL '+name+': '+e.message)}
  finally{await context.close()}
 }
 async function gpsStart(page){await page.locator('#startBtn').click();await page.evaluate(()=>{const emit=(lat,lon)=>__gps.callbacks[__gps.next]({coords:{latitude:lat,longitude:lon,accuracy:5}});emit(25.2,55.27);__now+=60000;emit(25.201,55.27)});}
 await test('GPS stop while paused saves 60s rather than 360s',async({page})=>{
  await gpsStart(page);await page.locator('#pauseBtn').click();await page.evaluate(()=>__now+=300000);await page.locator('#stopBtn').click();
  const r=await page.evaluate(()=>({sec:runs[0].sec,watchers:__gps.active.size}));assert.equal(r.sec,60);assert.equal(r.watchers,0);
 });
 await test('GPS stop freezes elapsed time before async cleanup',async({page})=>{
  await gpsStart(page);await page.evaluate(()=>{const original=stopWatcher;stopWatcher=async()=>{__now+=10000;await original()}});
  await page.locator('#stopBtn').click();assert.equal(await page.evaluate(()=>runs[0].sec),60);
 });
 await test('GPS ignores callbacks delivered while paused and after stop',async({page})=>{
  await gpsStart(page);await page.locator('#pauseBtn').click();const count=await page.evaluate(()=>gpsPts.length);
  await page.evaluate(()=>{__now+=60000;onGpsPoint(25.21,55.27,5)});assert.equal(await page.evaluate(()=>gpsPts.length),count);
  await page.locator('#stopBtn').click();await page.evaluate(()=>onGpsPoint(25.22,55.27,5));assert.equal(await page.evaluate(()=>gpsPts.length),count);
 });
 await test('GPS resume excludes pause gap, rejects stale watcher, keeps active distance',async({page})=>{
  await gpsStart(page);await page.evaluate(()=>window.__before=liveDist());await page.locator('#pauseBtn').click();await page.evaluate(()=>__now+=300000);await page.locator('#pauseBtn').click();
  const r=await page.evaluate(()=>{
   __gps.callbacks[1]({coords:{latitude:25.205,longitude:55.27,accuracy:5}});
   const afterStale=gpsPts.length;__gps.callbacks[__gps.next]({coords:{latitude:25.21,longitude:55.27,accuracy:5}});
   const resumed=liveDist();__now+=60000;__gps.callbacks[__gps.next]({coords:{latitude:25.211,longitude:55.27,accuracy:5}});
   return {afterStale,before:__before,resumed,distance:liveDist(),breaks:typeof gpsBreaks==='undefined'?[]:gpsBreaks};
  });
  assert.equal(r.afterStale,2);assert.equal(r.resumed,r.before);assert.ok(Math.abs(r.distance-r.before*2)<0.0001);assert.deepEqual(r.breaks,[2]);
  await page.locator('#stopBtn').click();const saved=await page.evaluate(()=>({km:runs[0].km,sec:runs[0].sec,breaks:runs[0].trackBreaks}));
  assert.equal(saved.km,0.22);assert.equal(saved.sec,120);assert.deepEqual(saved.breaks,[2]);
  await page.reload();await page.waitForFunction(()=>window.__skrideBooted);assert.deepEqual(await page.evaluate(()=>runs[0].trackBreaks),[2]);
 });
 await test('GPS inaccurate first resumed point keeps segment boundary pending',async({page})=>{
  await gpsStart(page);await page.locator('#pauseBtn').click();await page.evaluate(()=>__now+=300000);await page.locator('#pauseBtn').click();
  const r=await page.evaluate(()=>{const before=liveDist();onGpsPoint(25.3,55.27,100);onGpsPoint(25.21,55.27,5);return {before,after:liveDist(),n:gpsPts.length}});
  assert.equal(r.after,r.before);assert.equal(r.n,3);
 });
 await test('Live OSM and Yandex paths split at pause boundary',async({page})=>{
  const r=await page.evaluate(()=>{
   gpsPts=[[25.2,55.27],[25.201,55.27],[25.21,55.27],[25.211,55.27]];
   if(typeof gpsBreaks!=='undefined')gpsBreaks=[2];
   mapProvider='osm';let osm;gpsLine={setLatLngs(v){osm=v}};trackLineUpdate();
   mapProvider='yandex';let oldFlat=null;const segments=[];window.ymaps={Polyline:function(v){this.coords=v}};
   gpsLine={removeAll(){segments.length=0},add(v){segments.push(v.coords)},geometry:{setCoordinates(v){oldFlat=v}}};trackLineUpdate();
   return {osm,yandex:oldFlat||segments};
  });const expected=[[[25.2,55.27],[25.201,55.27]],[[25.21,55.27],[25.211,55.27]]];assert.deepEqual(r.osm,expected);assert.deepEqual(r.yandex,expected);
 });
 await test('Saved mini-map and snapshot strokes never connect pause gap',async({page})=>{
  const r=await page.evaluate(async()=>{
   const track=[[25.2,55.27],[25.201,55.27],[25.21,55.27],[25.211,55.27]],ops=[];
   const proto=CanvasRenderingContext2D.prototype,move=proto.moveTo,line=proto.lineTo;
   proto.moveTo=function(...args){ops.push('M');return move.apply(this,args)};proto.lineTo=function(...args){ops.push('L');return line.apply(this,args)};
   try{const canvas=document.createElement('canvas');await drawMini(canvas,track,[2]);const mini=ops.join('');ops.length=0;await buildRouteImage(track,[2]);return {mini,snapshot:ops.join('')}}
   finally{proto.moveTo=move;proto.lineTo=line}
  });assert.equal(r.mini,'MLMLMLML');assert.equal(r.snapshot,'MLML');
 });
 await test('Remote audio detached immediately even without session.closed ACK',async({page})=>{
  const r=await page.evaluate(()=>{
   const remote=new MediaStream(),audio=document.createElement('audio');audio.autoplay=true;audio.srcObject=remote;document.body.append(audio);
   let paused=0,stopped=0,receivedStopped=0,sent=0;audio.pause=()=>paused++;
   const track={enabled:true,stop(){stopped++}};
   liveCoach={active:true,audio,stream:{getTracks:()=>[track],getAudioTracks:()=>[track]},pc:{ontrack(){},getReceivers:()=>[{track:{stop(){receivedStopped++}}}],close(){}},dc:{readyState:'open',addEventListener(){},send(){sent++},close(){}}};
   convoMode=true;$('coachSilence').onclick();return {paused,stopped,receivedStopped,sent,detached:audio.srcObject===null,removed:!audio.isConnected,autoplay:audio.autoplay,enabled:track.enabled};
  });assert.equal(r.detached,true);assert.equal(r.removed,true);assert.equal(r.autoplay,false);assert.equal(r.paused,1);assert.equal(r.stopped,1);assert.equal(r.receivedStopped,1);assert.equal(r.enabled,false);assert.equal(r.sent,1);
 });
 for(const mode of ['conversation','text'])for(const outcome of ['success','failure']){
  await test(`Pending coach/chat ${mode}: late ${outcome} cannot revive stopped generation`,async({page,onCoach,requests})=>{
   let pendingResolve;const pending=new Promise(r=>pendingResolve=r);onCoach(route=>{pendingResolve(route)});
   await page.evaluate(mode=>{
    window.__said=[];window.__signals=[];say=text=>__said.push(text);hasAccess=()=>true;voiceCoach=true;
    const nativeFetch=window.fetch.bind(window);window.fetch=(url,opts)=>{if(String(url).endsWith('/api/coach'))__signals.push(opts.signal);return nativeFetch(url,opts)};
    if(mode==='conversation'){convoMode=true;convoAsk('Audit pending question')}else coachSendText('Audit pending question');
   },mode);
   const route=await pending;
   await page.locator('#coachSilence').click();
   // Start a new session before settling the old request: generation checks must
   // prevent old responses/fallback from entering the new session as well.
   await page.evaluate(()=>{convoMode=true;convoAttempt++;});
   try{await route.fulfill({status:outcome==='success'?200:503,headers:{'Access-Control-Allow-Origin':'*'},contentType:'application/json',body:JSON.stringify({reply:'LATE AUDIT ANSWER'})})}catch{}
   await page.waitForTimeout(120);
   const r=await page.evaluate(()=>({said:__said,aborted:__signals[0].aborted,late:chatMsgs.some(m=>m.text==='LATE AUDIT ANSWER'),placeholder:chatMsgs.some(m=>m.text==='…')}));
   assert.equal(requests.length,1);assert.deepEqual(r.said,[]);assert.equal(r.late,false);assert.equal(r.aborted,true);assert.equal(r.placeholder,false);
  });
 }
 await test('Unabortable coach result cannot enter new conversation',async({page})=>{
  const r=await page.evaluate(async()=>{
   let resolve;window.__said=[];say=t=>__said.push(t);hasAccess=()=>true;
   window.fetch=()=>new Promise(r=>resolve=r);convoMode=true;convoAsk('unabortable');stopConvo();convoMode=true;convoAttempt++;
   resolve({ok:true,json:async()=>({reply:'STALE'})});await new Promise(r=>setTimeout(r,20));return {said:__said,stale:chatMsgs.some(m=>m.text==='STALE')};
  });assert.deepEqual(r,{said:[],stale:false});
 });
 await test('Current coach request still delivers a response',async({page,onCoach})=>{
  onCoach(route=>route.fulfill({headers:{'Access-Control-Allow-Origin':'*'},contentType:'application/json',body:JSON.stringify({reply:'CURRENT AUDIT ANSWER'})}));
  await page.evaluate(()=>{window.__said=[];say=t=>__said.push(t);hasAccess=()=>true;convoMode=true;convoAsk('current')});
  await page.waitForFunction(()=>window.__said.includes('CURRENT AUDIT ANSWER'));
 });
 await test('Pending TTS cannot start remote audio or fallback TTS after stop',async({page,onTTS})=>{
  let received;const pending=new Promise(r=>received=r);onTTS(route=>received(route));
  await page.evaluate(()=>{applyLang('ru');authToken='test-session';listenMode='both';window.__played=0;window.__nativeSpoken=0;_cloudAudio=new Audio();_cloudAudio.play=async()=>{__played++};speechSynthesis.speak=()=>__nativeSpoken++;window.__sayPromise=say('Test delayed speech')});
  const route=await pending;assert.equal(route.request().headers().authorization,'Bearer test-session');await page.evaluate(()=>stopSpeaking());
  try{await route.fulfill({headers:{'Access-Control-Allow-Origin':'*'},contentType:'audio/wav',body:Buffer.alloc(256)})}catch{}
  await page.evaluate(()=>__sayPromise);assert.deepEqual(await page.evaluate(()=>[__played,__nativeSpoken]),[0,0]);
 });
 await test('Elliptical selection survives reload and saves correct activity type',async({page})=>{
  await page.locator('#actPick [data-act="ellipse"]').click();await page.waitForFunction(async()=>await sGet(ACT_KEY)==='ellipse');
  await page.reload();await page.waitForFunction(()=>window.__skrideBooted);assert.equal(await page.evaluate(()=>activityType),'ellipse');
  await page.evaluate(async()=>{await setMode('manual');$('mDist').value='5';$('mM').value='30';await $('mSave').onclick()});assert.equal(await page.evaluate(()=>runs[0].type),'ellipse');
 });

 await test('OAuth routes Google via international and Yandex via Russian server',async({page})=>{
  const r=await page.evaluate(()=>({google:googleAuthURL(),yandex:yaAuthURL()}));
  assert.equal(new URL(r.google).origin,'https://skride-intl.153.75.89.9.sslip.io');
  assert.equal(new URL(r.yandex).searchParams.get('redirect_uri'),'https://api.skride.ru/yandex-callback');
 });
 await test('Native Google button uses protected native bridge and applies returned token',async({page})=>{
  const r=await page.evaluate(async()=>{
   window.__nativeCalls=0;window.__applied='';
   window.SkrideAuth={google:async()=>{__nativeCalls++;return {token:'native-session'}}};
   applySkrideToken=async tk=>{__applied=tk};window.open=()=>{throw Error('Unexpected embedded OAuth')};
   startGoogleLogin();await new Promise(r=>setTimeout(r,0));return {calls:__nativeCalls,token:__applied};
  });assert.deepEqual(r,{calls:1,token:'native-session'});
 });
 await browser.close();
 fs.writeFileSync(output,JSON.stringify({root,total:results.length,passed:results.filter(r=>r.status==='PASS').length,results},null,2));
 if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
