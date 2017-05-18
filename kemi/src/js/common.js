var __Location = window.location.href,
  __APIDIR = "",
  __PREAPIDIR = "",
  __IMGURL = "",
  __DIRPATH = "";

if (__Location.indexOf("http://h5.kmbear.com") >= 0) {
  __APIDIR = "http://app.kmbear.com/";
  __PREAPIDIR = 'http://admin.kmbear.com/';
  __IMGURL = 'http://image.kmbear.com/';
  __DIRPATH = 'http://h5.kmbear.com/src/weex.html#/';
  /*} else if(true){*/
} else if (__Location.indexOf("http://preh5.kmbear.com") >= 0) {
  __APIDIR = "http://preapp.kmbear.com/";
  __PREAPIDIR = 'http://preadmin.kmbear.com/';
  __IMGURL = 'http://preimage.kmbear.com/';
  __DIRPATH = 'http://preh5.kmbear.com/src/weex.html#/';
}/* else {
 __APIDIR = "http://10.195.13.117:5088/"
 __PREAPIDIR = "http://10.195.16.19:8068/";
 __IMGURL = 'http://10.195.16.7/';
 __DIRPATH = 'http://testh5.kmbear.com/src/weex.html#/';
 }*/ else {
  __APIDIR = "http://10.195.16.19:5088/"
  __PREAPIDIR = "http://10.195.16.19:8068/";
  __IMGURL = 'http://10.195.16.7/';
  __DIRPATH = 'http://testh5.kmbear.com/src/weex.html#/';
}

var __weiSurfaceId = "";
var __userToken = "";
var __userMobile = "";
var __shareInfo = {
  "title": "科米熊",
  "imgUrl": "http://image.kmbear.com/group1/M00/00/11/rB8ACljl1OWAfpNWAAAbqOvsy38655.png?width=138&height=138",
  "desc": "科米熊，亲子成长必备app  专业的测评体系、挖掘孩子天赋",
  "link": "http://www.kmbear.com/publicity.html"
};

function getAppUserToken(token) {
  __userToken = token || __userToken;
}

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
  bridge.registerHandler('getAppUserToken', function(data) {
    __userToken = data || __userToken;
  });
});