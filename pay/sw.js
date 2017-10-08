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
  event.waitUntil(self.registration.paymentManager.paymentInstruments.set({
    instrumentKey,
    {
      name: "HULPAN_PAY",
      enabledMethods: ["https://hulpan.com/"],
      icons: [{
        src: "icon/lowres.webp",
        sizes: "48x48",
        type: "image/webp"
      }]
    });
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event');
  self.registration.showNotification('ServiceWorker Fetch', {
    actions: [{action: 'get', title: '[HUL] ServiceWorker Fetch'}]
  });
  var result = self.registration.paymentManager;
  console.log("[ServiceWorker] " + JSON.stringify(result));
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
