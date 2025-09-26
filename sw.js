const CACHE_NAME = 'photo-notes-v1';
const FILES_TO_CACHE = ['/', '/index.html', '/styles.css', '/app.js', '/manifest.json'];


self.addEventListener('install', (e) => {
self.skipWaiting();
e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
});


self.addEventListener('activate', (e) => {
e.waitUntil(
caches.keys().then(keys => Promise.all(
keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
))
);
});


self.addEventListener('fetch', (e) => {
if (e.request.method !== 'GET') return;
e.respondWith(
caches.match(e.request).then(resp => resp || fetch(e.request).then(fetchResp => {
return fetchResp;
}).catch(() => caches.match('/')))
);
});