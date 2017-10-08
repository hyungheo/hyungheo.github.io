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
const instrumentKey = "c8126178-3bba-4d09-8f00-0771bcfd3b11";

const instrumentData = {
  name: swPayName,
  enabledMethods: swEnabledMethods,
  icons: swIcons
};

const pm = self.registration.paymentManager;

instrumentParam = { 
  instrumentKey,
  instrumentData 
};


function showNoti(msg) {
  self.registration.showNotification('ServiceWorker Fetch', {
    actions: [{
        action: 'get', 
        title: '[HUL]' + msg
    }]
  });
}

self.addEventListener('install', (event) => {
  console.log("[SW Install] " + JSON.stringify(pm))
  console.log('[ServiceWorker] install event');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
    })
  );
  event.waitUntil(
    pm.paymentInstruments.set(instrumentParam)
  );
});

self.addEventListener('fetch', (event) => {
  showNoti("TEST SHOW");
  console.log('[ServiceWorker] fetch event');
  console.log(JSON.stringify(pm));
  //event.respondWith();  
});

/*
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);    
    });
*/
