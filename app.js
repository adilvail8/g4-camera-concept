(()=>{
const WA='77075947244';
const $=s=>document.querySelector(s);
const waLink=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waLink(a.dataset.wa);a.target='_blank';a.rel='noopener'});

const MODELS=[
  {id:'S5',name:'Blackview S5',mp:12,img:'img/s5.jpg',warr:'Гарантия 1 год',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-s5-12mp-rasshirenie-3072x2048-167834479/',
   note:'Работает по 4G. Wi-Fi у этой модели не используется.',
   list:['Поворотная уличная камера, обзор 355°','Разрешение 3072×2048, ночной режим, ИК-подсветка до 35 м','4G LTE и Ethernet, запись на карту памяти','Питание от сети и солнечных панелей, защита IP66','Датчик движения'],
   spec:{'Разрешение':'3072×2048','Угол обзора':'355°','ИК-подсветка':'до 35 м','Связь':'4G LTE, Ethernet','Питание':'сеть, солнечные панели','Защита':'IP66','Гарантия':'1 год'}},
  {id:'T1',name:'Blackview T1',mp:15,img:'img/t1.jpg',warr:'Гарантия 1 год',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-t1-15mp-rasshirenie-3840h2144-167910332/',
   note:'',
   list:['Уличная камера, обзор 360°','Разрешение 3840×2144, ночной режим, ИК-подсветка до 35 м','4G LTE и Wi-Fi 2.4 ГГц, приложение HiEasy','Встроенный аккумулятор, в комплекте две солнечные панели','Защита IP66, датчик движения, карта памяти в комплекте'],
   spec:{'Разрешение':'3840×2144','Угол обзора':'360°','ИК-подсветка':'до 35 м','Связь':'4G LTE, Wi-Fi 2.4 ГГц','Питание':'аккумулятор, 2 солнечные панели','Защита':'IP66','Гарантия':'1 год'}},
  {id:'T5',name:'Blackview T5',mp:20,img:'img/t5.jpg',warr:'Гарантия 2 года',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-t5-20mp-rasshirenie-5200x2320-188636907/',
   note:'',
   list:['4 объектива (4 камеры в 1), поворот 360°','Разрешение 5200×2320, ночной режим, ИК-подсветка до 40 м','4G LTE, датчики движения, звука, освещённости, огня и дыма','Аккумулятор и солнечная панель, защита IP66','В комплекте карта памяти microSD 32 ГБ'],
   spec:{'Разрешение':'5200×2320','Угол обзора':'360°','ИК-подсветка':'до 40 м','Связь':'4G LTE','Питание':'аккумулятор, солнечная панель','Защита':'IP66','Гарантия':'2 года'}}
];
const SCENES=[
  {img:'img/scene-dacha.jpg',tag:'Дача',t:'Дача и загородный дом',p:'Нет интернета и электричества: хватает SIM-карты и солнца.'},
  {img:'img/scene-build.jpg',tag:'Стройка',t:'Стройка',p:'Следите за материалами и техникой, пока нет постоянного питания.'},
  {img:'img/scene-farm.jpg',tag:'Ферма',t:'Ферма и пастбище',p:'Обзор двора и построек там, где нет проводной сети.'},
  {img:'img/scene-garage.jpg',tag:'Гараж',t:'Гараж и парковка',p:'Камера на стене без прокладки кабеля и розетки.'}
];

/* ---- модели: три камеры в ряд ---- */
$('#mdlGrid').innerHTML=MODELS.map((m,i)=>`<article class="mcard"><div class="mcard-img"><img src="${m.img}" alt="${m.name}, изображение иллюстративное" ${i?'loading="lazy"':''}><span class="num">${i+1}</span></div><div class="mcard-body"><div class="mcard-head"><h3>${m.name}</h3><p class="mdl-mp"><b>${m.mp}</b><span>Мп</span></p></div><ul class="dash">${m.list.map(x=>`<li>${x}</li>`).join('')}</ul>${m.note?`<p class="mdl-warn">${m.note}</p>`:''}<span class="warr">${m.warr}</span><div class="mcard-btns"><button class="btn btn-ink" type="button" data-pick="${m.id}">Оставить заявку</button><a class="btn btn-kaspi" href="${m.kaspi}" target="_blank" rel="noopener">Купить на Kaspi</a></div></div></article>`).join('');
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.pick)));

/* ---- сцены ---- */
$('#whereCards').innerHTML=SCENES.map(s=>`<article class="card"><div class="card-img"><img src="${s.img}" alt="${s.t}" loading="lazy"><span class="tag">${s.tag}</span></div><div class="card-body"><h3>${s.t}</h3><p>${s.p}</p></div></article>`).join('');

