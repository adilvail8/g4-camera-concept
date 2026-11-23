(()=>{
const WA='77075947244';
const $=s=>document.querySelector(s);
const waLink=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waLink(a.dataset.wa);a.target='_blank';a.rel='noopener'});

const MODELS=[
  {id:'S5',name:'Blackview S5',mp:12,img:'../img/s5.jpg',warr:'Гарантия 1 год',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-s5-12mp-rasshirenie-3072x2048-167834479/',
   list:['Поворотная уличная, обзор 355°','3072×2048, ночной режим, ИК до 35 м','4G LTE и Ethernet, питание от сети и солнечных панелей','Wi-Fi не используется, защита IP66']},
  {id:'T1',name:'Blackview T1',mp:15,img:'../img/t1.jpg',warr:'Гарантия 1 год',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-t1-15mp-rasshirenie-3840h2144-167910332/',
   list:['Уличная, обзор 360°','3840×2144, ночной режим, ИК до 35 м','4G LTE и Wi-Fi 2.4 ГГц, приложение HiEasy','Аккумулятор и две солнечные панели в комплекте, IP66']},
  {id:'T5',name:'Blackview T5',mp:20,img:'../img/t5.jpg',warr:'Гарантия 2 года',
   kaspi:'https://kaspi.kz/shop/p/blackview-kamera-videonabljudenija-t5-20mp-rasshirenie-5200x2320-188636907/',
   list:['4 объектива (4 камеры в 1), поворот 360°','5200×2320, ночной режим, ИК до 40 м','4G LTE, датчики движения, звука, огня и дыма','Аккумулятор и солнечная панель, microSD 32 ГБ, IP66']}
];

$('#bList').innerHTML=MODELS.map((m,i)=>`<article class="row"><div class="row-img"><img src="${m.img}" alt="${m.name}, изображение иллюстративное" ${i?'loading="lazy"':''}><span class="row-num">${i+1}</span></div><div class="row-mid"><div class="row-head"><h3>${m.name}</h3><p class="row-mp"><b>${m.mp}</b>мегапикселей</p></div><ul class="dash">${m.list.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="row-end"><span class="warr">${m.warr}</span><button class="btn btn-ink" type="button" data-pick="${m.id}">Оставить заявку</button><a class="btn btn-kaspi" href="${m.kaspi}" target="_blank" rel="noopener">Купить на Kaspi</a></div></article>`).join('');

const opts='<option value="">Помогите выбрать</option>'+MODELS.map(m=>`<option value="${m.id}">${m.name} · ${m.mp} Мп</option>`).join('');
$('#formModel').innerHTML=opts;$('#formModel2').innerHTML=opts;

function submitLead(form,errEl){
  const name=form.name.value.trim(),digits=form.phone.value.replace(/\D/g,'');
  if(name.length<2){errEl.textContent='Введите имя.';form.name.focus();return}
  if(digits.length<10){errEl.textContent='Введите номер телефона полностью.';form.phone.focus();return}
  errEl.textContent='';
  const mdl=form.model.value?MODELS.find(m=>m.id===form.model.value).name:'нужна помощь с выбором';
  window.open(waLink(`Здравствуйте! Заявка с сайта 4G Камера.\nИмя: ${name}\nТелефон: ${form.phone.value.trim()}\nКамера: ${mdl}\nПрошу связаться.`),'_blank','noopener');
  form.reset();closeModal();
}
$('#leadForm').addEventListener('submit',e=>{e.preventDefault();submitLead(e.target,$('#formErr'))});
$('#leadForm2').addEventListener('submit',e=>{e.preventDefault();submitLead(e.target,$('#formErr2'))});

const modal=$('#modal');let last=null;
function openModal(id){last=document.activeElement;if(id)$('#formModel2').value=id;modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input').focus(),50)}
function closeModal(){modal.hidden=true;document.body.classList.remove('modal-open');if(last&&last.focus)last.focus()}
document.querySelectorAll('[data-lead]').forEach(b=>b.addEventListener('click',()=>openModal('')));
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.pick)));
modal.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});
})();
