const CACHE_NAME = 'hulpan-pay';
const urlsToCache = [
  '/pay/pay.html',
  '/pay/kakao.js'
];

const swIcons = [{
  src: "icon/lowres.webp",
  sizes: "48x48",
  type: "image/webp"
}];

const swEnabledMethods = [
  "https://hulpan.com/"
];

const swPayName = "HULPAN_PAY";

const instrumentData = {
  name: swPayName,
  enabledMethods: swEnabledMethods_sw,
  icons: wIcons
};

instrumentParam = { 
  instrumentKey,
  instrumentData 
};

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] install event');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
    })
  );
  event.waitUntil(
    self.registration.paymentManager.paymentInstruments.set()
  );
});  

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] fetch event');
  event.respondWith(
    caches.match(event.request).then((response) => {
      self.registration.showNotification('ServiceWorker Fetch', {
        actions: [{action: 'get', title: '[HUL] ServiceWorker Fetch'}]
      });
      if (response) {
        return response;
      }
      return fetch(event.request);
    });
  );  
});