/* ---- Kaspi ---- */
$('#kaspiList').innerHTML=MODELS.map(m=>`<li><a href="${m.kaspi}" target="_blank" rel="noopener"><span><b>${m.name}</b><small>${m.mp} Мп · ${m.warr.toLowerCase()}</small></span><i>Открыть на Kaspi ›</i></a></li>`).join('');

/* ---- форма заявки ---- */
const opts='<option value="">Помогите выбрать</option>'+MODELS.map(m=>`<option value="${m.id}">${m.name} · ${m.mp} Мп</option>`).join('');
$('#formModel').innerHTML=opts;$('#formModel2').innerHTML=opts;
function submitLead(form,errEl){
  const name=form.name.value.trim(),digits=form.phone.value.replace(/\D/g,'');
  if(name.length<2){errEl.textContent='Введите имя.';form.name.focus();return}
  if(digits.length<10){errEl.textContent='Введите номер телефона полностью.';form.phone.focus();return}
  errEl.textContent='';
  const mdl=form.model.value?MODELS.find(m=>m.id===form.model.value).name:'нужна помощь с выбором';
  const txt=`Здравствуйте! Заявка с сайта 4G Камера.\nИмя: ${name}\nТелефон: ${form.phone.value.trim()}\nКамера: ${mdl}\nПрошу связаться.`;
  window.open(waLink(txt),'_blank','noopener');
  form.reset();closeModal();
}
$('#leadForm').addEventListener('submit',e=>{e.preventDefault();submitLead(e.target,$('#formErr'))});
$('#leadForm2').addEventListener('submit',e=>{e.preventDefault();submitLead(e.target,$('#formErr2'))});

/* ---- модальное окно ---- */
const modal=$('#modal');let lastFocus=null;
function openModal(id){
  lastFocus=document.activeElement;if(id)$('#formModel2').value=id;
  modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input').focus(),50);
}
function closeModal(){modal.hidden=true;document.body.classList.remove('modal-open');if(lastFocus&&lastFocus.focus)lastFocus.focus()}
document.querySelectorAll('[data-lead]').forEach(b=>b.addEventListener('click',()=>{closeMenu();openModal('')}));
modal.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!modal.hidden)closeModal();else closeMenu()}});

/* ---- меню ---- */

/* ---- телефон с видом с камеры ---- */
(function(){
  const CH=[{img:'img/scene-dacha.jpg',t:'Дача'},{img:'img/scene-build.jpg',t:'Стройка'},{img:'img/scene-farm.jpg',t:'Ферма'},{img:'img/scene-garage.jpg',t:'Гараж'}];
  const img=$('#phImg'),feed=$('#phFeed');let cur=0,px=0,py=0,timer=null;
  const chs=$('#phChs');chs.innerHTML=CH.map((c,i)=>`<button type="button" data-i="${i}" aria-label="Камера ${i+1}"><img src="${c.img}" alt="" loading="lazy"><span>${i+1}</span></button>`).join('');
  const setT=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');$('#phTime').textContent=d.getHours()+':'+p(d.getMinutes());$('#phClock').textContent=`${p(d.getDate())}.${p(d.getMonth()+1)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`};
  setT();setInterval(setT,1000);
  function pan(){img.style.transform=`scale(1.28) translate(${px}%,${py}%)`}
  function go(i,user){
    cur=i;px=0;py=0;img.classList.add('fade');
    setTimeout(()=>{img.src=CH[i].img;pan();img.classList.remove('fade')},180);
    $('#phCam').textContent='CAM '+(i+1);$('#phTitle').textContent=CH[i].t;
    chs.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('on',k===i));
    if(user){clearInterval(timer);timer=setInterval(()=>go((cur+1)%4),6000)}
  }
  chs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i,true)});
  document.querySelectorAll('.dpad button').forEach(b=>b.addEventListener('click',()=>{const d=b.dataset.d;if(d==='left')px=Math.min(px+4,8);if(d==='right')px=Math.max(px-4,-8);if(d==='up')py=Math.min(py+4,8);if(d==='down')py=Math.max(py-4,-8);pan();clearInterval(timer)}));
  $('#phTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$('#phTabs').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));const m=b.dataset.m;feed.classList.toggle('arch',m==='arch');$('#phMode').textContent=m==='live'?'LIVE':m==='arch'?'АРХИВ':'СОБЫТИЯ'});
  go(0);timer=setInterval(()=>go((cur+1)%4),6000);
})();

const burger=$('#burger'),nav=$('#nav');
function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}
burger.onclick=()=>{const o=!nav.classList.contains('open');nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.classList.toggle('menu-open',o)};
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

})();
