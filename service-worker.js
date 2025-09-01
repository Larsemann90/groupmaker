const CACHE_NAME='groupmaker-pro-v1'; const ASSETS=['/','/index.html','/manifest.webmanifest','/service-worker.js','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE_NAME?null:caches.delete(k))))) });
self.addEventListener('fetch', e=>{ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{ const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)); return resp; }).catch(()=>{ if(e.request.mode==='navigate') return caches.match('/index.html'); }))); });
