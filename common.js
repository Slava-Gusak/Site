// Общий скрипт всех страниц slava-gusak.ru: меню и запоминание языка.
// Подключается с defer — выполняется после скрипта страницы, но до показа.
function toggleMenu(){
  const m=document.getElementById('mainMenu'),o=document.getElementById('menuOverlay'),b=document.getElementById('menuBtn');
  if(!m) return;
  const open=!m.classList.contains('active');
  m.classList.toggle('active',open);
  if(o) o.classList.toggle('active',open);
  if(b){ b.classList.toggle('open',open); b.setAttribute('aria-expanded',open); }
}
(function(){
  // Escape закрывает меню
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ const m=document.getElementById('mainMenu'); if(m&&m.classList.contains('active')) toggleMenu(); }
  });

  // Язык: выбор запоминается и переносится на другие страницы.
  // У каждой страницы своя switchLanguage (на музыке — с анимацией), поэтому её не заменяем, а оборачиваем.
  const KEY='lang';
  const orig=window.switchLanguage;
  if(typeof orig!=='function') return;
  const cur=()=>{ try{ return currentLang; }catch(_){ return 'ru'; } };
  window.switchLanguage=function(){
    const next=cur()==='ru'?'en':'ru';
    const r=orig.apply(this,arguments);
    try{ localStorage.setItem(KEY,next); }catch(_){}
    document.documentElement.lang=next;
    return r;
  };
  let saved=null; try{ saved=localStorage.getItem(KEY); }catch(_){}
  if(saved==='en' && cur()!=='en'){ orig(); document.documentElement.lang='en'; }
})();
