const moodImages={happy:'images/kelly-happy.png',playful:'images/kelly-playful.png',sad:'images/kelly-sad.png',inspired:'images/kelly-inspired.png',focused:'images/kelly-focused.png'};

function setSimImage(m){simImage.src=moodImages[m]||'images/kelly-happy.png';}

function openPanel(){casPanel.classList.add('open');overlay.classList.add('show');}
function closePanel(){casPanel.classList.remove('open');overlay.classList.remove('show');}

function gainXP(skill,amt){
 state.skills[skill]+=amt;
 state.skills.overall+=amt;
 saveState();
 const el=document.createElement('div');
 el.className='xp-float';
 el.textContent=`+${amt} XP (${skill})`;
 xpFloatContainer.appendChild(el);
 setTimeout(()=>el.remove(),2000);
}

function updateMoodUI(){
 const avg=Object.values(state.needs).reduce((a,b)=>a+b,0)/6;
 moodText.textContent=avg>70?'Great':avg>40?'Okay':'Low';
 moodGauge.style.width=Math.max(10,avg)+'%';
 plumbob.style.background=avg>70?'#6ede8a':avg>40?'#f4d35e':'#ef476f';
}

function renderEmotions(){
 tabContent.innerHTML=['happy','playful','sad','inspired','focused'].map(m=>`<button class="primary" data-mood="${m}">${m}</button>`).join('');
 document.querySelectorAll('[data-mood]').forEach(b=>b.onclick=()=>{
  state.mood=b.dataset.mood;
  setSimImage(state.mood);
  playMoodSound(state.mood);
  gainXP('mind',10);
  updateMoodUI();
 });
}

function renderNeeds(){
 tabContent.innerHTML=Object.entries(state.needs).map(([k,v])=>`<div class="card">${k}<div class="gauge"><div style="width:${v}%"></div></div></div>`).join('');
}

function renderRecipes(){
 tabContent.innerHTML=`<div class="card">
 <input id="rName" placeholder="Recipe name">
 <input id="rCat" placeholder="Category">
 <textarea id="rNotes" placeholder="Notes"></textarea>
 <button class="primary" id="addR">Add / Update</button></div>`+
 state.recipes.map((r,i)=>`<div class="card"><b>${r.name}</b><br>${r.notes}<button onclick="editRecipe(${i})">Edit</button></div>`).join('');
 document.getElementById('addR').onclick=()=>{
  state.recipes.push({name:rName.value,cat:rCat.value,notes:rNotes.value});
  gainXP('nourish',15);saveState();renderRecipes();
 };
}

function editRecipe(i){
 const r=state.recipes[i];
 rName.value=r.name;rCat.value=r.cat;rNotes.value=r.notes;
}

function renderCalendar(){
 if(state.calendar.todayTasks.length===0){
  const tasks=['Vacuum','Dishes','Laundry','Bathroom','Kitchen','Living Room','Bedroom'];
  state.calendar.todayTasks=randomSample(tasks,2);
 }
 tabContent.innerHTML=state.calendar.todayTasks.map((t,i)=>`<div class="card">${t}<button onclick="completeTask(${i})">Completed</button></div>`).join('');
 saveState();
}

function completeTask(i){
 gainXP('homestead',20);
 state.calendar.todayTasks.splice(i,1);
 renderCalendar();
}

function renderReactions(){
 tabContent.innerHTML=`<div class="card">
 <button class="primary" onclick="logReaction('CAK')">CAK (Cursed at Kids)</button>
 <button class="primary" onclick="logReaction('YAK')">YAK (Yelled at Kids)</button></div>`;
}

function logReaction(t){
 state.reactions[t].push(Date.now());
 gainXP('mind',5);
 updateMoodUI();
 saveState();
}

function renderSkills(){
 tabContent.innerHTML=Object.entries(state.skills).map(([k,v])=>{
  const lvl=Math.floor(Math.sqrt(v/10));
  return `<div class="card">${k}: Level ${lvl} (${v} XP)</div>`;
 }).join('');
}

function renderTab(t){
 if(t==='emotions')renderEmotions();
 if(t==='needs')renderNeeds();
 if(t==='recipes')renderRecipes();
 if(t==='calendar')renderCalendar();
 if(t==='reactions')renderReactions();
 if(t==='skills')renderSkills();
}

function bindUI(){
 simImage.onclick=openPanel;
 overlay.onclick=closePanel;
 document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>renderTab(b.dataset.tab));
 musicToggle.onclick=toggleMusic;
 musicSkip.onclick=skipMusic;
 setSimImage(state.mood);
 updateMoodUI();
}

function randomSample(arr,n){return arr.sort(()=>.5-Math.random()).slice(0,n);}
