document.addEventListener('DOMContentLoaded',()=>{
 bindUI();updateMood();
 setInterval(()=>{
  Object.keys(state.needs).forEach(k=>state.needs[k]=Math.max(0,state.needs[k]-1));
  updateMood();saveState();
 },60000);
});
