const CACHE='ksim-notifs-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./css/style.css','./js/app.js','./js/ui.js','./js/state.js','./js/audio.js'])))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>{})))});
