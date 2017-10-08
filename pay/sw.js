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
  self.registration.showNotification('ServiceWorker ' + msg, {
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
});

self.addEventListener('fetch', (event) => {
  showNoti("TEST SHOW");
  console.log('[ServiceWorker] fetch event');
  console.log(JSON.stringify(pm));
  //event.respondWith();  
});

self.addEventListener('paymentrequest', (e) => {
  showNoti("TEST PAYMENT_REQUEST");
  e.respondWith(new Promise(function(resolve, reject) {
    self.addEventListener('message', listener = function(e) {
      self.removeEventListener('message', listener);
      if (e.data.hasOwnProperty('name')) {
        reject(e.data);
      } else {
        resolve(e.data);
      }
    });

    e.openWindow("https://hyungheo.github.io/pay")
    .then((windowClient) => {
      windowClient.postMessage(e.data);
    })
    .catch((err) => {
      reject(err);
    });
  }));
});

/*
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);    
    });
*/
