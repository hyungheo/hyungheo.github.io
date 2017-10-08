const CACHE_NAME = 'hulpan-pay';
const urlsToCache = [
  '/pay/pay.html',
  '/pay/kakao.js'
];

self.addEventListener('install', (event) => {
  self.registration.showNotification('ServiceWorker Installed', {
    actions: [{action: 'get', title: '[HUL] ServiceWorker Installed'}]
  });
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  self.registration.showNotification('ServiceWorker Fetch', {
    actions: [{action: 'get', title: '[HUL] ServiceWorker Fetch'}]
  });
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
