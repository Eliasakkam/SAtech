const CACHE = 'saitek-v2';
const ASSETS = [
  './','./index.html','./about.html','./projects.html','./contact.html',
  './css/style.css','./js/script.js','./assets/logo.jpg','./manifest.json'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
