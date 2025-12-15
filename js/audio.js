const tracks = ['sounds/bg-1.mp3','sounds/bg-2.mp3','sounds/bg-3.mp3'];
let audio = new Audio();
let musicStarted = false;

function startMusic(){
  if(!state.music.enabled) return;
  audio.src = tracks[state.music.index] || '';
  audio.loop = false;
  audio.play().catch(()=>{});
}

audio.addEventListener('ended',()=>{
  state.music.index = (state.music.index+1)%tracks.length;
  saveState();
  startMusic();
});

function toggleMusic(){
  state.music.enabled = !state.music.enabled;
  saveState();
  if(state.music.enabled){
    startMusic();
  }else{
    audio.pause();
  }
}

function skipMusic(){
  state.music.index = (state.music.index+1)%tracks.length;
  saveState();
  startMusic();
}
