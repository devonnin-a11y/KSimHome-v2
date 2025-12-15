document.addEventListener('DOMContentLoaded',()=>{
 bindUI();
 // in-app notification scheduler (while open)
 setInterval(()=>{
  if(state.notifications.enabled && Notification.permission==='granted'){
    if(state.notifications.hydration){new Notification('Hydration Check','Time for a sip 💧');}
  }
 },3600000);
 setInterval(()=>{
  Object.keys(state.needs).forEach(k=>state.needs[k]=Math.max(0,state.needs[k]-1));
  moodFromNeeds();saveState();
 },60000);
});
