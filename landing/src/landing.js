import './landing.css';
import { clamp, scrollProgress, sceneState } from './scroll-scene.mjs';

const $ = selector => document.querySelector(selector);
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const pointerQuery = matchMedia('(hover: hover) and (pointer: fine)');
let manualReduced = false;
try { manualReduced = sessionStorage.getItem('hiob-reduced-motion') === 'true'; } catch { /* Optional preference storage. */ }
const reduced = () => motionQuery.matches || manualReduced || navigator.connection?.saveData === true;
const hero = $('#hero-video'), cinema = $('.cinema'), stage = $('.cinema-stage');
const motionButton = $('.motion-toggle'), heroControl = $('#hero-control');
const copies = [...document.querySelectorAll('.scene-copy')];
const chapters = [...document.querySelectorAll('[data-jump]')];
const dialog = $('#video-dialog'), fullVideo = $('#full-video');
const status = $('.media-status');
let progress = 0, scrollFrame = 0, heroManuallyPaused = false, visible = true, seeking = false;
let desiredTime = 0, observedChapter = -1;
function loadVideo() {
  if (!hero.getAttribute('src')) { hero.src = hero.dataset.src; hero.load(); }
}
function updateControl() {
  heroControl.textContent = hero.paused ? '▶' : 'Ⅱ';
  heroControl.setAttribute('aria-label', `광고 미리보기 ${hero.paused ? '재생' : '일시정지'}`);
}
function playHero() {
  if (!visible || document.hidden || dialog.open) return;
  loadVideo();
  hero.play().then(()=>{status.textContent='';updateControl();}).catch(()=>{
    status.textContent='재생 버튼을 누르거나 스크롤해서 영상을 확인하세요.';
    updateControl();
  });
}
heroControl.addEventListener('click',()=>{
  if (hero.paused) { heroManuallyPaused = false; playHero(); }
  else { heroManuallyPaused = true; hero.pause(); }
});
hero.addEventListener('pause',updateControl);
hero.addEventListener('play',updateControl);
hero.addEventListener('timeupdate',()=>{
  $('#film-time').textContent=`00:${hero.currentTime.toFixed(2).padStart(5,'0')}`;
  if(progress < .008 && !reduced() && hero.currentTime > 1.15) hero.currentTime=0;
});
hero.addEventListener('ended',()=>{hero.currentTime=0;if(!heroManuallyPaused)playHero();});
hero.addEventListener('error',()=>{status.textContent='영상이 로드되지 않았습니다. 소리와 함께 보기로 원본을 열 수 있습니다.';});
function seekLatest() {
  if (seeking || hero.readyState < 2 || reduced() || progress < .008 || !visible || dialog.open) return;
  if(Math.abs(hero.currentTime-desiredTime) < .035) return;
  seeking=true;
  hero.currentTime=desiredTime;
}
hero.addEventListener('seeked',()=>{seeking=false;seekLatest();});
hero.addEventListener('loadeddata',()=>{seeking=false;scheduleScroll();});
function paintScroll() {
  scrollFrame=0;
  const rect=cinema.getBoundingClientRect();
  visible=rect.bottom>0 && rect.top<innerHeight;
  if(reduced()) return;
  progress=scrollProgress(rect.top,rect.height,stage.offsetHeight);
  const state=sceneState(progress,hero.duration);
  for(const key of ['dock','intro','direction','edit','finish','timeline','progress']) stage.style.setProperty(`--${key}`,String(state[key]));
  if(state.chapter!==observedChapter){
    observedChapter=state.chapter;stage.dataset.chapter=String(state.chapter);
    copies.forEach((copy,index)=>{copy.inert=index!==state.chapter;copy.setAttribute('aria-hidden',String(index!==state.chapter));});
    chapters.forEach((button,index)=>{if(index===state.chapter)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
  }
  desiredTime=state.time;
  if(!visible || document.hidden || dialog.open) { hero.pause(); return; }
  loadVideo();
  if(progress < .008 && !heroManuallyPaused) { if(hero.paused)playHero(); }
  else { hero.pause(); seekLatest(); }
}
function scheduleScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(paintScroll);}
addEventListener('scroll',scheduleScroll,{passive:true});
addEventListener('resize',scheduleScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)hero.pause();else scheduleScroll();});
chapters.forEach(button=>button.addEventListener('click',()=>{
  const top=scrollY+cinema.getBoundingClientRect().top;
  const target=Number(button.dataset.jump)*Math.max(1,cinema.offsetHeight-stage.offsetHeight);
  window.scrollTo({top:top+target,behavior:reduced()?'instant':'smooth'});
}));
function applyMotion(){
  const isReduced=reduced();
  document.documentElement.classList.toggle('reduced-motion',isReduced);
  motionButton.setAttribute('aria-pressed',String(isReduced));
  motionButton.textContent=isReduced?'동작 줄이기 켜짐':'동작 줄이기';
  if(isReduced){hero.pause();copies.forEach(copy=>{copy.inert=false;copy.removeAttribute('aria-hidden');});}
  else{observedChapter=-1;scheduleScroll();}
}
motionButton.addEventListener('click',()=>{
  if(motionQuery.matches || navigator.connection?.saveData){motionButton.textContent='기기의 동작·데이터 절약 설정이 적용 중입니다';return;}
  manualReduced=!manualReduced;
  try{sessionStorage.setItem('hiob-reduced-motion',String(manualReduced));}catch{/* Session-only preference still works. */}
  applyMotion();
  cinema.scrollIntoView({behavior:'instant'});
});
motionQuery.addEventListener('change',applyMotion);

