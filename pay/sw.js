var CACHE_NAME = 'hulpan-pay';
var urlsToCache = [
  '/pay/hulpan.html',
  '/pay/hulpan.js'
];

self.addEventListener('install', (event) => {
  console.log('[hulpan] ServiceWorker Install');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[hulpan] Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
