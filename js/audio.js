const tracks=['sounds/bg-1.mp3','sounds/bg-2.mp3','sounds/bg-3.mp3'];
let audio=new Audio();
let interacted=false;
function playMusic(){
 if(!state.music.enabled)return;
 audio.src=tracks[state.music.index]||'';
 audio.play().catch(()=>{});
}
audio.onended=()=>{
 state.music.index=(state.music.index+1)%tracks.length;
 saveState(); playMusic();
};
function toggleMusic(){
 state.music.enabled=!state.music.enabled; saveState();
 if(state.music.enabled) playMusic(); else audio.pause();
}
function skipMusic(){
 state.music.index=(state.music.index+1)%tracks.length;
 saveState(); playMusic();
}