const playground=$('.tool-playground'),objects=[...document.querySelectorAll('.tool-object')];
let pointerFrame=0,pointer=null;
function paintPointer(){
  pointerFrame=0;if(!pointer || reduced() || !pointerQuery.matches)return;
  const boxes=objects.map(element=>({element,rect:element.getBoundingClientRect()}));
  for(const {element,rect} of boxes){
    const dx=pointer.x-(rect.left+rect.width/2),dy=pointer.y-(rect.top+rect.height/2);
    const distance=Math.hypot(dx,dy),force=clamp(1-distance/240)*19;
    element.style.setProperty('--push-x',`${distance?-dx/distance*force:0}px`);
    element.style.setProperty('--push-y',`${distance?-dy/distance*force:0}px`);
  }
}
playground.addEventListener('pointermove',event=>{
  if(reduced() || !pointerQuery.matches)return;
  pointer={x:event.clientX,y:event.clientY};if(!pointerFrame)pointerFrame=requestAnimationFrame(paintPointer);
},{passive:true});
playground.addEventListener('pointerleave',()=>{
  pointer=null;objects.forEach(element=>{element.style.setProperty('--push-x','0px');element.style.setProperty('--push-y','0px');});
});
objects.forEach(element=>{
  const explain=()=>$('#tool-detail').textContent=element.dataset.detail;
  element.addEventListener('pointerenter',explain);element.addEventListener('focus',explain);element.addEventListener('click',explain);
});
let returnFocus;
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
  returnFocus=button;$('#dialog-title').textContent=button.dataset.title;
  hero.pause();fullVideo.src=button.dataset.video;dialog.showModal();
  fullVideo.play().catch(()=>{/* Native controls stay visible if autoplay is blocked. */});
}));
$('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}
});
dialog.addEventListener('close',()=>{fullVideo.pause();fullVideo.removeAttribute('src');fullVideo.load();returnFocus?.focus();scheduleScroll();});
applyMotion();
// Preserve the public site's existing analytics identities and PageView deduplication.
// No customer profile or Studio project content is sent by the landing page.
if (!navigator.globalPrivacyControl) {
  const eventId=crypto.randomUUID();
  window.dataLayer=window.dataLayer||[];
  let analyticsStarted=false;
  const startAnalytics=()=>{
    if(analyticsStarted)return;analyticsStarted=true;
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    const append=(src)=>{const script=document.createElement('script');script.src=src;script.async=true;document.head.appendChild(script);};
    append('https://www.googletagmanager.com/gtm.js?id=GTM-P74PV945');
    if(!window.fbq){const fbq=function(){if(fbq.callMethod)fbq.callMethod.apply(fbq,arguments);else fbq.queue.push(arguments);};fbq.queue=[];fbq.loaded=true;fbq.version='2.0';window.fbq=fbq;window._fbq=fbq;}
    append('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init','1715625702927911');window.fbq('track','PageView',{}, {eventID:eventId});
    fetch('/api/track-view',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({eventSourceUrl:location.href,eventId,eventName:'PageView'}),keepalive:true}).catch(()=>{});
  };
  const timer=setTimeout(startAnalytics,3000);
  addEventListener('pointerdown',()=>{clearTimeout(timer);startAnalytics();},{once:true,passive:true});
  document.querySelectorAll('a[href^="https://studio.hi-ob.com/"]').forEach(link=>link.addEventListener('click',()=>window.dataLayer.push({event:'hiob_workspace_start',placement:link.closest('section')?.id || 'navigation'})));
}
