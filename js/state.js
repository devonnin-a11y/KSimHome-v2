const STORAGE_KEY='ksimhome_acnh_v1';
const defaultState={
 needs:{hunger:80,energy:80,social:80,fun:80,hygiene:80,quiet:80},
 mood:'fine',
 recipes:[],
 haircare:[],
 skills:{overall:0,nourish:0,selfCare:0,homestead:0,mind:0,story:0},
 reactions:{CAK:[],YAK:[]},
 music:{enabled:false,index:0}
};
let state;
function loadState(){
 try{const r=localStorage.getItem(STORAGE_KEY);return r?{...defaultState,...JSON.parse(r)}:structuredClone(defaultState);}catch{return structuredClone(defaultState)}
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
state=loadState();
