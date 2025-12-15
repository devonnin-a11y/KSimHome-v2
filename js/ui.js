const moodImages={fine:'images/kelly-fine.png',happy:'images/kelly-happy.png',playful:'images/kelly-playful.png',flirty:'images/kelly-flirty.png',inspired:'images/kelly-inspired.png',focused:'images/kelly-focused.png',sad:'images/kelly-sad.png',embarrassed:'images/kelly-embarrassed.png',uncomfortable:'images/kelly-uncomfortable.png',scared:'images/kelly-scared.png',aspired:'images/kelly-aspired.png'};

function setSimImage(m){simImage.src=moodImages[m]||moodImages.fine;}

function openPanel(){casPanel.classList.add('open');overlay.classList.add('show');}
function closePanel(){casPanel.classList.remove('open');overlay.classList.remove('show');}

function gainXP(skill,amount){
 state.skills[skill]+=amount;
 state.skills.overall+=amount;
 saveState();
}

function renderEmotions(){
 tabContent.innerHTML=Object.keys(moodImages).map(m=>`<button data-mood="${m}">${m}</button>`).join('');
 document.querySelectorAll('[data-mood]').forEach(b=>b.onclick=()=>{
  state.mood=b.dataset.mood;setSimImage(state.mood);gainXP('mind',5);updateMood();
 });
}

function renderNeeds(){
 tabContent.innerHTML=Object.entries(state.needs).map(([k,v])=>
  `<div class="need-row">${k}<div class="gauge"><div style="width:${v}%"></div></div></div>`
 ).join('');
}

function renderSkills(){
 tabContent.innerHTML=Object.entries(state.skills).map(([k,v])=>{
  const lvl=Math.floor(Math.sqrt(v/10));
  return `<div class="skill">${k}: Lv ${lvl} (${v} XP)</div>`;
 }).join('');
}

function renderTab(t){
 if(t==='emotions')renderEmotions();
 if(t==='needs')renderNeeds();
 if(t==='skills')renderSkills();
}

function updateMood(){
 const avg=Object.values(state.needs).reduce((a,b)=>a+b,0)/6;
 moodText.textContent=avg>70?'Good':avg>40?'Okay':'Low';
 moodGauge.style.width=Math.max(10,avg)+'%';
}

function bindUI(){
 simImage.onclick=openPanel;
 overlay.onclick=closePanel;
 document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>renderTab(b.dataset.tab));
 musicToggle.onclick=toggleMusic;
 musicSkip.onclick=skipMusic;
 setSimImage(state.mood);
}
