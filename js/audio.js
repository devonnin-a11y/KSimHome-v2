const tracks=['sounds/bg-1.mp3','sounds/bg-2.mp3','sounds/bg-3.mp3'];
let music=new Audio();let interacted=false;
music.onended=()=>{state.music.index=(state.music.index+1)%tracks.length;saveState();startMusic();};
function startMusic(){if(!state.music.enabled||!interacted)return;music.src=tracks[state.music.index]||'';music.play().catch(()=>{});}
function toggleMusic(){interacted=true;state.music.enabled=!state.music.enabled;saveState();state.music.enabled?startMusic():music.pause();}
function skipMusic(){interacted=true;state.music.index=(state.music.index+1)%tracks.length;saveState();startMusic();}
function playSFX(src){const a=new Audio(src);a.play().catch(()=>{});}
