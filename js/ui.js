function openPanel(){
  document.getElementById('casPanel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}
function closePanel(){
  document.getElementById('casPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function updateMood(){
  const vals = Object.values(state.needs);
  const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
  let tier = 'good';
  if(avg<40) tier='low';
  else if(avg<70) tier='neutral';
  document.getElementById('moodText').textContent = tier;
}

function bindUI(){
  document.getElementById('simImage').addEventListener('click',openPanel);
  document.getElementById('overlay').addEventListener('click',closePanel);
  document.getElementById('musicToggle').addEventListener('click',()=>{
    if(!musicStarted){ musicStarted=true; }
    toggleMusic();
  });
  document.getElementById('musicSkip').addEventListener('click',()=>{
    if(!musicStarted){ musicStarted=true; }
    skipMusic();
  });
}
