/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */

const DiDa = function() {
  this.API = '/index/fetch';
  this.userInfo = {};
  // this.API = 'http://beta.api.91dida.cn/api.php';
  this.height = self.document.documentElement.clientHeight;
  this.loadTimeOut = null;
};

/**
 * 设置页面 title
 * @param {String} title
 */
DiDa.prototype.setTitle = function(title) {
  self.document.title = title;
  const iframe = self.document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = '//static.91dida.cn/skin/index.html';
  self.document.body.appendChild(iframe);
  iframe.addEventListener('load', cIframe);

  function cIframe() {
    self.setTimeout(() => {
      iframe.removeEventListener('load', cIframe);
      self.document.body.removeChild(iframe);
    }, 0);
  }
};

DiDa.prototype.serialize = function(sourceParams) {
  if (typeof sourceParams === 'string') return sourceParams;
  const params = [];
  const add = function add(key, value) {
    if (typeof value === 'object') {
      const keys =  self.Object.keys(value);
      keys.map(item => {
        add(`${key}[${item}]`, value[item]);
      });
    } else {
      params[params.length] =
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
  };

  // Serialize the key/values
  for (const i in sourceParams) {
    if (typeof sourceParams[i] === 'object') {
      if (Array.isArray(sourceParams[i])) {
        sourceParams[i].map((item, index) => {
          add(`${i}[${index}]`, item);
        });
      } else {
        const keys =  self.Object.keys(sourceParams[i]);
        keys.map(item => {
          add(`${i}[${item}]`, sourceParams[i][item]);
        });
      }
    } else {
      add(i, sourceParams[i]);
    }
  }
  return params.join('&').replace('/%20/g', '+');
};

DiDa.prototype.upload = function(fileEl, callback) {
  const body = {
    api: 'system',
    method: 'upload_media_item64',
    module: 'customer',
    pic: '',
  };
  const reader = new FileReader();
  reader.onload = (evt) => {
    body.pic = self.encodeURIComponent(evt.target.result);
    Vue.http.post(self.DD.API, body)
       .then((response) => response.json())
       .then((data) => {
         if (data.result === 'success') {
           if (typeof callback === 'function') {
             callback(data.info);
           }
         } else {
           self.toast(data.info.errmsg);
         }
       });
  };
  reader.readAsDataURL(fileEl.files[0]);
};

/**
 * 页面级 loading .
 * @param {Boolean} [toggle = true] - 控制 loading 的显/隐
 */
DiDa.prototype.loading = function(toggle = true) {
  const loadEl = self.document.getElementById('loading');
  clearTimeout(this.loadTimeOut);
  if (toggle) {
    this.loadTimeOut = setTimeout(() => {
      self.document.body.style.overflow = 'hidden';
      loadEl.style.display = 'block';
    }, 1000);
  } else {
    self.document.body.style.overflow = 'auto';
    loadEl.style.display = 'none';
  }
};

/**
 * 扩展 ES6 Object.assign 方法, 如果原生支持则用原生的，否则用模拟的.
 * @param {Object} target - 目录对象, 方法调用的结果会修改 target 的值.
 * @param {Object} source - 源对象，需要追加的属性.
 */
DiDa.prototype.assign = function(target, source) {
  if (Object.assign) {
    Object.assign(target, source);
  } else {
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  }
};

/**
 * 执行 GET 请求
 * @param {Object} body - GET 请求的参数, 最后会序列化拼到 url 上.
 * @param {Function} callback - 成功执行的回调. 会把请求成功的值做为 callback 的参数.
 */
DiDa.prototype.get = function(body, callback) {
  Vue.http.get(`${this.API}?${this.serialize(body)}`)
          .then((response) => response.json())
          .then((data) => {
            this.loading(false);
            callback(data);
          });
};

/**
 * 执行 POST 请求
 * @param {Object} body - POST 请求的参数.
 * @param {Function} callback - 成功执行的回调. 会把请求成功的值做为 callback 的参数.
 */
DiDa.prototype.post = function(body, callback) {
  Vue.http.post(this.API, body)
          .then((response) => response.json())
          .then((data) => {
            this.loading(false);
            callback(data);
          });
};

DiDa.prototype.bus = new Vue();

self.DD = new DiDa();
