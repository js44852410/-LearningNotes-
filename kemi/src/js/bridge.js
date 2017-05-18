/**
 * Created by zxh on 2017/3/31.
 */

export function __KMBirdge(fnName, shareObj = {}) {
  const UA = navigator.userAgent;

  if (UA.indexOf("__kemiBear_iOS") !== -1) {
    // 这段代码是固定的，必须要放到js中
    const setupWebViewJavascriptBridge = function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    };

    setupWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(fnName, shareObj);
    });
  } else if (UA.indexOf("__kemiBear_Android") !== -1) {
    JSBridge[fnName](JSON.stringify(shareObj));
  }
};