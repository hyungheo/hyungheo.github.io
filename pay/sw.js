const CACHE_NAME = 'hulpan-pay';
const urlsToCache = [
  '/pay/pay.html',
  '/pay/kakao.js'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] install event');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event');
  self.registration.showNotification('ServiceWorker Fetch', {
    actions: [{action: 'get', title: '[HUL] ServiceWorker Fetch'}]
  });
  var result = self.registration.paymentManager.requestPermission();
    self.registration.showNotification(result, {
    actions: [{action: 'get', title: '[HUL]' + result}]
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
