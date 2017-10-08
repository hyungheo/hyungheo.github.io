var CACHE_NAME = 'hulpan-pay';
var urlsToCache = [
  '/pay/hulpan.html',
  '/pay/hulpan.js'
];

self.addEventListener('install', (event) => {
  self.alert('[hulpan] ServiceWorker Install');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        self.alert('[hulpan] Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  self.alert('[hulpan] fetch');
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          self.alert('[hulpan] fetch: Cache hit!');
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
