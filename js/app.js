document.addEventListener('DOMContentLoaded',()=>{
 bindUI();
 setInterval(()=>{
  Object.keys(state.needs).forEach(k=>state.needs[k]=Math.max(0,state.needs[k]-1));
  updateMoodUI();
  saveState();
 },60000);
});
