const tracks=['sounds/bg-1.mp3','sounds/bg-2.mp3','sounds/bg-3.mp3'];
const moodSounds={happy:'sounds/happy.mp3',sad:'sounds/sad.mp3',inspired:'sounds/inspired.mp3'};
let audio=new Audio();
let sfx=new Audio();
function playMusic(){if(!state.music.enabled)return;audio.src=tracks[state.music.index]||'';audio.play().catch(()=>{});}
audio.onended=()=>{state.music.index=(state.music.index+1)%tracks.length;saveState();playMusic();};
function toggleMusic(){state.music.enabled=!state.music.enabled;saveState();state.music.enabled?playMusic():audio.pause();}
function skipMusic(){state.music.index=(state.music.index+1)%tracks.length;saveState();playMusic();}
function playMoodSound(m){if(moodSounds[m]){sfx.src=moodSounds[m];sfx.play().catch(()=>{});}}
