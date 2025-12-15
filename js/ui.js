const moodImages={
 fine:'images/kelly-fine.png',
 happy:'images/kelly-happy.png',
 playful:'images/kelly-playful.png',
 flirty:'images/kelly-flirty.png',
 inspired:'images/kelly-inspired.png',
 focused:'images/kelly-focused.png',
 sad:'images/kelly-sad.png',
 embarrassed:'images/kelly-embarrassed.png',
 uncomfortable:'images/kelly-uncomfortable.png',
 scared:'images/kelly-scared.png',
 aspired:'images/kelly-aspired.png'
};

function setSimImage(mood){
 document.getElementById('simImage').src=moodImages[mood]||moodImages.fine;
}

function openPanel(){
 casPanel.classList.add('open');
 overlay.classList.add('show');
}
function closePanel(){
 casPanel.classList.remove('open');
 overlay.classList.remove('show');
}

function renderEmotions(){
 tabContent.innerHTML='<div class="emotion-grid">'+
 Object.keys(moodImages).map(m=>`<button data-mood="${m}">${m}</button>`).join('')+
 '</div>';
 tabContent.querySelectorAll('button').forEach(b=>{
  b.onclick=()=>{
   state.mood=b.dataset.mood;
   setSimImage(state.mood);
   saveState(); updateMood();
  };
 });
}

function renderRecipes(filter){
 const list=state.recipes.filter(r=>!filter||r.category.toLowerCase().includes(filter));
 tabContent.innerHTML=`
 <input id="recipeName" placeholder="Recipe Name">
 <input id="recipeCategory" placeholder="Category">
 <textarea id="recipeNotes" placeholder="Notes"></textarea>
 <button id="addRecipe">Add</button>
 <ul>${list.map(r=>`<li>${r.name}</li>`).join('')}</ul>`;
 document.getElementById('addRecipe').onclick=()=>{
  state.recipes.push({
   name:recipeName.value,
   category:recipeCategory.value,
   notes:recipeNotes.value
  });
  saveState(); renderRecipes(filter);
 };
}

function renderTab(tab){
 if(tab==='emotions') renderEmotions();
 if(tab==='recipes') renderRecipes('');
 if(tab==='baking') renderRecipes('baking');
}

function updateMood(){
 const avg=Object.values(state.needs).reduce((a,b)=>a+b,0)/6;
 moodText.textContent=avg>70?'good':avg>40?'neutral':'low';
}

function bindUI(){
 simImage.onclick=openPanel;
 overlay.onclick=closePanel;
 document.querySelectorAll('.tabs button').forEach(b=>{
  b.onclick=()=>renderTab(b.dataset.tab);
 });
 musicToggle.onclick=()=>{interacted=true;toggleMusic();};
 musicSkip.onclick=()=>{interacted=true;skipMusic();};
 setSimImage(state.mood);
}
