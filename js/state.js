const STORAGE_KEY='ksimhome_notifs_v1';
const defaultState={
 needs:{hunger:80,energy:80,social:80,fun:80,hygiene:80,quiet:80},
 mood:'good',
 recipes:[],
 haircare:[],
 calendar:{today:[],last:0},
 skills:{
  overall:0,
  nourish:0,
  selfCare:0,
  homestead:0,
  mind:0,
  story:0,
  cooking:0,
  baking:0,
  cleaning:0
 },
 reactions:{CAK:[],YAK:[]},
 music:{enabled:false,index:0},
 notifications:{enabled:false,hydration:true,meals:true,cleaning:true},
 lastActive:Date.now()
};
let state;
function loadState(){try{const r=localStorage.getItem(STORAGE_KEY);return r?{...defaultState,...JSON.parse(r)}:structuredClone(defaultState);}catch{return structuredClone(defaultState);}}
function saveState(){state.lastActive=Date.now();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
state=loadState();
