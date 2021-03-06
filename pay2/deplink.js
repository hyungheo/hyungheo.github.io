(function (window) { 
  const HOST = window.location.hostname; 
  const PORT = window.location.port; 
  const TARGET_URL = `//${HOST}:${PORT}`; 
  function sendDeepLink() { 
    const intentURI = [ 
      `intent:${TARGET_URL}/pay/pay.html#Intent`, 
      'scheme=https', 
      `S.browser_fallback_url=${TARGET_URL}/pay/pay.html`, 
      'end', 
    ].join(';'); 
    window.location.href = intentURI; 
  } 
  
  function isLatestWebView() { 
   return /Version\/[.0-9]* Chrome\/[.0-9]*/.test(navigator.userAgent); 
  } 
  function isAndroidDevice() { 
    return /Android/.test(navigator.userAgent); 
  }
  function isSamsungBrowser() {
    return /SamsungBrowser/.test(navigator.userAgent);
  } 
  
  function isChrome() { 
    return /Chrome/.test(navigator.userAgent); 
  } 
  
  function goToPayment() { 
    window.location.href = `${TARGET_URL}/pay/pay.html`;
  } 
  
  const deeplink = { 
    createBrowser() { 
      if (isAndroidDevice()) {
        if (isLatestWebView() || (!isSamsungBrowser() && !isChrome())) { 
          sendDeepLink(); 
        } else { 
          goToPayment(); 
        } 
      } else { 
        goToPayment(); 
      } 
    }, 
  }; 
  window.deeplink = deeplink;
}(window));
