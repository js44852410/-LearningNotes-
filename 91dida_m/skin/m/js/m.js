/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	var _router = __webpack_require__(5);

	var _store = __webpack_require__(343);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = new VueRouter({
	  linkActiveClass: 'active',
	  routes: _router.ROUTES
	});

	router.beforeEach(function (to, from, next) {
	  if (to.meta.title) {
	    self.DD.setTitle(to.meta.title);
	  }
	  next();
	});

	var app = new Vue({
	  router: router,
	  store: _store2.default
	}).$mount('#container');

	// 开启调试信息
	Vue.config.devtools = true;

	// 设置POST请求的数据为application/x-www-form-urlencoded
	Vue.http.options.emulateJSON = true;

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable max-len */
	/* eslint-disable no-use-before-define */
	/* eslint-disable no-restricted-syntax */

	var DiDa = function DiDa() {
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
	DiDa.prototype.setTitle = function (title) {
	  self.document.title = title;
	  var iframe = self.document.createElement('iframe');
	  iframe.style.display = 'none';
	  iframe.src = '//static.91dida.cn/skin/index.html';
	  self.document.body.appendChild(iframe);
	  iframe.addEventListener('load', cIframe);

	  function cIframe() {
	    self.setTimeout(function () {
	      iframe.removeEventListener('load', cIframe);
	      self.document.body.removeChild(iframe);
	    }, 0);
	  }
	};

	DiDa.prototype.serialize = function (sourceParams) {
	  if (typeof sourceParams === 'string') return sourceParams;
	  var params = [];
	  var add = function add(key, value) {
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	      var keys = self.Object.keys(value);
	      keys.map(function (item) {
	        add(key + '[' + item + ']', value[item]);
	      });
	    } else {
	      params[params.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	    }
	  };

	  // Serialize the key/values

	  var _loop = function _loop(i) {
	    if (_typeof(sourceParams[i]) === 'object') {
	      if (Array.isArray(sourceParams[i])) {
	        sourceParams[i].map(function (item, index) {
	          add(i + '[' + index + ']', item);
	        });
	      } else {
	        var keys = self.Object.keys(sourceParams[i]);
	        keys.map(function (item) {
	          add(i + '[' + item + ']', sourceParams[i][item]);
	        });
	      }
	    } else {
	      add(i, sourceParams[i]);
	    }
	  };

	  for (var i in sourceParams) {
	    _loop(i);
	  }
	  return params.join('&').replace('/%20/g', '+');
	};

	DiDa.prototype.upload = function (fileEl, callback) {
	  var body = {
	    api: 'system',
	    method: 'upload_media_item64',
	    module: 'customer',
	    pic: ''
	  };
	  var reader = new FileReader();
	  reader.onload = function (evt) {
	    body.pic = self.encodeURIComponent(evt.target.result);
	    Vue.http.post(self.DD.API, body).then(function (response) {
	      return response.json();
	    }).then(function (data) {
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
	DiDa.prototype.loading = function () {
	  var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	  var loadEl = self.document.getElementById('loading');
	  clearTimeout(this.loadTimeOut);
	  if (toggle) {
	    this.loadTimeOut = setTimeout(function () {
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
	DiDa.prototype.assign = function (target, source) {
	  if (Object.assign) {
	    Object.assign(target, source);
	  } else {
	    for (var prop in source) {
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
	DiDa.prototype.get = function (body, callback) {
	  var _this = this;

	  Vue.http.get(this.API + '?' + this.serialize(body)).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    _this.loading(false);
	    callback(data);
	  });
	};

	/**
	 * 执行 POST 请求
	 * @param {Object} body - POST 请求的参数.
	 * @param {Function} callback - 成功执行的回调. 会把请求成功的值做为 callback 的参数.
	 */
	DiDa.prototype.post = function (body, callback) {
	  var _this2 = this;

	  Vue.http.post(this.API, body).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    _this2.loading(false);
	    callback(data);
	  });
	};

	DiDa.prototype.bus = new Vue();

	self.DD = new DiDa();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Vue.filter('mobile', function (mobile) {
	  if (!mobile) return;
	  var value = String(mobile);
	  var start = value.substr(0, 3);
	  var end = value.substr(7, 4);
	  return start + '****' + end;
	});

	Vue.filter('checked', function (items) {
	  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var remark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var number = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	  var remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
	  if (items && !items.checked) {
	    Vue.set(items, 'checked', value);
	  }

	  if (items instanceof Array) {
	    items.forEach(function (item) {
	      if (item.checked) return;
	      Vue.set(item, 'checked', value);
	      if (remark && remarks) {
	        Vue.set(item, 'remark', remarks[item.store_id]);
	      }
	      if (number) {
	        Vue.set(item, 'number', number);
	      }
	    });
	  }
	  return items;
	});

	Vue.filter('checkedAttr', function (items) {
	  items.forEach(function (item) {
	    Vue.set(item, 'checked', false);
	  });
	  return items;
	});

	Vue.filter('maxNum', function (number) {
	  if (number > 99) {
	    return '99+';
	  } else {
	    return number;
	  }
	});

	Vue.filter('formatAmount', function (amount) {
	  if (amount) {
	    return '¥' + amount;
	  } else {
	    return '¥0.00';
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	  var $el = null;
	  var mask = null;
	  if (!$el) {
	    $el = self.document.createElement('div');
	    $el.style.position = 'fixed';
	    $el.style.left = '50%';
	    $el.style.top = '50%';
	    $el.style.zIndex = 12;
	    $el.style.padding = '10px';
	    $el.style.color = '#fff';
	    $el.style.borderRadius = '5px';
	    $el.style.backgroundColor = 'rgba(40, 40, 40, .75)';
	    $el.style.webkitTransform = 'translate(-50%, -50%)';
	    $el.style.transform = 'translate(-50%, -50%)';
	    $el.style.display = 'none';
	    self.document.body.appendChild($el);
	  }
	  if (!mask) {
	    mask = self.document.createElement('div');
	    mask.style.position = 'fixed';
	    mask.style.left = 0;
	    mask.style.top = 0;
	    mask.style.right = 0;
	    mask.style.bottom = 0;
	    mask.style.zIndex = 11;
	    mask.style.backgroundColor = 'rgba(0, 0, 0, .01)';
	    mask.style.display = 'none';
	    self.document.body.appendChild(mask);
	  }
	  self.toast = function (content) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        callback = _ref.callback,
	        _ref$time = _ref.time,
	        time = _ref$time === undefined ? 2000 : _ref$time;

	    $el.innerHTML = content;
	    $el.style.display = 'block';
	    mask.style.display = 'block';
	    self.setTimeout(function () {
	      $el.style.display = 'none';
	      mask.style.display = 'none';
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }, time);
	  };
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ROUTES = undefined;

	var _router = __webpack_require__(6);

	var _router2 = __webpack_require__(105);

	var _router3 = __webpack_require__(130);

	var _router4 = __webpack_require__(199);

	var _router5 = __webpack_require__(212);

	var _router6 = __webpack_require__(245);

	var _router7 = __webpack_require__(262);

	var _router8 = __webpack_require__(275);

	var _router9 = __webpack_require__(280);

	var _router10 = __webpack_require__(296);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var ROUTES = exports.ROUTES = [].concat(_toConsumableArray(_router.USER), _toConsumableArray(_router2.ORDERS), _toConsumableArray(_router3.GOODS), _toConsumableArray(_router4.CARTS), _toConsumableArray(_router5.SHOP), _toConsumableArray(_router6.COUPON), _toConsumableArray(_router7.ADDRESS), _toConsumableArray(_router8.IM), _toConsumableArray(_router9.PAY), _toConsumableArray(_router10.OTHERS));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.USER = undefined;

	var _index = __webpack_require__(7);

	var _index2 = _interopRequireDefault(_index);

	var _login = __webpack_require__(15);

	var _login2 = _interopRequireDefault(_login);

	var _register = __webpack_require__(24);

	var _register2 = _interopRequireDefault(_register);

	var _registerInfo = __webpack_require__(31);

	var _registerInfo2 = _interopRequireDefault(_registerInfo);

	var _agreement = __webpack_require__(47);

	var _agreement2 = _interopRequireDefault(_agreement);

	var _pending = __webpack_require__(50);

	var _pending2 = _interopRequireDefault(_pending);

	var _unpass = __webpack_require__(54);

	var _unpass2 = _interopRequireDefault(_unpass);

	var _findPassWord = __webpack_require__(58);

	var _findPassWord2 = _interopRequireDefault(_findPassWord);

	var _info = __webpack_require__(61);

	var _info2 = _interopRequireDefault(_info);

	var _edit = __webpack_require__(65);

	var _edit2 = _interopRequireDefault(_edit);

	var _set = __webpack_require__(69);

	var _set2 = _interopRequireDefault(_set);

	var _message = __webpack_require__(73);

	var _message2 = _interopRequireDefault(_message);

	var _collection = __webpack_require__(77);

	var _collection2 = _interopRequireDefault(_collection);

	var _collectionGoods = __webpack_require__(81);

	var _collectionGoods2 = _interopRequireDefault(_collectionGoods);

	var _collectionShop = __webpack_require__(97);

	var _collectionShop2 = _interopRequireDefault(_collectionShop);

	var _myAmount = __webpack_require__(101);

	var _myAmount2 = _interopRequireDefault(_myAmount);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var USER = exports.USER = [{
	  path: '/user',
	  name: 'user',
	  component: _index2.default,
	  meta: {
	    title: '个人中心'
	  }
	}, {
	  path: '/user/info',
	  name: 'userInfo',
	  component: _info2.default,
	  meta: {
	    title: '个人资料'
	  },
	  children: [{
	    path: 'name',
	    name: 'userInfoName',
	    component: _edit2.default,
	    meta: {
	      title: '买家名称',
	      field: 'company_name',
	      placeholder: '请输入买家名称'
	    }
	  }, {
	    path: 'shorthand',
	    name: 'userInfoShorthand',
	    component: _edit2.default,
	    meta: {
	      title: '买家简称',
	      field: 'company_short_name',
	      placeholder: '请输入买家简称'
	    }
	  }, {
	    path: 'mobile',
	    name: 'userInfoMobile',
	    component: _edit2.default,
	    meta: {
	      title: '联系电话',
	      field: 'linkman_phone',
	      placeholder: '请输入联系电话'
	    }
	  }, {
	    path: 'street',
	    name: 'userInfoStreet',
	    component: _edit2.default,
	    meta: {
	      title: '运营地址',
	      field: 'operation_address_street',
	      review: true,
	      placeholder: '请输入运营地址'
	    }
	  }, {
	    path: 'linkman',
	    name: 'userInfoLinkman',
	    component: _edit2.default,
	    meta: {
	      title: '公司联系人',
	      field: 'linkman',
	      placeholder: '请输入公司联系人'
	    }
	  }, {
	    path: 'license',
	    name: 'userInfoLicense',
	    component: _edit2.default,
	    meta: {
	      title: '营业执照',
	      field: 'business_license',
	      review: true
	    }
	  }, {
	    path: 'person',
	    name: 'userInfoPerson',
	    component: _edit2.default,
	    meta: {
	      title: '企业法人',
	      field: 'legal_person',
	      review: true,
	      placeholder: '请输入企业法人'
	    }
	  }, {
	    path: 'ids',
	    name: 'userInfoIds',
	    component: _edit2.default,
	    meta: {
	      title: '法人身份证',
	      field: 'identity_card_1'
	    }
	  }]
	}, {
	  path: '/user/login',
	  name: 'login',
	  component: _login2.default,
	  meta: {
	    title: '登录'
	  }
	}, {
	  path: '/user/set',
	  name: 'set',
	  component: _set2.default,
	  meta: {
	    title: '设置'
	  }
	}, {
	  path: '/user/message',
	  name: 'message',
	  component: _message2.default,
	  meta: {
	    title: '意见反馈'
	  }
	}, {
	  path: '/user/register',
	  name: 'register',
	  component: _register2.default,
	  meta: {
	    title: '买家注册'
	  },
	  children: [{
	    path: 'info',
	    name: 'registerInfo',
	    component: _registerInfo2.default,
	    meta: {
	      title: '完善信息'
	    }
	  }, {
	    path: 'agreement',
	    name: 'agreement',
	    component: _agreement2.default,
	    meta: {
	      title: '买家用户协议'
	    }
	  }]
	}, {
	  path: '/user/pending',
	  name: 'pending',
	  component: _pending2.default,
	  meta: {
	    title: '待审核'
	  }
	}, {
	  path: '/user/unpass',
	  name: 'unpass',
	  component: _unpass2.default,
	  meta: {
	    title: '未通过审核'
	  }
	}, {
	  path: '/user/find',
	  name: 'findPassWord',
	  component: _findPassWord2.default,
	  meta: {
	    title: '找回密码'
	  }
	}, {
	  path: '/user/collection',
	  name: 'myCollection',
	  component: _collection2.default,
	  meta: {
	    title: '我的收藏'
	  },
	  children: [{
	    path: 'goods',
	    name: 'myCollectionGoods',
	    component: _collectionGoods2.default
	  }, {
	    path: 'shop',
	    name: 'myCollectionShop',
	    component: _collectionShop2.default
	  }]
	}, {
	  path: '/user/amount',
	  name: 'myAmount',
	  component: _myAmount2.default,
	  meta: {
	    title: '我的零钱'
	  }
	}];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(8)
	__vue_script__ = __webpack_require__(9)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-35709129/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _navBar = __webpack_require__(10);

	var _navBar2 = _interopRequireDefault(_navBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NavBar: _navBar2.default
	  },
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'get_buyer_personal_info'
	      },
	      info: {
	        coupon_num: 0,
	        buyer_avatar: ''
	      }
	    };
	  },

	  methods: {
	    initPage: function initPage() {
	      var _this = this;

	      self.DD.get(this.body, function (data) {
	        if (data.result === 'success') {
	          Vue.set(_this.$data, 'info', data.info);
	          self.DD.userInfo = JSON.parse(JSON.stringify(data.info));
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    }
	  },
	  created: function created() {
	    self.DD.loading();
	    this.initPage();
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .user-wrapper {
	//     .header {
	//       color: #fff;
	//       background-color: $mainColor;
	//       padding: 3*$margin $margin $margin;
	//       $size: 44px;
	//       .icon {
	//         width: $size;
	//         height: $size;
	//         position: absolute;
	//         top: 0;
	//         box-sizing: border-box;
	//         text-align: center;
	//         padding-top: ($size - 20px)/2;
	//       }
	//       .set {
	//         right: $size;
	//       }
	//       .message {
	//         right: 0;
	//         .has {
	//           position: absolute;
	//           top: 12px;
	//           left: 50%;
	//           margin-left: 5px;
	//           $size: 8px;
	//           width: $size;
	//           height: $size;
	//           background-color: #fff;
	//           border-radius: 3*$size;
	//         }
	//       }
	//     }
	//     .user-info {
	//       display: inline-block;
	//       .head-image {
	//         display: inline-block;
	//         width: 50px;
	//         height: 50px;
	//         border-radius: 150px;
	//         border: 3px solid #9ed7a2;
	//         background-repeat: no-repeat;
	//         background-position: 50% 50%;
	//         -webkit-background-size: cover;
	//         background-size: cover;
	//         vertical-align: middle;
	//         margin-right: 10px;
	//       }
	//     }
	//     .collect {
	//       height: 60px;
	//       font-size: 0;
	//       position: relative;
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       @include borderBottom;
	//       a {
	//         line-height: 60px;
	//         display: inline-block;
	//         width: 50%;
	//         text-align: center;
	//       }
	//       .product-collect {
	//         position: relative;
	//         @include borderRight($top: 10px, $bottom: 10px);
	//       }
	//       em {
	//         margin-right: 10px;
	//         vertical-align: middle;
	//       }
	//       span {
	//         vertical-align: middle;
	//         font-size: 14px;
	//       }
	//     }
	//     .order {
	//       background-color: #fff;
	//       position: relative;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       .view-all-order {
	//         .icon-my-order {
	//           vertical-align: middle;
	//           margin-right: 10px;
	//         }
	//       }
	//       .num {
	//         $size: 12px;
	//         position: absolute;
	//         left: 50%;
	//         top: 5px;
	//         margin-left: 5px;
	//         padding: 0 2px;
	//         min-width: $size;
	//         height: $size + 4px;
	//         line-height: $size + 3px;
	//         border-radius: 3*$size;
	//         color: $priceColor;
	//         background-color: #fff;
	//         @include border($borderColor: $priceColor, $bdrz: 100px);
	//       }
	//     }
	//     .status {
	//       position: relative;
	//       background-color: #fff;
	//       font-size: 0;
	//       text-align: center;
	//       @include borderBottom;
	//       a {
	//         display: inline-block;
	//         padding: 10px 0;
	//         font-size: 12px;
	//         width: 20%;
	//         position: relative;
	//       }
	//       p {
	//         margin-top: 3px;
	//       }
	//     }
	//     .item {
	//       background-color: #fff;
	//       position: relative;
	//       padding: 10px 10px 10px 40px;
	//       overflow: hidden;
	//       display: block;
	//       @include borderTop;
	//       @include borderBottom;
	//       .right {
	//         position: absolute;
	//         right: 0;
	//         top: 0;
	//         bottom: 0;
	//         margin: auto 0;
	//         padding-right: 15px;
	//         font-size: 12px;
	//         height: 15px;
	//         color: $darkenGrayColor;
	//         span {
	//           display: inline-block;
	//           margin-top: 2px;
	//           margin-right: 10px;
	//         }
	//       }
	//       em {
	//         &:first-child {
	//           position: absolute;
	//           left: 10px;
	//           top: 50%;
	//           margin-top: -10px;
	//         }
	//       }
	//       span {
	//         vertical-align: middle;
	//       }
	//     }
	//     .coupon,
	//     .wallet {
	//       .right {
	//         color: $mainColor;
	//       }
	//     }
	//     .wallet {
	//       .tips {
	//         clear: both;
	//         color: $darkenGrayColor;
	//         font-size: 12px;
	//       }
	//     }
	//     .coupon {
	//       &:before,
	//       &:after {
	//         display: none;
	//       }
	//     }
	//     .address {
	//       margin-bottom: 10px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.user-wrapper
	//     header.header
	//       router-link.user-info(:to='{name: "userInfo"}')
	//         span.head-image(:style='{backgroundImage: "url(" + info.buyer_avatar + ")"}')
	//         span.name(v-text='info.company_name')
	//       router-link.icon.set(:to='{name: "set"}')
	//         em.icon-set.icon-40
	//       router-link.icon.message(:to='{name: "imList"}')
	//         em.icon-message.icon-40
	//         label.has(v-if='info.im_unread_num')
	//     .collect
	//       router-link.product-collect(:to='{name: "myCollectionGoods"}')
	//         em.icon-product-collect.icon-40
	//         span 商品收藏
	//       router-link.buyer-collect(:to='{name: "myCollectionShop"}')
	//         em.icon-buyer-collect.icon-40
	//         span 店铺收藏
	//     .order
	//       router-link.view-all-order.item(:to='{name: "myOrder", params: {status: 0}}')
	//         em.icon-my-order.icon-40
	//         span 我的订单
	//         .right
	//           span 全部订单
	//           em.icon-more
	//       .status
	//         router-link.pending-payment(:to='{name: "myOrder", params: {status: 1}}')
	//           em.icon-pending-payment.icon-40
	//           p 待付款
	//           label.num(
	//             v-if='info.pay_order_num > 0',
	//             v-text='info.pay_order_num'
	//           )
	//         router-link.delivered(:to='{name: "myOrder", params: {status: 2}}')
	//           em.icon-delivered.icon-40
	//           p 待发货
	//           label.num(
	//             v-if='info.ship_order_num > 0',
	//             v-text='info.ship_order_num'
	//           )
	//         router-link.inbound(:to='{name: "myOrder", params: {status: 3}}')
	//           em.icon-inbound.icon-40
	//           p 待收货
	//           label.num(
	//             v-if='info.receipt_order_num > 0',
	//             v-text='info.receipt_order_num'
	//           )
	//         router-link.completed(:to='{name: "myOrder", params: {status: 4}}')
	//           em.icon-completed.icon-40
	//           p 已完成
	//         router-link.return(:to='{name: "myOrder", params: {status: 5}}')
	//           em.icon-return.icon-40
	//           p 退货
	//     router-link.wallet.item(:to='{name: "myAmount"}')
	//       em.icon-wallet.icon-40
	//       span 我的零钱
	//       .right
	//         span {{info.amount | formatAmount}}
	//         em.icon-more
	//       p.tips 可在提交订单时用于抵扣现金
	//     router-link.coupon.item(:to='{name: "myCoupon", params: {type: 1}}')
	//       em.icon-user-coupon.icon-40
	//       span 优惠券
	//       .right
	//         span(v-text='info.coupon_num + "张优惠券"')
	//         em.icon-more
	//     router-link.address.item(:to='{name: "addressList"}')
	//       em.icon-address.icon-40
	//       span 收货地址
	//       em.icon-more
	//     a.service.item(href='tel: 4000798798')
	//       em.icon-service.icon-40
	//       span 客服热线
	//       .right
	//         span 4000-798-798
	//         em.icon-more
	//     nav-bar
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(11)
	__vue_script__ = __webpack_require__(12)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\navBar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5832ccee/navBar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .nav-wrapper {
	//     position: fixed;
	//     left: 0;
	//     bottom: 0;
	//     font-size: 0;
	//     text-align: center;
	//     color: $grayColor;
	//     height: 50px;
	//     width: 100%;
	//     padding-top: 6px;
	//     box-sizing: border-box;
	//     background-color: #fafafa;
	//     z-index: 3;
	//     @include borderTop;
	//     a {
	//       width: 25%;
	//       vertical-align: bottom;
	//       display: inline-block;
	//       position: relative;
	//       &.active {
	//         color: $mainColor;
	//       }
	//     }
	//     span {
	//       display: block;
	//       font-size: 12px;
	//     }
	//     em {
	//       $size: (46px/2);
	//       width: $size;
	//       height: $size;
	//       margin-bottom: 3px;
	//     }
	//     .num {
	//       position: absolute;
	//       background-color: $priceColor;
	//       color: #fff;
	//       min-width: 13px;
	//       height: 13px;
	//       padding: 1px 2px 2px;
	//       border-radius: 50px;
	//       text-align: center;
	//       font-size: 12px;
	//       top: -3px;
	//       left: 50%;
	//       pointer-events: none;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   nav.nav-wrapper
	//     router-link(:to='{name:"home"}')
	//       em.icon-home
	//       span 首页
	//     router-link(:to='{name:"myOrderAll"}')
	//       em.icon-order
	//       span 我的订单
	//     router-link(:to='{name:"cart"}')
	//       em.icon-carts
	//       span 购物车
	//       label.num(v-if='cartsCount > 0') {{cartsCount | maxNum}}
	//     router-link(:to='{name:"user"}')
	//       em.icon-user
	//       span 个人中心
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters(['cartsCount'])),
	  mounted: function mounted() {
	    /**
	    * 第一次打开页面时购物车数量是由PHP变量返回，所以第一次需要把这个数量传给 vuex
	    * 只是在第一次打开页面需要执行一次就OK啦
	    */
	    if (!self.home.first_cart_num) {
	      self.home.first_cart_num = true;
	      this.$store.dispatch('setCartsCount', self.home.cart_num);
	    }
	  }
	};
	// </script>

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"nav-wrapper\"><router-link :to=\"{name:&quot;home&quot;}\"><em class=\"icon-home\"></em><span>首页</span></router-link><router-link :to=\"{name:&quot;myOrderAll&quot;}\"><em class=\"icon-order\"></em><span>我的订单</span></router-link><router-link :to=\"{name:&quot;cart&quot;}\"><em class=\"icon-carts\"></em><span>购物车</span><label v-if=\"cartsCount &gt; 0\" class=\"num\">{{cartsCount | maxNum}}</label></router-link><router-link :to=\"{name:&quot;user&quot;}\"><em class=\"icon-user\"></em><span>个人中心</span></router-link></nav>";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper user-wrapper\"><header class=\"header\"><router-link :to=\"{name: &quot;userInfo&quot;}\" class=\"user-info\"><span :style=\"{backgroundImage: &quot;url(&quot; + info.buyer_avatar + &quot;)&quot;}\" class=\"head-image\"></span><span v-text=\"info.company_name\" class=\"name\"></span></router-link><router-link :to=\"{name: &quot;set&quot;}\" class=\"icon set\"><em class=\"icon-set icon-40\"></em></router-link><router-link :to=\"{name: &quot;imList&quot;}\" class=\"icon message\"><em class=\"icon-message icon-40\"></em><label v-if=\"info.im_unread_num\" class=\"has\"></label></router-link></header><div class=\"collect\"><router-link :to=\"{name: &quot;myCollectionGoods&quot;}\" class=\"product-collect\"><em class=\"icon-product-collect icon-40\"></em><span>商品收藏</span></router-link><router-link :to=\"{name: &quot;myCollectionShop&quot;}\" class=\"buyer-collect\"><em class=\"icon-buyer-collect icon-40\"></em><span>店铺收藏</span></router-link></div><div class=\"order\"><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 0}}\" class=\"view-all-order item\"><em class=\"icon-my-order icon-40\"></em><span>我的订单</span><div class=\"right\"><span>全部订单</span><em class=\"icon-more\"></em></div></router-link><div class=\"status\"><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 1}}\" class=\"pending-payment\"><em class=\"icon-pending-payment icon-40\"></em><p>待付款</p><label v-if=\"info.pay_order_num &gt; 0\" v-text=\"info.pay_order_num\" class=\"num\"></label></router-link><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 2}}\" class=\"delivered\"><em class=\"icon-delivered icon-40\"></em><p>待发货</p><label v-if=\"info.ship_order_num &gt; 0\" v-text=\"info.ship_order_num\" class=\"num\"></label></router-link><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 3}}\" class=\"inbound\"><em class=\"icon-inbound icon-40\"></em><p>待收货</p><label v-if=\"info.receipt_order_num &gt; 0\" v-text=\"info.receipt_order_num\" class=\"num\"></label></router-link><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 4}}\" class=\"completed\"><em class=\"icon-completed icon-40\"></em><p>已完成</p></router-link><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 5}}\" class=\"return\"><em class=\"icon-return icon-40\"></em><p>退货</p></router-link></div></div><router-link :to=\"{name: &quot;myAmount&quot;}\" class=\"wallet item\"><em class=\"icon-wallet icon-40\"></em><span>我的零钱</span><div class=\"right\"><span>{{info.amount | formatAmount}}</span><em class=\"icon-more\"></em></div><p class=\"tips\">可在提交订单时用于抵扣现金</p></router-link><router-link :to=\"{name: &quot;myCoupon&quot;, params: {type: 1}}\" class=\"coupon item\"><em class=\"icon-user-coupon icon-40\"></em><span>优惠券</span><div class=\"right\"><span v-text=\"info.coupon_num + &quot;张优惠券&quot;\"></span><em class=\"icon-more\"></em></div></router-link><router-link :to=\"{name: &quot;addressList&quot;}\" class=\"address item\"><em class=\"icon-address icon-40\"></em><span>收货地址</span><em class=\"icon-more\"></em></router-link><a href=\"tel: 4000798798\" class=\"service item\"><em class=\"icon-service icon-40\"></em><span>客服热线</span><div class=\"right\"><span>4000-798-798</span><em class=\"icon-more\"></em></div></a><nav-bar></nav-bar></div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(16)
	__vue_script__ = __webpack_require__(17)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-01cf9780/login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   .user-form-wrapper {
	//     padding-top: 10px;
	//     padding-bottom: 56px;
	//     min-height: 100%;
	//     color: $grayColor;
	//     .options {
	//       overflow: hidden;
	//       padding: 0 $margin;
	//     }
	//     .register {
	//       float: left;
	//     }
	//     .forget {
	//       float: right;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.user-form-wrapper
	//     form#login(
	//       @submit.prevent='login'
	//     )
	//       .items
	//         span.title 手机号
	//         input.input(
	//           v-model='mobile',
	//           type='tel',
	//           maxlength='11',
	//           placeholder='请输入手机号码'
	//         )
	//       .items
	//         span.title 密码
	//         input.input(
	//           v-model='password',
	//           type='password',
	//           maxlength='15',
	//           placeholder='请输入6~15位密码'
	//         )
	//       button.btn-submit(
	//         :disabled='disabled',
	//         v-text='text'
	//       )
	//     p.options
	//       router-link.register(
	//         :to='{name: "register"}'
	//       ) 立即注册
	//       router-link.forget(
	//         :to='{name: "findPassWord"}'
	//       ) 忘记密码
	//     tips
	// </template>
	//
	// <script lang='babel'>


	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  components: {
	    Tips: _tips2.default
	  },
	  data: function data() {
	    return {
	      mobile: '',
	      password: '',
	      text: '登录',
	      disabled: true
	    };
	  },

	  watch: {
	    mobile: 'verification',
	    password: 'verification'
	  },
	  methods: {
	    verification: function verification() {
	      if (/^1[345678]{1}\d{9}$/.test(this.mobile) && this.password) {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }
	    },
	    login: function login() {
	      var _this = this;

	      var body = _extends({}, apis.LOGIN);
	      body.mobile = this.mobile;
	      body.password = this.password;
	      this.disabled = true;
	      this.text = '正在登录中...';
	      self.DD.post(body, function (data) {
	        if (data.result === 'success') {
	          if (data.info.status === 'pending') {
	            // 正在审核中
	            _this.$router.replace({
	              name: 'pending'
	            });
	          } else if (data.info.status === 'denied') {
	            // 审核未通过
	            _this.$router.replace({
	              name: 'unpass'
	            });
	          } else {
	            // 这里使用location.href而不用vue-router是为了回首页刷新一下页面
	            self.location.href = '/';
	          }
	        } else {
	          self.toast(data.info.errmsg);
	          if (data.code === '0x6013') {
	            self.location.href = '/';
	          } else {
	            _this.disabled = false;
	            _this.text = '登录';
	          }
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.$store.dispatch('getRegionList');
	  }
	};
	// </script>

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// 登录
	var LOGIN = exports.LOGIN = {
	  api: 'customer',
	  method: 'set_customer_login',
	  is_remember: 0,
	  mobile: '',
	  password: ''
	};

	// 退出登录
	var LOGOUT = exports.LOGOUT = {
	  api: 'customer',
	  method: 'set_buyer_logout'
	};

	// 添加商品到购物车中
	var ADD_TO_CART = exports.ADD_TO_CART = {
	  api: 'checkout_cart',
	  method: 'add_to_cart',
	  qty: 1,
	  store_product_id: 0
	};

	// 获取购物车列表
	var GET_CART_LIST = exports.GET_CART_LIST = {
	  api: 'checkout_cart',
	  method: 'get_cart_items'
	};

	// 商品筛选
	var GET_FILTER_GOODS = exports.GET_FILTER_GOODS = {
	  api: 'catalog_category',
	  method: 'get_category_item_by_parentid',
	  attributes: 1,
	  brand: 1
	};

	// 获取购物车商品数量
	var GET_CART_COUNT = exports.GET_CART_COUNT = {
	  'api': 'checkout_cart',
	  'method': 'get_cart_num'
	};

	// 购物车列表页操作(添加、减少、删除、选择、全选等)
	var OPTIONS_CART = exports.OPTIONS_CART = {
	  api: 'checkout_cart',
	  method: 'toggle_cart',
	  store_product_ids: []
	};

	// 商品详情
	var GET_PRODUCT_INFO = exports.GET_PRODUCT_INFO = {
	  api: 'store_product',
	  method: 'get_store_product_info',
	  store_id: 0,
	  store_product_id: 0
	};

	// 商品收藏与取消收藏
	var TOGGLE_COLLECTION_GOODS = exports.TOGGLE_COLLECTION_GOODS = {
	  api: 'store_product',
	  method: 'remove_wisth_store_product',
	  // remove_wisth_store_product 取消收藏
	  // add_wish_store_product 收藏
	  store_product_id: 0
	};

	// 获取收藏的商品列表
	var GET_COLLECTION_GOODS = exports.GET_COLLECTION_GOODS = {
	  api: 'store_product',
	  method: 'get_wish_store_product'
	};

	// 获取店铺信息
	var GET_SHOP_INFO = exports.GET_SHOP_INFO = {
	  api: 'store',
	  method: 'home',
	  store_id: 0
	};

	// 店铺收藏与取消收藏
	var TOGGLE_COLLECTION_SHOP = exports.TOGGLE_COLLECTION_SHOP = {
	  api: 'favorites',
	  method: 'remove_store_wish',
	  // 'remove_store_wish': 'add_store_wish'
	  store_id: 0
	};

	// 获取收藏的店铺列表
	var GET_COLLECTION_SHOP = exports.GET_COLLECTION_SHOP = {
	  api: 'favorites',
	  method: 'get_store_wish'
	};

	// 商品结算
	var SETTLEMENT = exports.SETTLEMENT = {
	  api: 'checkout_cart',
	  address_id: 0,
	  pay_method: '',
	  is_clear_coupon: 0,
	  is_use_pocket: 0,
	  method: 'goods_settlement',
	  type: ''
	};

	// 创建订单
	var CREATED_NEW_ORDER = exports.CREATED_NEW_ORDER = {
	  api: 'sales_order',
	  method: 'add_order_item',
	  address_id: 0,
	  goods: {},
	  type: 1,
	  pay_method: '',
	  comments: {},
	  coupon_detail_ids: {},
	  use_pocket_money: 0
	};

	// 获取订单列表
	var GET_ORDER_LIST = exports.GET_ORDER_LIST = {
	  api: 'sales_order',
	  method: 'get_buyer_order_items',
	  max_grand_total: '',
	  min_grand_total: '',
	  ordered_end: '',
	  ordered_start: '',
	  page: 0,
	  pagesize: '',
	  store_name: '',
	  status: 0
	};

	// 获取在线支付的订单列表
	var GET_ON_LINE_ORDER = exports.GET_ON_LINE_ORDER = {
	  api: 'sales_order',
	  method: 'get_online_checkout_items',
	  order_ids: 0
	};

	// 确认收货
	var CONFIRM_RECEIPT = exports.CONFIRM_RECEIPT = {
	  api: 'sales_order',
	  method: 'set_order_cfm_receiving',
	  id: 0
	};

	// 获取退货原因列表
	var GET_REFUND_REASON = exports.GET_REFUND_REASON = {
	  api: 'sales_order',
	  method: 'get_refund_reason_items'
	};

	// 提交退货申请
	var SUBMIT_REFUND = exports.SUBMIT_REFUND = {
	  api: 'sales_order',
	  method: 'application_refund_order',
	  id: 0,
	  comment: '',
	  reason_id: 0
	};

	// 假货先赔
	var APPLY_COMPENSATION = exports.APPLY_COMPENSATION = {
	  api: 'sales_order',
	  method: 'set_order_fake',
	  id: 0
	};

	// 取消订单
	var CANCEL_ORDER = exports.CANCEL_ORDER = {
	  api: 'sales_order',
	  method: 'set_order_canceled',
	  id: 0
	};

	// 选择优惠券
	var CHOOSE_COUPON = exports.CHOOSE_COUPON = {
	  api: 'coupon',
	  method: 'choose_coupon',
	  pay_method: '',
	  product_info: {}
	};

	// 占领优惠券
	var OCCUPY_CHOOSE_COUPON = exports.OCCUPY_CHOOSE_COUPON = {
	  api: 'coupon',
	  method: 'order_occupy_coupon',
	  coupon_detail_id: 0
	};

	// 我的优惠券
	var GET_MY_COUPON_LIST = exports.GET_MY_COUPON_LIST = {
	  api: 'coupon',
	  method: 'get_coupon_items_buyer',
	  type: 0
	};

	// 添加优惠券
	var ADD_COUPON = exports.ADD_COUPON = {
	  api: 'coupon',
	  method: 'user_bind_coupon',
	  coupon_sn: ''
	};

	// 获取地址列表
	var GET_ADDRESS_LIST = exports.GET_ADDRESS_LIST = {
	  api: 'customer_address',
	  method: 'get_address_items'
	};

	// 删除一条收货地址
	var DELETE_ITEM_ADDRESS = exports.DELETE_ITEM_ADDRESS = {
	  api: 'customer_address',
	  method: 'remove_address_item',
	  id: 0
	};

	// 设为默认地址
	var SET_DEFAULT_ADDRESS = exports.SET_DEFAULT_ADDRESS = {
	  api: 'customer_address',
	  method: 'set_default_address',
	  id: 0
	};

	// 获取省市区
	var GET_REGION_LIST = exports.GET_REGION_LIST = {
	  api: 'system',
	  method: 'get_region_list',
	  parent_id: 0
	};

	// 添加收货地址
	var ADD_ADDRESS = exports.ADD_ADDRESS = {
	  api: 'customer_address',
	  method: 'add_address_item'
	};

	// 编辑收货地址
	var EDIT_ADDRESS = exports.EDIT_ADDRESS = {
	  api: 'customer_address',
	  method: 'edit_address_item',
	  id: 0
	};

	// 获取用户的详细资料
	var GET_USER_INFO = exports.GET_USER_INFO = {
	  api: 'customer',
	  method: 'get_buyer_info'
	};

	// 设置用户头像
	var SET_USER_HEAD_IMG = exports.SET_USER_HEAD_IMG = {
	  api: 'customer',
	  method: 'set_buyer_avatar',
	  avatar: ''
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(20)
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\tips.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(22)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-00e4e731/tips.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */
/***/ function(module, exports) {

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .urgent {
	//     line-height: 1.5;
	//     font-size: 12px;
	//     width: 100%;
	//     position: fixed;
	//     left: 0;
	//     bottom: 20px;
	//     text-align: center;
	//     color: $grayColor;
	//     a {
	//       color: $linkColor;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .urgent
	//     p 如您需要加急处理，请联系邸达平台
	//     p
	//       span 客服：
	//       a(
	//         href="tel: 4000798798"
	//       ) 4000-798-798
	// </template>
	//
	// <script lang='babel'>

	// </script>
	"use strict";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"urgent\"><p>如您需要加急处理，请联系邸达平台</p><p><span>客服：</span><a href=\"tel: 4000798798\">4000-798-798</a></p></div>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper user-form-wrapper\"><form id=\"login\" @submit.prevent=\"login\"><div class=\"items\"><span class=\"title\">手机号</span><input v-model=\"mobile\" type=\"tel\" maxlength=\"11\" placeholder=\"请输入手机号码\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">密码</span><input v-model=\"password\" type=\"password\" maxlength=\"15\" placeholder=\"请输入6~15位密码\" class=\"input\"/></div><button :disabled=\"disabled\" v-text=\"text\" class=\"btn-submit\"></button></form><p class=\"options\"><router-link :to=\"{name: &quot;register&quot;}\" class=\"register\">立即注册</router-link><router-link :to=\"{name: &quot;findPassWord&quot;}\" class=\"forget\">忘记密码</router-link></p><tips></tips></div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\register.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(30)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5ff97c9c/register.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _code = __webpack_require__(26);

	var _code2 = _interopRequireDefault(_code);

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template lang='jade'>
	//   div
	//     .wrapper.user-form-wrapper
	//       form#register(
	//         @submit.prevent='register'
	//       )
	//         .items
	//           span.title 手机号
	//           input.input(
	//             v-model='body.mobile',
	//             type="tel",
	//             maxlength='11',
	//             placeholder="请输入手机号码"
	//           )
	//         .items
	//           span.title 验证码
	//           input.input(
	//             v-model='body.valid_code',
	//             type="text",
	//             maxlength='6',
	//             placeholder=""
	//           )
	//           get-code(
	//             :mobile='body.mobile',
	//             :type='"register"'
	//           )
	//         div.separate
	//           .items
	//             span.title 密码
	//             input.input(
	//               v-model='body.password',
	//               type="password",
	//               maxlength='15',
	//               placeholder="请输入密码"
	//             )
	//           .items.separate-left
	//             span.title 确认密码
	//             input.input(
	//               v-model='body.repwd',
	//               type="password",
	//               maxlength='15',
	//               placeholder="请确认密码"
	//             )
	//           .items
	//             span.title 邀请码
	//             input.input(
	//               v-model='body.invite_code',
	//               type="text",
	//               placeholder="地推员邀请码"
	//             )
	//         p.options
	//           em.icon-check(
	//             :class='{"active": checked}',
	//             @click='checked = !checked'
	//           )
	//           span(
	//             @click='checked = !checked'
	//           ) 同意
	//           router-link(:to='{name: "agreement"}') 《服务协议》
	//         button.btn-submit(
	//           :disabled='disabled'
	//         ) 立即注册
	//       tips
	//     router-view
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  components: {
	    GetCode: _code2.default,
	    Tips: _tips2.default
	  },
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'add_customer_item',
	        mobile: '',
	        password: '',
	        repwd: '',
	        valid_code: '',
	        invite_code: ''
	      },
	      checked: true,
	      disabled: true
	    };
	  },

	  watch: {
	    body: {
	      handler: 'verification',
	      deep: true
	    }
	  },
	  methods: {
	    verification: function verification() {
	      var b = this.body;
	      if (/^1[345678]{1}\d{9}$/.test(b.mobile) && b.valid_code.length === 6 && b.password && b.invite_code) {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }
	    },
	    register: function register() {
	      var _this = this;

	      if (this.body.repwd != this.body.password) {
	        self.toast('两次输入的密码不一致哟~');
	      } else if (!this.checked) {
	        self.toast('您还未同意《服务协议》哟~');
	      } else {
	        this.disabled = true;
	        self.DD.post(this.body, function (data) {
	          if (data.result === 'success') {
	            _this.$router.push({
	              name: 'registerInfo'
	            });
	          } else {
	            self.toast(data.info.errmsg);
	          }
	        });
	      }
	    }
	  }
	};
	// </script>

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(27)
	__vue_script__ = __webpack_require__(28)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\code.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4316df66/code.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .btn-code {
	//     position: absolute;
	//     right: $margin;
	//     top: 7px;
	//     bottom: 7px;
	//     line-height: $inputHeight - 16px;
	//     width: 110px;
	//     text-align: center;
	//     color: $mainColor;
	//     border: 1px solid $mainColor;
	//     border-radius: 3px;
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   a.btn-code(
	//     v-text='text',
	//     @click='getCode'
	//   )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['mobile', 'type'],
	  data: function data() {
	    return {
	      text: '获取验证码',
	      num: 60,
	      timer: null,
	      body: {
	        api: 'system',
	        method: 'send_mobile_code',
	        buyer: 1,
	        seller: 0
	      }
	    };
	  },

	  methods: {
	    getCode: function getCode() {
	      var _this = this;

	      if (this.num < 60) return;
	      if (this.mobile === '') {
	        self.toast('请先输入您的手机号码');
	      } else if (!/^1[345678]{1}\d{9}$/.test(this.mobile)) {
	        self.toast('您输入的手机号码不正确');
	      } else {
	        this.body.mobile = this.mobile;
	        this.body.type = this.type;
	        self.DD.post(this.body, function (data) {
	          if (data.result === 'success') {
	            _this.timer = self.setInterval(_this.countDown, 1000);
	            self.toast('短信发送成功');
	          } else {
	            _this.text = '获取验证码', self.toast(data.info.errmsg);
	          }
	        });
	      }
	    },
	    countDown: function countDown() {
	      this.num--;
	      if (this.num < 1) {
	        self.clearInterval(this.timer);
	        this.num = 60;
	        this.text = '获取验证码';
	      } else {
	        this.text = this.num + 's\u540E\u91CD\u65B0\u83B7\u53D6';
	      }
	    }
	  }
	};
	// </script>

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<a v-text=\"text\" @click=\"getCode\" class=\"btn-code\"></a>";

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div><div class=\"wrapper user-form-wrapper\"><form id=\"register\" @submit.prevent=\"register\"><div class=\"items\"><span class=\"title\">手机号</span><input v-model=\"body.mobile\" type=\"tel\" maxlength=\"11\" placeholder=\"请输入手机号码\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">验证码</span><input v-model=\"body.valid_code\" type=\"text\" maxlength=\"6\" placeholder=\"\" class=\"input\"/><get-code :mobile=\"body.mobile\" :type=\"&quot;register&quot;\"></get-code></div><div class=\"separate\"><div class=\"items\"><span class=\"title\">密码</span><input v-model=\"body.password\" type=\"password\" maxlength=\"15\" placeholder=\"请输入密码\" class=\"input\"/></div><div class=\"items separate-left\"><span class=\"title\">确认密码</span><input v-model=\"body.repwd\" type=\"password\" maxlength=\"15\" placeholder=\"请确认密码\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">邀请码</span><input v-model=\"body.invite_code\" type=\"text\" placeholder=\"地推员邀请码\" class=\"input\"/></div></div><p class=\"options\"><em :class=\"{&quot;active&quot;: checked}\" @click=\"checked = !checked\" class=\"icon-check\"></em><span @click=\"checked = !checked\">同意</span><router-link :to=\"{name: &quot;agreement&quot;}\">《服务协议》</router-link></p><button :disabled=\"disabled\" class=\"btn-submit\">立即注册</button></form><tips></tips></div><router-view></router-view></div>";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(32)
	__vue_script__ = __webpack_require__(33)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\registerInfo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(46)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-67eac72c/registerInfo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	var _topTips = __webpack_require__(34);

	var _topTips2 = _interopRequireDefault(_topTips);

	var _getRegion = __webpack_require__(38);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _uploadFile = __webpack_require__(42);

	var _uploadFile2 = _interopRequireDefault(_uploadFile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .register-info {
	//     position: absolute;
	//     left: 0;
	//     top: 0;
	//     z-index: 1;
	//     width: 100%;
	//     min-height: 100%;
	//     background-color: $bgColor;
	//     .choice-city {
	//       line-height: $inputHeight;
	//     }
	//     & + .urgent {
	//       z-index: 2;
	//     }
	//     .submit {
	//       p.title {
	//         margin: $margin;
	//       }
	//     }
	//     .business {
	//       position: relative;
	//       padding-top: 50%;
	//       margin: 10px $margin*3;
	//       background: url(/src/images/business.jpg) 50% 50% no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .ids {
	//       overflow: hidden;
	//       margin: 10px $margin;
	//       [class^='ids-'] {
	//         position: relative;
	//         padding-top: 30%;
	//         width: 49%;
	//         background: url(/src/images/idcard.jpg) 50% 50% no-repeat;
	//         -webkit-background-size: cover;
	//         background-size: cover;
	//       }
	//     }
	//     .ids-front {
	//       float: left;
	//     }
	//     .ids-back {
	//       float: right;
	//     }
	//   }
	//   .reset-info {
	//     .pass-wrapper {
	//       text-align: center;
	//       padding: 10px;
	//     }
	//     .icon-pass-outer {
	//       border: 1px solid $mainColor;
	//       width: 20px;
	//       height: 20px;
	//       line-height: 20px;
	//       border-radius: 100px;
	//       text-align: center;
	//       display: inline-block;
	//       margin-right: 5px;
	//     }
	//     .i {
	//       display: none;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.user-form-wrapper.register-info(
	//     :class='{"reset-info": modify}'
	//   )
	//     p.pass-wrapper(v-if='modify')
	//       span.icon-pass-outer
	//         em.icon-pass
	//       span 注册成功
	//     top-tips
	//     form(
	//       v-if='submitToggle',
	//       @submit.prevent='next'
	//     )
	//       .items
	//         span.title 买家名称
	//         input.input(
	//           v-model='body.company_name',
	//           type="text",
	//           placeholder="请输入买家名称"
	//         )
	//       .items
	//         span.title 买家简称
	//         input.input(
	//           v-model='body.company_short_name',
	//           type="text",
	//           placeholder="请输入买家简称"
	//         )
	//       div.separate
	//         .items
	//           span.title 联系人
	//           input.input(
	//             v-model='body.linkman',
	//             type="text",
	//             placeholder="请输入联系人姓名"
	//           )
	//         .items
	//           span.title 联系电话
	//           input.input(
	//             v-model='body.linkman_phone',
	//             type="tel",
	//             maxlength='11',
	//             placeholder="请输入联系电话"
	//           )
	//       div.separate
	//         .items
	//           span.title 城市/地区
	//           .con.choice-city
	//             get-region(
	//               :region-id='body.region_id',
	//               :province-id='provinceId',
	//               :city-id='cityId',
	//               :county-id='countyId',
	//               @region-event='setRegionId'
	//             )
	//         .items
	//           span.title 详情地址
	//           input.input(
	//             v-model='body.street',
	//             type="text",
	//             placeholder="例：复兴镇中心小区6号楼618"
	//           )
	//       button.btn-submit(
	//         :disabled='disabled'
	//       ) 下一步
	//       p.options
	//         a.forget(@click='logout') 切换账号
	//     form.submit(
	//       v-else,
	//       @submit.prevent='submit'
	//     )
	//       p.title 营业执照
	//       .business
	//         upload-file(
	//           :text='"点击添加营业执照"',
	//           :url='body.business_license',
	//           :image='business_license_image',
	//           @upload-event='setLicense'
	//         )
	//       p.title 法人身份证
	//       .ids
	//         .ids-front
	//           upload-file(
	//             :text='"点击添加身份证正面"',
	//             :url='body.identity_card_1',
	//             :image='identity_card_1_image',
	//             @upload-event='setCardFront'
	//           )
	//         .ids-back
	//           upload-file(
	//             :text='"点击添加身份证反面"',
	//             :url='body.identity_card_2',
	//             :image='identity_card_2_image',
	//             @upload-event='setCartBack'
	//           )
	//       button.btn-submit(
	//         :disabled='submitDisabled'
	//       ) 提交
	//     tips
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  components: {
	    Tips: _tips2.default,
	    TopTips: _topTips2.default,
	    GetRegion: _getRegion2.default,
	    UploadFile: _uploadFile2.default
	  },
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'set_buyer_info',
	        company_name: '',
	        company_short_name: '',
	        linkman: '',
	        linkman_phone: '',
	        region_id: '',
	        street: '',

	        business_license: '',
	        identity_card_1: '',
	        identity_card_2: '',
	        legal_person: '' },
	      business_license_image: '',
	      identity_card_1_image: '',
	      identity_card_2_image: '',
	      modify: 0,
	      provinceId: 0,
	      cityId: 0,
	      countyId: 0,
	      disabled: true,

	      submitToggle: true,
	      submitDisabled: true
	    };
	  },

	  watch: {
	    body: {
	      handler: 'verification',
	      deep: true
	    }
	  },
	  methods: {
	    setRegionId: function setRegionId(regionId) {
	      this.body.region_id = regionId;
	    },
	    setLicense: function setLicense(url, imageSrc) {
	      this.body.business_license = url;
	      this.business_license_image = imageSrc;
	    },
	    setCardFront: function setCardFront(url, imageSrc) {
	      this.body.identity_card_1 = url;
	      this.identity_card_1_image = imageSrc;
	    },
	    setCartBack: function setCartBack(url, imageSrc) {
	      this.body.identity_card_2 = url;
	      this.identity_card_2_image = imageSrc;
	    },
	    verification: function verification() {
	      var b = this.body;
	      if (/^1[345678]{1}\d{9}$/.test(b.linkman_phone) && b.company_name && b.company_short_name && b.linkman && b.region_id && b.street) {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }

	      if (b.business_license) {
	        this.submitDisabled = false;
	      } else {
	        this.submitDisabled = true;
	      }
	    },
	    next: function next() {
	      var $children = this.$children[1].$refs;
	      if ($children.district && !+$children.district.value || $children.city && !+$children.city.value) {
	        self.toast('要填写完整的区域信息哟~');
	      } else {
	        this.submitToggle = false;
	      }
	    },
	    submit: function submit() {
	      this.submitDisabled = true;
	      self.DD.post(this.body, function (data) {
	        if (data.result === 'success') {
	          // 使用location而不用vmRouter，需要刷新首页的数据~
	          self.location.href = '/#/user/pending';
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    getUserInfo: function getUserInfo() {
	      var _this = this;

	      var body = {
	        api: 'customer',
	        method: 'get_buyer_info'
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.body.company_name = data.info.company_name;
	          _this.body.company_short_name = data.info.company_short_name;
	          _this.body.linkman = data.info.linkman;
	          _this.body.linkman_phone = data.info.linkman_phone;
	          _this.body.street = data.info.operation_address_street;
	          _this.body.region_id = data.info.region_id;
	          _this.body.business_license = data.info.business_license;
	          _this.business_license_image = data.info.business_license_image;
	          _this.body.identity_card_1 = data.info.identity_card_1;
	          _this.identity_card_1_image = data.info.identity_card_1_image;
	          _this.body.identity_card_2 = data.info.identity_card_2;
	          _this.identity_card_2_image = data.info.identity_card_2_image;
	          _this.provinceId = data.info.province_id;
	          _this.cityId = data.info.city_id;
	          _this.countyId = data.info.county_id;
	          _this.$nextTick(function () {
	            self.DD.bus.$emit('address-edit');
	          });
	        }
	      });
	    },
	    logout: function logout() {
	      this.$store.dispatch('logout', {
	        callback: function () {
	          self.home.reviewStatus = '';
	          this.$router.replace({
	            name: 'login'
	          });
	        }.bind(this)
	      });
	    }
	  },
	  created: function created() {
	    this.modify = this.$route.query.modify;
	    if (this.modify) {
	      this.getUserInfo();
	    }
	  }
	};
	// </script>

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(35)
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\topTips.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(37)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-59c76544/topTips.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 35 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 36 */
/***/ function(module, exports) {

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .top-tips {
	//     padding: 0 $margin 10px;
	//     overflow: hidden;
	//     font-size: 12px;
	//     p {
	//       line-height: 1.5;
	//       color: $grayColor;
	//       overflow: hidden;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .top-tips
	//     em.i !
	//     p 请尽快完善您的详细信息，信息完善后，即可在平台内采购您需要的商品
	// </template>
	//
	// <script lang='babel'>

	// </script>
	"use strict";

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div class=\"top-tips\"><em class=\"i\">!</em><p>请尽快完善您的详细信息，信息完善后，即可在平台内采购您需要的商品</p></div>";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(39)
	__vue_script__ = __webpack_require__(40)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\getRegion.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(41)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-59a65e3e/getRegion.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 39 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   .select-wrapper {
	//     select {
	//       width: 32%;
	//       margin-right: 1%;
	//       &:last-child {
	//         margin-right: 0;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .select-wrapper
	//     select(
	//       ref='province',
	//       @change='getCity(0, $event)'
	//     )
	//       option(value='0') 请选择
	//       option(
	//         v-for='(item, index) in addressRegions',
	//         v-text='item.region_label',
	//         :key='item.region_id',
	//         :value='item.region_id',
	//       )
	//     select(
	//       ref='city',
	//       v-if='cities.length > 0',
	//       @change='getDistrict(0, $event)'
	//     )
	//       option(value='0') 请选择
	//       option(
	//         v-for='(item, index) in cities',
	//         v-text='item.region_label',
	//         :key='item.region_id',
	//         :value='item.region_id',
	//       )
	//     select(
	//       ref='district',
	//       v-if='districts.length > 0',
	//       @change='setRegion(0, $event)'
	//     )
	//       option(value='0') 请选择
	//       option(
	//         v-for='(item, index) in districts',
	//         v-text='item.region_label',
	//         :key='item.region_id',
	//         :value='item.region_id',
	//       )
	// </template>
	// <script lang='babel'>
	exports.default = {
	  props: ['provinceId', 'cityId', 'countyId'],
	  data: function data() {
	    return {
	      cities: [],
	      districts: [],

	      pId: 0,
	      cId: 0,
	      dId: 0
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['addressRegions'])),
	  methods: {
	    setRegionId: function setRegionId(id) {
	      var regionId = this.dId || this.cId || this.pId;
	      this.$emit('region-event', regionId);
	    },
	    getCity: function getCity(id, $el) {
	      var _this = this;

	      this.pId = id || +$el.target.value;
	      this.dId = 0;
	      this.cId = 0;
	      this.districts = [];
	      if (this.pId) {
	        this.addressRegions.map(function (item) {
	          if (_this.pId === +item.region_id) {
	            _this.cities = item.child || [];
	          }
	        });
	      } else {
	        this.cities = [];
	      }
	      this.setRegionId();
	    },
	    getDistrict: function getDistrict(id, $el) {
	      var _this2 = this;

	      this.cId = id || +$el.target.value;
	      this.dId = 0;
	      if (this.cId) {
	        this.cities.map(function (item) {
	          if (_this2.cId === +item.region_id) {
	            _this2.districts = item.child || [];
	          }
	        });
	      } else {
	        this.districts = [];
	      }
	      this.setRegionId();
	    },
	    setRegion: function setRegion(id, $el) {
	      this.dId = id || +$el.target.value;
	      this.setRegionId();
	    },
	    editProvince: function editProvince() {
	      var _this3 = this;

	      if (!this.$refs.province) return;
	      var provinceId = +this.provinceId;
	      if (provinceId) {
	        this.getCity(provinceId);
	        this.addressRegions.map(function (item, index) {
	          if (item.region_id == provinceId) {
	            _this3.$refs.province.selectedIndex = index + 1;
	            _this3.$nextTick(function () {
	              _this3.editCity();
	            });
	          }
	        });
	      }
	    },
	    editCity: function editCity() {
	      var _this4 = this;

	      if (!this.$refs.city) return;
	      var cityId = +this.cityId;
	      if (cityId) {
	        this.getDistrict(cityId);
	        this.cities.map(function (item, index) {
	          if (item.region_id == cityId) {
	            _this4.$refs.city.selectedIndex = index + 1;
	            _this4.$nextTick(function () {
	              _this4.editCounty();
	            });
	          }
	        });
	      }
	    },
	    editCounty: function editCounty() {
	      var _this5 = this;

	      var countyId = +this.countyId;
	      if (countyId) {
	        this.setRegion(countyId);
	        this.districts.map(function (item, index) {
	          if (item.region_id == countyId) {
	            _this5.$refs.district.selectedIndex = index + 1;
	          }
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.$store.dispatch('getRegionList');
	    self.DD.bus.$on('address-edit', this.editProvince);
	  }
	};
	// </script>

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<div class=\"select-wrapper\"><select ref=\"province\" @change=\"getCity(0, $event)\"><option value=\"0\">请选择</option><option v-for=\"(item, index) in addressRegions\" v-text=\"item.region_label\" :key=\"item.region_id\" :value=\"item.region_id\"></option></select><select ref=\"city\" v-if=\"cities.length &gt; 0\" @change=\"getDistrict(0, $event)\"><option value=\"0\">请选择</option><option v-for=\"(item, index) in cities\" v-text=\"item.region_label\" :key=\"item.region_id\" :value=\"item.region_id\"></option></select><select ref=\"district\" v-if=\"districts.length &gt; 0\" @change=\"setRegion(0, $event)\"><option value=\"0\">请选择</option><option v-for=\"(item, index) in districts\" v-text=\"item.region_label\" :key=\"item.region_id\" :value=\"item.region_id\"></option></select></div>";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(43)
	__vue_script__ = __webpack_require__(44)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\uploadFile.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(45)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-66348494/uploadFile.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 43 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   .upload-wrapper {
	//     position: absolute;
	//     left: 0;
	//     top: 0;
	//     width: 100%;
	//     height: 100%;
	//     background-color: rgba(0, 0, 0, .5);
	//     overflow: hidden;
	//     .file {
	//       position: absolute;
	//       left: 0;
	//       top: 0;
	//       width: 100%;
	//       height: 100%;
	//       z-index: 2;
	//       opacity: 0.02;
	//     }
	//     .text {
	//       text-align: center;
	//       color: #fff;
	//       /*width: (51px/2);
	//       height: (44px/2);*/
	//       position: absolute;
	//       left: 0;
	//       top: 50%;
	//       width: 100%;
	//       margin-top: (-44px/4) + 10px;
	//     }
	//     img {
	//       display: block;
	//       width: 100%;
	//       height: 100%;
	//       position: relative;
	//       z-index: 1;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .upload-wrapper
	//     input.file(
	//       @change='upload($event)',
	//       type="file"
	//     )
	//     em.icon-camera
	//     p.text(
	//       v-text='text'
	//     )
	//     img(
	//       v-if='imgSrc',
	//       :src='imgSrc'
	//     )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['text', 'url', 'image'],
	  data: function data() {
	    return {
	      imgSrc: ''
	    };
	  },

	  methods: {
	    upload: function upload($event) {
	      var _this = this;

	      self.DD.upload($event.target, function (result) {
	        _this.imgSrc = result.image;
	        _this.$emit('upload-event', result.media, _this.imgSrc);
	      });
	    }
	  },
	  mounted: function mounted() {
	    if (this.image) {
	      this.imgSrc = this.image;
	    }
	  }
	};
	// </script>

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "<div class=\"upload-wrapper\"><input @change=\"upload($event)\" type=\"file\" class=\"file\"/><em class=\"icon-camera\"></em><p v-text=\"text\" class=\"text\"></p><img v-if=\"imgSrc\" :src=\"imgSrc\"/></div>";

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "<div :class=\"{&quot;reset-info&quot;: modify}\" class=\"wrapper user-form-wrapper register-info\"><p v-if=\"modify\" class=\"pass-wrapper\"><span class=\"icon-pass-outer\"><em class=\"icon-pass\"></em></span><span>注册成功</span></p><top-tips></top-tips><form v-if=\"submitToggle\" @submit.prevent=\"next\"><div class=\"items\"><span class=\"title\">买家名称</span><input v-model=\"body.company_name\" type=\"text\" placeholder=\"请输入买家名称\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">买家简称</span><input v-model=\"body.company_short_name\" type=\"text\" placeholder=\"请输入买家简称\" class=\"input\"/></div><div class=\"separate\"><div class=\"items\"><span class=\"title\">联系人</span><input v-model=\"body.linkman\" type=\"text\" placeholder=\"请输入联系人姓名\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">联系电话</span><input v-model=\"body.linkman_phone\" type=\"tel\" maxlength=\"11\" placeholder=\"请输入联系电话\" class=\"input\"/></div></div><div class=\"separate\"><div class=\"items\"><span class=\"title\">城市/地区</span><div class=\"con choice-city\"><get-region :region-id=\"body.region_id\" :province-id=\"provinceId\" :city-id=\"cityId\" :county-id=\"countyId\" @region-event=\"setRegionId\"></get-region></div></div><div class=\"items\"><span class=\"title\">详情地址</span><input v-model=\"body.street\" type=\"text\" placeholder=\"例：复兴镇中心小区6号楼618\" class=\"input\"/></div></div><button :disabled=\"disabled\" class=\"btn-submit\">下一步</button><p class=\"options\"><a @click=\"logout\" class=\"forget\">切换账号</a></p></form><form v-else=\"v-else\" @submit.prevent=\"submit\" class=\"submit\"><p class=\"title\">营业执照</p><div class=\"business\"><upload-file :text=\"&quot;点击添加营业执照&quot;\" :url=\"body.business_license\" :image=\"business_license_image\" @upload-event=\"setLicense\"></upload-file></div><p class=\"title\">法人身份证</p><div class=\"ids\"><div class=\"ids-front\"><upload-file :text=\"&quot;点击添加身份证正面&quot;\" :url=\"body.identity_card_1\" :image=\"identity_card_1_image\" @upload-event=\"setCardFront\"></upload-file></div><div class=\"ids-back\"><upload-file :text=\"&quot;点击添加身份证反面&quot;\" :url=\"body.identity_card_2\" :image=\"identity_card_2_image\" @upload-event=\"setCartBack\"></upload-file></div></div><button :disabled=\"submitDisabled\" class=\"btn-submit\">提交</button></form><tips></tips></div>";

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(48)
	__vue_template__ = __webpack_require__(49)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7693e6e1/agreement.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 48 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "<div transition=\"slide\" class=\"wrapper agreement-wrapper\"><iframe src=\"/website/agreement?role=buyer\" frameborder=\"0\"></iframe></div>";

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(51)
	__vue_script__ = __webpack_require__(52)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\pending.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(53)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-666558a4/pending.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 51 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Tips: _tips2.default
	  },
	  methods: {
	    logout: function logout() {
	      this.$store.dispatch('logout', {
	        callback: function () {
	          self.home.reviewStatus = '';
	          this.$router.replace({
	            name: 'login'
	          });
	        }.bind(this)
	      });
	    }
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .pending-wrapper {
	//     text-align: center;
	//     padding-top: 75px;
	//     background-color: #fff;
	//     height: 100%;
	//     p {
	//       margin-top: 20px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.pending-wrapper
	//     em.icon-trial
	//     p 您提交的资料正在审核，请耐心等待!
	//     button.btn-submit(@click='logout') 退出登录
	//     tips
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper pending-wrapper\"><em class=\"icon-trial\"></em><p>您提交的资料正在审核，请耐心等待!</p><button @click=\"logout\" class=\"btn-submit\">退出登录</button><tips></tips></div>";

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(55)
	__vue_script__ = __webpack_require__(56)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\unpass.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(57)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1ba9163a/unpass.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 55 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Tips: _tips2.default
	  },
	  data: function data() {
	    return {
	      reason: self.home.reviewReason
	    };
	  },

	  methods: {
	    logout: function logout() {
	      this.$store.dispatch('logout', {
	        callback: function () {
	          self.home.reviewStatus = '';
	          this.$router.replace({
	            name: 'login'
	          });
	        }.bind(this)
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.$store.dispatch('getRegionList');
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .pending-wrapper {
	//     text-align: center;
	//     padding-top: 75px;
	//     background-color: #fff;
	//     height: 100%;
	//     & > p {
	//       margin-top: 20px;
	//     }
	//     .reason {
	//       display: inline-block;
	//       padding: 15px $margin 10px;
	//       overflow: hidden;
	//       font-size: 12px;
	//       p {
	//         margin-top: 0;
	//         line-height: 1.5;
	//         color: $grayColor;
	//         overflow: hidden;
	//         text-align: left;
	//       }
	//     }
	//     .btn-submit {
	//       line-height: 45px;
	//     }
	//     .options {
	//       overflow: hidden;
	//       padding: 0 $margin;
	//       color: $grayColor;
	//     }
	//     .forget {
	//       float: right;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.pending-wrapper
	//     em.icon-unpass
	//     p 非常抱歉! 您提交的资料并未审核通过!
	//     .reason
	//       em.i !
	//       p(v-text='"原因：" + reason')
	//     router-link.btn-submit(:to='{name: "registerInfo", query: {modify: 1}}') 修改资料
	//     .options
	//       a.forget(@click='logout') 切换账号
	//     tips
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper pending-wrapper\"><em class=\"icon-unpass\"></em><p>非常抱歉! 您提交的资料并未审核通过!</p><div class=\"reason\"><em class=\"i\">!</em><p v-text=\"&quot;原因：&quot; + reason\"></p></div><router-link :to=\"{name: &quot;registerInfo&quot;, query: {modify: 1}}\" class=\"btn-submit\">修改资料</router-link><div class=\"options\"><a @click=\"logout\" class=\"forget\">切换账号</a></div><tips></tips></div>";

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(59)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\findPassWord.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(60)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1b8256e6/findPassWord.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _code = __webpack_require__(26);

	var _code2 = _interopRequireDefault(_code);

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template lang='jade'>
	//   .wrapper.user-form-wrapper
	//     form(
	//       @submit.prevent='submit'
	//     )
	//       .items
	//         span.title 手机号
	//         input.input(
	//           v-model='body.mobile',
	//           type="tel",
	//           maxlength='11',
	//           placeholder="请输入手机号码"
	//         )
	//       .items
	//         span.title 验证码
	//         input.input(
	//           v-model='body.valid_code',
	//           type="text",
	//           maxlength='6',
	//           placeholder=""
	//         )
	//         get-code(
	//           :mobile='body.mobile',
	//           :type='"forgotpassword"'
	//         )
	//       div.separate
	//         .items
	//           span.title 密码
	//           input.input(
	//             v-model='body.password',
	//             type="password",
	//             maxlength='15',
	//             placeholder="请输入密码"
	//           )
	//         .items.separate-left
	//           span.title 确认密码
	//           input.input(
	//             v-model='body.repwd',
	//             type="password",
	//             maxlength='15',
	//             placeholder="请确认密码"
	//           )
	//       button.btn-submit(
	//         :disabled='disabled'
	//       ) 提交
	//     tips
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  components: {
	    GetCode: _code2.default,
	    Tips: _tips2.default
	  },
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'find_customer_password',
	        is_buyer: 1,
	        is_seller: 0,
	        mobile: '',
	        password: '',
	        repwd: '',
	        valid_code: ''
	      },
	      disabled: true
	    };
	  },

	  watch: {
	    body: {
	      handler: 'verification',
	      deep: true
	    }
	  },
	  methods: {
	    verification: function verification() {
	      var b = this.body;
	      if (/^1[345678]{1}\d{9}$/.test(b.mobile) && b.valid_code.length === 6 && b.password && b.repwd) {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }
	    },
	    submit: function submit() {
	      var _this = this;

	      if (this.body.repwd != this.body.password) {
	        self.toast('两次输入的密码不一致哟~');
	      } else {
	        this.disabled = true;
	        self.DD.post(this.body, function (data) {
	          _this.disabled = false;
	          if (data.result === 'success') {
	            _this.$router.push({
	              name: 'login'
	            });
	          } else {
	            self.toast(data.info.errmsg);
	          }
	        });
	      }
	    }
	  }
	};
	// </script>

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper user-form-wrapper\"><form @submit.prevent=\"submit\"><div class=\"items\"><span class=\"title\">手机号</span><input v-model=\"body.mobile\" type=\"tel\" maxlength=\"11\" placeholder=\"请输入手机号码\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">验证码</span><input v-model=\"body.valid_code\" type=\"text\" maxlength=\"6\" placeholder=\"\" class=\"input\"/><get-code :mobile=\"body.mobile\" :type=\"&quot;forgotpassword&quot;\"></get-code></div><div class=\"separate\"><div class=\"items\"><span class=\"title\">密码</span><input v-model=\"body.password\" type=\"password\" maxlength=\"15\" placeholder=\"请输入密码\" class=\"input\"/></div><div class=\"items separate-left\"><span class=\"title\">确认密码</span><input v-model=\"body.repwd\" type=\"password\" maxlength=\"15\" placeholder=\"请确认密码\" class=\"input\"/></div></div><button :disabled=\"disabled\" class=\"btn-submit\">提交</button></form><tips></tips></div>";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(62)
	__vue_script__ = __webpack_require__(63)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\info.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(64)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-fd2364b2/info.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 62 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .user-info-wrapper {
	//     margin-top: 10px;
	//     @include borderTop;
	//     .layout {
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       .item {
	//         display: block;
	//         padding: 10px $margin;
	//         position: relative;
	//         overflow: hidden;
	//         @include borderTop;
	//         &:last-child {
	//           @include borderBottom;
	//         }
	//         .title {
	//           float: left;
	//           em {
	//             margin-left: 3px;
	//           }
	//         }
	//         .con {
	//           padding-right: 15px;
	//           overflow: hidden;
	//           text-align: right;
	//           color: $darkenGrayColor;
	//         }
	//       }
	//     }
	//     .star {
	//       color: $mainColor;
	//     }
	//     .head-image {
	//       $size: 60px;
	//       width: $size;
	//       height: $size;
	//       border-radius: 3*$size;
	//       overflow: hidden;
	//       display: block;
	//       float: right;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .tips {
	//       margin: 0 $margin;
	//       .star {
	//         margin-right: 3px;
	//       }
	//     }
	//     .file {
	//       position: absolute;
	//       left: 0;
	//       top: 0;
	//       width: 100%;
	//       height: 100%;
	//       z-index: 2;
	//       opacity: 0.02;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     .wrapper.user-info-wrapper
	//       .layout
	//         a.item
	//           span.title(style='line-height: 60px') 买家头像
	//           .con
	//             span.head-image(
	//               v-if='userInfo.buyer_avatar',
	//               :style='{backgroundImage: "url(" + userInfo.buyer_avatar + ")"}'
	//             )
	//           input.file(
	//             @change='upload($event)',
	//             type="file"
	//           )
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoName"}'
	//         )
	//           span.title 买家名称
	//           .con(v-text='userInfo.company_name')
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoShorthand"}'
	//         )
	//           span.title 买家简称
	//           .con(v-text='userInfo.company_short_name')
	//           em.icon-more
	//       .layout
	//         router-link.item(
	//           :to='{name: "userInfoMobile"}'
	//         )
	//           span.title 联系电话
	//           .con {{userInfo.linkman_phone | mobile}}
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoStreet"}'
	//         )
	//           span.title
	//             label 运营地址
	//             em.star *
	//           .con(v-text='userInfo.operation_address_street')
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoLinkman"}'
	//         )
	//           span.title 公司联系人
	//           .con(v-text='userInfo.linkman')
	//           em.icon-more
	//       .layout
	//         router-link.item(
	//           :to='{name: "userInfoLicense"}'
	//         )
	//           span.title
	//             label 营业执照
	//             em.star *
	//           .con
	//             span(v-if='userInfo.business_license') 已上传
	//             span(v-else) 未上传
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoPerson"}'
	//         )
	//           span.title
	//             label 企业法人
	//             em.star *
	//           .con
	//             span(
	//               v-if='userInfo.legal_person',
	//               v-text='userInfo.legal_person'
	//             )
	//           em.icon-more
	//         router-link.item(
	//           :to='{name: "userInfoIds"}'
	//         )
	//           span.title
	//             label 法人身份证
	//           .con
	//             span(v-if='userInfo.identity_card_1 && userInfo.identity_card_2') 已上传
	//             span(v-else) 未上传
	//           em.icon-more
	//       p.tips
	//         em.star *
	//         span 项要通过运营后台审核通过后才能完成修改
	//     transition(name='slide')
	//       router-view
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'set_buyer_avatar',
	        avatar: ''
	      }
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['userInfo'])),
	  methods: {
	    upload: function upload($event) {
	      var _this = this;

	      self.DD.loading();
	      self.DD.upload($event.target, function (result) {
	        _this.$store.dispatch('setUserHeadImg', {
	          avatar: result.media,
	          fullAvatar: result.image
	        });
	      });
	    }
	  },
	  created: function created() {
	    this.$store.dispatch('getUserInfo');
	  }
	};
	// </script>

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<div><div class=\"wrapper user-info-wrapper\"><div class=\"layout\"><a class=\"item\"><span style=\"line-height: 60px\" class=\"title\">买家头像</span><div class=\"con\"><span v-if=\"userInfo.buyer_avatar\" :style=\"{backgroundImage: &quot;url(&quot; + userInfo.buyer_avatar + &quot;)&quot;}\" class=\"head-image\"></span></div><input @change=\"upload($event)\" type=\"file\" class=\"file\"/><em class=\"icon-more\"></em></a><router-link :to=\"{name: &quot;userInfoName&quot;}\" class=\"item\"><span class=\"title\">买家名称</span><div v-text=\"userInfo.company_name\" class=\"con\"></div><em class=\"icon-more\"></em></router-link><router-link :to=\"{name: &quot;userInfoShorthand&quot;}\" class=\"item\"><span class=\"title\">买家简称</span><div v-text=\"userInfo.company_short_name\" class=\"con\"></div><em class=\"icon-more\"></em></router-link></div><div class=\"layout\"><router-link :to=\"{name: &quot;userInfoMobile&quot;}\" class=\"item\"><span class=\"title\">联系电话</span><div class=\"con\">{{userInfo.linkman_phone | mobile}}</div><em class=\"icon-more\"></em></router-link><router-link :to=\"{name: &quot;userInfoStreet&quot;}\" class=\"item\"><span class=\"title\"><label>运营地址</label><em class=\"star\">*</em></span><div v-text=\"userInfo.operation_address_street\" class=\"con\"></div><em class=\"icon-more\"></em></router-link><router-link :to=\"{name: &quot;userInfoLinkman&quot;}\" class=\"item\"><span class=\"title\">公司联系人</span><div v-text=\"userInfo.linkman\" class=\"con\"></div><em class=\"icon-more\"></em></router-link></div><div class=\"layout\"><router-link :to=\"{name: &quot;userInfoLicense&quot;}\" class=\"item\"><span class=\"title\"><label>营业执照</label><em class=\"star\">*</em></span><div class=\"con\"><span v-if=\"userInfo.business_license\">已上传</span><span v-else=\"v-else\">未上传</span></div><em class=\"icon-more\"></em></router-link><router-link :to=\"{name: &quot;userInfoPerson&quot;}\" class=\"item\"><span class=\"title\"><label>企业法人</label><em class=\"star\">*</em></span><div class=\"con\"><span v-if=\"userInfo.legal_person\" v-text=\"userInfo.legal_person\"></span></div><em class=\"icon-more\"></em></router-link><router-link :to=\"{name: &quot;userInfoIds&quot;}\" class=\"item\"><span class=\"title\"><label>法人身份证</label></span><div class=\"con\"><span v-if=\"userInfo.identity_card_1 &amp;&amp; userInfo.identity_card_2\">已上传</span><span v-else=\"v-else\">未上传</span></div><em class=\"icon-more\"></em></router-link></div><p class=\"tips\"><em class=\"star\">*</em><span>项要通过运营后台审核通过后才能完成修改</span></p></div><transition name=\"slide\"><router-view></router-view></transition></div>";

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(66)
	__vue_script__ = __webpack_require__(67)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\edit.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(68)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-535f6dfa/edit.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .user-info-edit-wrapper {
	//     position: absolute;
	//     left: 0;
	//     top: 0;
	//     width: 100%;
	//     min-height: 100%;
	//     background-color: $bgColor;
	//     z-index: 4;
	//     @include borderTop;
	//     .input-wrapper {
	//       position: relative;
	//       overflow: hidden;
	//       background-color: #fff;
	//       @include border($bdrz: 0);
	//       .input {
	//         width: 100%;
	//         padding: 0 10px;
	//         margin: 10px 0;
	//         height: $inputHeight - 5px;
	//       }
	//     }
	//     .btn-submit {
	//       margin-top: 10px;
	//     }
	//     form {
	//       margin-top: 10px;
	//     }
	//     .upload-container {
	//       margin: 10px $margin;
	//       .tips {
	//         margin-bottom: 10px;
	//         overflow: hidden;
	//         p {
	//           overflow: hidden;
	//         }
	//       }
	//       .image-wrapper {
	//         position: relative;
	//         padding-top: 60%;
	//         background: url(/src/images/business.jpg) 50% 50% no-repeat;
	//         -webkit-background-size: cover;
	//         background-size: cover;
	//         & + .image-wrapper {
	//           margin-top: 10px;
	//         }
	//       }
	//       .file {
	//         position: absolute;
	//         left: 0;
	//         top: 0;
	//         width: 100%;
	//         height: 100%;
	//         z-index: 2;
	//         opacity: 0.02;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.user-info-edit-wrapper
	//     .upload-container(
	//       v-if='module === "business_license" || module === "identity_card_1"'
	//     )
	//       .tips
	//         em.i !
	//         p 点击图片重新上传
	//       .ids-wrapper(v-if='module === "identity_card_1"')
	//         .image-wrapper(
	//           :style='{backgroundImage: "url(" + images + ")"}'
	//         )
	//           input.file(
	//             @change='upload("ids1", $event)',
	//             type="file"
	//           )
	//         .image-wrapper(
	//           :style='{backgroundImage: "url(" + images2 + ")"}'
	//         )
	//           input.file(
	//             @change='upload("ids2", $event)',
	//             type="file"
	//           )
	//       .image-wrapper(
	//         v-else,
	//         :style='{backgroundImage: "url(" + images + ")"}'
	//       )
	//         input.file(
	//           @change='upload("license", $event)',
	//           type="file"
	//         )
	//       button.btn-submit(
	//         :disabled='disabled',
	//         @click='submit',
	//         v-text='text'
	//       )
	//     form(
	//       v-else,
	//       @submit.prevent='submit'
	//     )
	//       .input-wrapper
	//         input.input(
	//           v-if='module === "linkman_phone"',
	//           type='tel',
	//           :placeholder='placeholder',
	//           v-model='value'
	//         )
	//         textarea.input(
	//           v-else,
	//           :placeholder='placeholder',
	//           v-model='value'
	//         )
	//       button.btn-submit(
	//         :disabled='disabled',
	//         v-text='text'
	//       )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      body: {
	        api: 'customer',
	        method: 'change_buyer_info'
	      },
	      module: '',
	      placeholder: '',
	      text: '保存',
	      review: false,
	      disabled: true,

	      images: '/src/images/business.jpg',
	      images2: '/src/images/business.jpg'
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['userInfo']), {
	    value: {
	      get: function get() {
	        return this.userInfo[this.module];
	      },
	      set: function set(value) {
	        this.$store.dispatch('updateUserInfo', {
	          key: this.module,
	          value: value
	        });
	      }
	    },
	    images: function images() {
	      if (this.module === 'business_license') {
	        return this.userInfo.business_license_image;
	      } else if (this.module === 'identity_card_1') {
	        return this.userInfo.identity_card_1_image;
	      }
	    },
	    images2: function images2() {
	      return this.userInfo.identity_card_2_image;
	    }
	  }),
	  watch: {
	    value: function value(val) {
	      if (val !== '') {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }
	    }
	  },
	  methods: {
	    submit: function submit() {
	      var _this = this;

	      if (this.module !== 'identity_card_1') {
	        this.body[this.module] = this.value;
	      }
	      this.disabled = true;
	      this.text = '正在保存...';
	      if (this.value === self.DD.userInfo[this.module] && this.module !== 'identity_card_1') {
	        this.$router.push({
	          name: 'userInfo'
	        });
	        return false;
	      }

	      self.DD.post(this.body, function (data) {
	        if (data.result === 'success') {
	          if (_this.review) {
	            self.toast('信息修改成功, 请等待审核~');
	          } else {
	            self.DD.userInfo[_this.module] = _this.value;
	            _this.$store.dispatch('updateUserInfo', {
	              key: _this.module,
	              value: _this.value
	            });
	          }
	          _this.$router.push({
	            name: 'userInfo'
	          });
	        } else {
	          _this.disabled = false;
	          _this.text = '保存', self.toast(data.info.errmsg);
	        }
	      });
	    },
	    upload: function upload(type, $event) {
	      var _this2 = this;

	      self.DD.loading();
	      self.DD.upload($event.target, function (result) {
	        if (type === 'ids1') {
	          _this2.$store.dispatch('updateUserInfo', {
	            key: 'identity_card_1_image',
	            value: result.image
	          });
	          _this2.body.identity_card_1 = result.media;
	        } else if (type === 'ids2') {
	          _this2.$store.dispatch('updateUserInfo', {
	            key: 'identity_card_2_image',
	            value: result.image
	          });
	          _this2.body.identity_card_2 = result.media;
	        } else {
	          _this2.$store.dispatch('updateUserInfo', {
	            key: 'business_license',
	            value: result.media
	          });
	          _this2.$store.dispatch('updateUserInfo', {
	            key: 'business_license_image',
	            value: result.image
	          });
	        }
	        self.DD.loading(false);
	      });
	    }
	  },
	  beforeMount: function beforeMount() {
	    this.module = this.$route.meta.field;
	    this.review = this.$route.meta.review;
	    this.placeholder = this.$route.meta.placeholder;
	  }
	};
	// </script>

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper user-info-edit-wrapper\"><div v-if=\"module === &quot;business_license&quot; || module === &quot;identity_card_1&quot;\" class=\"upload-container\"><div class=\"tips\"><em class=\"i\">!</em><p>点击图片重新上传</p></div><div v-if=\"module === &quot;identity_card_1&quot;\" class=\"ids-wrapper\"><div :style=\"{backgroundImage: &quot;url(&quot; + images + &quot;)&quot;}\" class=\"image-wrapper\"><input @change=\"upload(&quot;ids1&quot;, $event)\" type=\"file\" class=\"file\"/></div><div :style=\"{backgroundImage: &quot;url(&quot; + images2 + &quot;)&quot;}\" class=\"image-wrapper\"><input @change=\"upload(&quot;ids2&quot;, $event)\" type=\"file\" class=\"file\"/></div></div><div v-else=\"v-else\" :style=\"{backgroundImage: &quot;url(&quot; + images + &quot;)&quot;}\" class=\"image-wrapper\"><input @change=\"upload(&quot;license&quot;, $event)\" type=\"file\" class=\"file\"/></div><button :disabled=\"disabled\" @click=\"submit\" v-text=\"text\" class=\"btn-submit\"></button></div><form v-else=\"v-else\" @submit.prevent=\"submit\"><div class=\"input-wrapper\"><input v-if=\"module === &quot;linkman_phone&quot;\" type=\"tel\" :placeholder=\"placeholder\" v-model=\"value\" class=\"input\"/><textarea v-else=\"v-else\" :placeholder=\"placeholder\" v-model=\"value\" class=\"input\"></textarea></div><button :disabled=\"disabled\" v-text=\"text\" class=\"btn-submit\"></button></form></div>";

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(70)
	__vue_script__ = __webpack_require__(71)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\set.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(72)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c9c4ff0e/set.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 70 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .user-info-wrapper {
	//
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     .wrapper.user-info-wrapper
	//       .layout
	//         router-link.item(
	//           :to='{name: "message"}'
	//         )
	//           span.title 意见反馈
	//           em.icon-more
	//         a.item(
	//           href='/website/about.html'
	//         )
	//           span.title 关于我们
	//           em.icon-more
	//       a.btn-logout(@click='logout') 退出登录
	//     router-view(transition='slide')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  methods: {
	    logout: function logout() {
	      this.$store.dispatch('logout', {
	        callback: function () {
	          self.home.reviewStatus = '';
	          this.$router.replace({
	            name: 'login'
	          });
	        }.bind(this)
	      });
	    }
	  }
	};
	// </script>

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "<div><div class=\"wrapper user-info-wrapper\"><div class=\"layout\"><router-link :to=\"{name: &quot;message&quot;}\" class=\"item\"><span class=\"title\">意见反馈</span><em class=\"icon-more\"></em></router-link><a href=\"/website/about.html\" class=\"item\"><span class=\"title\">关于我们</span><em class=\"icon-more\"></em></a></div><a @click=\"logout\" class=\"btn-logout\">退出登录</a></div><router-view transition=\"slide\"></router-view></div>";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(74)
	__vue_script__ = __webpack_require__(75)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\message.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(76)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5667121e/message.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 74 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// <style lang='sass'>
	//   @import "../../scss/variable";
	//   @import "../../scss/line";
	//   .message-wrapper {
	//     padding-top: 10px;
	//     .tta {
	//       position: relative;
	//       overflow: hidden;
	//       width: 100%;
	//       @include border($bdrz: 0);
	//     }
	//     textarea {
	//       padding: 10px;
	//       width: 100%;
	//       height: 200px;
	//       display: block;
	//     }
	//     .tips {
	//       position: absolute;
	//       right: 10px;
	//       bottom: 5px;
	//       color: $darkenGrayColor;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.message-wrapper
	//     form(@submit.prevent="submitMessage")
	//       .tta
	//         textarea(
	//           v-model='body.content',
	//           maxlength='300',
	//           @input='limitText'
	//           placeholder='请添加您的反馈意见'
	//         )
	//         .tips
	//           span 还可输入
	//           em(v-text='limit')
	//           span 字符
	//       button.btn-submit(
	//         :disabled='disabled'
	//       ) 确认提交
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      limit: 300,
	      disabled: true,
	      body: {
	        api: 'system',
	        method: 'feedback',
	        content: ''
	      }
	    };
	  },

	  watch: _defineProperty({}, 'body.content', function bodyContent(val) {
	    if (val.trim().length) {
	      this.disabled = false;
	    } else {
	      this.disabled = true;
	    }
	  }),
	  methods: {
	    limitText: function limitText() {
	      this.limit = 300 - this.body.content.length;
	    },
	    submitMessage: function submitMessage() {
	      var _this = this;

	      this.disabled = true;
	      self.DD.post(this.body, function (data) {
	        _this.disabled = false;
	        if (data.result === 'success') {
	          self.toast('提交成功，谢谢您的反馈！', {
	            callback: function () {
	              this.$router.replace({ name: 'set' });
	            }.bind(_this)
	          });
	        } else {
	          self.toast('提交失败');
	        }
	      });
	    }
	  }
	};
	// </script>

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper message-wrapper\"><form @submit.prevent=\"submitMessage\"><div class=\"tta\"><textarea v-model=\"body.content\" maxlength=\"300\" @input=\"limitText\" placeholder=\"请添加您的反馈意见\"></textarea><div class=\"tips\"><span>还可输入</span><em v-text=\"limit\"></em><span>字符</span></div></div><button :disabled=\"disabled\" class=\"btn-submit\">确认提交</button></form></div>";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(78)
	__vue_script__ = __webpack_require__(79)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\collection.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(80)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-94925a52/collection.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 78 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 79 */
/***/ function(module, exports) {

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .collection-wrapper {
	//     .tab-title {
	//       text-align: center;
	//       font-size: 0;
	//       margin-bottom: 10px;
	//       background-color: #fff;
	//       a {
	//         display: inline-block;
	//         width: 50%;
	//       }
	//       span {
	//         position: relative;
	//         display: inline-block;
	//         font-size: 14px;
	//         height: 45px;
	//         line-height: 43px;
	//         &:before {
	//           content: '';
	//           position: absolute;
	//           height: 3px;
	//           left: 0;
	//           bottom: 0;
	//           width: 100%;
	//         }
	//       }
	//       .active {
	//         color: $mainColor;
	//         span:before {
	//           background-color: $mainColor;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.collection-wrapper
	//     .tab-title
	//       router-link.goods(
	//         :to='{name: "myCollectionGoods"}'
	//       )
	//         span 商品收藏
	//       router-link.shop(
	//         :to='{name: "myCollectionShop"}'
	//       )
	//         span 店铺收藏
	//     router-view
	// </template>
	//
	// <script lang='babel'>

	// </script>
	"use strict";

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper collection-wrapper\"><div class=\"tab-title\"><router-link :to=\"{name: &quot;myCollectionGoods&quot;}\" class=\"goods\"><span>商品收藏</span></router-link><router-link :to=\"{name: &quot;myCollectionShop&quot;}\" class=\"shop\"><span>店铺收藏</span></router-link></div><router-view></router-view></div>";

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(82)
	__vue_script__ = __webpack_require__(83)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\collectionGoods.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(96)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c1140422/collectionGoods.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 82 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .collection-goods-item {
	//     .item {
	//       position: relative;
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//     }
	//     .shop-info {
	//       position: relative;
	//       display: block;
	//       padding: 10px $margin;
	//       em,span {
	//         vertical-align: middle;
	//         margin-right: 5px;
	//       }
	//     }
	//     .goods-info {
	//       position: relative;
	//     }
	//     .goods {
	//       display: block;
	//       padding: 10px $margin;
	//       overflow: hidden;
	//       position: relative;
	//       @include borderTop;
	//     }
	//     .topic {
	//       float: left;
	//       width: 80px;
	//       height: 80px;
	//       margin-right: 10px;
	//       background-position: 50% 50%;
	//       background-repeat: no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name {
	//       @include ellipsis;
	//     }
	//     .sub-title {
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//       color: $priceColor;
	//     }
	//     .price {
	//       position: absolute;
	//       left: 90px;
	//       bottom: 10px;
	//       margin-left: $margin;
	//       font-size: 16px;
	//     }
	//     .add-carts,
	//     .options {
	//       position: absolute;
	//       bottom: 0;
	//       z-index: 1;
	//       padding: 10px;
	//     }
	//     .options {
	//       right: 0;
	//       height: 30px;
	//       line-height: 25px;
	//       em {
	//         $size: 8px;
	//         display: inline-block;
	//         width: $size;
	//         height: $size;
	//         border-radius: 30px;
	//         margin-right: 3px;
	//         background-color: #e5e5e5;
	//       }
	//     }
	//     .add-carts {
	//       right: 55px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     not-found(v-if='items.length === 0')
	//       p 您还未收藏过商品哟!
	//     ul.collection-goods-item(v-if='items.length > 0')
	//       li.item(v-for='(item, index) in items')
	//         a.shop-info
	//           em.icon-shop
	//           span(v-text='item.store_name')
	//         .goods-info
	//           router-link.goods(
	//             :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
	//             :data-id='item.store_product_entity_id'
	//           )
	//             span.topic(
	//               :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
	//             )
	//             h3.name(v-text='item.product_name')
	//             p.sub-title(v-text='item.store_product_sub_title')
	//             p.price(v-text='"¥" + item.store_product_final_price')
	//           a.add-carts(
	//             @click='addToCarts(item)'
	//           )
	//             em.icon-add-carts
	//           a.options(
	//             @click='activeCollectionGoods({ vm: item, index: index })'
	//           )
	//             em
	//             em
	//             em
	//     site-cart(v-if='items.length > 0')
	//     cancel-collection-toast(
	//       v-if='toastToggle',
	//     )
	// </template>
	//
	// <script lang='babel'>


	var _siteCart = __webpack_require__(84);

	var _siteCart2 = _interopRequireDefault(_siteCart);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	var _cancelCollectionToast = __webpack_require__(92);

	var _cancelCollectionToast2 = _interopRequireDefault(_cancelCollectionToast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    SiteCart: _siteCart2.default,
	    NotFound: _notFound2.default,
	    CancelCollectionToast: _cancelCollectionToast2.default
	  },
	  data: function data() {
	    return {
	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters({
	    items: 'goodsCollectionList',
	    toastToggle: 'goodsCollectionToastToggle'
	  })),
	  methods: _extends({}, Vuex.mapActions(['addToCarts', 'getCollctionGoods', 'activeCollectionGoods']), {
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getCollctionGoods(this);
	        }
	      }
	    }
	  }),
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.collection-wrapper');
	    this.getCollctionGoods(this);
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(85)
	__vue_script__ = __webpack_require__(86)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\carts\\siteCart.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(87)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5bbdab98/siteCart.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 85 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .site-view-carts {
	//     padding: 8px;
	//     border: 1px solid $mainColor;
	//     position: fixed;
	//     right: 10px;
	//     bottom: 90px;
	//     z-index: 1;
	//     border-radius: 60px;
	//     background-color: #fff;
	//     em {
	//       width: 23px;
	//       height: 23px;
	//       margin: 0 auto;
	//       display: block;
	//     }
	//     .num {
	//       position: absolute;
	//       background-color: #fd4d3e;
	//       color: #fff;
	//       min-width: 13px;
	//       height: 13px;
	//       padding: 1px 2px 2px;
	//       border-radius: 50px;
	//       text-align: center;
	//       font-size: 12px;
	//       top: -3px;
	//       left: 50%;
	//       pointer-events: none;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   router-link.site-view-carts.active(:to='{name: "cart"}')
	//     em.icon-carts
	//     label.num {{cartsCount | maxNum}}
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters(['cartsCount'])),
	  mounted: function mounted() {
	    /**
	    * 第一次打开页面时购物车数量是由PHP变量返回，所以第一次需要把这个数量传给 vuex
	    * 只是在第一次打开页面需要执行一次就OK啦
	    */
	    if (!self.home.first_cart_num) {
	      self.home.first_cart_num = true;
	      this.$store.dispatch('setCartsCount', self.home.cart_num);
	    }
	  }
	};
	// </script>

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "<router-link :to=\"{name: &quot;cart&quot;}\" class=\"site-view-carts active\"><em class=\"icon-carts\"></em><label class=\"num\">{{cartsCount | maxNum}}</label></router-link>";

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(89)
	__vue_script__ = __webpack_require__(90)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\notFound.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(91)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-8a7aab70/notFound.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 89 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 90 */
/***/ function(module, exports) {

	// <style lang='sass'>
	//   .not-found {
	//     text-align: center;
	//     padding: 50px;
	//     font-size: 14px;
	//     $color: #fff;
	//     .icon-not-found {
	//       display: block;
	//       margin: 0 auto;
	//       width: 54px;
	//       height: 54px;
	//       border-radius: 200px;
	//       margin-bottom: 10px;
	//       background-color: #d1d2d4;
	//     }
	//     .border {
	//       display: inline-block;
	//       width: 25px;
	//       height: 30px;
	//       margin-top: 10px;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       border: 1px solid $color;
	//     }
	//     .line {
	//       margin-top: 5px;
	//       display: inline-block;
	//       width: 15px;
	//       height: 16px;
	//       border-top: 1px solid $color;
	//       border-bottom: 1px solid $color;
	//       position: relative;
	//       &:before {
	//         content: '';
	//         position: absolute;
	//         left: 0;
	//         top: 50%;
	//         width: 100%;
	//         border-top: 1px solid $color;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .not-found
	//     .icon-not-found
	//       span.border
	//         em.line
	//     slot
	// </template>
	//
	// <script lang='babel'>

	// </script>
	"use strict";

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = "<div class=\"not-found\"><div class=\"icon-not-found\"><span class=\"border\"><em class=\"line\"></em></span></div><slot></slot></div>";

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(93)
	__vue_script__ = __webpack_require__(94)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\cancelCollectionToast.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(95)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-740ef426/cancelCollectionToast.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 93 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .cancel-toast-wrapper {
	//     position: fixed;
	//     left: 0;
	//     bottom: 0;
	//     width: 100%;
	//     z-index: 6;
	//     background-color: #fff;
	//     text-align: center;
	//     padding: 20px 0 70px;
	//     a {
	//       display: inline-block;
	//       &:first-child {
	//         margin-right: 20px;
	//       }
	//     }
	//     p {
	//       margin-top: 5px;
	//     }
	//     .icon-wrapper {
	//       position: relative;
	//       display: inline-block;
	//       width: 50px;
	//       height: 50px;
	//       padding-top: 13px;
	//       box-sizing: border-box;
	//       border-radius: 3px;
	//       font-size: 0;
	//       @include border($borderColor: #999);
	//     }
	//     .btn-cancel {
	//       background-color: $mainColor;
	//       position: absolute;
	//       bottom: 0;
	//       right: 0;
	//       padding: 15px;
	//       width: 100%;
	//       color: #fff;
	//       font-size: 16px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     .mask(@click='activeCollectionGoods')
	//     .cancel-toast-wrapper
	//       a(@click='toggleCollectionGoods({ id: product.store_product_entity_id })')
	//         span.icon-wrapper.cancel-collection
	//           em.icon-shop-cancel-collect2
	//         p 取消收藏
	//       router-link(:to='{ name: "shop", params: { shopId: product.store_product_store_id } }')
	//         span.icon-wrapper.view-shop
	//           em.icon-goto-shop
	//         p 进入店铺
	//       a.btn-cancel(@click='activeCollectionGoods') 取消
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters({
	    product: 'activeGoodsCollection'
	  })),
	  methods: _extends({}, Vuex.mapActions(['activeCollectionGoods', 'toggleCollectionGoods']))
	};
	// </script>

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = "<div><div @click=\"activeCollectionGoods\" class=\"mask\"></div><div class=\"cancel-toast-wrapper\"><a @click=\"toggleCollectionGoods({ id: product.store_product_entity_id })\"><span class=\"icon-wrapper cancel-collection\"><em class=\"icon-shop-cancel-collect2\"></em></span><p>取消收藏</p></a><router-link :to=\"{ name: &quot;shop&quot;, params: { shopId: product.store_product_store_id } }\"><span class=\"icon-wrapper view-shop\"><em class=\"icon-goto-shop\"></em></span><p>进入店铺</p></router-link><a @click=\"activeCollectionGoods\" class=\"btn-cancel\">取消</a></div></div>";

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = "<div><not-found v-if=\"items.length === 0\"><p>您还未收藏过商品哟!</p></not-found><ul v-if=\"items.length &gt; 0\" class=\"collection-goods-item\"><li v-for=\"(item, index) in items\" class=\"item\"><a class=\"shop-info\"><em class=\"icon-shop\"></em><span v-text=\"item.store_name\"></span></a><div class=\"goods-info\"><router-link :to=\"{name: &quot;goodsInfo&quot;, params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}\" :data-id=\"item.store_product_entity_id\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h3 v-text=\"item.product_name\" class=\"name\"></h3><p v-text=\"item.store_product_sub_title\" class=\"sub-title\"></p><p v-text=\"&quot;¥&quot; + item.store_product_final_price\" class=\"price\"></p></router-link><a @click=\"addToCarts(item)\" class=\"add-carts\"><em class=\"icon-add-carts\"></em></a><a @click=\"activeCollectionGoods({ vm: item, index: index })\" class=\"options\"><em></em><em></em><em></em></a></div></li></ul><site-cart v-if=\"items.length &gt; 0\"></site-cart><cancel-collection-toast v-if=\"toastToggle\"></cancel-collection-toast></div>";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(98)
	__vue_script__ = __webpack_require__(99)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\collectionShop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(100)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c9872126/collectionShop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 98 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .collection-shop-item {
	//     .item {
	//       position: relative;
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//     }
	//     .shop-info {
	//       display: block;
	//       padding: 10px 110px 10px $margin;
	//       overflow: hidden;
	//     }
	//     .topic {
	//       float: left;
	//       width: 50px;
	//       height: 50px;
	//       margin-right: 10px;
	//       background-position: 50% 50%;
	//       background-repeat: no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name {
	//       overflow: hidden;
	//     }
	//     .btn-cancel-collection {
	//       position: absolute;
	//       right: $margin;
	//       top: 50%;
	//       z-index: 1;
	//       -webkit-transform: translateY(-50%);
	//       transform: translateY(-50%);
	//       padding: 6px 10px 7px;
	//       line-height: 1;
	//       background-color: #fff;
	//       border-radius: 3px;
	//       @include border($borderColor: #999);
	//       em {
	//         vertical-align: middle;
	//         margin-right: 3px;
	//       }
	//       span {
	//         vertical-align: middle;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   ul.collection-shop-item(v-if='items && items.length > 0')
	//     li.item(v-for='(item, index) in items')
	//       router-link.shop-info(:to='{name: "shop", params: {shopId: item.entity_id}}')
	//         span.topic(:style='{backgroundImage: "url(" + item.logo + ")"}')
	//         h3.name(v-text='item.store_name')
	//       a.btn-cancel-collection(@click='toggleCollectionShop({ id: item.entity_id, index: index })')
	//         em.icon-shop-cancel-collect
	//         span 取消收藏
	//   not-found(v-else)
	//     p 您还未收藏过店铺哟!
	// </template>
	//
	// <script lang='babel'>


	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters({
	    items: 'shopCollectionList'
	  })),
	  methods: _extends({}, Vuex.mapActions(['toggleCollectionShop', 'getCollectionShop']), {
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getCollectionShop(this);
	        }
	      }
	    }
	  }),
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.collection-wrapper');
	    this.getCollectionShop(this);
	  }
	};
	// </script>

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "<ul v-if=\"items &amp;&amp; items.length &gt; 0\" class=\"collection-shop-item\"><li v-for=\"(item, index) in items\" class=\"item\"><router-link :to=\"{name: &quot;shop&quot;, params: {shopId: item.entity_id}}\" class=\"shop-info\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.logo + &quot;)&quot;}\" class=\"topic\"></span><h3 v-text=\"item.store_name\" class=\"name\"></h3></router-link><a @click=\"toggleCollectionShop({ id: item.entity_id, index: index })\" class=\"btn-cancel-collection\"><em class=\"icon-shop-cancel-collect\"></em><span>取消收藏</span></a></li></ul><not-found v-else=\"v-else\"><p>您还未收藏过店铺哟!</p></not-found>";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(102)
	__vue_script__ = __webpack_require__(103)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user\\myAmount.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(104)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-e33902c6/myAmount.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 102 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      items: [],
	      amount: 0,
	      totalRows: 0,

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  methods: {
	    getAmountList: function getAmountList() {
	      var _this = this;

	      var body = {
	        api: 'customer',
	        method: 'get_buyer_amount_logs',
	        page: +this.page + 1
	      };
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          if (_this.loadingEl) {
	            _this.loadingEl.style.display = 'none';
	          }
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page === 0) {
	            _this.amount = data.info.amount;
	            _this.items = data.info.item;
	            _this.totalRows = data.info.total_rows;
	          } else {
	            _this.items = _this.items.concat(data.info.item);
	          }
	          _this.page = data.info.page;
	          _this.pageCount = data.info.pageCount;

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getAmountList();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.my-amount-wrapper');
	    self.DD.loading();
	    this.getAmountList();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .my-amount-wrapper {
	//     .header {
	//       height: 160px;
	//       line-height: 160px;
	//       color: #fff;
	//       text-align: center;
	//       background: #2cb49a;
	//       background: -webkit-linear-gradient(-135deg, #2cb49a 0%, #7393a6 85%);
	//       background: -webkit-linear-gradient(225deg, #2cb49a 0%, #7393a6 85%);
	//       background: linear-gradient(-135deg, #2cb49a 0%, #7393a6 85%);
	//       font-size: 42px;
	//     }
	//     dt {
	//       color: $grayColor;
	//       padding: 15px 10px 10px;
	//     }
	//     dd {
	//       position: relative;
	//       padding: 10px;
	//       background-color: #fff;
	//       @include borderBottom;
	//     }
	//     h4 {
	//       margin-bottom: 5px;
	//     }
	//     p {
	//       font-size: 12px;
	//       color: $darkenGrayColor;
	//     }
	//     .icon {
	//       position: absolute;
	//       right: 10px;
	//       top: 0;
	//       bottom: 0;
	//       height: 15px;
	//       margin: auto 0;
	//       color: $priceColor;
	//       &.green {
	//         color: $mainColor;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.my-amount-wrapper
	//     .header {{amount | formatAmount}}
	//     dl(v-if='items.length > 0')
	//       dt 近期流水记录
	//       dd(v-for='item in items')
	//         h4(v-text='item.type_name')
	//         p(v-text='item.created_at')
	//         span.icon(
	//           :class='{green: item.type == "1"}',
	//           v-text='item.money'
	//         )
	//     not-found(v-else)
	//       p 您还没有零钱记录哟~
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper my-amount-wrapper\"><div class=\"header\">{{amount | formatAmount}}</div><dl v-if=\"items.length &gt; 0\"><dt>近期流水记录</dt><dd v-for=\"item in items\"><h4 v-text=\"item.type_name\"></h4><p v-text=\"item.created_at\"></p><span :class=\"{green: item.type == &quot;1&quot;}\" v-text=\"item.money\" class=\"icon\"></span></dd></dl><not-found v-else=\"v-else\"><p>您还没有零钱记录哟~</p></not-found></div>";

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ORDERS = undefined;

	var _index = __webpack_require__(106);

	var _index2 = _interopRequireDefault(_index);

	var _online = __webpack_require__(122);

	var _online2 = _interopRequireDefault(_online);

	var _info = __webpack_require__(126);

	var _info2 = _interopRequireDefault(_info);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ORDERS = exports.ORDERS = [{
	  path: '/order',
	  name: 'myOrderAll',
	  component: _index2.default,
	  redirect: '/order/0',
	  meta: {
	    title: '我的订单'
	  }
	}, {
	  path: '/order/:status',
	  name: 'myOrder',
	  component: _index2.default,
	  meta: {
	    title: '我的订单'
	  }
	}, {
	  path: '/order/online/:status',
	  name: 'online',
	  component: _online2.default,
	  meta: {
	    title: '我的订单'
	  }
	}, {
	  path: '/order/info/:orderId/:incrementId',
	  name: 'orderInfo',
	  component: _info2.default,
	  meta: {
	    title: '订单详情'
	  }
	}];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(107)
	__vue_script__ = __webpack_require__(108)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\order\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(121)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6518dbcc/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 107 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .order-wrapper {
	//     padding: 49px 0 50px;
	//     .tab-box{
	//       width: 100%;
	//       background-color: #fff;
	//       overflow: hidden;
	//       position: fixed;
	//       top: 0;
	//       left: 0;
	//       z-index: 2;
	//       font-size: 0;
	//       text-align: center;
	//       @include borderBottom;
	//       .item {
	//         display: inline-block;
	//         line-height: 50px;
	//         position: relative;
	//         width: (100% / 6);
	//         font-size: 14px;
	//         &.active {
	//           color: $mainColor;
	//           z-index: 2;
	//           &:before {
	//             content: '';
	//             height: 3px;
	//             background-color: $mainColor;
	//             position: absolute;
	//             left: 0;
	//             bottom: -1px;
	//             width: 100%;
	//           }
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.order-wrapper
	//     nav.tab-box
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 0}}" replace
	//       ) 全部
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 1}}" replace
	//       ) 待付款
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 2}}" replace
	//       ) 待发货
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 3}}" replace
	//       ) 待收货
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 4}}" replace
	//       ) 已完成
	//       router-link.item(
	//         :to="{name: 'myOrder', params: {status: 5}}" replace
	//       ) 退货
	//     item(
	//       v-if='totalRows > 0',
	//       v-for='orderShop in orderList',
	//       :order-shop='orderShop',
	//       @shop-checked-event='changeShopChecked(orderShop)',
	//       :status='status'
	//     )
	//     payment(
	//       v-if='totalRows > 0 && status == 1',
	//       @order-list-event='initAttrChecked',
	//       :count='count',
	//       :order-list='orderList'
	//     )
	//     not-found(v-if='totalRows == 0')
	//       p 你还没有相关的订单!
	//     nav-bar
	//     modal(
	//       v-if='modalToggle'
	//     )
	//       p(slot='content') 确认订单收货?
	// </template>
	//
	// <script lang='babel'>


	var _item = __webpack_require__(109);

	var _item2 = _interopRequireDefault(_item);

	var _payment = __webpack_require__(113);

	var _payment2 = _interopRequireDefault(_payment);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	var _navBar = __webpack_require__(10);

	var _navBar2 = _interopRequireDefault(_navBar);

	var _modal = __webpack_require__(117);

	var _modal2 = _interopRequireDefault(_modal);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	exports.default = {
	  components: {
	    Item: _item2.default,
	    NotFound: _notFound2.default,
	    NavBar: _navBar2.default,
	    Modal: _modal2.default,
	    Payment: _payment2.default
	  },
	  data: function data() {
	    return {
	      orderList: [],
	      status: 0,
	      totalRows: 0,

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null,

	      count: 0
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['modalToggle'])),
	  watch: _defineProperty({}, '$route', function $route() {
	    this.status = this.$route.params.status || 0;
	    this.getOrderList(true);
	  }),
	  methods: _extends({}, Vuex.mapActions(['hideModal']), {
	    changeShopChecked: function changeShopChecked(shop) {
	      Vue.set(shop, 'checked', !shop.checked);
	    },
	    initAttrChecked: function initAttrChecked(checked) {
	      var totalPrice = 0;
	      var number = checked ? this.count : 0;
	      this.orderList.map(function (item) {
	        Vue.set(item, 'checked', checked);
	        if (checked) {
	          totalPrice += self.Number(item.grand_total);
	        }
	      });
	      this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
	    },
	    getOrderList: function getOrderList() {
	      var _this = this;

	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // 如果 type 存在说明执行的 click 事件, 需要将分页重置为 第一页
	      if (type) {
	        this.page = 0;
	        this.loadingEl = null;
	        self.document.body.scrollTop = 0;
	        // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
	        self.document.removeEventListener('scroll', this.next);
	      }
	      var statusArr = ['', 'pending_payment', 'pending_shipment', 'pending_receiving', 'complete'];
	      var body = _extends({}, apis.GET_ORDER_LIST);
	      body.page = this.page + 1;
	      body.status = statusArr[this.status];
	      if (this.status == 5) {
	        body.method = 'get_buyer_refund_order_items';
	      }

	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          if (_this.loadingEl && _this.loadingEl.parentElement) {
	            _this.scrollEl.removeChild(_this.loadingEl);
	          }
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page === 0) {
	            _this.orderList = data.info.items;
	          } else {
	            _this.orderList = _this.orderList.concat(data.info.items);
	          }

	          _this.totalRows = data.info.total_rows;
	          _this.page = data.info.page;
	          _this.pageCount = data.info.pageCount;

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }

	          if (_this.status == 1) {
	            _this.count = _this.orderList.length;
	          } else {
	            _this.count = 0;
	          }
	          _this.initAttrChecked(false);
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getOrderList();
	        }
	      }
	    }
	  }),
	  created: function created() {
	    this.status = this.$route.params.status || 0;
	  },
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.order-wrapper');
	    this.getOrderList();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	    this.hideModal();
	  }
	};
	// </script>

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(110)
	__vue_script__ = __webpack_require__(111)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\order\\item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(112)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-21a4fe89/item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 110 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .order-shop {
	//     background-color: #fff;
	//     margin-bottom: 10px;
	//     position: relative;
	//     @include borderBottom;
	//     .shop-info,
	//     .goods-info {
	//       display: block;
	//       position: relative;
	//     }
	//     .shop-info {
	//       padding: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//     }
	//     .goods-list {
	//       @include borderBottom;
	//     }
	//     .icon-shop {
	//       vertical-align: middle;
	//       margin-right: 5px;
	//     }
	//     .shop-name {
	//       vertical-align: middle;
	//       position: relative;
	//       padding-right: 30px;
	//       span {
	//         display: inline-block;
	//         overflow: hidden;
	//         white-space: nowrap;
	//         text-overflow: ellipsis;
	//         vertical-align: bottom;
	//         max-width: 68%;
	//       }
	//       em {
	//         position: static;
	//         @include arrow($size: 7px, $borderColor: #666);
	//       }
	//     }
	//     .order-state {
	//       position: absolute;
	//       top: 10px;
	//       right: 10px;
	//       color: #E60012;
	//     }
	//     .goods {
	//       display: block;
	//       position: relative;
	//       padding: 10px 10px 10px 90px;
	//       min-height: 70px;
	//       color: $grayColor;
	//       border-top: 3px solid $bgColor;
	//       &:first-child {
	//         border-top: 0 none;
	//       }
	//     }
	//     .topic {
	//       position: absolute;
	//       left: 10px;
	//       top: 50%;
	//       -webkit-transform: translateY(-50%);
	//       transform: translateY(-50%);
	//       width: 70px;
	//       height: 70px;
	//       background-position: 50% 50%;
	//       background-repeat: no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .goods-name{
	//       font-size: inherit;
	//       padding-right: 10px;
	//       margin-bottom: 5px;
	//       @include ellipsis;
	//     }
	//     .goods-price {
	//       float: right;
	//     }
	//     .goods-num {
	//       position: absolute;
	//       right: 10px;
	//       top: 50px;
	//     }
	//     .order-price {
	//       position: relative;
	//       text-align: right;
	//       @include borderTop;
	//       padding: 10px;
	//       strong {
	//         color: $priceColor;
	//       }
	//     }
	//     .discount-total {
	//       color: $grayColor;
	//       margin-bottom: 5px;
	//     }
	//     .btn-box {
	//       padding: 10px;
	//       position: relative;
	//       text-align: right;
	//       @include borderTop;
	//       a {
	//         display: inline-block;
	//         position: relative;
	//         padding: 5px 10px;
	//         border-radius: 3px;
	//         overflow: hidden;
	//         margin-left: 10px;
	//         color: $mainColor;
	//         @include border($borderColor: $mainColor);
	//       }
	//     }
	//     &.merge-pay {
	//       .shop-info {
	//         padding-left: 40px;
	//       }
	//       &:last-of-type {
	//         margin-bottom: 60px;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.order-shop(
	//     :class='{"merge-pay": status == 1}'
	//   )
	//     a.icon-big-check(
	//       v-if='status == 1',
	//       :data-checked='orderShop.checked',
	//       :data-grand_total='orderShop.grand_total',
	//       :class='{active: orderShop.checked}',
	//       @click='toggleChecked(orderShop.grand_total)'
	//     )
	//       em.icon-cart-check
	//     router-link.shop-info(
	//       :to='{name: "shop", params: {shopId: orderShop.store_id}}'
	//     )
	//       em.icon-shop
	//       span.shop-name
	//         span(v-text='orderShop.store_info.store_name')
	//         em
	//       span.order-state(v-text='orderShop.status_label')
	//     router-link.goods-info(
	//       :to="{name: 'orderInfo', params: {orderId: orderShop.entity_id, incrementId: orderShop.increment_id}}"
	//     )
	//       .goods(
	//         v-for='goods in orderShop.items',
	//         :class='{"carts-activity-tags": goods.activity_tags && goods.activity_tags.length > 0}'
	//       )
	//         span.topic(:style = '{backgroundImage: "url(" + goods.product_info.default_media_gallery_thumb + ")"}')
	//         span.goods-price(
	//           v-if='goods.product_original_price',
	//           v-text='"¥" + goods.product_original_price'
	//         )
	//         span.goods-num(v-text='"×" + goods.ordered_qty')
	//         h5.goods-name(v-text='goods.product_name')
	//         .activity-tags(v-if='goods.activity_tags')
	//           span(
	//             v-for='tag in goods.activity_tags',
	//             v-text='tag.sell_tag'
	//           )
	//       .order-price
	//         .discount-total(v-text='"优惠合计: -¥" + orderShop.discount_amount')
	//         .order-sum
	//           span 实付金额:
	//           strong(v-text='"¥" + orderShop.grand_total')
	//     .btn-box(v-if='showStatus(orderShop)')
	//       a(
	//         v-if='orderShop.status === "pending_payment"',
	//         v-text='"付款"',
	//         @click='pay(orderShop.entity_id)'
	//       )
	//       a(
	//         v-if='orderShop.status === "closed" || orderShop.status === "canceled" || orderShop.status === "complete"',
	//         v-text='"再次购买"',
	//         @click='buyAgain'
	//       )
	//       a(
	//         v-if='orderShop.status === "pending_receiving" && (!orderShop.refund_info || (orderShop.refund_info && orderShop.refund_info.refund_status !== "pending"))',
	//         v-text='"确认收货"',
	//         @click='toggleModal({ type: "confirmReceipt", params: { id: orderShop.entity_id } })'
	//       )
	// </template>
	//
	// <script lang='babel'>


	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  props: ['status', 'orderShop'],
	  computed: _extends({}, Vuex.mapGetters(['payPrice', 'payCount'])),
	  data: function data() {
	    return {
	      orderIds: []
	    };
	  },

	  methods: _extends({}, Vuex.mapActions(['toggleModal']), {
	    showStatus: function showStatus(_t) {
	      // this.orderShop.refund_info:
	      // null - 没有申请过退货
	      // status:
	      // pending - 退货审核中 - 什么都不显示
	      // denied - 拒绝退货 - 显示'再次购买'按钮
	      // approve - 同意退货 - 什么都不显示

	      if (_t.refund_info && _t.refund_info.refund_status == 'pending') {
	        return false;
	      }
	      switch (_t.status) {
	        // 待支付 - 显示'付款'按钮
	        case "pending_payment":
	          return true;
	        // 待发货 - 什么都不显示
	        case "pending_shipment":
	          return false;
	        // 待收货 - 显示'确认收货'按钮
	        case "pending_receiving":
	          return true;
	        // 已完成 - 显示'再次购买'按钮
	        case "complete":
	          return true;
	        // 已退货 - 什么都不显示
	        case "refunded":
	          return false;
	        // 已取消 - 显示'再次购买'按钮
	        case "canceled":
	          return true;
	        // 已关闭 - 显示'再次购买'按钮
	        case "closed":
	          return true;
	      }

	      return true;
	    },
	    pay: function pay(orderId) {
	      this.orderIds.push(orderId);
	      self.location.href = '/pay?order_ids=' + this.orderIds.join(',');
	    },
	    toggleChecked: function toggleChecked(price) {
	      this.$emit('shop-checked-event');
	      var totalPrice = this.payPrice;
	      var number = this.payCount;
	      if (this.orderShop.checked) {
	        number += 1;
	        totalPrice += self.Number(price);
	      } else {
	        number -= 1;
	        totalPrice -= self.Number(price);
	      }
	      this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
	    },

	    // 再次购买
	    buyAgain: function buyAgain() {
	      if (+this.orderShop.store_info.starting_price > +this.orderShop.base_grand_total) {
	        self.toast('购买商品不满足起送金额哟, 请重新选择吧!');
	        return;
	      }

	      var goods = {};
	      self.sessionStorage.clear();
	      this.orderShop.items.map(function (item) {
	        if (item.is_gift) return;
	        goods[item.store_product_id] = item.ordered_qty;
	      });
	      self.sessionStorage.setItem('goods', self.JSON.stringify(goods));
	      self.sessionStorage.setItem('buyNow', true);
	      this.$router.push({
	        name: 'confirm'
	      });
	    }
	  })
	};
	// </script>

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "<section :class=\"{&quot;merge-pay&quot;: status == 1}\" class=\"order-shop\"><a v-if=\"status == 1\" :data-checked=\"orderShop.checked\" :data-grand_total=\"orderShop.grand_total\" :class=\"{active: orderShop.checked}\" @click=\"toggleChecked(orderShop.grand_total)\" class=\"icon-big-check\"><em class=\"icon-cart-check\"></em></a><router-link :to=\"{name: &quot;shop&quot;, params: {shopId: orderShop.store_id}}\" class=\"shop-info\"><em class=\"icon-shop\"></em><span class=\"shop-name\"><span v-text=\"orderShop.store_info.store_name\"></span><em></em></span><span v-text=\"orderShop.status_label\" class=\"order-state\"></span></router-link><router-link :to=\"{name: 'orderInfo', params: {orderId: orderShop.entity_id, incrementId: orderShop.increment_id}}\" class=\"goods-info\"><div v-for=\"goods in orderShop.items\" :class=\"{&quot;carts-activity-tags&quot;: goods.activity_tags &amp;&amp; goods.activity_tags.length &gt; 0}\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + goods.product_info.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><span v-if=\"goods.product_original_price\" v-text=\"&quot;¥&quot; + goods.product_original_price\" class=\"goods-price\"></span><span v-text=\"&quot;×&quot; + goods.ordered_qty\" class=\"goods-num\"></span><h5 v-text=\"goods.product_name\" class=\"goods-name\"></h5><div v-if=\"goods.activity_tags\" class=\"activity-tags\"><span v-for=\"tag in goods.activity_tags\" v-text=\"tag.sell_tag\"></span></div></div><div class=\"order-price\"><div v-text=\"&quot;优惠合计: -¥&quot; + orderShop.discount_amount\" class=\"discount-total\"></div><div class=\"order-sum\"><span>实付金额:</span><strong v-text=\"&quot;¥&quot; + orderShop.grand_total\"></strong></div></div></router-link><div v-if=\"showStatus(orderShop)\" class=\"btn-box\"><a v-if=\"orderShop.status === &quot;pending_payment&quot;\" v-text=\"&quot;付款&quot;\" @click=\"pay(orderShop.entity_id)\"></a><a v-if=\"orderShop.status === &quot;closed&quot; || orderShop.status === &quot;canceled&quot; || orderShop.status === &quot;complete&quot;\" v-text=\"&quot;再次购买&quot;\" @click=\"buyAgain\"></a><a v-if=\"orderShop.status === &quot;pending_receiving&quot; &amp;&amp; (!orderShop.refund_info || (orderShop.refund_info &amp;&amp; orderShop.refund_info.refund_status !== &quot;pending&quot;))\" v-text=\"&quot;确认收货&quot;\" @click=\"toggleModal({ type: &quot;confirmReceipt&quot;, params: { id: orderShop.entity_id } })\"></a></div></section>";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(114)
	__vue_script__ = __webpack_require__(115)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\order\\payment.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(116)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-15615a80/payment.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 114 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//
	// </style>
	//
	// <template lang='jade'>
	//   .footer-settle
	//     a.icon-big-check(
	//       :class='{"active": count === payCount}',
	//       @click='checkAll'
	//     )
	//       em.icon-cart-check
	//       span 全选
	//     em 总计:
	//     span.price {{payPrice | formatAmount}}
	//     a.btn-settle(
	//       @click='pay'
	//     ) 合并付款
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['count', 'orderList'],
	  computed: _extends({}, Vuex.mapGetters(['payPrice', 'payCount'])),
	  methods: {
	    checkAll: function checkAll() {
	      if (this.payCount !== this.count) {
	        this.$emit('order-list-event', true);
	      } else {
	        this.$emit('order-list-event', false);
	      }
	    },
	    pay: function pay() {
	      var orderIds = [];
	      this.orderList.map(function (item) {
	        if (item.checked) {
	          orderIds.push(item.entity_id);
	        }
	      });
	      if (orderIds.length < 1) {
	        self.toast('请先选择要付款的订单哟~');
	        return;
	      }
	      self.location.href = '/pay?order_ids=' + orderIds.join(',');
	    }
	  },
	  created: function created() {
	    this.$store.dispatch('setOrderPay');
	  }
	};
	// </script>

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = "<div class=\"footer-settle\"><a :class=\"{&quot;active&quot;: count === payCount}\" @click=\"checkAll\" class=\"icon-big-check\"><em class=\"icon-cart-check\"></em><span>全选</span></a><em>总计:</em><span class=\"price\">{{payPrice | formatAmount}}</span><a @click=\"pay\" class=\"btn-settle\">合并付款</a></div>";

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(118)
	__vue_script__ = __webpack_require__(119)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\modal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(120)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-f56220b8/modal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 118 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import "../../scss/variable";
	//   @import "../../scss/css3Module";
	//   @import "../../scss/line";
	//   .modal-mask {
	//     z-index: 9;
	//     position: fixed;
	//     left: 0;
	//     top: 0;
	//     height: 100%;
	//     width: 100%;
	//     display: table;
	//     background-color: rgba(0, 0, 0, .3);
	//     @include transition(opacity .3s ease);
	//     &.disabled {
	//       background-color: transparent;
	//     }
	//   }
	//   .modal-wrapper {
	//     display: table-cell;
	//     vertical-align: middle;
	//   }
	//   .modal-container {
	//     margin: 0 auto;
	//     width: 85%;
	//     border-radius: 5px;
	//     background-color: #fff;
	//     pointer-events: all;
	//     @include transition(all .3s ease);
	//   }
	//   .modal-content {
	//     line-height: 1.3;
	//     padding: 20px;
	//     text-align: center;
	//     position: relative;
	//     font-size: 16px;
	//     @include borderBottom;
	//   }
	//   .modal-footer {
	//     overflow: hidden;
	//     a {
	//       float: left;
	//       width: 50%;
	//       padding: 10px 0;
	//       text-align: center;
	//     }
	//     .btn-cancel {
	//       position: relative;
	//       @include borderRight;
	//     }
	//     &.btn-cancel-hide {
	//       .btn-confirm {
	//         width: 100%;
	//       }
	//     }
	//   }
	//   .modal-enter, .modal-leave-active {
	//     opacity: 0;
	//   }
	//   .modal-enter,
	//   .modal-leave-active {
	//     .modal-container{
	//       @include transform(scale(1.1));
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   transition(name='modal')
	//     .modal-mask
	//       .modal-wrapper
	//         section.modal-container(:class='modalOptions.className')
	//           header.modal-header
	//             slot(name='title')
	//           article.modal-content
	//             slot(name='content')
	//           footer.modal-footer(:class='{"btn-cancel-hide": modalOptions.hideCancelBtn}')
	//             a.btn-cancel(
	//               v-if='!modalOptions.hideCancelBtn',
	//               v-text='modalOptions.cancelText',
	//               @click='toggleModal'
	//             )
	//             a.btn-confirm(
	//               v-text='modalOptions.confirmText',
	//               @click='confirmHandler'
	//             )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters(['modalType', 'modalParams', 'modalOptions'])),
	  methods: _extends({}, Vuex.mapActions(['toggleModal']), {
	    confirmHandler: function confirmHandler() {
	      this.$store.dispatch(this.modalType, this.modalParams);
	      this.toggleModal();
	    }
	  })
	};
	// </script>

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = "<transition name=\"modal\"><div class=\"modal-mask\"><div class=\"modal-wrapper\"><section :class=\"modalOptions.className\" class=\"modal-container\"><header class=\"modal-header\"><slot name=\"title\"></slot></header><article class=\"modal-content\"><slot name=\"content\"></slot></article><footer :class=\"{&quot;btn-cancel-hide&quot;: modalOptions.hideCancelBtn}\" class=\"modal-footer\"><a v-if=\"!modalOptions.hideCancelBtn\" v-text=\"modalOptions.cancelText\" @click=\"toggleModal\" class=\"btn-cancel\"></a><a v-text=\"modalOptions.confirmText\" @click=\"confirmHandler\" class=\"btn-confirm\"></a></footer></section></div></div></transition>";

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper order-wrapper\"><nav class=\"tab-box\"><router-link :to=\"{name: 'myOrder', params: {status: 0}}\" replace=\"replace\" class=\"item\">全部</router-link><router-link :to=\"{name: 'myOrder', params: {status: 1}}\" replace=\"replace\" class=\"item\">待付款</router-link><router-link :to=\"{name: 'myOrder', params: {status: 2}}\" replace=\"replace\" class=\"item\">待发货</router-link><router-link :to=\"{name: 'myOrder', params: {status: 3}}\" replace=\"replace\" class=\"item\">待收货</router-link><router-link :to=\"{name: 'myOrder', params: {status: 4}}\" replace=\"replace\" class=\"item\">已完成</router-link><router-link :to=\"{name: 'myOrder', params: {status: 5}}\" replace=\"replace\" class=\"item\">退货</router-link></nav><item v-if=\"totalRows &gt; 0\" v-for=\"orderShop in orderList\" :order-shop=\"orderShop\" @shop-checked-event=\"changeShopChecked(orderShop)\" :status=\"status\"></item><payment v-if=\"totalRows &gt; 0 &amp;&amp; status == 1\" @order-list-event=\"initAttrChecked\" :count=\"count\" :order-list=\"orderList\"></payment><not-found v-if=\"totalRows == 0\"><p>你还没有相关的订单!</p></not-found><nav-bar></nav-bar><modal v-if=\"modalToggle\"><p slot=\"content\">确认订单收货?</p></modal></div>";

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(123)
	__vue_script__ = __webpack_require__(124)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\order\\online.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(125)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-07990b6e/online.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 123 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   .online-wrapper {
	//     .footer-settle {
	//       bottom: 0;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.online-wrapper
	//     item(
	//       v-for='orderShop in orderList',
	//       :order-shop='orderShop',
	//       @shop-checked-event='changeShopChecked(orderShop)',
	//       :status='1'
	//     )
	//     payment(
	//       @order-list-event='initAttrChecked',
	//       :count='count',
	//       :order-list='orderList'
	//     )
	// </template>
	//
	// <script lang='babel'>


	var _item = __webpack_require__(109);

	var _item2 = _interopRequireDefault(_item);

	var _payment = __webpack_require__(113);

	var _payment2 = _interopRequireDefault(_payment);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Item: _item2.default,
	    Payment: _payment2.default
	  },
	  data: function data() {
	    return {
	      orderList: [],
	      count: 1
	    };
	  },

	  methods: {
	    changeShopChecked: function changeShopChecked(shop) {
	      Vue.set(shop, 'checked', !shop.checked);
	    },
	    initAttrChecked: function initAttrChecked(checked) {
	      var totalPrice = 0;
	      var number = checked ? this.count : 0;
	      this.orderList.map(function (item) {
	        Vue.set(item, 'checked', checked);
	        if (checked) {
	          totalPrice += self.Number(item.grand_total);
	        }
	      });
	      this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
	    },
	    getOnlineOrder: function getOnlineOrder() {
	      var _this = this;

	      var body = _extends({}, apis.GET_ON_LINE_ORDER);
	      body.order_ids = self.JSON.parse(self.sessionStorage.getItem('onlineIds'));
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.orderList = data.info.items;
	          _this.count = _this.orderList.length;
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    }
	  },
	  created: function created() {
	    this.getOnlineOrder();
	  }
	};
	// </script>

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper online-wrapper\"><item v-for=\"orderShop in orderList\" :order-shop=\"orderShop\" @shop-checked-event=\"changeShopChecked(orderShop)\" :status=\"1\"></item><payment @order-list-event=\"initAttrChecked\" :count=\"count\" :order-list=\"orderList\"></payment></div>";

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(127)
	__vue_script__ = __webpack_require__(128)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\order\\info.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(129)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-33debab8/info.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 127 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .order-info-wrapper{
	//     padding-bottom: 50px;
	//     .order-sn {
	//       padding: 10px;
	//       margin: 10px 0;
	//       position: relative;
	//       background-color: #fff;
	//       @include borderTop;
	//       @include borderBottom;
	//       overflow: hidden;
	//       strong {
	//         float: right;
	//         color: $mainColor;
	//       }
	//     }
	//     .sub-title {
	//       color: $priceColor;
	//       font-size: 12px;
	//       padding-right: 30px;
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .goods {
	//       border-top: 0 none;
	//     }
	//     .goods-item {
	//       display: block;
	//       position: relative;
	//       @include borderTop;
	//       &:first-child {
	//         &:before {
	//           display: none;
	//         }
	//       }
	//     }
	//     .discount-amount {
	//       padding: 10px;
	//       position: relative;
	//       overflow: hidden;
	//       @include borderTop;
	//       span {
	//         color: $priceColor;
	//       }
	//       strong {
	//         float: right;
	//       }
	//     }
	//     .goods-info-price {
	//       position: relative;
	//       background-color: #fff;
	//       padding: 10px;
	//       text-align: right;
	//       overflow: hidden;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       .item {
	//         margin-bottom: 5px;
	//         &:last-child {
	//           font-size: 16px;
	//           margin-bottom: 0;
	//         }
	//       }
	//       .title {
	//         float: left;
	//       }
	//       strong {
	//         color: $priceColor;
	//       }
	//     }
	//     .pay-method,
	//     .remarks,
	//     .process {
	//       padding: 10px;
	//       background-color: #fff;
	//       position: relative;
	//       overflow: hidden;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       strong {
	//         float: right;
	//       }
	//
	//     }
	//     .remarks {
	//       p:first-child {
	//         margin-bottom: 5px;
	//       }
	//       .title {
	//         margin-right: 5px;
	//       }
	//     }
	//     .process {
	//       color: $darkenGrayColor;
	//       .express {
	//         span {
	//           margin-right: 5px;
	//         }
	//       }
	//     }
	//     .contact {
	//       background-color: #fff;
	//       font-size: 0;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       a {
	//         font-size: 14px;
	//         display: inline-block;
	//         padding: 10px 0;
	//         position: relative;
	//         text-align: center;
	//         width: 50%;
	//         em {
	//           $size: (34px/2);
	//           width: $size;
	//           height: $size;
	//           margin-right: 5px;
	//           vertical-align: middle;
	//         }
	//         span {
	//           vertical-align: middle;
	//         }
	//         &:first-child {
	//           @include borderRight($top: 5px, $bottom: 5px);
	//         }
	//       }
	//     }
	//     .refund {
	//       position: relative;
	//       background-color: #fff;
	//       padding: 10px;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       .title {
	//         position: relative;
	//         padding-left: 70px;
	//         margin-bottom: 10px;
	//         overflow: hidden;
	//         span {
	//           position: absolute;
	//           left: 0;
	//           top: 7px;
	//         }
	//         input {
	//           padding: 5px 10px;
	//           border: 1px solid $borderColor;
	//           width: 100%;
	//           pointer-events: none;
	//         }
	//         select {
	//           position: absolute;
	//           left: 70px;
	//           top: 0;
	//           bottom: 0;
	//           opacity: 0.01;
	//           width: 100%;
	//         }
	//       }
	//       textarea {
	//         padding: 5px 10px;
	//         border: 1px solid $borderColor;
	//         height: 80px;
	//         width: 100%;
	//       }
	//     }
	//     .refund-process {
	//       position: relative;
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       @include borderBottom;
	//       li {
	//         position: relative;
	//         padding: 10px;
	//         overflow: hidden;
	//         @include borderTop;
	//         .title {
	//           float: left;
	//           margin-right: 5px;
	//         }
	//         .con {
	//           overflow: hidden;
	//         }
	//       }
	//       .refuse {
	//         color: $priceColor;
	//       }
	//     }
	//     .cashback {
	//       background-color: #fff;
	//       position: relative;
	//       margin-bottom: 10px;
	//       padding: 10px 10px 10px 35px;
	//       @include borderTop;
	//       @include borderBottom;
	//       .icon-cashback {
	//         position: absolute;
	//         left: 10px;
	//         top: 0;
	//         bottom: 0;
	//         margin: auto 0;
	//       }
	//       .price {
	//         color: $priceColor;
	//         margin-bottom: 3px;
	//       }
	//       .tips {
	//         color: $darkenGrayColor;
	//         font-size: 12px;
	//       }
	//     }
	//   }
	//   .order-info-footer {
	//     position: fixed;
	//     left: 0;
	//     bottom: 0;
	//     width: 100%;
	//     background-color: #fff;
	//     text-align: right;
	//     z-index: 1;
	//     @include borderTop;
	//     a {
	//       display: inline-block;
	//       vertical-align: middle;
	//       padding: 5px 10px;
	//       margin: 10px 10px 7px 0;
	//       position: relative;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       @include border($borderColor: $grayColor);
	//     }
	//     .btn-again {
	//       color: $mainColor;
	//       &:before {
	//         border-color: $mainColor;
	//       }
	//     }
	//   }
	//   .fake-modal {
	//     .modal-content {
	//       text-align: left;
	//       font-size: 12px;
	//     }
	//     p {
	//       margin-bottom: 5px;
	//       text-indent: 2em;
	//       a {
	//         color: $mainColor;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.order-info-wrapper
	//     .order-sn
	//       span(v-text='"订单号: " + orderInfo.increment_id')
	//       strong(
	//         v-if='orderInfo.refund_info',
	//         v-text='orderInfo.refund_info.refund_status_label'
	//       )
	//       strong(
	//         v-else,
	//         v-text='orderInfo.status_label',
	//       )
	//     article.consignee-wrapper(v-if='!refund')
	//       em.icon-consignee.icon-36
	//       span 收货人信息
	//       a.consignee-info
	//         span.name(v-text='addressInfo.addressee')
	//         span.mobile(v-text='addressInfo.mobilephone')
	//         p(v-text='addressInfo.addressDetail')
	//     ul.refund-process(v-if='orderInfo.refund_info')
	//       li(v-if='orderInfo.refund_info.refund_reason')
	//         span.title 退货原因:
	//         .con(v-text='orderInfo.refund_info.refund_reason.reason')
	//       li
	//         span.title 退货备注:
	//         .con(v-text='orderInfo.refund_info.comment')
	//       li.refuse(v-if='orderInfo.refund_info.refund_status === "denied"')
	//         span.title 拒绝退货:
	//         .con(v-text='orderInfo.refund_info.note || "无"')
	//       li.refuse(v-if='orderInfo.refund_info.refund_status === "approve"')
	//         span.title 同意退货:
	//         .con(v-text='orderInfo.refund_info.note || "无"')
	//     section.order-shop
	//       //- :to='"/shop/" + storeInfo.entity_id + "/home"'
	//       router-link.shop-info(
	//         :to='{name: "shop", params: {shopId: storeInfo.entity_id}}'
	//       )
	//         em.icon-shop
	//         span.shop-name
	//           span(v-text='storeInfo.store_name')
	//         em.icon-more
	//       .goods-info
	//         a.goods-item(
	//           v-for='goods in goodsList',
	//           @click='viewGoodsInfo(storeInfo.entity_id, goods.store_product_id, goods.is_gift)'
	//         )
	//           .goods(
	//             :class='{"carts-activity-tags": goods.activity_tags && goods.activity_tags.length > 0}'
	//           )
	//             span.topic(:style = '{backgroundImage: "url(" + goods.product_info.default_media_gallery_thumb + ")"}')
	//             span.goods-price(
	//               v-if='goods.product_original_price',
	//               v-text='"¥" + goods.product_original_price'
	//             )
	//             span.goods-num(v-text='"×" + goods.ordered_qty')
	//             h5.goods-name(v-text='goods.product_info.product_name')
	//             p.sub-title(v-text='goods.product_info.store_product_sub_title')
	//             .activity-tags(v-if='goods.activity_tags')
	//               span(
	//                 v-for='tag in goods.activity_tags',
	//                 v-text='tag.sell_tag'
	//               )
	//           .discount-amount(v-if='!goods.is_gift')
	//             span(v-text='"优惠: -¥" + goods.item_discount_amount')
	//             strong(v-text='"小计: ¥" + goods.item_amount')
	//     ul.goods-info-price
	//       li.item(v-if='orderInfo.base_grand_total')
	//         span.title 商品总额
	//         span.price {{orderInfo.base_grand_total | formatAmount}}
	//       li.item(v-if='orderInfo.product_discount_total')
	//         span.title 单品优惠合计
	//         span.price(v-text='"-¥" + orderInfo.product_discount_total')
	//       li.item(v-if='orderInfo.base_discount_amount')
	//         span.title 整单优惠
	//         span.price(v-text='"-¥" + orderInfo.base_discount_amount')
	//       li.item(v-if='orderInfo.coupon_price')
	//         span.title 优惠券
	//         span.price(v-text='"-¥" + orderInfo.coupon_price')
	//       li.item(v-if='orderInfo.use_pocket_money')
	//         span.title 零钱抵扣
	//         span.price(v-text='"-¥" + orderInfo.use_pocket_money')
	//       li.item(v-if='orderInfo.grand_total')
	//         span 实付金额:
	//         strong.price {{orderInfo.grand_total | formatAmount}}
	//     .cashback(v-if='orderInfo.cashback_amount > 0')
	//       em.icon-cashback
	//       p.price(v-text='"本单可返现 ¥" + orderInfo.cashback_amount')
	//       p.tips 确认收货后, 返现会打入您的账户中
	//     .pay-method(v-if='!refund')
	//       span 付款方式
	//       strong(v-if="orderInfo.payment_method == 'online'")
	//         label 在线支付
	//         em(v-if='orderInfo.payment_module_code === "alipay"') - 支付宝支付
	//         em(v-if='orderInfo.payment_module_code === "wxpay"') - 微信支付
	//         em(v-if='orderInfo.payment_module_code === "yeepay"') - 易宝支付
	//       strong(
	//         v-if="orderInfo.payment_method == 'offline'"
	//       ) 货到付款
	//     .remarks(v-if='!refund')
	//       p
	//         span.title 买家备注:
	//         span(v-text='orderInfo.order_comment || "无"')
	//       p
	//         span.title 卖家备注:
	//         span(v-text='orderInfo.order_note || "无"')
	//     ul.process(v-if='!refund')
	//       li.item.express(v-if='orderInfo.express')
	//         span.title 配送员信息:
	//         span(v-text='orderInfo.express.staff_info.express_company')
	//         span(v-text='orderInfo.express.staff_info.staff_name')
	//         a(
	//           v-text='orderInfo.express.staff_info.mobilephone',
	//           :href='"tel: " + orderInfo.express.staff_info.mobilephone'
	//         )
	//       li.item(v-for='item in orderInfo.history')
	//         span.title(v-text='item.comment + ": "')
	//         span(v-text='item.created_at')
	//     aside.refund(v-if='refundToggle')
	//       .title
	//         span 退货原因:
	//         input(v-model='activeReason')
	//         select(
	//           v-model='reasonId',
	//           @change='chooseReason($event)'
	//         )
	//           option 请选择一个退货原因
	//           option(
	//             v-for='item in refundItems',
	//             :value='item.id'
	//           ) {{item.reason}}
	//       textarea(v-model='comment')
	//     .contact
	//       a.contact-seller(:href='"tel: " + storeInfo.company_linkman_phone')
	//         em.icon-order-seller
	//         span 联系卖家
	//       a.service(href='tel:4000798798')
	//         em.icon-order-service
	//         span 客服电话
	//     footer.order-info-footer
	//       a(
	//         v-if='!refund && orderInfo.allow_fake == 1 && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status != "pending"))',
	//         @click='modalEvent({ modalType: 3, type: "applyCompensation", params: { id: orderId }, options: { className: "fake-modal" } })',
	//       ) 假货先赔
	//       a(
	//         @click='modalEvent({ modalType: 2, type: "getRefundReason" })',
	//         :class='{"btn-again": refundToggle}',
	//         v-if='(orderInfo.allow_refund == 1 && !orderInfo.refund_info && !refundToggle)'
	//       ) 申请退货
	//       a.btn-again(
	//         v-if='(orderInfo.allow_refund == 1 && !orderInfo.refund_info && refundToggle)',
	//         @click='submitRefund({ id: orderId, comment: comment, reasonId: reasonId })'
	//       ) 申请退货
	//       a(
	//         @click='modalEvent({ modalType: 2, type: "getRefundReason" })',
	//         v-if='orderInfo.allow_refund == 1 && !refundToggle && (orderInfo.refund_info && orderInfo.refund_info.refund_status === "denied")'
	//       ) 再次退货
	//       a.btn-again(
	//         @click='submitRefund({ id: orderId, comment: comment, reasonId: reasonId })',
	//         v-if='orderInfo.allow_refund == 1 && refundToggle && (orderInfo.refund_info && orderInfo.refund_info.refund_status === "denied")'
	//       ) 再次退货
	//       a(
	//         @click='modalEvent({ modalType: 4, type: "cancelOrder", params: {id: orderId} })',
	//         v-if='orderInfo.status === "pending_payment"'
	//       ) 取消订单
	//       a.btn-again(
	//         v-if='!refund && orderInfo.status === "complete" || orderInfo.status === "refunded" && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status != "pending"))',
	//         @click='buyAgain'
	//       ) 再次购买
	//       a.btn-again(
	//         v-if='orderInfo.status === "pending_payment"',
	//         @click='pay(orderInfo.entity_id)'
	//       ) 付款
	//       a.btn-again(
	//         v-if='!refund && orderInfo.status === "pending_receiving" && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status !== "pending"))',
	//         @click='modalEvent({ modalType: 1, type: "confirmReceipt", params: { id: orderId } })'
	//       ) 确认收货
	//     modal(
	//       v-if='modalToggle',
	//     )
	//       p(
	//         v-if='modalType === 1',
	//         slot='content'
	//       ) 确认订单收货?
	//       p(
	//         v-if='modalType === 2',
	//         slot='content'
	//       ) 确认要退货吗?
	//       div(
	//         v-if='modalType === 3',
	//         slot='content'
	//       )
	//         p 亲，您已对订单 ({{orderInfo.increment_id}}) 申请假货先赔，当您点击“假货先赔”按钮时，即已明确：
	//         p (1). 订单 ({{orderInfo.increment_id}}) 立刻开启假货先赔处理，市场督查人员和品牌厂家会立即组织对问题货品的封存和假货鉴定，您需要全力配合做好货物封存和鉴定工作；
	//         p (2). 若订单 ({{orderInfo.increment_id}}) 确属假货，邸达会直接在卖家账户扣除相应订单款项，并直接打款给您 (由于银行不同，货款会在1个工作日内退回到您的帐户) ，并且邸达会协助您做好理赔工作；您的信用评级由此可以获得提升，也有机会收获更多的优惠政策信息；
	//         p (3). 若订单 ({{orderInfo.increment_id}}) 鉴定并非假货，需要您承担卖家的物流配送费用，具体金额由双方约定；
	//         p
	//           span (4). 您有任何疑问，请随时致电邸达，
	//           a(href='tel: 4000798798') 4000-798-798.
	//         p 如您已明确以上信息，请点击“确认”提交假货先赔申请。
	//       p(
	//         v-if='modalType === 4',
	//         slot='content'
	//       ) 确认要取消订单吗?
	// </template>
	//
	// <script lang='babel'>


	var _modal = __webpack_require__(117);

	var _modal2 = _interopRequireDefault(_modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Modal: _modal2.default
	  },
	  data: function data() {
	    return {
	      orderInfo: {},
	      addressInfo: {},
	      goodsList: [],
	      storeInfo: {
	        entity_id: 0
	      },
	      orderId: 0,
	      orderIds: [],

	      refund: false,
	      comment: '',
	      reasonId: 0,
	      activeReason: '请选择一个退货原因',
	      reasons: [],
	      // 1->确认收货
	      // 2->确认退货
	      // 3->假货先赔
	      // 4->取消订单
	      modalType: 0,

	      modalToggle: false,
	      refundToggle: false,
	      cancelToggle: false
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['modalToggle', 'refundItems', 'refundToggle'])),
	  methods: _extends({}, Vuex.mapActions(['submitRefund', 'toggleModal', 'hideModal']), {
	    modalEvent: function modalEvent() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$modalType = _ref.modalType,
	          modalType = _ref$modalType === undefined ? 0 : _ref$modalType,
	          _ref$type = _ref.type,
	          type = _ref$type === undefined ? '' : _ref$type,
	          _ref$params = _ref.params,
	          params = _ref$params === undefined ? {} : _ref$params,
	          _ref$options = _ref.options,
	          options = _ref$options === undefined ? {} : _ref$options;

	      this.modalType = modalType;
	      this.toggleModal({ type: type, params: params, options: options });
	    },
	    getOrderInfo: function getOrderInfo() {
	      var _this = this;

	      var body = {
	        api: 'sales_order',
	        method: 'get_buyer_order_item',
	        id: this.orderId,
	        increment_id: this.$route.params.incrementId
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          Vue.set(_this, 'orderInfo', data.info);
	          Vue.set(_this, 'addressInfo', data.info.address);
	          Vue.set(_this, 'goodsList', data.info.items);
	          Vue.set(_this, 'storeInfo', data.info.store_info);
	          _this.addressInfo.addressDetail = data.info.address.province + data.info.address.city + data.info.address.county + data.info.address.street;
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    viewGoodsInfo: function viewGoodsInfo(shopId, goodsId, isGift) {
	      if (isGift) return;
	      this.$router.push({
	        name: "goodsInfo",
	        params: {
	          shopId: shopId,
	          goodsId: goodsId
	        }
	      });
	    },

	    // 去支付
	    pay: function pay(orderId) {
	      this.orderIds.push(orderId);
	      self.location.href = '/pay?order_ids=' + this.orderIds.join(',');
	    },
	    chooseReason: function chooseReason($event) {
	      this.activeReason = $event.target.selectedOptions[0].text;
	    },

	    // 再次购买
	    buyAgain: function buyAgain() {
	      if (+this.storeInfo.starting_price > +this.orderInfo.base_grand_total) {
	        self.toast('购买商品不满足起送金额哟, 请重新选择吧!');
	        return;
	      }
	      var goods = {};
	      self.sessionStorage.clear();
	      this.goodsList.map(function (item) {
	        if (item.is_gift) return;
	        goods[item.store_product_id] = item.ordered_qty;
	      });
	      self.sessionStorage.setItem('goods', self.JSON.stringify(goods));
	      self.sessionStorage.setItem('buyNow', true);
	      this.$router.push({
	        name: 'confirm'
	      });
	    }
	  }),
	  created: function created() {
	    this.orderId = this.$route.params.orderId;
	    this.getOrderInfo();
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.hideModal();
	  }
	};
	// </script>

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper order-info-wrapper\"><div class=\"order-sn\"><span v-text=\"&quot;订单号: &quot; + orderInfo.increment_id\"></span><strong v-if=\"orderInfo.refund_info\" v-text=\"orderInfo.refund_info.refund_status_label\"></strong><strong v-else=\"v-else\" v-text=\"orderInfo.status_label\"></strong></div><article v-if=\"!refund\" class=\"consignee-wrapper\"><em class=\"icon-consignee icon-36\"></em><span>收货人信息</span><a class=\"consignee-info\"><span v-text=\"addressInfo.addressee\" class=\"name\"></span><span v-text=\"addressInfo.mobilephone\" class=\"mobile\"></span><p v-text=\"addressInfo.addressDetail\"></p></a></article><ul v-if=\"orderInfo.refund_info\" class=\"refund-process\"><li v-if=\"orderInfo.refund_info.refund_reason\"><span class=\"title\">退货原因:</span><div v-text=\"orderInfo.refund_info.refund_reason.reason\" class=\"con\"></div></li><li><span class=\"title\">退货备注:</span><div v-text=\"orderInfo.refund_info.comment\" class=\"con\"></div></li><li v-if=\"orderInfo.refund_info.refund_status === &quot;denied&quot;\" class=\"refuse\"><span class=\"title\">拒绝退货:</span><div v-text=\"orderInfo.refund_info.note || &quot;无&quot;\" class=\"con\"></div></li><li v-if=\"orderInfo.refund_info.refund_status === &quot;approve&quot;\" class=\"refuse\"><span class=\"title\">同意退货:</span><div v-text=\"orderInfo.refund_info.note || &quot;无&quot;\" class=\"con\"></div></li></ul><section class=\"order-shop\"><router-link :to=\"{name: &quot;shop&quot;, params: {shopId: storeInfo.entity_id}}\" class=\"shop-info\"><em class=\"icon-shop\"></em><span class=\"shop-name\"><span v-text=\"storeInfo.store_name\"></span></span><em class=\"icon-more\"></em></router-link><div class=\"goods-info\"><a v-for=\"goods in goodsList\" @click=\"viewGoodsInfo(storeInfo.entity_id, goods.store_product_id, goods.is_gift)\" class=\"goods-item\"><div :class=\"{&quot;carts-activity-tags&quot;: goods.activity_tags &amp;&amp; goods.activity_tags.length &gt; 0}\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + goods.product_info.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><span v-if=\"goods.product_original_price\" v-text=\"&quot;¥&quot; + goods.product_original_price\" class=\"goods-price\"></span><span v-text=\"&quot;×&quot; + goods.ordered_qty\" class=\"goods-num\"></span><h5 v-text=\"goods.product_info.product_name\" class=\"goods-name\"></h5><p v-text=\"goods.product_info.store_product_sub_title\" class=\"sub-title\"></p><div v-if=\"goods.activity_tags\" class=\"activity-tags\"><span v-for=\"tag in goods.activity_tags\" v-text=\"tag.sell_tag\"></span></div></div><div v-if=\"!goods.is_gift\" class=\"discount-amount\"><span v-text=\"&quot;优惠: -¥&quot; + goods.item_discount_amount\"></span><strong v-text=\"&quot;小计: ¥&quot; + goods.item_amount\"></strong></div></a></div></section><ul class=\"goods-info-price\"><li v-if=\"orderInfo.base_grand_total\" class=\"item\"><span class=\"title\">商品总额</span><span class=\"price\">{{orderInfo.base_grand_total | formatAmount}}</span></li><li v-if=\"orderInfo.product_discount_total\" class=\"item\"><span class=\"title\">单品优惠合计</span><span v-text=\"&quot;-¥&quot; + orderInfo.product_discount_total\" class=\"price\"></span></li><li v-if=\"orderInfo.base_discount_amount\" class=\"item\"><span class=\"title\">整单优惠</span><span v-text=\"&quot;-¥&quot; + orderInfo.base_discount_amount\" class=\"price\"></span></li><li v-if=\"orderInfo.coupon_price\" class=\"item\"><span class=\"title\">优惠券</span><span v-text=\"&quot;-¥&quot; + orderInfo.coupon_price\" class=\"price\"></span></li><li v-if=\"orderInfo.use_pocket_money\" class=\"item\"><span class=\"title\">零钱抵扣</span><span v-text=\"&quot;-¥&quot; + orderInfo.use_pocket_money\" class=\"price\"></span></li><li v-if=\"orderInfo.grand_total\" class=\"item\"><span>实付金额:</span><strong class=\"price\">{{orderInfo.grand_total | formatAmount}}</strong></li></ul><div v-if=\"orderInfo.cashback_amount &gt; 0\" class=\"cashback\"><em class=\"icon-cashback\"></em><p v-text=\"&quot;本单可返现 ¥&quot; + orderInfo.cashback_amount\" class=\"price\"></p><p class=\"tips\">确认收货后, 返现会打入您的账户中</p></div><div v-if=\"!refund\" class=\"pay-method\"><span>付款方式</span><strong v-if=\"orderInfo.payment_method == 'online'\"><label>在线支付</label><em v-if=\"orderInfo.payment_module_code === &quot;alipay&quot;\">- 支付宝支付</em><em v-if=\"orderInfo.payment_module_code === &quot;wxpay&quot;\">- 微信支付</em><em v-if=\"orderInfo.payment_module_code === &quot;yeepay&quot;\">- 易宝支付</em></strong><strong v-if=\"orderInfo.payment_method == 'offline'\">货到付款</strong></div><div v-if=\"!refund\" class=\"remarks\"><p><span class=\"title\">买家备注:</span><span v-text=\"orderInfo.order_comment || &quot;无&quot;\"></span></p><p><span class=\"title\">卖家备注:</span><span v-text=\"orderInfo.order_note || &quot;无&quot;\"></span></p></div><ul v-if=\"!refund\" class=\"process\"><li v-if=\"orderInfo.express\" class=\"item express\"><span class=\"title\">配送员信息:</span><span v-text=\"orderInfo.express.staff_info.express_company\"></span><span v-text=\"orderInfo.express.staff_info.staff_name\"></span><a v-text=\"orderInfo.express.staff_info.mobilephone\" :href=\"&quot;tel: &quot; + orderInfo.express.staff_info.mobilephone\"></a></li><li v-for=\"item in orderInfo.history\" class=\"item\"><span v-text=\"item.comment + &quot;: &quot;\" class=\"title\"></span><span v-text=\"item.created_at\"></span></li></ul><aside v-if=\"refundToggle\" class=\"refund\"><div class=\"title\"><span>退货原因:</span><input v-model=\"activeReason\"/><select v-model=\"reasonId\" @change=\"chooseReason($event)\"><option>请选择一个退货原因</option><option v-for=\"item in refundItems\" :value=\"item.id\">{{item.reason}}</option></select></div><textarea v-model=\"comment\"></textarea></aside><div class=\"contact\"><a :href=\"&quot;tel: &quot; + storeInfo.company_linkman_phone\" class=\"contact-seller\"><em class=\"icon-order-seller\"></em><span>联系卖家</span></a><a href=\"tel:4000798798\" class=\"service\"><em class=\"icon-order-service\"></em><span>客服电话</span></a></div><footer class=\"order-info-footer\"><a v-if=\"!refund &amp;&amp; orderInfo.allow_fake == 1 &amp;&amp; (!orderInfo.refund_info || (orderInfo.refund_info &amp;&amp; orderInfo.refund_info.refund_status != &quot;pending&quot;))\" @click=\"modalEvent({ modalType: 3, type: &quot;applyCompensation&quot;, params: { id: orderId }, options: { className: &quot;fake-modal&quot; } })\">假货先赔</a><a @click=\"modalEvent({ modalType: 2, type: &quot;getRefundReason&quot; })\" :class=\"{&quot;btn-again&quot;: refundToggle}\" v-if=\"(orderInfo.allow_refund == 1 &amp;&amp; !orderInfo.refund_info &amp;&amp; !refundToggle)\">申请退货</a><a v-if=\"(orderInfo.allow_refund == 1 &amp;&amp; !orderInfo.refund_info &amp;&amp; refundToggle)\" @click=\"submitRefund({ id: orderId, comment: comment, reasonId: reasonId })\" class=\"btn-again\">申请退货</a><a @click=\"modalEvent({ modalType: 2, type: &quot;getRefundReason&quot; })\" v-if=\"orderInfo.allow_refund == 1 &amp;&amp; !refundToggle &amp;&amp; (orderInfo.refund_info &amp;&amp; orderInfo.refund_info.refund_status === &quot;denied&quot;)\">再次退货</a><a @click=\"submitRefund({ id: orderId, comment: comment, reasonId: reasonId })\" v-if=\"orderInfo.allow_refund == 1 &amp;&amp; refundToggle &amp;&amp; (orderInfo.refund_info &amp;&amp; orderInfo.refund_info.refund_status === &quot;denied&quot;)\" class=\"btn-again\">再次退货</a><a @click=\"modalEvent({ modalType: 4, type: &quot;cancelOrder&quot;, params: {id: orderId} })\" v-if=\"orderInfo.status === &quot;pending_payment&quot;\">取消订单</a><a v-if=\"!refund &amp;&amp; orderInfo.status === &quot;complete&quot; || orderInfo.status === &quot;refunded&quot; &amp;&amp; (!orderInfo.refund_info || (orderInfo.refund_info &amp;&amp; orderInfo.refund_info.refund_status != &quot;pending&quot;))\" @click=\"buyAgain\" class=\"btn-again\">再次购买</a><a v-if=\"orderInfo.status === &quot;pending_payment&quot;\" @click=\"pay(orderInfo.entity_id)\" class=\"btn-again\">付款</a><a v-if=\"!refund &amp;&amp; orderInfo.status === &quot;pending_receiving&quot; &amp;&amp; (!orderInfo.refund_info || (orderInfo.refund_info &amp;&amp; orderInfo.refund_info.refund_status !== &quot;pending&quot;))\" @click=\"modalEvent({ modalType: 1, type: &quot;confirmReceipt&quot;, params: { id: orderId } })\" class=\"btn-again\">确认收货</a></footer><modal v-if=\"modalToggle\"><p v-if=\"modalType === 1\" slot=\"content\">确认订单收货?</p><p v-if=\"modalType === 2\" slot=\"content\">确认要退货吗?</p><div v-if=\"modalType === 3\" slot=\"content\"><p>亲，您已对订单 ({{orderInfo.increment_id}}) 申请假货先赔，当您点击“假货先赔”按钮时，即已明确：</p><p>(1). 订单 ({{orderInfo.increment_id}}) 立刻开启假货先赔处理，市场督查人员和品牌厂家会立即组织对问题货品的封存和假货鉴定，您需要全力配合做好货物封存和鉴定工作；</p><p>(2). 若订单 ({{orderInfo.increment_id}}) 确属假货，邸达会直接在卖家账户扣除相应订单款项，并直接打款给您 (由于银行不同，货款会在1个工作日内退回到您的帐户) ，并且邸达会协助您做好理赔工作；您的信用评级由此可以获得提升，也有机会收获更多的优惠政策信息；</p><p>(3). 若订单 ({{orderInfo.increment_id}}) 鉴定并非假货，需要您承担卖家的物流配送费用，具体金额由双方约定；</p><p><span>(4). 您有任何疑问，请随时致电邸达，</span><a href=\"tel: 4000798798\">4000-798-798.</a></p><p>如您已明确以上信息，请点击“确认”提交假货先赔申请。</p></div><p v-if=\"modalType === 4\" slot=\"content\">确认要取消订单吗?</p></modal></div>";

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GOODS = undefined;

	var _info = __webpack_require__(131);

	var _info2 = _interopRequireDefault(_info);

	var _spec = __webpack_require__(184);

	var _spec2 = _interopRequireDefault(_spec);

	var _list = __webpack_require__(187);

	var _list2 = _interopRequireDefault(_list);

	var _filter = __webpack_require__(191);

	var _filter2 = _interopRequireDefault(_filter);

	var _category = __webpack_require__(195);

	var _category2 = _interopRequireDefault(_category);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GOODS = exports.GOODS = [{
	  path: '/goods/info/:shopId/:goodsId',
	  name: 'goodsInfo',
	  component: _info2.default,
	  meta: {
	    title: '商品详情'
	  },
	  children: [{
	    path: 'spec',
	    name: 'goodsSpec',
	    component: _spec2.default,
	    meta: {
	      title: '规格参数'
	    }
	  }]
	}, {
	  path: '/goods/list',
	  name: 'goodsList',
	  component: _list2.default,
	  meta: {
	    title: '商品列表'
	  }
	}, {
	  path: '/goods/filter',
	  name: 'goodsFilter',
	  component: _filter2.default,
	  meta: {
	    title: '商品筛选'
	  }
	}, {
	  path: '/category',
	  name: 'category',
	  component: _category2.default,
	  meta: {
	    title: '商品分类'
	  }
	}];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(132)
	__vue_script__ = __webpack_require__(133)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\info.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(183)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-80bfc8c8/info.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 132 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(134);

	var _extends3 = _interopRequireDefault(_extends2);

	var _swipe = __webpack_require__(172);

	var _swipe2 = _interopRequireDefault(_swipe);

	var _collection = __webpack_require__(176);

	var _collection2 = _interopRequireDefault(_collection);

	var _siteCart = __webpack_require__(84);

	var _siteCart2 = _interopRequireDefault(_siteCart);

	var _buyNow = __webpack_require__(179);

	var _buyNow2 = _interopRequireDefault(_buyNow);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Swipe: _swipe2.default,
	    SiteCart: _siteCart2.default,
	    Collection: _collection2.default,
	    BuyNow: _buyNow2.default
	  },
	  data: function data() {
	    return {
	      info: {
	        attribute: [],
	        activity_tags: [],
	        store: {},
	        company: {},
	        store_product_final_price: '',
	        store_product_market_price: '',
	        store_product_stock_qty: ''
	      },
	      shopId: 0,
	      goodsId: 0,
	      toggle: false,
	      buyNowToggle: false
	    };
	  },

	  methods: {
	    initPage: function initPage() {
	      var _this = this;

	      var body = (0, _extends3.default)({}, apis.GET_PRODUCT_INFO);
	      body.store_id = this.shopId;
	      body.store_product_id = this.goodsId;
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          Vue.set(_this.$data, 'info', data.info);
	          _this.toggle = true;
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    buy: function buy(stock) {
	      if (+stock > 0) {
	        this.buyNowToggle = true;
	      } else {
	        self.toast('您来晚了，没有库存啦~');
	      }
	    },
	    addToCarts: function addToCarts(vm) {
	      this.$store.dispatch('addToCarts', vm);
	    },
	    toggleHandler: function toggleHandler() {
	      this.buyNowToggle = !this.buyNowToggle;
	    },
	    collectionHandler: function collectionHandler(type) {
	      this.info.is_collection = type;
	    }
	  },
	  created: function created() {
	    this.shopId = this.$route.params.shopId;
	    this.goodsId = this.$route.params.goodsId;
	    this.initPage();
	  }
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(135);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137);
	module.exports = __webpack_require__(140).Object.assign;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(138);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(153) });

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(139),
	    core = __webpack_require__(140),
	    ctx = __webpack_require__(141),
	    hide = __webpack_require__(143),
	    PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE],
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();
	            case 1:
	              return new C(a);
	            case 2:
	              return new C(a, b);
	          }return new C(a, b, c);
	        }return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 139 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 140 */
/***/ function(module, exports) {

	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(142);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(144),
	    createDesc = __webpack_require__(152);
	module.exports = __webpack_require__(148) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(145),
	    IE8_DOM_DEFINE = __webpack_require__(147),
	    toPrimitive = __webpack_require__(151),
	    dP = Object.defineProperty;

	exports.f = __webpack_require__(148) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(146);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(148) && !__webpack_require__(149)(function () {
	  return Object.defineProperty(__webpack_require__(150)('div'), 'a', { get: function () {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(149)(function () {
	  return Object.defineProperty({}, 'a', { get: function () {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(146),
	    document = __webpack_require__(139).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(146);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)

	var getKeys = __webpack_require__(154),
	    gOPS = __webpack_require__(169),
	    pIE = __webpack_require__(170),
	    toObject = __webpack_require__(171),
	    IObject = __webpack_require__(158),
	    $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(149)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  }return T;
	} : $assign;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(155),
	    enumBugKeys = __webpack_require__(168);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var has = __webpack_require__(156),
	    toIObject = __webpack_require__(157),
	    arrayIndexOf = __webpack_require__(161)(false),
	    IE_PROTO = __webpack_require__(165)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(158),
	    defined = __webpack_require__(160);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(159);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 160 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(157),
	    toLength = __webpack_require__(162),
	    toIndex = __webpack_require__(164);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(163),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 163 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(163),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(166)('keys'),
	    uid = __webpack_require__(167);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(139),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 167 */
/***/ function(module, exports) {

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 168 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 169 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 170 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(160);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(173)
	__vue_script__ = __webpack_require__(174)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\common\\swipe.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(175)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5fa825b1/swipe.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 173 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   .swipe-wrapper {
	//     position: relative;
	//     overflow: hidden;
	//     background-color: #fff;
	//     .swipe-container {
	//       position: absolute;
	//       left: 0;
	//       top: 0;
	//       right: 0;
	//       bottom: 0;
	//       overflow: hidden;
	//       list-style: none;
	//     }
	//     a {
	//       display: block;
	//       width: 100%;
	//       height: 100%;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .padding {
	//       a {
	//         -webkit-background-size: 80%;
	//         background-size: 80%;
	//       }
	//     }
	//     .swipe-point {
	//       position: absolute;
	//       z-index: 1;
	//       right: 10px;
	//       bottom: 5px;
	//       em {
	//         display: inline-block;
	//         width: 8px;
	//         height: 8px;
	//         margin: 0 5px;
	//         border-radius: 20px;
	//         border: 1px solid #fff;
	//       }
	//       .active {
	//         background-color: #fff;
	//       }
	//     }
	//     .banner {
	//       float: left;
	//       position: relative;
	//       width: 100%;
	//       height: 100%;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   aside.swipe-wrapper(
	//     v-if='banner.length > 0',
	//     :style='{paddingTop: height}',
	//     ref='swipe',
	//   )
	//     ul.swipe-container(
	//       :class='{padding: page === "goodsInfo"}'
	//     )
	//       li.banner(
	//         v-for='item in banner'
	//       )
	//         a(
	//           v-if='page === "home"',
	//           @click='goPage(item)',
	//           :style='{backgroundImage: "url(" + item.file + ")"}'
	//         )
	//         a(
	//           v-if='page === "goodsInfo"',
	//           :style='{backgroundImage: "url(" + item + ")"}'
	//         )
	//     .swipe-point(v-if='banner.length > 1')
	//       em.point(
	//         v-for='(item, index) in banner',
	//         :class='{"active": index === active}'
	//       )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['page', 'height', 'images'],
	  data: function data() {
	    return {
	      active: 0,
	      banner: []
	    };
	  },

	  methods: {
	    initSwipe: function initSwipe() {
	      new Swipe(this.$refs.swipe, {
	        auto: 3000,
	        autoRestart: true,
	        transitionEnd: function (index, elem) {
	          this.active = index;
	        }.bind(this)
	      });
	    },
	    goPage: function goPage(vm) {
	      if (vm.link_type) {
	        _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u7126\u70B9\u56FE', 'click', '' + vm.title]);
	      }

	      if (vm.link_type === 'url') {
	        self.location.href = vm.link;
	      } else if (vm.link_type === 'activity') {
	        this.$router.push({
	          name: 'shopActivity',
	          params: {
	            id: vm.activity_id
	          }
	        });
	      } else if (vm.link_type === 'products') {
	        this.$router.push({
	          name: 'goodsInfo',
	          params: {
	            shopId: 0,
	            goodsId: vm.link
	          }
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    if (this.page === 'home') {
	      var defaultBanner = [{
	        file: '//static.91dida.cn/skin/m/images/banner.png'
	      }];
	      this.banner = self.home.adv.length ? self.home.adv : defaultBanner;
	    } else if (this.page === 'goodsInfo') {
	      this.banner = this.images || [];
	    }
	    this.$nextTick(function () {
	      _this.initSwipe();
	    });
	  }
	};
	// </script>

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = "<aside v-if=\"banner.length &gt; 0\" :style=\"{paddingTop: height}\" ref=\"swipe\" class=\"swipe-wrapper\"><ul :class=\"{padding: page === &quot;goodsInfo&quot;}\" class=\"swipe-container\"><li v-for=\"item in banner\" class=\"banner\"><a v-if=\"page === &quot;home&quot;\" @click=\"goPage(item)\" :style=\"{backgroundImage: &quot;url(&quot; + item.file + &quot;)&quot;}\"></a><a v-if=\"page === &quot;goodsInfo&quot;\" :style=\"{backgroundImage: &quot;url(&quot; + item + &quot;)&quot;}\"></a></li></ul><div v-if=\"banner.length &gt; 1\" class=\"swipe-point\"><em v-for=\"(item, index) in banner\" :class=\"{&quot;active&quot;: index === active}\" class=\"point\"></em></div></aside>";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(177)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\collection.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(178)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6e1cd5e8/collection.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  props: ['productId', 'isCollection'],
	  methods: {
	    collection: function collection() {
	      this.$store.dispatch('toggleCollectionGoods', {
	        id: this.productId,
	        type: 1,
	        status: this.isCollection,
	        callback: function () {
	          if (this.isCollection) {
	            this.$emit('collection-event', 0);
	          } else {
	            this.$emit('collection-event', 1);
	          }
	        }.bind(this)
	      });
	    }
	  }
	};
	// </script>
	// <template lang='jade'>
	//   a.collection(
	//     @click='collection',
	//     :class='{active: isCollection}'
	//   )
	//     em.icon-collection.icon-30
	//     p 收藏
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 178 */
/***/ function(module, exports) {

	module.exports = "<a @click=\"collection\" :class=\"{active: isCollection}\" class=\"collection\"><em class=\"icon-collection icon-30\"></em><p>收藏</p></a>";

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(180)
	__vue_script__ = __webpack_require__(181)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\buyNow.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(182)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0ac666de/buyNow.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 180 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 181 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .buy-now-wrapper {
	//     position: fixed;
	//     top: 0;
	//     left: 0;
	//     right: 0;
	//     bottom: 0;
	//     z-index: 5;
	//     .content {
	//       background-color: #fff;
	//       position: absolute;
	//       left: 0;
	//       bottom: 0;
	//       width: 100%;
	//       z-index: 6;
	//       padding-bottom: 65px;
	//       text-align: right;
	//     }
	//     .num {
	//       position: relative;
	//       height: 40px;
	//       margin: 0 3%;
	//       @include borderBottom;
	//       @include borderTop;
	//       .title {
	//         position: absolute;
	//         left: 0;
	//         top: 10px;
	//       }
	//       .cart-option {
	//         right: -10px;
	//       }
	//     }
	//     .btn-settle {
	//       height: 50px;
	//       width: 100%;
	//       top: auto;
	//       line-height: 48px;
	//     }
	//     .close {
	//       padding: 10px;
	//       display: inline-block;
	//       .icon-close {
	//         width: 15px;
	//         height: 15px;
	//         color: #666;
	//         border: 1px solid currentColor;
	//         border-radius: 30px;
	//         position: relative;
	//         -webkit-transform: rotate(45deg);
	//         transform: rotate(45deg);
	//         background: none;
	//         &:before {
	//           content: '';
	//           position: absolute;
	//           left: 2px;
	//           top: 7px;
	//           width: 11px;
	//           height: 1px;
	//           background-color: currentColor;
	//         }
	//         &:after {
	//           content: '';
	//           position: absolute;
	//           top: 2px;
	//           left: 7px;
	//           width: 1px;
	//           height: 11px;
	//           background-color: currentColor;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .buy-now-wrapper
	//     .content
	//       a.close(@click='toggleEmit')
	//         em.icon-close
	//       .num
	//         span.title 购买数量
	//         p.cart-option
	//           a.sub-cart(@click='changeNum("sub")')
	//             em -
	//           span.input
	//             input(
	//               v-model='num',
	//               @change='changeNum("change")',
	//               type='tel'
	//             )
	//           a.add-cart(@click='changeNum("add")')
	//             em +
	//       a.btn-settle(@click='goSettle') 确定
	//     .mask(@click='toggleEmit')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['stock', 'price', 'startPrice'],
	  data: function data() {
	    return {
	      num: 1
	    };
	  },

	  methods: {
	    changeNum: function changeNum(type) {
	      switch (type) {
	        case 'add':
	          this.num = Number(this.num) + 1;
	          break;
	        case 'sub':
	          if (this.num > 1) {
	            this.num -= 1;
	          } else {
	            this.num = 1;
	          }
	          break;
	        case 'change':
	          if (this.num < 1 || self.isNaN(this.num)) {
	            this.num = 1;
	          }
	      }
	      if (Number(this.num) > Number(this.stock)) {
	        this.num = this.stock;
	      }
	    },
	    goSettle: function goSettle() {
	      if (this.num * this.price < +this.startPrice) {
	        self.toast('购买商品不满足起送金额哟, 再多选两件吧!');
	        return;
	      };
	      var goodsId = this.$route.params.goodsId;
	      self.sessionStorage.clear();
	      self.sessionStorage.setItem('goods', self.JSON.stringify(_defineProperty({}, goodsId, this.num)));
	      self.sessionStorage.setItem('buyNow', true);
	      // this.cancelCoupon();
	      this.$router.push({
	        name: 'confirm'
	      });
	    },
	    toggleEmit: function toggleEmit() {
	      this.$emit('toggle-event');
	    }
	  }
	};
	// </script>

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = "<div class=\"buy-now-wrapper\"><div class=\"content\"><a @click=\"toggleEmit\" class=\"close\"><em class=\"icon-close\"></em></a><div class=\"num\"><span class=\"title\">购买数量</span><p class=\"cart-option\"><a @click=\"changeNum(&quot;sub&quot;)\" class=\"sub-cart\"><em>-</em></a><span class=\"input\"><input v-model=\"num\" @change=\"changeNum(&quot;change&quot;)\" type=\"tel\"/></span><a @click=\"changeNum(&quot;add&quot;)\" class=\"add-cart\"><em>+</em></a></p></div><a @click=\"goSettle\" class=\"btn-settle\">确定</a></div><div @click=\"toggleEmit\" class=\"mask\"></div></div>";

/***/ },
/* 183 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper goods-info-wrapper\"><swipe v-if=\"toggle\" :page=\"&quot;goodsInfo&quot;\" :height=\"&quot;100%&quot;\" :images=\"info.photo_gallery\"></swipe><aside class=\"goods-info\"><h4 v-text=\"info.product_name\" class=\"name\"></h4><p class=\"price\"><span v-text=\"info.store_product_final_price_range\" class=\"final\"></span><span v-text=\"&quot;零售指导价: ¥&quot; + info.store_product_market_price\" class=\"market\"></span></p><p v-if=\"info.store_product_ladder_desc\" v-text=\"info.store_product_ladder_desc\" class=\"ladder\"></p><p v-text=\"&quot;库存: &quot; + info.store_product_stock_qty\" class=\"stock\"></p></aside><aside v-if=\"info.activity_tags.length &gt; 0\" class=\"promotion\"><span class=\"title\">促销:</span><div class=\"con\"><p v-for=\"item in info.activity_tags\"><em v-text=\"item.sell_tag\" class=\"pro-tag\"></em><span v-text=\"item.tips\" class=\"tag-des\"></span></p></div></aside><aside v-if=\"info.store_product_sub_title\" class=\"activity\"><h5 v-text=\"info.store_product_sub_title\" class=\"title\"></h5><div class=\"con\"><em class=\"act-tag\">政策</em><p v-text=\"info.store_product_sub_description\" class=\"act-des\"></p></div></aside><aside v-if=\"info.attribute.length &gt; 0\" class=\"specifications\"><router-link v-if=\"info.content_url\" :to=\"{name: &quot;goodsSpec&quot;}\" class=\"title\"><span>规格参数</span><span class=\"des\">详细介绍</span><em class=\"icon-more\"></em></router-link><a v-else=\"v-else\" class=\"title\"><span>规格参数</span></a><ul class=\"con\"><li v-for=\"item in info.attribute\" class=\"item\"><strong v-text=\"item.option_label + &quot;: &quot;\"></strong><div v-text=\"item.attribute_label\" class=\"label\"></div></li></ul></aside><aside class=\"shop\"><h5 v-text=\"info.store.store_name\" class=\"title\"></h5><ul class=\"con\"><li class=\"item\"><strong>总销量:</strong><div v-text=\"info.store.sales_num\" class=\"label\"></div></li><li class=\"item\"><strong>经营分类:</strong><div v-text=\"info.store.operation_category\" class=\"label\"></div></li><li class=\"item\"><strong>店铺地址:</strong><div v-text=\"info.store.company_street\" class=\"label\"></div></li></ul></aside><site-cart></site-cart><footer class=\"footer-options\"><a :href=\"&quot;tel: &quot; + info.store.company_phone\" class=\"online\"><em class=\"icon-service-online icon-30\"></em><p>联系卖家</p></a><collection :product-id=\"goodsId\" :is-collection=\"info.is_collection\" @collection-event=\"collectionHandler\"></collection><router-link :to=\"{name: &quot;shop&quot;, params: {shopId: shopId}}\" class=\"view-shop\"><em class=\"icon-view-shop\"></em><p>店铺</p></router-link><a @click=\"addToCarts(info)\" class=\"btn-add-cart\">加入购物车</a><a @click=\"buy(info.store_product_stock_qty)\" class=\"btn-right-now\">立即购买</a></footer><buy-now v-if=\"buyNowToggle\" :stock=\"info.store_product_stock_qty\" :price=\"info.store_product_final_price\" :start-price=\"info.store.starting_price\" @toggle-event=\"toggleHandler\"></buy-now><router-view></router-view></div>";

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(185)
	__vue_template__ = __webpack_require__(186)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-35da6029/spec.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 185 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 186 */
/***/ function(module, exports) {

	module.exports = "<transition name=\"slide\"><iframe frameborder=\"0\" :src=\"this.$parent.info.content_url\" class=\"goods-spec-wrapper\"></iframe></transition>";

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(188)
	__vue_script__ = __webpack_require__(189)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(190)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0539ef8c/list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 188 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .goods-list {
	//     background-color: #fff;
	//     position: relative;
	//     padding-top: 95px;
	//     .item {
	//       position: relative;
	//     }
	//     .goods {
	//       display: block;
	//       padding: 10px;
	//       overflow: hidden;
	//       position: relative;
	//       min-height: 100px;
	//       @include borderTop($left: 100px);
	//       h4, p {
	//         padding-left: 90px;
	//       }
	//     }
	//     .topic {
	//       position: absolute;
	//       left: 10px;
	//       top: 50%;
	//       -webkit-transform: translateY(-50%);
	//       transform: translateY(-50%);
	//       width: 80px;
	//       height: 80px;
	//       background-position: 50% 50%;
	//       background-repeat: no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name {
	//       @include ellipsis;
	//     }
	//     .shop-name {
	//       text-indent: -5px;
	//       margin-bottom: 5px;
	//     }
	//     .shop-name,
	//     .sub-title {
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .sub-title {
	//       color: lighten($priceColor, 10%);
	//       margin-bottom: 5px;
	//     }
	//     .price-wrapper {
	//       margin-left: 90px;
	//       overflow: hidden;
	//     }
	//     .price {
	//       font-size: 16px;
	//       color: $priceColor;
	//       margin-bottom: 5px;
	//       margin-right: 5px;
	//       float: left;
	//     }
	//     .activity-tags {
	//       float: left;
	//       width: auto;
	//       margin-top: 3px;
	//       position: static;
	//     }
	//     .stock {
	//       overflow: hidden;
	//       font-size: 12px;
	//       color: $darkenGrayColor;
	//     }
	//     .add-carts {
	//       position: absolute;
	//       bottom: 0;
	//       right: 0;
	//       z-index: 1;
	//       padding: 10px;
	//     }
	//   }
	//   .goods-list-wrapper {
	//     .search {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       @include borderBottom;
	//       .input {
	//         width: 100%;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .sort {
	//       position: fixed;
	//       left: 0;
	//       top: 50px;
	//       width: 100%;
	//       z-index: 2;
	//       overflow: hidden;
	//       background-color: #fff;
	//       height: 40px;
	//       border-bottom: 5px solid #e5e5e5;
	//       text-align: center;
	//       span {
	//         vertical-align: middle;
	//         pointer-events: none;
	//       }
	//       a {
	//         float: left;
	//         width: 33%;
	//         padding: 10px;
	//         box-sizing: border-box;
	//         position: relative;
	//       }
	//       .price {
	//         width: 34%;
	//         @include borderLeft($top: 10px, $bottom: 10px);
	//         @include borderRight($top: 10px, $bottom: 10px);
	//       }
	//     }
	//     .arrow {
	//       @include arrow($direction: 'bottom', $borderColor: #666)
	//       pointer-events: none;
	//       right: 0;
	//       left: 50%;
	//       top: -5px;
	//       margin-left: 20px;
	//     }
	//     .asc {
	//       .arrow {
	//         -webkit-transform: rotate(45deg);
	//         transform: rotate(45deg);
	//         top: 5px;
	//       }
	//     }
	//     .hot-keys {
	//       position: fixed;
	//       left: 0;
	//       top: 50px;
	//       bottom: 0;
	//       width: 100%;
	//       background-color: #fff;
	//       z-index: 2;
	//       overflow: auto;
	//       .title {
	//         padding: 10px;
	//         font-size: inherit;
	//         color: $darkenGrayColor;
	//         position: relative;
	//         @include borderBottom;
	//       }
	//       .item {
	//         display: block;
	//         position: relative;
	//         padding: 10px;
	//         font-size: 12px;
	//         @include borderBottom($left: $margin);
	//       }
	//     }
	//     .goods-stock {
	//       color: $priceColor;
	//       font-size: 12px;
	//       position: absolute;
	//       right: 10px;
	//       bottom: 10px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.goods-list-wrapper
	//     form.search(
	//       @submit.prevent='getGoodsData({keywords: keywords}, true)'
	//     )
	//       input.input(
	//         type="search",
	//         v-model='keywords',
	//         placeholder='搜索商品',
	//         @focus='getHotKey()'
	//       )
	//     .sort
	//       a(
	//         :class='{asc: numAsc}',
	//         @click='getGoodsData({order: "sell_num"}, true)'
	//       )
	//         span 销量
	//         em.arrow
	//       a.price(
	//         :class='{asc: priceAsc}',
	//         @click='getGoodsData({order: "final_price"}, true)'
	//       )
	//         span 价格
	//         em.arrow
	//       router-link(
	//         :to='{name: "goodsFilter"}'
	//       )
	//         span 筛选
	//     .hot-keys(
	//       v-if='hotToggle',
	//       @click='hotToggle = false'
	//     )
	//       h4.title 热搜关键词
	//       a.item(
	//         v-for='item in hotKeys',
	//         v-text='item.tag_label',
	//         @click='hotKeyHandler(item.tag_label)'
	//       )
	//     ul.goods-list(v-if='totalRows > 0')
	//       li.item(v-for='item in items')
	//         router-link.goods(
	//           :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
	//           :data-id='item.store_product_entity_id'
	//         )
	//           span.topic(
	//             :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
	//           )
	//           h4.shop-name(v-text='"【" + item.store_name + "】"')
	//           h4.name(v-text='item.product_name')
	//           p.sub-title(v-text='item.store_product_sub_title')
	//           .price-wrapper
	//             span.price(v-text='"¥" + item.store_product_final_price')
	//             .activity-tags(v-if='item.activity_tags.length > 0')
	//               span(
	//                 v-for='(tag, index) in item.activity_tags',
	//                 v-text='tag.sell_tag'
	//               )
	//           p.stock(v-text='"库存: " + item.store_product_stock_qty')
	//         a.add-carts(
	//           v-if='item.store_product_stock_qty != 0',
	//           @click='addToCarts(item)'
	//         )
	//           em.icon-add-carts
	//         span.goods-stock(v-else) 补货中
	//     .goods-list(v-else)
	//       not-found
	//         p 未查询到相关数据!
	//     site-cart(v-if='totalRows > 0')
	// </template>
	//
	// <script lang='babel'>


	var _siteCart = __webpack_require__(84);

	var _siteCart2 = _interopRequireDefault(_siteCart);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    SiteCart: _siteCart2.default,
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      items: [],
	      totalRows: 0,
	      numAsc: false,
	      priceAsc: false,
	      keywords: '',
	      order_type: '',
	      order: '',
	      query: {},

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null,

	      hotKeys: [],
	      hotToggle: false
	    };
	  },

	  methods: _extends({}, Vuex.mapActions(['addToCarts']), {
	    getGoodsData: function getGoodsData() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      this.hotToggle = false;
	      if (this.order) {
	        delete this.query.order;
	        self.DD.assign(options, this.query);
	      } else {
	        self.DD.assign(options, this.query);
	      }

	      options.keywords = this.keywords;

	      if (options.order === 'sell_num') {
	        this.numAsc = !this.numAsc;
	        this.priceAsc = false;
	        this.order_type = this.numAsc ? 'desc' : 'asc';
	        this.order = options.order;
	      }

	      if (options.order === 'final_price') {
	        this.priceAsc = !this.priceAsc;
	        this.numAsc = false;
	        this.order_type = this.priceAsc ? 'desc' : 'asc';
	        this.order = options.order;
	      }

	      // reset 为 true 时重置所有数据, 并且要卸载上一次的事件
	      if (reset) {
	        this.page = 0;
	        // scrollTop重置为0，不然的话点击的时候会触发两次事件
	        self.document.body.scrollTop = 0;
	        self.document.removeEventListener('scroll', this.next);
	      }
	      options.page = this.page + 1;
	      self.DD.assign(options, {
	        order_type: this.order_type,
	        order: this.order,
	        callback: function (data) {
	          this.scrollToggle = true;
	          if (!data) return;
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (this.page === 0) {
	            this.items = data.items;
	            this.loadingEl = null;
	            self.document.removeEventListener('scroll', this.next);
	          } else {
	            this.items = this.items.concat(data.items);
	          }

	          this.totalRows = data.total_rows;
	          this.page = data.page;
	          this.pageCount = data.pageCount;

	          if (this.loadingEl && this.loadingEl.parentElement) {
	            this.loadingEl.parentElement.removeChild(this.loadingEl);
	          }

	          this.loadingEl = self.document.createElement('div');
	          this.loadingEl.className = 'next-loading';
	          this.loadingEl.innerHTML = '努力加载中...';

	          if (this.page != this.pageCount) {
	            self.document.addEventListener('scroll', this.next);
	          } else {
	            self.document.removeEventListener('scroll', this.next);
	          }
	        }.bind(this)
	      });
	      // 接口需要的是一个对象，而我们拿到的是一个JSON串
	      if (options.attribute) {
	        options.attribute = self.JSON.parse(options.attribute);
	      }
	      this.$store.dispatch('getGoodsList', options);
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.getGoodsData();
	        }
	      }
	    },
	    getHotKey: function getHotKey() {
	      var _this = this;

	      if (this.hotKeys.length > 0) {
	        this.hotToggle = true;
	        return;
	      }
	      var body = {
	        api: 'WEBSITE',
	        method: 'get_website_tags'
	      };
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.hotKeys = data.info._items;
	          if (_this.hotKeys.length > 0) {
	            _this.hotToggle = true;
	          }
	        }
	      });
	    },
	    hotKeyHandler: function hotKeyHandler(keywords) {
	      this.keywords = keywords;
	      this.hotToggle = false;
	      this.getGoodsData({ keywords: keywords }, true);
	    }
	  }),
	  mounted: function mounted() {
	    this.query = this.$route.query;
	    if (this.query.attribute) {
	      this.query.attribute = self.decodeURIComponent(this.query.attribute);
	    }
	    if (this.query.keywords) {
	      this.keywords = this.query.keywords;
	    }
	    this.scrollEl = self.document.querySelector('.goods-list-wrapper');
	    this.getGoodsData({}, true);
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper goods-list-wrapper\"><form @submit.prevent=\"getGoodsData({keywords: keywords}, true)\" class=\"search\"><input type=\"search\" v-model=\"keywords\" placeholder=\"搜索商品\" @focus=\"getHotKey()\" class=\"input\"/></form><div class=\"sort\"><a :class=\"{asc: numAsc}\" @click=\"getGoodsData({order: &quot;sell_num&quot;}, true)\"><span>销量</span><em class=\"arrow\"></em></a><a :class=\"{asc: priceAsc}\" @click=\"getGoodsData({order: &quot;final_price&quot;}, true)\" class=\"price\"><span>价格</span><em class=\"arrow\"></em></a><router-link :to=\"{name: &quot;goodsFilter&quot;}\"><span>筛选</span></router-link></div><div v-if=\"hotToggle\" @click=\"hotToggle = false\" class=\"hot-keys\"><h4 class=\"title\">热搜关键词</h4><a v-for=\"item in hotKeys\" v-text=\"item.tag_label\" @click=\"hotKeyHandler(item.tag_label)\" class=\"item\"></a></div><ul v-if=\"totalRows &gt; 0\" class=\"goods-list\"><li v-for=\"item in items\" class=\"item\"><router-link :to=\"{name: &quot;goodsInfo&quot;, params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}\" :data-id=\"item.store_product_entity_id\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"&quot;【&quot; + item.store_name + &quot;】&quot;\" class=\"shop-name\"></h4><h4 v-text=\"item.product_name\" class=\"name\"></h4><p v-text=\"item.store_product_sub_title\" class=\"sub-title\"></p><div class=\"price-wrapper\"><span v-text=\"&quot;¥&quot; + item.store_product_final_price\" class=\"price\"></span><div v-if=\"item.activity_tags.length &gt; 0\" class=\"activity-tags\"><span v-for=\"(tag, index) in item.activity_tags\" v-text=\"tag.sell_tag\"></span></div></div><p v-text=\"&quot;库存: &quot; + item.store_product_stock_qty\" class=\"stock\"></p></router-link><a v-if=\"item.store_product_stock_qty != 0\" @click=\"addToCarts(item)\" class=\"add-carts\"><em class=\"icon-add-carts\"></em></a><span v-else=\"v-else\" class=\"goods-stock\">补货中</span></li></ul><div v-else=\"v-else\" class=\"goods-list\"><not-found><p>未查询到相关数据!</p></not-found></div><site-cart v-if=\"totalRows &gt; 0\"></site-cart></div>";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(192)
	__vue_script__ = __webpack_require__(193)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\filter.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(194)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6b1d8fe6/filter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 192 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 193 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .filter-wrapper {
	//     min-height: 100%;
	//     .search {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       @include borderBottom;
	//       .input {
	//         width: 100%;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .price {
	//       position: fixed;
	//       left: 0;
	//       top: 50px;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px 10px 10px 100px;
	//       box-sizing: border-box;
	//       @include borderBottom;
	//       em,input {
	//         float: left;
	//       }
	//       span {
	//         width: 85px;
	//         position: absolute;
	//         left: 10px;
	//         top: 15px;
	//       }
	//       em {
	//         width: 4%;
	//         line-height: 26px;
	//         text-align: center;
	//         color: #e5e5e5;
	//       }
	//       input {
	//         width: 48%;
	//         text-align: center;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .content {
	//       padding: 15px 10px;
	//       font-size: 0;
	//       margin-bottom: 45px;
	//       margin-top: 110px;
	//       background-color: #fff;
	//       .title {
	//         font-size: 14px;
	//         position: relative;
	//         margin-bottom: 15px;
	//         span {
	//           font-weight: 700;
	//         }
	//         .view-all {
	//           position: absolute;
	//           right: 10px;
	//           padding: 10px 15px 10px 10px;
	//           top: -10px;
	//           color: $darkenGrayColor;
	//         }
	//       }
	//       .arrow {
	//         @include arrow($direction: 'bottom', $borderColor: #666)
	//         pointer-events: none;
	//         right: 0;
	//         left: 50%;
	//         top: -5px;
	//         margin-left: 20px;
	//       }
	//       .open {
	//         .arrow {
	//           -webkit-transform: rotate(45deg);
	//           transform: rotate(45deg);
	//           top: 5px;
	//         }
	//       }
	//     }
	//     .items {
	//       margin-bottom: 10px;
	//     }
	//     .item {
	//       position: relative;
	//       font-size: 14px;
	//       display: inline-block;
	//       width: 32%;
	//       margin-right: 2%;
	//       margin-bottom: 2%;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       background-color: #f0f0f0;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//       text-align: center;
	//       &.active {
	//         color: $mainColor;
	//         @include border($borderColor: $mainColor);
	//         background-color: #fff;
	//       }
	//       &:nth-child(3n) {
	//         margin-right: 0;
	//       }
	//     }
	//     .btn-confirm {
	//       height: 45px;
	//       line-height: 45px;
	//       color: #fff;
	//       position: fixed;
	//       left: 0;
	//       bottom: 0;
	//       width: 100%;
	//       text-align: center;
	//       background-color: $mainColor;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.filter-wrapper
	//     form.search(
	//       @submit.prevent='submit'
	//     )
	//       input.input(
	//         type="text",
	//         v-model='keywords',
	//         placeholder='搜索商品'
	//       )
	//     .price
	//       span.title 价格区间(元)
	//       input(v-model='minPrice', type='number', placeholder='最低价')
	//       em -
	//       input(v-model='maxPrice', type='number', placeholder='最高价')
	//     article.content
	//       section.category(v-if='filterCategory.length > 0')
	//         h4.title
	//           span 分类
	//         .items
	//           a.item(
	//             v-for='item in filterCategory',
	//             v-text='item.category_label',
	//             @click='toggleFilterCategory(item.entity_id)',
	//             :class='{active: item.entity_id === filterCurrentId}'
	//           )
	//       section.brand(
	//         v-if='filterBrand[filterCurrentId] && filterBrand[filterCurrentId].length > 0'
	//       )
	//         h4.title
	//           span 品牌
	//         .items
	//           a.item(
	//             v-for='(item, index) in filterBrand[filterCurrentId]',
	//             v-text='item.brand_name',
	//             :class='{active: item.checked}',
	//             @click='toggleFilterBrand(index)'
	//           )
	//       section.attributes(
	//         v-if='filterAttributes[filterCurrentId] && filterAttributes[filterCurrentId].length > 0'
	//       )
	//         .attr(v-for='attr in filterAttributes[filterCurrentId]')
	//           h4.title
	//             span(v-text='attr.option_label')
	//           .items
	//             a.item(
	//               v-for='(item, index) in attr.values',
	//               v-text='item.v',
	//               :data-id='index',
	//               :class='{active: item.checked}',
	//               @click='toggleFilterAttr({ parentId: attr.attribute_id, activeIndex: index })',
	//             )
	//     a.btn-confirm(@click='submit') 确定
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      keywords: '',
	      minPrice: '',
	      maxPrice: ''
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['filterCategory', 'filterBrand', 'filterAttributes', 'filterCurrentId', 'filterBrandId', 'filterAttr'])),
	  methods: _extends({}, Vuex.mapActions(['getFilterGoods', 'toggleFilterCategory', 'toggleFilterBrand', 'toggleFilterAttr']), {
	    submit: function submit() {
	      this.$router.push({
	        name: "goodsList",
	        query: {
	          brand_id: this.filterBrandId,
	          category_id: this.filterCurrentId,
	          keywords: this.keywords,
	          min_price: this.minPrice,
	          max_price: this.maxPrice,
	          attribute: self.encodeURIComponent(self.JSON.stringify(this.filterAttr))
	        }
	      });
	    }
	  }),
	  created: function created() {
	    this.getFilterGoods();
	  }
	};
	// </script>

/***/ },
/* 194 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper filter-wrapper\"><form @submit.prevent=\"submit\" class=\"search\"><input type=\"text\" v-model=\"keywords\" placeholder=\"搜索商品\" class=\"input\"/></form><div class=\"price\"><span class=\"title\">价格区间(元)</span><input v-model=\"minPrice\" type=\"number\" placeholder=\"最低价\"/><em>-</em><input v-model=\"maxPrice\" type=\"number\" placeholder=\"最高价\"/></div><article class=\"content\"><section v-if=\"filterCategory.length &gt; 0\" class=\"category\"><h4 class=\"title\"><span>分类</span></h4><div class=\"items\"><a v-for=\"item in filterCategory\" v-text=\"item.category_label\" @click=\"toggleFilterCategory(item.entity_id)\" :class=\"{active: item.entity_id === filterCurrentId}\" class=\"item\"></a></div></section><section v-if=\"filterBrand[filterCurrentId] &amp;&amp; filterBrand[filterCurrentId].length &gt; 0\" class=\"brand\"><h4 class=\"title\"><span>品牌</span></h4><div class=\"items\"><a v-for=\"(item, index) in filterBrand[filterCurrentId]\" v-text=\"item.brand_name\" :class=\"{active: item.checked}\" @click=\"toggleFilterBrand(index)\" class=\"item\"></a></div></section><section v-if=\"filterAttributes[filterCurrentId] &amp;&amp; filterAttributes[filterCurrentId].length &gt; 0\" class=\"attributes\"><div v-for=\"attr in filterAttributes[filterCurrentId]\" class=\"attr\"><h4 class=\"title\"><span v-text=\"attr.option_label\"></span></h4><div class=\"items\"><a v-for=\"(item, index) in attr.values\" v-text=\"item.v\" :data-id=\"index\" :class=\"{active: item.checked}\" @click=\"toggleFilterAttr({ parentId: attr.attribute_id, activeIndex: index })\" class=\"item\"></a></div></div></section></article><a @click=\"submit\" class=\"btn-confirm\">确定</a></div>";

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(196)
	__vue_script__ = __webpack_require__(197)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(198)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-19a99e28/category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 196 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 197 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .category-wrapper {
	//     background-color: #fff;
	//     min-height: 100%;
	//     .nav {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       bottom: 0;
	//       width: 80px;
	//       padding-bottom: 45px;
	//       text-align: center;
	//       background-color: #f5f5f5;
	//       a {
	//         display: block;
	//         padding: 15px 3px;
	//         white-space: nowrap;
	//         overflow: hidden;
	//         text-overflow: ellipsis;
	//         position: relative;
	//         @include borderBottom;
	//         &.active {
	//           background-color: #fff;
	//           &:before {
	//             content: '';
	//             width: 3px;
	//             height: 100%;
	//             position: absolute;
	//             left: 0;
	//             top: 0;
	//             background-color: $mainColor;
	//           }
	//         }
	//       }
	//     }
	//     .content {
	//       margin-left: 80px;
	//       padding: 15px 10px;
	//       font-size: 0;
	//       margin-bottom: 45px;
	//       .title {
	//         font-size: 14px;
	//         position: relative;
	//         margin-bottom: 15px;
	//         span {
	//           font-weight: 700;
	//         }
	//         .view-all {
	//           position: absolute;
	//           right: 10px;
	//           padding: 10px 15px 10px 10px;
	//           top: -10px;
	//           color: $darkenGrayColor;
	//         }
	//       }
	//       .arrow {
	//         @include arrow($direction: 'bottom', $borderColor: #666)
	//         pointer-events: none;
	//         right: 0;
	//         left: 50%;
	//         top: -5px;
	//         margin-left: 20px;
	//       }
	//       .open {
	//         .arrow {
	//           -webkit-transform: rotate(45deg);
	//           transform: rotate(45deg);
	//           top: 5px;
	//         }
	//       }
	//     }
	//     .items {
	//       margin-bottom: 10px;
	//     }
	//     .item {
	//       position: relative;
	//       font-size: 14px;
	//       display: inline-block;
	//       width: 32%;
	//       margin-right: 2%;
	//       margin-bottom: 2%;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       background-color: #f0f0f0;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//       text-align: center;
	//       &.active {
	//         color: $mainColor;
	//         @include border($borderColor: $mainColor);
	//         background-color: #fff;
	//       }
	//       &:nth-child(3n) {
	//         margin-right: 0;
	//       }
	//     }
	//     .btn-confirm {
	//       height: 45px;
	//       line-height: 45px;
	//       color: #fff;
	//       position: fixed;
	//       left: 0;
	//       bottom: 0;
	//       width: 100%;
	//       text-align: center;
	//       background-color: $mainColor;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.category-wrapper
	//     nav.nav
	//       a(
	//         v-for='item in filterCategory',
	//         v-text='item.category_label',
	//         @click='toggleFilterCategory(item.entity_id)',
	//         :class='{active: item.entity_id === filterCurrentId}'
	//       )
	//     article.content
	//       section.brand(
	//         v-if='filterBrand[filterCurrentId] && filterBrand[filterCurrentId].length > 0'
	//       )
	//         h4.title
	//           span 品牌
	//         .items
	//           a.item(
	//             v-for='(item, index) in filterBrand[filterCurrentId]',
	//             v-text='item.brand_name',
	//             :class='{active: item.checked}',
	//             @click='toggleFilterBrand(index)'
	//           )
	//       section.attributes(
	//         v-if='filterAttributes[filterCurrentId] && filterAttributes[filterCurrentId].length > 0'
	//       )
	//         .attr(v-for='attr in filterAttributes[filterCurrentId]')
	//           h4.title
	//             span(v-text='attr.option_label')
	//           .items
	//             a.item(
	//               v-for='(item, index) in attr.values',
	//               v-text='item.v',
	//               :data-id='index',
	//               :class='{active: item.checked}',
	//               @click='toggleFilterAttr({ parentId: attr.attribute_id, activeIndex: index })',
	//             )
	//     a.btn-confirm(@click='submit') 确定
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters(['filterCategory', 'filterBrand', 'filterAttributes', 'filterCurrentId', 'filterBrandId', 'filterAttr'])),
	  methods: _extends({}, Vuex.mapActions(['getFilterGoods', 'toggleFilterCategory', 'toggleFilterBrand', 'toggleFilterAttr']), {
	    submit: function submit() {
	      this.$router.push({
	        name: "goodsList",
	        query: {
	          brand_id: this.filterBrandId,
	          category_id: this.filterCurrentId,
	          attribute: self.encodeURIComponent(self.JSON.stringify(this.filterAttr))
	        }
	      });
	    }
	  }),
	  created: function created() {
	    this.getFilterGoods();
	  }
	};
	// </script>

/***/ },
/* 198 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper category-wrapper\"><nav class=\"nav\"><a v-for=\"item in filterCategory\" v-text=\"item.category_label\" @click=\"toggleFilterCategory(item.entity_id)\" :class=\"{active: item.entity_id === filterCurrentId}\"></a></nav><article class=\"content\"><section v-if=\"filterBrand[filterCurrentId] &amp;&amp; filterBrand[filterCurrentId].length &gt; 0\" class=\"brand\"><h4 class=\"title\"><span>品牌</span></h4><div class=\"items\"><a v-for=\"(item, index) in filterBrand[filterCurrentId]\" v-text=\"item.brand_name\" :class=\"{active: item.checked}\" @click=\"toggleFilterBrand(index)\" class=\"item\"></a></div></section><section v-if=\"filterAttributes[filterCurrentId] &amp;&amp; filterAttributes[filterCurrentId].length &gt; 0\" class=\"attributes\"><div v-for=\"attr in filterAttributes[filterCurrentId]\" class=\"attr\"><h4 class=\"title\"><span v-text=\"attr.option_label\"></span></h4><div class=\"items\"><a v-for=\"(item, index) in attr.values\" v-text=\"item.v\" :data-id=\"index\" :class=\"{active: item.checked}\" @click=\"toggleFilterAttr({ parentId: attr.attribute_id, activeIndex: index })\" class=\"item\"></a></div></div></section></article><a @click=\"submit\" class=\"btn-confirm\">确定</a></div>";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CARTS = undefined;

	var _index = __webpack_require__(200);

	var _index2 = _interopRequireDefault(_index);

	var _confirm = __webpack_require__(208);

	var _confirm2 = _interopRequireDefault(_confirm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CARTS = exports.CARTS = [{
	  path: '/cart',
	  name: 'cart',
	  component: _index2.default,
	  meta: {
	    title: '购物车'
	  }
	}, {
	  path: '/cart/confirm',
	  name: 'confirm',
	  component: _confirm2.default,
	  meta: {
	    title: '确认订单'
	  }
	}];

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(201)
	__vue_script__ = __webpack_require__(202)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\carts\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(207)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-428d3b91/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 201 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .carts-wrapper {
	//     padding-top: 10px;
	//     padding-bottom: 100px;
	//   }
	//   .footer-settle {
	//     height: 50px;
	//     line-height: 50px;
	//     position: fixed;
	//     z-index: 2;
	//     left: 0;
	//     bottom: 50px;
	//     width: 100%;
	//     padding-left: 80px;
	//     padding-right: 32%;
	//     box-sizing: border-box;
	//     background-color: #fff;
	//     text-align: right;
	//     @include borderTop;
	//     .icon-big-check {
	//       padding-top: 0;
	//       padding-bottom: 0;
	//     }
	//     span {
	//       font-size: 14px;
	//       margin-left: 5px;
	//     }
	//     em, span {
	//       vertical-align: middle;
	//       pointer-events: none;
	//     }
	//     .price {
	//       color: $priceColor;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.carts-wrapper(
	//       @touchmove='touchmove($event)',
	//       @touchstart='touchstart($event)',
	//       @touchend='touchend($event)'
	//     )
	//     shop-cart-item(
	//       v-if='cartsItems.length > 0',
	//       v-for='item in cartsItems',
	//       :shop-data='item',
	//     )
	//     .footer-settle(v-if='cartsItems.length > 0')
	//       a.icon-big-check(
	//         :class='{"active": allIsSelected === "1"}',
	//         @click='optionsCart({el: $event.target})'
	//       )
	//         em.icon-cart-check
	//         span 全选
	//       em 总计:
	//       span.price {{totalAmount | formatAmount}}
	//       a.btn-settle(
	//         @click='goSettle'
	//       ) 去结算
	//     not-found(v-else)
	//       p 未查询到相关数据!
	//     nav-bar
	// </template>
	//
	// <script lang='babel'>


	var _navBar = __webpack_require__(10);

	var _navBar2 = _interopRequireDefault(_navBar);

	var _shopCartItem = __webpack_require__(203);

	var _shopCartItem2 = _interopRequireDefault(_shopCartItem);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NavBar: _navBar2.default,
	    NotFound: _notFound2.default,
	    ShopCartItem: _shopCartItem2.default
	  },
	  data: function data() {
	    return {
	      startX: 0,
	      startY: 0,
	      end: 0,
	      target: null
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['cartsItems', 'allIsSelected', 'totalAmount', 'beSettled', 'toastMsg'])),
	  methods: _extends({}, Vuex.mapActions(['getCartsList', 'optionsCart']), {
	    touchstart: function touchstart($event) {
	      var _this = this;

	      if ($event.touches.length == 1) {
	        var touch = $event.touches[0];

	        if (touch.target.classList.contains("btn-del")) {
	          return false;
	        }

	        this.startX = touch.clientX;
	        this.startY = touch.clientY;

	        if (this.target) {
	          var _ret = function () {
	            var transitionendFunc = function transitionendFunc() {
	              this.removeEventListener("webkitTransitionEnd", transitionendFunc, true);
	              this.removeEventListener("transitionend", transitionendFunc, true);
	              this.style.webkitTransition = "";
	              this.style.transition = "";
	            };

	            _this.end = 0;

	            _this.target.style.webkitTransform = 'translate(' + _this.end + 'px, 0) translateZ(0)';
	            _this.target.style.transform = 'translate(' + _this.end + 'px, 0) translateZ(0)';


	            _this.target.addEventListener("webkitTransitionEnd", transitionendFunc, true);
	            _this.target.addEventListener("transitionend", transitionendFunc, true);
	            _this.target = null;
	            return {
	              v: false
	            };
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	          if (touch.target.classList.contains("goods")) {
	            this.target = touch.target.parentNode;
	          }
	          if (touch.target.classList.contains("touch")) {
	            this.target = touch.target;
	          }
	        }
	      }
	    },
	    touchmove: function touchmove($event) {
	      if (this.target) {
	        var touch = $event.touches[0];

	        var changeY = touch.clientY - this.startY;

	        if (Math.abs(changeY) <= 10 && Math.abs(changeY) > Math.abs(this.end)) {
	          $event.preventDefault();
	          $event.stopPropagation();
	        }

	        this.end = touch.clientX - this.startX;

	        if (this.end < 0) {
	          this.target.style.webkitTransform = 'translate(' + this.end + 'px, 0) translateZ(0)';
	          this.target.style.transform = 'translate(' + this.end + 'px, 0) translateZ(0)';
	        }
	      }
	    },
	    touchend: function touchend($event) {
	      if (this.end <= -5) {
	        if (this.end <= -30) {
	          this.end = -60;
	        } else {
	          this.end = 0;
	        }

	        this.target.style.webkitTransition = "transform 0.2s ease";
	        this.target.style.transition = "transform 0.2s ease";

	        this.target.style.webkitTransform = 'translate(' + this.end + 'px, 0) translateZ(0)';
	        this.target.style.transform = 'translate(' + this.end + 'px, 0) translateZ(0)';
	      } else {
	        this.target = null;
	      }
	    },
	    goSettle: function goSettle() {
	      if (!+this.totalAmount) {
	        self.toast('还没有选择要结算的商品哟~');
	        return;
	      } else if (!+this.beSettled) {
	        self.toast(this.toastMsg);
	      } else {
	        this.$router.push({
	          name: 'confirm'
	        });
	      }
	    }
	  }),
	  created: function created() {
	    self.sessionStorage.clear();
	    this.getCartsList();
	  }
	};
	// </script>

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(204)
	__vue_script__ = __webpack_require__(205)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\carts\\shopCartItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(206)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d827930c/shopCartItem.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 204 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 205 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .carts-shop-item {
	//     position: relative;
	//     background-color: #fff;
	//     margin-bottom: 10px;
	//     @include borderTop;
	//     @include borderBottom;
	//     $titleHeight: 40px;
	//     .shop-name {
	//       position: relative;
	//       height: $titleHeight;
	//       .name {
	//         display: block;
	//         padding: 10px $margin 10px 40px;
	//       }
	//       span,
	//       label {
	//         display: inline-block;
	//         vertical-align: bottom;
	//       }
	//       span {
	//         margin-right: 5px;
	//         max-width: 160px;
	//         white-space: nowrap;
	//         overflow: hidden;
	//         text-overflow: ellipsis;
	//       }
	//       label {
	//         color: $priceColor;
	//         font-size: 12px;
	//       }
	//     }
	//     .goods-item {
	//       position: relative;
	//       z-index: 1;
	//       padding-top: 1px;
	//       @include borderTop($left: 40px);
	//       &.goods-disabled {
	//         opacity: 0.5;
	//         .icon-big-check {
	//           pointer-events: none;
	//         }
	//       }
	//     }
	//     .touch {
	//       position: relative;
	//       z-index: 1;
	//       background-color: #fff;
	//       height: 125px;
	//     }
	//     .btn-del {
	//       position: absolute;
	//       right: 0;
	//       top: 1px;
	//       background-color: $priceColor;
	//       color: #fff;
	//       width: 50px;
	//       height: 125px;
	//       line-height: 125px;
	//       text-align: center;
	//     }
	//     .goods {
	//       display: block;
	//       overflow: hidden;
	//       min-height: 69px;
	//       padding: 10px $margin 25px 115px;
	//       position: relative;
	//       z-index: 1;
	//       background-color: inherit;
	//       span, h4, p {
	//         pointer-events: none;
	//       }
	//     }
	//     .topic {
	//       width: 70px;
	//       height: 70px;
	//       position: absolute;
	//       left: 40px;
	//       top: 50%;
	//       margin-top: -35px;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//     }
	//     .goods-name {
	//       overflow: hidden;
	//       margin: 0 5px 5px 0;
	//       @include ellipsis;
	//     }
	//     .sub-title {
	//       margin-bottom: 5px;
	//       color: $priceColor;
	//       @include ellipsis;
	//     }
	//     .price {
	//       float: right;
	//       font-size: 16px;
	//     }
	//     .goods-stock {
	//       color: $priceColor;
	//       font-size: 12px;
	//       position: absolute;
	//       right: 10px;
	//       bottom: 12px;
	//       z-index: 1;
	//     }
	//   }
	//   .cart-option {
	//     position: absolute;
	//     right: 0;
	//     bottom: 0;
	//     height: 30px;
	//     font-size: 12px;
	//     width: 90px;
	//     z-index: 1;
	//     background-color: inherit;
	//     a {
	//       position: absolute;
	//       top: 0;
	//       bottom: 0;
	//       z-index: 1;
	//     }
	//     .sub-cart {
	//       left: 0;
	//       padding-left: 10px;
	//       em {
	//         border-top-right-radius: 0;
	//         border-bottom-right-radius: 0;
	//       }
	//     }
	//     .add-cart {
	//       right: 0;
	//       padding-right: 10px;
	//       em {
	//         border-top-left-radius: 0;
	//         border-bottom-left-radius: 0;
	//       }
	//     }
	//     em {
	//       display: block;
	//       position: relative;
	//       width: 20px;
	//       height: 20px;
	//       line-height: 19px;
	//       overflow: hidden;
	//       text-align: center;
	//       border-radius: 3px;
	//       background-color: #fff;
	//       border: 1px solid #666;
	//     }
	//     .input {
	//       position: absolute;
	//       right: 29px;
	//       left: 29px;
	//       height: 20px;
	//       border-top: 1px solid #666;
	//       border-bottom: 1px solid #666;
	//       input {
	//         width: 100%;
	//         height: 20px;
	//         text-align: center;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.carts-shop-item
	//     h3.shop-name
	//       router-link.name(
	//         :data-id='shopData.store_id',
	//         :price='shopData.starting_price',
	//         :to='{name: "shop", params: {shopId: shopData.store_id}}'
	//       )
	//         span(v-text='shopData.store_name')
	//         label(v-text='shopData.starting_price_tips')
	//       a.icon-big-check(
	//         :data-price='shopData.grand_total',
	//         :class='{"active": shopData.store_is_selected === "1"}',
	//         @click='optionsCart({el: $event.target, type: 2, vm: shopData.goods})'
	//       )
	//         em.icon-cart-check
	//       em.icon-more
	//     .goods-item(
	//       v-for='item in shopData.goods',
	//       :class='{"goods-disabled": item.store_product_status != "on_sale"}'
	//     )
	//       .touch
	//         router-link.goods(
	//           :to='{name: "goodsInfo", params: {shopId: shopData.store_id, goodsId: item.store_product_id}}',
	//           :data-id='item.store_product_id',
	//           :class='{"carts-activity-tags": item.activity_tags && item.activity_tags.length > 0}'
	//         )
	//           span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
	//           span.price(v-text='"¥" + item.base_price')
	//           h4.goods-name(v-text='item.product_name')
	//           p.sub-title(v-text='item.store_product_sub_title')
	//           .activity-tags(v-if='item.activity_tags && item.activity_tags.length > 0')
	//             span(
	//               v-for='tag in item.activity_tags',
	//               v-text='tag.sell_tag'
	//             )
	//         p.cart-option(
	//           :data-stock='item.store_product_stock_qty',
	//           v-if='item.store_product_status == "on_sale"'
	//         )
	//           a.sub-cart(@click='optionsCart({el: $event.target, type: 5, vm: item})')
	//             em -
	//           span.input
	//             input(
	//               :value='item.qty',
	//               @change='optionsCart({el: $event.target, type: 6, vm: item})',
	//               type='tel'
	//             )
	//           a.add-cart(@click='optionsCart({el: $event.target, type: 4, vm: item})')
	//             em +
	//         span.goods-stock(v-else) 已下架
	//         a.icon-big-check(
	//           :data-price='item.sub_total',
	//           :class='{"active": item.is_selected === "1"}',
	//           @click='optionsCart({el: $event.target, type: 3, vm: item})'
	//         )
	//           em.icon-cart-check
	//       a.btn-del(@click.stop='optionsCart({el: $event.target, type: 7, vm: item})') 删除
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['shopData'],
	  methods: _extends({}, Vuex.mapActions(['optionsCart']))
	};
	// </script>

/***/ },
/* 206 */
/***/ function(module, exports) {

	module.exports = "<section class=\"carts-shop-item\"><h3 class=\"shop-name\"><router-link :data-id=\"shopData.store_id\" :price=\"shopData.starting_price\" :to=\"{name: &quot;shop&quot;, params: {shopId: shopData.store_id}}\" class=\"name\"><span v-text=\"shopData.store_name\"></span><label v-text=\"shopData.starting_price_tips\"></label></router-link><a :data-price=\"shopData.grand_total\" :class=\"{&quot;active&quot;: shopData.store_is_selected === &quot;1&quot;}\" @click=\"optionsCart({el: $event.target, type: 2, vm: shopData.goods})\" class=\"icon-big-check\"><em class=\"icon-cart-check\"></em></a><em class=\"icon-more\"></em></h3><div v-for=\"item in shopData.goods\" :class=\"{&quot;goods-disabled&quot;: item.store_product_status != &quot;on_sale&quot;}\" class=\"goods-item\"><div class=\"touch\"><router-link :to=\"{name: &quot;goodsInfo&quot;, params: {shopId: shopData.store_id, goodsId: item.store_product_id}}\" :data-id=\"item.store_product_id\" :class=\"{&quot;carts-activity-tags&quot;: item.activity_tags &amp;&amp; item.activity_tags.length &gt; 0}\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><span v-text=\"&quot;¥&quot; + item.base_price\" class=\"price\"></span><h4 v-text=\"item.product_name\" class=\"goods-name\"></h4><p v-text=\"item.store_product_sub_title\" class=\"sub-title\"></p><div v-if=\"item.activity_tags &amp;&amp; item.activity_tags.length &gt; 0\" class=\"activity-tags\"><span v-for=\"tag in item.activity_tags\" v-text=\"tag.sell_tag\"></span></div></router-link><p :data-stock=\"item.store_product_stock_qty\" v-if=\"item.store_product_status == &quot;on_sale&quot;\" class=\"cart-option\"><a @click=\"optionsCart({el: $event.target, type: 5, vm: item})\" class=\"sub-cart\"><em>-</em></a><span class=\"input\"><input :value=\"item.qty\" @change=\"optionsCart({el: $event.target, type: 6, vm: item})\" type=\"tel\"/></span><a @click=\"optionsCart({el: $event.target, type: 4, vm: item})\" class=\"add-cart\"><em>+</em></a></p><span v-else=\"v-else\" class=\"goods-stock\">已下架</span><a :data-price=\"item.sub_total\" :class=\"{&quot;active&quot;: item.is_selected === &quot;1&quot;}\" @click=\"optionsCart({el: $event.target, type: 3, vm: item})\" class=\"icon-big-check\"><em class=\"icon-cart-check\"></em></a></div><a @click.stop=\"optionsCart({el: $event.target, type: 7, vm: item})\" class=\"btn-del\">删除</a></div></section>";

/***/ },
/* 207 */
/***/ function(module, exports) {

	module.exports = "<div @touchmove=\"touchmove($event)\" @touchstart=\"touchstart($event)\" @touchend=\"touchend($event)\" class=\"wrapper carts-wrapper\"><shop-cart-item v-if=\"cartsItems.length &gt; 0\" v-for=\"item in cartsItems\" :shop-data=\"item\"></shop-cart-item><div v-if=\"cartsItems.length &gt; 0\" class=\"footer-settle\"><a :class=\"{&quot;active&quot;: allIsSelected === &quot;1&quot;}\" @click=\"optionsCart({el: $event.target})\" class=\"icon-big-check\"><em class=\"icon-cart-check\"></em><span>全选</span></a><em>总计:</em><span class=\"price\">{{totalAmount | formatAmount}}</span><a @click=\"goSettle\" class=\"btn-settle\">去结算</a></div><not-found v-else=\"v-else\"><p>未查询到相关数据!</p></not-found><nav-bar></nav-bar></div>";

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(209)
	__vue_script__ = __webpack_require__(210)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\carts\\confirm.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(211)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-50d6b682/confirm.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 209 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .confirm-order-wrapper {
	//     padding-bottom: 50px;
	//     em[class^='icon-'] {
	//       vertical-align: middle;
	//       margin-right: 5px;
	//       width: 19px;
	//       height: 19px;
	//       & + span {
	//         vertical-align: middle;
	//       }
	//     }
	//     .pay-container {
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       position: relative;
	//       padding-top: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       .icon-pay {
	//         margin-left: 10px;
	//       }
	//       .online {
	//         margin-top: 10px;
	//       }
	//       .pay {
	//         overflow: hidden;
	//         position: relative;
	//         display: block;
	//         padding: 10px;
	//         @include borderTop;
	//         span {
	//           float: left;
	//         }
	//         em {
	//           float: right;
	//         }
	//       }
	//     }
	//     .shop {
	//       margin-bottom: 10px;
	//       position: relative;
	//       background-color: #fff;
	//       @include borderTop;
	//       @include borderBottom;
	//       .title {
	//         position: relative;
	//         .checked {
	//           position: absolute;
	//           left: 0;
	//           top: 0;
	//           bottom: 0;
	//           padding: 10px;
	//           z-index: 1;
	//         }
	//         .shop-name {
	//           display: block;
	//           padding-right: 20px;
	//         }
	//       }
	//       .border {
	//         position: relative;
	//         @include borderBottom;
	//         padding: 10px;
	//       }
	//     }
	//     .coupon {
	//       display: block;
	//       strong {
	//         vertical-align: middle;
	//         color: $mainColor;
	//         margin-left: 5px;
	//       }
	//       .null {
	//         position: absolute;
	//         right: 30px;
	//         top: 50%;
	//         margin-top: -10px;
	//         color: $darkenGrayColor;
	//         &.choose {
	//           color: $mainColor;
	//         }
	//       }
	//     }
	//     .total {
	//       padding: 10px;
	//     }
	//     .item {
	//       padding: 10px 10px 10px 90px;
	//       position: relative;
	//       display: block;
	//       min-height: 70px;
	//       @include borderBottom;
	//       .topic {
	//         width: 70px;
	//         height: 70px;
	//         position: absolute;
	//         left: 0;
	//         top: 50%;
	//         margin-left: 10px;
	//         margin-top: -35px;
	//         background-size: cover;
	//         background-repeat: no-repeat;
	//         background-position: 50% 50%;
	//       }
	//       .name {
	//         margin-bottom: 3px;
	//       }
	//       .sub-title {
	//         font-size: 12px;
	//         margin-bottom: 3px;
	//         color: $darkenGrayColor;
	//       }
	//       .price {
	//         overflow: hidden;
	//         strong {
	//           float: left;
	//           color: $priceColor;
	//         }
	//         span {
	//           float: right;
	//           font-size: 12px;
	//           margin-top: 5px;
	//           color: $grayColor;
	//         }
	//       }
	//     }
	//     .total {
	//       text-align: right;
	//       .price {
	//         margin-left: 5px;
	//         color: $priceColor;
	//       }
	//     }
	//     .remarks {
	//       .input {
	//         height: 100%;
	//         left: 70px;
	//         right: 30px;
	//         top: 0;
	//         position: absolute;
	//         input {
	//           height: 100%;
	//           width: 100%;
	//         }
	//       }
	//     }
	//     .footer-settle {
	//       bottom: 0;
	//       padding-left: 0;
	//       text-align: left;
	//       em {
	//         margin-left: 10px;
	//       }
	//       &.cheap-tips-wrapper {
	//         line-height: 1;
	//         padding-top: 10px;
	//         .cheap-tips {
	//           font-size: 12px;
	//           margin-left: 10px;
	//           margin-top: 5px;
	//           color: $priceColor;
	//         }
	//         .btn-settle {
	//           line-height: 50px;
	//         }
	//       }
	//     }
	//     .pocket-money {
	//       display: block;
	//       background-color: #fff;
	//       position: relative;
	//       padding: 10px;
	//       overflow: hidden;
	//       margin-bottom: 10px;
	//       @include borderTop;
	//       @include borderBottom;
	//       span, strong {
	//         vertical-align: middle;
	//       }
	//       strong {
	//         color: $priceColor;
	//         margin-left: 5px;
	//       }
	//       .icon-confirm {
	//         float: right;
	//       }
	//     }
	//   }
	//   .consignee-wrapper {
	//     margin-top: 10px;
	//     margin-bottom: 10px;
	//     position: relative;
	//     padding-top: 15px;
	//     background: #fff url(/src/images/envelope.png) 0 0 repeat-x;
	//     -webkit-background-size: auto 3px;
	//     background-size: auto 3px;
	//     .icon-consignee {
	//       margin-left: 10px;
	//       vertical-align: middle;
	//       margin-right: 5px;
	//       & + span {
	//         vertical-align: middle;
	//       }
	//     }
	//     .consignee-info {
	//       display: block;
	//       padding: 10px 10px 15px;
	//       margin-top: 10px;
	//       position: relative;
	//       @include borderTop;
	//       background: #fff url(/src/images/envelope.png) 0 100% repeat-x;
	//       -webkit-background-size: auto 3px;
	//       background-size: auto 3px;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//         &:first-child {
	//           width: 65%;
	//         }
	//       }
	//       p {
	//         margin-top: 5px;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.confirm-order-wrapper
	//     article.consignee-wrapper
	//       em.icon-consignee.icon-36
	//       span 收货人信息
	//       a.consignee-info(
	//         @click='goAddress'
	//       )
	//         span.name(v-text='address.addressee')
	//         span.mobile(v-text='address.mobile_phone')
	//         p(v-text='address.addressDetail')
	//         em.icon-more
	//     article.pay-container
	//       em.icon-pay.icon-36
	//       span 请选择支付方式
	//       a.pay.online(
	//         :class='{active: pay_method === "online"}',
	//         @click='initPage("online", isUsePocket)'
	//       )
	//         span 在线支付
	//         em.icon-confirm.icon-36
	//       a.pay.offline(
	//         :class='{active: pay_method === "offline"}',
	//         @click='initPage("offline", isUsePocket)'
	//       )
	//         span 货到付款
	//         em.icon-confirm.icon-36
	//     a.pocket-money(
	//       v-if='use_pocket_money > 0',
	//       :class='{active: isUsePocket}',
	//       @click='initPage(pay_method, !isUsePocket)'
	//     )
	//       em.icon-confirm.icon-36
	//       span 零钱抵扣:
	//       strong(v-text='"¥" + use_pocket_money')
	//     section.shop(v-for='item in items')
	//       .title
	//         router-link.shop-name.border(
	//           v-text='item.store_name',
	//           :to='{name: "shop", params: {shopId: item.store_id}}'
	//         )
	//         em.icon-more
	//       a.item(
	//         v-for='goodsItem in item.items',
	//         @click='viewGoodsInfo(item.store_id, goodsItem.store_product_id, goodsItem.activity_tags)',
	//         :class='{"carts-activity-tags": goodsItem.activity_tags && goodsItem.activity_tags.length > 0}'
	//       )
	//         span.topic(
	//           :style='{backgroundImage: "url(" + goodsItem.default_media_gallery_thumb + ")"}'
	//         )
	//         h4.name(v-text='goodsItem.product_name')
	//         p.sub-title(
	//           v-if='goodsItem.store_product_sub_title',
	//           v-text='goodsItem.store_product_sub_title'
	//         )
	//         .activity-tags(v-if='goodsItem.activity_tags && goodsItem.activity_tags.length > 0')
	//           span(
	//             v-for='tag in goodsItem.activity_tags',
	//             v-text='tag.sell_tag'
	//           )
	//         .price
	//           strong(v-if='goodsItem.base_price') {{goodsItem.base_price | formatAmount}}
	//           span.num(v-text='"×" + goodsItem.qty')
	//       a.coupon.border(@click='chooseCoupon(item)')
	//         em.icon-coupon.icon-36
	//         span 优惠券
	//         strong(
	//           v-if='item.coupon_num > 0',
	//           v-text='item.coupon_num + "张可用"'
	//         )
	//         span.null(v-else) 无可用
	//         span.null(v-if='item.coupon_num && !item.using_coupon') 未使用
	//         span.null.choose(
	//           v-if='item.using_coupon && item.using_coupon.coupon_price',
	//         ) -{{item.using_coupon.coupon_price | formatAmount}}
	//         em.icon-more
	//       .remarks.border
	//         em.icon-remark.icon-36
	//         span 备注
	//         .input
	//           input(
	//             v-model='item.remark',
	//             maxlength='50',
	//             placeholder='请输入备注，50字以内',
	//             @change='setRemark(item.store_id, $event.target.value)'
	//           )
	//       .total
	//         span 合计:
	//         strong.price {{item.grand_total | formatAmount}}
	//     .footer-settle(
	//       :class='{"cheap-tips-wrapper": first_cheap_tips}'
	//     )
	//       em 应付金额:
	//       span.price {{sub_grand_total | formatAmount}}
	//       p.cheap-tips(
	//         v-if='first_cheap_tips',
	//         v-text='"首单减免: " + first_cheap_tips'
	//       )
	//       a.btn-settle(@click='createOrder') 确认订单
	// </template>
	//
	// <script lang='babel'>


	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  data: function data() {
	    return {
	      address: {},
	      items: [],
	      pay_method: '',
	      isUsePocket: 1,
	      is_first: {},
	      use_pocket_money: 0,
	      sub_grand_total: 0,
	      first_cheap_tips: '',
	      type: '',

	      goods: {},
	      remarks: null
	    };
	  },

	  methods: {
	    initPage: function initPage(pay_method, isUsePocket) {
	      var _this = this;

	      // 切换支付方式后，将备注信息写到storage中
	      // 从选择地址页或选择优惠券页回来，需要将storage中的数据写到vm中，如果存在的话
	      if (this.remarks) {
	        self.sessionStorage.setItem('remarks', self.JSON.stringify(this.remarks));
	      } else {
	        this.remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
	      }
	      this.goods = self.JSON.parse(self.sessionStorage.getItem('goods'));
	      var buy_now = self.sessionStorage.getItem('buyNow');

	      var body = _extends({}, apis.SETTLEMENT);
	      body.address_id = this.$route.query.address_id || 0;
	      body.pay_method = pay_method;
	      body.is_clear_coupon = self.sessionStorage.getItem('isClear') || 0;
	      body.is_use_pocket = +isUsePocket;
	      // 从购物车进来，不需要goods咯
	      if (buy_now) {
	        this.type = 'buy_now';
	        body.goods = this.goods;
	      } else {
	        delete body.goods;
	        this.type = 'cart';
	      }
	      body.type = this.type;

	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.address = data.info.address;
	          _this.items = data.info.items;
	          _this.is_first = data.info.first_full_cut;
	          _this.pay_method = data.info.pay_method;
	          _this.isUsePocket = +data.info.is_use_pocket;
	          _this.use_pocket_money = data.info.use_pocket_money;
	          _this.address.addressDetail = data.info.address.province + data.info.address.city + data.info.address.county + data.info.address.street;
	          _this.sub_grand_total = data.info.sub_grand_total;
	          _this.first_cheap_tips = data.info.first_cheap_tips;
	          self.sessionStorage.setItem('payMethod', _this.pay_method);
	          self.sessionStorage.setItem('isUsePocket', _this.isUsePocket);
	        } else {
	          self.toast(data.info.errmsg, {
	            callback: function () {
	              if (data.code === '0x8101') {
	                this.$router.replace({
	                  name: 'cart'
	                });
	              } else {
	                this.$router.replace({
	                  name: 'home'
	                });
	              }
	            }.bind(_this)
	          });
	        }
	      });
	    },
	    getRemark: function getRemark() {
	      var remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
	      if (remarks) {
	        this.items.map(function (item) {
	          Vue.set(item, 'remark', remarks[item.store_id]);
	        });
	      }
	    },
	    goAddress: function goAddress() {
	      var query = this.$route.query;
	      query.from = 'confirm';
	      query.pay_method = this.pay_method;
	      this.$router.push({
	        name: "addressList",
	        query: query
	      });
	    },
	    viewGoodsInfo: function viewGoodsInfo(shopId, goodsId, activity) {
	      if (activity && activity[0].is_show_detail === 0) return;
	      this.$router.push({
	        name: "goodsInfo",
	        params: {
	          shopId: shopId,
	          goodsId: goodsId
	        }
	      });
	    },
	    chooseCoupon: function chooseCoupon(vm) {
	      if (!vm.coupon_num) {
	        self.toast('暂无可用的优惠券哟~');
	        return;
	      }
	      var productInfo = {
	        store_id: 0,
	        item: []
	      };

	      productInfo.store_id = vm.store_id;
	      vm.items.map(function (item) {
	        productInfo.item.push({
	          num: item.qty,
	          product_id: item.store_product_id
	        });
	      });
	      self.sessionStorage.setItem('productInfo', self.JSON.stringify(productInfo));
	      var query = this.$route.query;
	      query.from = 'confirm';
	      query.pay_method = this.pay_method;
	      this.$router.push({
	        name: "couponUse",
	        query: query
	      });
	    },
	    setRemark: function setRemark(shopId, value) {
	      this.remarks = this.remarks || {};
	      this.remarks[shopId] = value;
	    },
	    createOrder: function createOrder() {
	      var _this2 = this;

	      if (this.checkedCount === 0) {
	        self.toast('请选择购买商品~');
	        return;
	      }
	      self.DD.loading();
	      var comments = {};
	      var coupon_detail_ids = {};
	      this.items.map(function (item) {
	        if (item.remark) {
	          comments[item.store_id] = item.remark;
	        }
	        if (item.using_coupon) {
	          coupon_detail_ids[item.store_id] = item.using_coupon.coupon_detail_id;
	        }
	      });
	      var orderGoods = {};
	      this.items.map(function (item) {
	        item.items.map(function (goods) {
	          orderGoods[goods.store_product_id] = goods.qty;
	        });
	      });
	      var body = _extends({}, apis.CREATED_NEW_ORDER);
	      body.address_id = this.address.address_id;
	      body.goods = orderGoods;
	      body.type = this.type;
	      body.pay_method = this.pay_method;
	      body.comments = comments;
	      body.coupon_detail_ids = coupon_detail_ids;
	      body.use_pocket_money = this.isUsePocket ? this.use_pocket_money : 0;

	      self.DD.post(body, function (data) {
	        self.sessionStorage.clear();
	        if (data.result === 'success') {
	          if (_this2.type === 'cart') {
	            // 生成订单后需要重新计算购物车商品数量
	            // 并且要将购物车商品总价重置为 0
	            self.DD.get(apis.GET_CART_COUNT, function (res) {
	              if (res.result === 'success') {
	                _this2.$store.dispatch('setCartsCount', res.info);
	              }
	            });
	          }
	          // 货到付款到待发货
	          // 在线支付去合并付款页面
	          if (_this2.pay_method === 'offline') {
	            _this2.$router.replace({
	              name: 'myOrder',
	              params: {
	                status: 2
	              }
	            });
	          } else {
	            if (data.info.transfer_status === 'pending_shipment') {
	              _this2.$router.replace({
	                name: 'myOrder',
	                params: {
	                  status: 2
	                }
	              });
	            } else {
	              self.sessionStorage.setItem('onlineIds', self.JSON.stringify(data.info.order_ids));
	              _this2.$router.replace({
	                name: 'online',
	                params: {
	                  status: 1
	                }
	              });
	            }
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    }
	  },
	  created: function created() {
	    this.pay_method = self.sessionStorage.getItem('payMethod') || 'offline';
	    this.isUsePocket = self.sessionStorage.getItem('isUsePocket') || 1;
	    this.initPage(this.pay_method, this.isUsePocket);
	  },
	  beforeDestroy: function beforeDestroy() {
	    self.sessionStorage.setItem('remarks', self.JSON.stringify(this.remarks));
	  }
	};
	// </script>

/***/ },
/* 211 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper confirm-order-wrapper\"><article class=\"consignee-wrapper\"><em class=\"icon-consignee icon-36\"></em><span>收货人信息</span><a @click=\"goAddress\" class=\"consignee-info\"><span v-text=\"address.addressee\" class=\"name\"></span><span v-text=\"address.mobile_phone\" class=\"mobile\"></span><p v-text=\"address.addressDetail\"></p><em class=\"icon-more\"></em></a></article><article class=\"pay-container\"><em class=\"icon-pay icon-36\"></em><span>请选择支付方式</span><a :class=\"{active: pay_method === &quot;online&quot;}\" @click=\"initPage(&quot;online&quot;, isUsePocket)\" class=\"pay online\"><span>在线支付</span><em class=\"icon-confirm icon-36\"></em></a><a :class=\"{active: pay_method === &quot;offline&quot;}\" @click=\"initPage(&quot;offline&quot;, isUsePocket)\" class=\"pay offline\"><span>货到付款</span><em class=\"icon-confirm icon-36\"></em></a></article><a v-if=\"use_pocket_money &gt; 0\" :class=\"{active: isUsePocket}\" @click=\"initPage(pay_method, !isUsePocket)\" class=\"pocket-money\"><em class=\"icon-confirm icon-36\"></em><span>零钱抵扣:</span><strong v-text=\"&quot;¥&quot; + use_pocket_money\"></strong></a><section v-for=\"item in items\" class=\"shop\"><div class=\"title\"><router-link v-text=\"item.store_name\" :to=\"{name: &quot;shop&quot;, params: {shopId: item.store_id}}\" class=\"shop-name border\"></router-link><em class=\"icon-more\"></em></div><a v-for=\"goodsItem in item.items\" @click=\"viewGoodsInfo(item.store_id, goodsItem.store_product_id, goodsItem.activity_tags)\" :class=\"{&quot;carts-activity-tags&quot;: goodsItem.activity_tags &amp;&amp; goodsItem.activity_tags.length &gt; 0}\" class=\"item\"><span :style=\"{backgroundImage: &quot;url(&quot; + goodsItem.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"goodsItem.product_name\" class=\"name\"></h4><p v-if=\"goodsItem.store_product_sub_title\" v-text=\"goodsItem.store_product_sub_title\" class=\"sub-title\"></p><div v-if=\"goodsItem.activity_tags &amp;&amp; goodsItem.activity_tags.length &gt; 0\" class=\"activity-tags\"><span v-for=\"tag in goodsItem.activity_tags\" v-text=\"tag.sell_tag\"></span></div><div class=\"price\"><strong v-if=\"goodsItem.base_price\">{{goodsItem.base_price | formatAmount}}</strong><span v-text=\"&quot;×&quot; + goodsItem.qty\" class=\"num\"></span></div></a><a @click=\"chooseCoupon(item)\" class=\"coupon border\"><em class=\"icon-coupon icon-36\"></em><span>优惠券</span><strong v-if=\"item.coupon_num &gt; 0\" v-text=\"item.coupon_num + &quot;张可用&quot;\"></strong><span v-else=\"v-else\" class=\"null\">无可用</span><span v-if=\"item.coupon_num &amp;&amp; !item.using_coupon\" class=\"null\">未使用</span><span v-if=\"item.using_coupon &amp;&amp; item.using_coupon.coupon_price\" class=\"null choose\">-{{item.using_coupon.coupon_price | formatAmount}}</span><em class=\"icon-more\"></em></a><div class=\"remarks border\"><em class=\"icon-remark icon-36\"></em><span>备注</span><div class=\"input\"><input v-model=\"item.remark\" maxlength=\"50\" placeholder=\"请输入备注，50字以内\" @change=\"setRemark(item.store_id, $event.target.value)\"/></div></div><div class=\"total\"><span>合计:</span><strong class=\"price\">{{item.grand_total | formatAmount}}</strong></div></section><div :class=\"{&quot;cheap-tips-wrapper&quot;: first_cheap_tips}\" class=\"footer-settle\"><em>应付金额:</em><span class=\"price\">{{sub_grand_total | formatAmount}}</span><p v-if=\"first_cheap_tips\" v-text=\"&quot;首单减免: &quot; + first_cheap_tips\" class=\"cheap-tips\"></p><a @click=\"createOrder\" class=\"btn-settle\">确认订单</a></div></div>";

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SHOP = undefined;

	var _index = __webpack_require__(213);

	var _index2 = _interopRequireDefault(_index);

	var _indexGoods = __webpack_require__(225);

	var _indexGoods2 = _interopRequireDefault(_indexGoods);

	var _info = __webpack_require__(229);

	var _info2 = _interopRequireDefault(_info);

	var _list = __webpack_require__(233);

	var _list2 = _interopRequireDefault(_list);

	var _activity = __webpack_require__(237);

	var _activity2 = _interopRequireDefault(_activity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SHOP = exports.SHOP = [{
	  path: '/shop/:shopId',
	  name: 'shop',
	  component: _index2.default,
	  redirect: '/shop/:shopId/home',
	  meta: {
	    title: '店铺'
	  },
	  children: [{
	    path: 'home',
	    name: 'shopHome',
	    component: _indexGoods2.default,
	    meta: {
	      type: 'hot'
	    }
	  }, {
	    path: 'all',
	    name: 'shopAll',
	    component: _indexGoods2.default,
	    meta: {
	      type: ''
	    }
	  }, {
	    path: 'new',
	    name: 'shopNew',
	    component: _indexGoods2.default,
	    meta: {
	      type: 'new'
	    }
	  }, {
	    path: 'hot',
	    name: 'shopSpecial',
	    component: _indexGoods2.default,
	    meta: {
	      type: 'special_offer'
	    }
	  }]
	}, {
	  path: '/shop/info/:shopId',
	  name: 'shopInfo',
	  component: _info2.default,
	  meta: {}
	}, {
	  path: '/shop',
	  name: 'shopList',
	  component: _list2.default,
	  meta: {
	    title: '商家推荐'
	  }
	}, {
	  path: '/shop/activity/:id',
	  name: 'shopActivity',
	  component: _activity2.default,
	  meta: {
	    title: "活动简介"
	  }
	}];
	// import ShopIndex from '../components/shop/indexHome.vue';

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(214)
	__vue_script__ = __webpack_require__(215)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(224)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-553ac694/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 214 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _header = __webpack_require__(216);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(220);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .shop-wrapper {
	//     .search {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       @include borderBottom;
	//       .input {
	//         width: 100%;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .tabs {
	//       background-color: #fff;
	//       font-size: 0;
	//       border-bottom: 5px solid $bgColor;
	//       a {
	//         display: inline-block;
	//         width: 25%;
	//         padding: 10px 0;
	//         text-align: center;
	//         position: relative;
	//         span {
	//           margin-top: 5px;
	//           display: block;
	//           font-size: 14px;
	//         }
	//       }
	//       .active {
	//         color: $mainColor;
	//         &:before {
	//           content: '';
	//           position: absolute;
	//           left: 0;
	//           right: 0;
	//           bottom: 0;
	//           height: 2px;
	//           background-color: $mainColor;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.shop-wrapper
	//     form.search(
	//       @submit.prevent='search'
	//     )
	//       input.input(
	//         type="search",
	//         v-model='keywords',
	//         placeholder='搜索店铺内商品',
	//       )
	//     shop-header(:store-id = 'storeId')
	//     .tabs
	//       router-link(:to='{name: "shopHome"}' replace)
	//         em.icon-hot.icon-32
	//         span 热销商品
	//       router-link(:to='{name: "shopAll"}' replace)
	//         em.icon-shop-all.icon-32
	//         span 全部商品
	//       router-link(:to='{name: "shopNew"}' replace)
	//         em.icon-shop-new.icon-32
	//         span 新品推荐
	//       router-link(:to='{name: "shopSpecial"}' replace)
	//         em.icon-shop-special.icon-32
	//         span 特价商品
	//     router-view
	//     shop-footer(:store-id='storeId')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  components: {
	    ShopHeader: _header2.default,
	    ShopFooter: _footer2.default
	  },
	  data: function data() {
	    return {
	      keywords: '',
	      storeId: ''
	    };
	  },

	  methods: {
	    search: function search() {
	      this.$router.push({
	        name: 'goodsList',
	        query: {
	          store_id: this.$route.params.shopId,
	          keywords: this.keywords
	        }
	      });
	    }
	  },
	  created: function created() {
	    this.storeId = this.$route.params.shopId;
	  }
	};
	// </script>

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(217)
	__vue_script__ = __webpack_require__(218)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(219)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c3d7308a/header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 217 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 218 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .shop-wrapper-topic {
	//     position: relative;
	//     padding-top: 33%;
	//     background-repeat: no-repeat;
	//     background-position: 50% 50%;
	//     -webkit-background-size: cover;
	//     background-size: cover;
	//     margin-top: 50px;
	//     &:before {
	//       position: absolute;
	//       content: '';
	//       left: 0;
	//       top: 0;
	//       right: 0;
	//       bottom: 0;
	//       background-color: rgba(0, 0, 0, .3);
	//     }
	//     .logo {
	//       z-index: 1;
	//       position: absolute;
	//       bottom: 12%;
	//       left: 5%;
	//       width: 15%;
	//       height: 30%;
	//       border: 2px solid #fff;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name,
	//     .tips {
	//       z-index: 1;
	//       position: absolute;
	//       left: 25%;
	//       color: #fff;
	//       font-size: 16px;
	//       text-shadow: 1px 1px 0 #333;
	//     }
	//     .name {
	//       bottom: 28%;
	//     }
	//     .tips {
	//       bottom: 13%;
	//       font-size: 12px;
	//     }
	//     .collection {
	//       position: absolute;
	//       right: 0;
	//       bottom: 12%;
	//       color: #fff;
	//       padding: 5px 10px;
	//       border-top-left-radius: 3px;
	//       border-bottom-left-radius: 3px;
	//       background-color: $priceColor;
	//       &.active {
	//         background-color: #fff;
	//         color: $priceColor;
	//       }
	//       em {
	//         margin-right: 3px;
	//       }
	//       em, span {
	//         vertical-align: middle;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   header.shop-wrapper-topic(
	//     :style='{backgroundImage: "url(" + shopBanner + ")"}'
	//   )
	//     a.logo(
	//       :style='{backgroundImage: "url(" + shopLogo + ")"}'
	//     )
	//     p.name(v-text='shopName')
	//     p.tips(v-text='shopPriceTips')
	//     a.collection(
	//       @click='toggleCollectionShop({ id: storeId, status: shopCollection, type: 1 })',
	//       :class='{ active: shopCollection }'
	//     )
	//       em.icon-shop-collection
	//       span(v-text='shopCollection? "已收藏": "收藏"')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['storeId'],
	  computed: _extends({}, Vuex.mapGetters(['shopBanner', 'shopLogo', 'shopName', 'shopPriceTips', 'shopCollection'])),
	  methods: _extends({}, Vuex.mapActions(['getShopInfo', 'toggleCollectionShop'])),
	  mounted: function mounted() {
	    this.getShopInfo(this.storeId);
	  }
	};
	// </script>

/***/ },
/* 219 */
/***/ function(module, exports) {

	module.exports = "<header :style=\"{backgroundImage: &quot;url(&quot; + shopBanner + &quot;)&quot;}\" class=\"shop-wrapper-topic\"><a :style=\"{backgroundImage: &quot;url(&quot; + shopLogo + &quot;)&quot;}\" class=\"logo\"></a><p v-text=\"shopName\" class=\"name\"></p><p v-text=\"shopPriceTips\" class=\"tips\"></p><a @click=\"toggleCollectionShop({ id: storeId, status: shopCollection, type: 1 })\" :class=\"{ active: shopCollection }\" class=\"collection\"><em class=\"icon-shop-collection\"></em><span v-text=\"shopCollection? &quot;已收藏&quot;: &quot;收藏&quot;\"></span></a></header>";

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(221)
	__vue_script__ = __webpack_require__(222)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\footer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(223)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7ce203c9/footer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 221 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .shop-nav-footer {
	//     height: 50px;
	//     line-height: 50px;
	//     position: fixed;
	//     left: 0;
	//     bottom: 0;
	//     width: 100%;
	//     background-color: #fff;
	//     text-align: center;
	//     font-size: 0;
	//     box-shadow: 0 -1px 5px rgba(51, 51, 51, 0.1);
	//     z-index: 2;
	//     @include borderTop;
	//     & > a {
	//       font-size: 14px;
	//       display: inline-block;
	//       width: 33%;
	//       position: relative;
	//       &:nth-child(2) {
	//         width: 34%;
	//         @include borderLeft;
	//         @include borderRight;
	//       }
	//     }
	//     .point {
	//       margin-right: 5px;
	//       position: relative;
	//       display: inline-block;
	//       vertical-align: middle;
	//       width: 10px;
	//       height: 7px;
	//       border-top: 1px solid $borderColor;
	//       border-bottom: 1px solid $borderColor;
	//       &:before {
	//         content: '';
	//         position: absolute;
	//         left: 0;
	//         top: 3px;
	//         width: 80%;
	//         border-bottom: 1px solid $borderColor;
	//       }
	//     }
	//     span,
	//     em {
	//       vertical-align: middle;
	//     }
	//     em {
	//       margin-right: 5px;
	//     }
	//     .sub-nav {
	//       position: absolute;
	//       left:  3%;
	//       bottom: 55px;
	//       min-width: 27%;
	//       font-size: 12px;
	//       border: 1px solid $borderColor;
	//       border-radius: 3px;
	//       a {
	//         position: relative;
	//         display: block;
	//         padding: 10px;
	//         line-height: 20px;
	//         background-color: #fff;
	//         border-top-left-radius: 3px;
	//         border-top-right-radius: 3px;
	//         @include borderTop;
	//       }
	//       .line {
	//         position: absolute;
	//         left: 0;
	//         bottom: 0;
	//         display: block;
	//         width: 100%;
	//       }
	//       .arrow {
	//         width: 8px;
	//         height: 8px;
	//         display: block;
	//         margin: 0 auto -5px;
	//         background-color: #fff;
	//         border-left: 1px solid $borderColor;
	//         border-bottom: 1px solid $borderColor;
	//         -webkit-transform: rotate(-45deg);
	//         transform: rotate(-45deg);
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     footer.shop-nav-footer
	//       a(@click.stop='getCategory')
	//         em.point(v-if='shopGoodsCategory && shopGoodsCategory.length > 0')
	//         span 经营分类
	//       a(:href='shopIntroUrl')
	//         span 店铺详情
	//       a(:href='"tel: " + shopTel')
	//         span 联系卖家
	//       .sub-nav(v-if='shopGoodsCategory && shopGoodsCategory.length > 0 && categoryToggle',)
	//         router-link(
	//           v-for='item in shopGoodsCategory',
	//           v-text='item.category_name',
	//           :to='{name: "goodsList", query: {store_id: storeId, category_id: item.category_id}}'
	//         )
	//         span.line
	//           em.arrow
	//     site-cart
	// </template>
	//
	// <script lang='babel'>


	var _siteCart = __webpack_require__(84);

	var _siteCart2 = _interopRequireDefault(_siteCart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    SiteCart: _siteCart2.default
	  },
	  props: ['storeId'],
	  data: function data() {
	    return {
	      categoryToggle: false
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['shopGoodsCategory', 'shopTel', 'shopIntroUrl'])),
	  methods: {
	    /**
	     * 获取分类，此接口获取的是所有的分类，然后需要跟据 shopGoodsCategory 来进行过滤，只显示当前店铺有的分类
	     * 如果 category 有数据就不能再请求接口了，直接控制显/隐就O啦
	     */
	    getCategory: function getCategory() {
	      if (this.shopGoodsCategory.length < 1) {
	        return self.toast('暂无分类哟~');
	      };
	      this.categoryToggle = !this.categoryToggle;
	    },
	    bodyEventHandler: function bodyEventHandler() {
	      this.categoryToggle = false;
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    this.$nextTick(function () {
	      self.document.body.addEventListener('click', _this.bodyEventHandler);
	    });
	  }
	};
	// </script>

/***/ },
/* 223 */
/***/ function(module, exports) {

	module.exports = "<div><footer class=\"shop-nav-footer\"><a @click.stop=\"getCategory\"><em v-if=\"shopGoodsCategory &amp;&amp; shopGoodsCategory.length &gt; 0\" class=\"point\"></em><span>经营分类</span></a><a :href=\"shopIntroUrl\"><span>店铺详情</span></a><a :href=\"&quot;tel: &quot; + shopTel\"><span>联系卖家</span></a><div v-if=\"shopGoodsCategory &amp;&amp; shopGoodsCategory.length &gt; 0 &amp;&amp; categoryToggle\" class=\"sub-nav\"><router-link v-for=\"item in shopGoodsCategory\" v-text=\"item.category_name\" :to=\"{name: &quot;goodsList&quot;, query: {store_id: storeId, category_id: item.category_id}}\"></router-link><span class=\"line\"><em class=\"arrow\"></em></span></div></footer><site-cart></site-cart></div>";

/***/ },
/* 224 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper shop-wrapper\"><form @submit.prevent=\"search\" class=\"search\"><input type=\"search\" v-model=\"keywords\" placeholder=\"搜索店铺内商品\" class=\"input\"/></form><shop-header :store-id=\"storeId\"></shop-header><div class=\"tabs\"><router-link :to=\"{name: &quot;shopHome&quot;}\" replace=\"replace\"><em class=\"icon-hot icon-32\"></em><span>热销商品</span></router-link><router-link :to=\"{name: &quot;shopAll&quot;}\" replace=\"replace\"><em class=\"icon-shop-all icon-32\"></em><span>全部商品</span></router-link><router-link :to=\"{name: &quot;shopNew&quot;}\" replace=\"replace\"><em class=\"icon-shop-new icon-32\"></em><span>新品推荐</span></router-link><router-link :to=\"{name: &quot;shopSpecial&quot;}\" replace=\"replace\"><em class=\"icon-shop-special icon-32\"></em><span>特价商品</span></router-link></div><router-view></router-view><shop-footer :store-id=\"storeId\"></shop-footer></div>";

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(226)
	__vue_script__ = __webpack_require__(227)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\indexGoods.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(228)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-25f5d852/indexGoods.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 226 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .shop-goods-wrapper {
	//     margin-bottom: 60px;
	//     ul {
	//       background-color: #fff;
	//     }
	//     .item {
	//       position: relative;
	//       min-height: 90px;
	//       @include borderBottom($left: 105px);
	//       &:last-child {
	//         &:after {
	//           display: none;
	//         }
	//       }
	//       &.goods-disabled {
	//         opacity: 0.5;
	//       }
	//     }
	//     .goods {
	//       display: block;
	//       overflow: hidden;
	//       padding: 10px $margin 0 105px;
	//     }
	//     .topic {
	//       width: 70px;
	//       height: 70px;
	//       position: absolute;
	//       left: 15px;
	//       top: 0;
	//       bottom: 0;
	//       margin: auto;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//     }
	//     .goods-name {
	//       overflow: hidden;
	//       margin: 0 5px 5px 0;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .sub-title {
	//       margin-bottom: 5px;
	//       color: $priceColor;
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .price-wrapper {
	//       position: absolute;
	//       bottom: 10px;
	//       left: 105px;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//       }
	//     }
	//     .price {
	//       color: $priceColor;
	//       font-size: 16px;
	//       margin-right: 10px;
	//       min-width: 85px;
	//     }
	//     .stock {
	//       font-size: 12px;
	//       color: $darkenGrayColor;
	//     }
	//     .add-carts {
	//       position: absolute;
	//       bottom: 0;
	//       right: 0;
	//       z-index: 1;
	//       padding: 10px;
	//       em {
	//         display: block;
	//       }
	//     }
	//     .goods-stock {
	//       color: $priceColor;
	//       font-size: 12px;
	//       position: absolute;
	//       right: 10px;
	//       bottom: 10px;
	//     }
	//     .activity-tags {
	//       margin-bottom: 25px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .shop-goods-wrapper
	//     ul(v-if='pageCount > 0')
	//       li.item(
	//         v-for='item in items',
	//         :class='{"goods-disabled": item.store_product_stock_qty == 0}'
	//       )
	//         router-link.goods(
	//           :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
	//           :data-id='item.store_product_entity_id',
	//           :class='{"carts-activity-tags": item.activity_tags && item.activity_tags.length > 0}'
	//         )
	//           span.topic(
	//             :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
	//           )
	//           h4.goods-name(v-text='item.product_name')
	//           p.sub-title(v-text='item.store_product_sub_title')
	//           .activity-tags(v-if='item.activity_tags.length > 0')
	//             span(
	//               v-for='tag in item.activity_tags',
	//               v-text='tag.sell_tag'
	//             )
	//           .price-wrapper
	//             span.price(v-text='"¥" + item.store_product_final_price')
	//             span.stock(v-text='"库存: " + item.store_product_stock_qty')
	//         a.add-carts(
	//           v-if='item.store_product_stock_qty != 0',
	//           @click='addToCarts(item)'
	//         )
	//           em.icon-add-carts
	//         span.goods-stock(v-else) 补货中
	//     not-found(v-else)
	//       p 未查询到相关数据!
	// </template>
	//
	// <script lang='babel'>


	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      keywords: '',
	      items: [],
	      totalRows: 0,
	      storeId: 0,
	      type: 'hot',
	      from: '',

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  watch: {
	    '$route': function $route() {
	      this.type = this.$route.meta.type;
	      this.scrollEl = null;
	      this.loadingEl = null;
	      this.page = 0;
	      self.document.body.scrollTop = 0;
	      self.document.removeEventListener('scroll', this.next);
	      this.getGoodsData();
	    }
	  },
	  methods: _extends({}, Vuex.mapActions(['addToCarts']), {
	    getGoodsData: function getGoodsData() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      options.page = this.page + 1;
	      if (this.keywords) {
	        options.keywords = this.keywords;
	      }
	      self.DD.assign(options, {
	        type: this.type,
	        store_id: this.storeId,
	        callback: function (data) {
	          this.scrollToggle = true;
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (this.page === 0) {
	            this.items = data.items;
	            this.loadingEl = null;
	            self.document.body.scrollTop = 0;
	            self.document.removeEventListener('scroll', this.next);
	          } else {
	            this.items = this.items.concat(data.items);
	          }

	          this.totalRows = data.total_rows;
	          this.page = data.page;
	          this.pageCount = data.pageCount;
	          if (!this.scrollEl) {
	            this.scrollEl = self.document.querySelector('.shop-goods-wrapper');
	          }
	          if (this.loadingEl && this.loadingEl.parentElement) {
	            this.scrollEl.removeChild(this.loadingEl);
	          }

	          this.loadingEl = self.document.createElement('div');
	          this.loadingEl.className = 'next-loading';
	          this.loadingEl.innerHTML = '努力加载中...';

	          if (this.page != this.pageCount) {
	            self.document.addEventListener('scroll', this.next);
	          } else {
	            self.document.removeEventListener('scroll', this.next);
	          }

	          this.count = this.items.length;
	        }.bind(this)
	      });
	      this.$store.dispatch('getGoodsList', options);
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getGoodsData();
	        }
	      }
	    }
	  }),
	  created: function created() {
	    this.type = this.$route.meta.type;
	    this.storeId = this.$route.params.shopId;
	  },
	  mounted: function mounted() {
	    this.getGoodsData();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>

/***/ },
/* 228 */
/***/ function(module, exports) {

	module.exports = "<div class=\"shop-goods-wrapper\"><ul v-if=\"pageCount &gt; 0\"><li v-for=\"item in items\" :class=\"{&quot;goods-disabled&quot;: item.store_product_stock_qty == 0}\" class=\"item\"><router-link :to=\"{name: &quot;goodsInfo&quot;, params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}\" :data-id=\"item.store_product_entity_id\" :class=\"{&quot;carts-activity-tags&quot;: item.activity_tags &amp;&amp; item.activity_tags.length &gt; 0}\" class=\"goods\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"item.product_name\" class=\"goods-name\"></h4><p v-text=\"item.store_product_sub_title\" class=\"sub-title\"></p><div v-if=\"item.activity_tags.length &gt; 0\" class=\"activity-tags\"><span v-for=\"tag in item.activity_tags\" v-text=\"tag.sell_tag\"></span></div><div class=\"price-wrapper\"><span v-text=\"&quot;¥&quot; + item.store_product_final_price\" class=\"price\"></span><span v-text=\"&quot;库存: &quot; + item.store_product_stock_qty\" class=\"stock\"></span></div></router-link><a v-if=\"item.store_product_stock_qty != 0\" @click=\"addToCarts(item)\" class=\"add-carts\"><em class=\"icon-add-carts\"></em></a><span v-else=\"v-else\" class=\"goods-stock\">补货中</span></li></ul><not-found v-else=\"v-else\"><p>未查询到相关数据!</p></not-found></div>";

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(230)
	__vue_script__ = __webpack_require__(231)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\info.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(232)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-38223edc/info.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 230 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 231 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   .shop-info-wrapper {
	//     position: absolute;
	//     left: 0;
	//     top: 0;
	//     width: 100%;
	//     height: 100%;
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   iframe.wrapper.shop-info-wrapper(
	//     frameborder='0',
	//     :src='shopIntroUrl'
	//   )
	//
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  computed: _extends({}, Vuex.mapGetters(['shopIntroUrl'])),
	  methods: _extends({}, Vuex.mapActions(['getShopInfo'])),
	  mounted: function mounted() {
	    if (!this.shopIntroUrl) {
	      this.getShopInfo(this.$route.params.shopId);
	    }
	  }
	};
	// </script>

/***/ },
/* 232 */
/***/ function(module, exports) {

	module.exports = "<iframe frameborder=\"0\" :src=\"shopIntroUrl\" class=\"wrapper shop-info-wrapper\"></iframe>";

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(234)
	__vue_script__ = __webpack_require__(235)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(236)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7dbc12cc/list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 234 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 235 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .shop-list-warpper {
	//     background-color: #fff;
	//     padding-top: 50px;
	//     .search {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       @include borderBottom;
	//       .input {
	//         width: 100%;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .item {
	//       display: block;
	//       padding: 10px $margin;
	//       position: relative;
	//       overflow: hidden;
	//       @include borderBottom($left: $margin);
	//     }
	//     .topic {
	//       float: left;
	//       width: 70px;
	//       height: 70px;
	//       margin-right: 10px;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name,
	//     .shop-info {
	//       overflow: hidden;
	//     }
	//     .name {
	//       font-size: 16px;
	//       @include ellipsis;
	//     }
	//     .shop-info {
	//       position: absolute;
	//       bottom: 10px;
	//       left: $margin;
	//       margin-left: 80px;
	//       color: $darkenGrayColor;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//         &:first-child {
	//           min-width: 120px;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.shop-list-warpper
	//     form.search(
	//       @submit.prevent='getShopList(true)'
	//     )
	//       input.input(
	//         type="text",
	//         v-model='store_name',
	//         placeholder='搜索商家'
	//       )
	//     router-link.item(
	//       v-for='item in items',
	//       :to='{name: "shop", params: {shopId: item.store_id}}'
	//     )
	//       span.topic(
	//         :style='{backgroundImage: "url(" + item.logo + ")"}'
	//       )
	//       h4.name(v-text='item.store_name')
	//       p.shop-info
	//         span(v-text='"起送金额 " + item.starting_price +  " 元"')
	//         span(v-text='"商品: " + item.items_num +  "款"')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      store_name: '',
	      items: [],
	      totalRows: 0,

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  methods: {
	    getShopList: function getShopList() {
	      var _this = this;

	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // 如果 type 存在说明执行的 submit事件, 需要将分页重置为 第一页
	      if (type) {
	        this.page = 0;
	        this.loadingEl = null;
	        self.document.body.scrollTop = 0;
	        // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
	        self.document.removeEventListener('scroll', this.next);
	      }
	      var body = {
	        api: 'store',
	        method: 'get_store_items',
	        store_name: this.store_name,
	        page: +this.page + 1
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          if (_this.loadingEl) {
	            _this.loadingEl.style.display = 'none';
	          }

	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page === 0) {
	            _this.items = data.info.items;
	          } else {
	            _this.items = _this.items.concat(data.info.items);
	          }
	          _this.totalRows = data.info.total_rows;
	          _this.page = data.info.page;
	          _this.pageCount = data.info.pageCount;

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getShopList();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    var query = this.$route.query;
	    if (query.keywords) {
	      this.store_name = query.keywords;
	    }
	    this.scrollEl = self.document.querySelector('.shop-list-warpper');
	    this.getShopList();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>

/***/ },
/* 236 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper shop-list-warpper\"><form @submit.prevent=\"getShopList(true)\" class=\"search\"><input type=\"text\" v-model=\"store_name\" placeholder=\"搜索商家\" class=\"input\"/></form><router-link v-for=\"item in items\" :to=\"{name: &quot;shop&quot;, params: {shopId: item.store_id}}\" class=\"item\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.logo + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"item.store_name\" class=\"name\"></h4><p class=\"shop-info\"><span v-text=\"&quot;起送金额 &quot; + item.starting_price +  &quot; 元&quot;\"></span><span v-text=\"&quot;商品: &quot; + item.items_num +  &quot;款&quot;\"></span></p></router-link></div>";

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(238)
	__vue_script__ = __webpack_require__(239)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\shop\\activity.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(244)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d9d10c86/activity.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 238 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _goodsItem = __webpack_require__(240);

	var _goodsItem2 = _interopRequireDefault(_goodsItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    GoodsItem: _goodsItem2.default
	  },
	  data: function data() {
	    return {
	      banner: '',
	      content: '',
	      items: [],
	      activityId: 0,

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  methods: {
	    getActivityInfo: function getActivityInfo() {
	      var _this = this;

	      var body = {
	        api: 'activity',
	        method: 'get_activity_item',
	        activity_id: this.activityId,
	        page: this.page + 1
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page == 0) {
	            _this.banner = data.info.banner;
	            _this.content = data.info.content;
	            _this.items = data.info.product_items.items;
	            self.DD.setTitle(data.info.title);
	          } else {
	            _this.items = _this.items.concat(data.info.product_items.items);
	          }

	          if (_this.loadingEl) {
	            _this.loadingEl.style.display = 'none';
	          }

	          _this.page = +data.info.product_items.page;
	          _this.pageCount = +data.info.product_items.pageCount;

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getActivityInfo();
	        }
	      }
	    }
	  },
	  beforeCreate: function beforeCreate() {
	    self.DD.setTitle('');
	  },
	  mounted: function mounted() {
	    this.activityId = this.$route.params.id;
	    this.scrollEl = self.document.querySelector('.shop-activity-wrapper');
	    this.getActivityInfo();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .shop-activity-wrapper {
	//     .banner {
	//       padding-top: 45%;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//       margin-bottom: 10px;
	//     }
	//     .content {
	//       background-color: #fff;
	//       margin-bottom: 10px;
	//       p {
	//         padding: 10px;
	//       }
	//     }
	//     .title {
	//       position: relative;
	//       padding: 10px;
	//       font-size: 16px;
	//       text-align: center;
	//       @include borderBottom;
	//     }
	//     .goods {
	//       background-color: #fff;
	//     }
	//     .product-item-wrapper  {
	//       .item {
	//         width: 50%;
	//         margin-top: 0;
	//         @include borderBottom;
	//         &:nth-child(even) {
	//           margin-left: 0;
	//         }
	//         &:nth-child(odd) {
	//           margin-right: 0;
	//           @include borderRight;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.shop-activity-wrapper
	//     .banner(:style='{backgroundImage: "url(" + banner + ")"}')
	//     .content
	//       h3.title 活动简介
	//       p(v-text='content')
	//     .goods
	//       h3.title 活动商品
	//       goods-item(
	//         :goods-data="items"
	//       )
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(241)
	__vue_script__ = __webpack_require__(242)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\goods\\goodsItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(243)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-e3ef67ea/goodsItem.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 241 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 242 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .product-item-wrapper {
	//     font-size: 0;
	//     .item {
	//       width: 49%;
	//       position: relative;
	//       display: inline-block;
	//       box-sizing: border-box;
	//       padding: 10px;
	//       margin-top: 2%;
	//       background-color: #fff;
	//       overflow: hidden;
	//       &:nth-child(1) {
	//         margin-top: 0;
	//       }
	//       &:nth-child(2) {
	//         margin-top: 0;
	//       }
	//       &:nth-child(odd) {
	//         margin-right: 1%;
	//       }
	//       &:nth-child(even) {
	//         margin-left: 1%;
	//       }
	//       a {
	//         display: block;
	//       }
	//     }
	//     .topic {
	//       display: block;
	//       width: 80%;
	//       padding-top: 80%;
	//       margin: 0 auto;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       margin-bottom: 10px;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name {
	//       font-size: 14px;
	//       margin-bottom: 18px;
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .price {
	//       color: $priceColor;
	//       font-size: 14px;
	//     }
	//     .add-carts {
	//       position: absolute;
	//       right: 0;
	//       bottom: 0;
	//       z-index: 1;
	//       padding: 10px;
	//     }
	//     .goods-stock {
	//       color: $priceColor;
	//       font-size: 12px;
	//       position: absolute;
	//       right: 10px;
	//       bottom: 12px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   ul.product-item-wrapper
	//     li.item(v-for='item in goodsData')
	//       a.product(
	//         @click='goGoodsInfo(item)',
	//         :data-id='item.store_product_entity_id'
	//       )
	//         span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
	//         h4.name(v-text='item.product_name')
	//         .activity-tags(v-if='item.activity_tags.length > 0')
	//           span(
	//             v-for='(tag, index) in item.activity_tags',
	//             v-text='tag.sell_tag'
	//           )
	//         .activity-tags(v-if='item.activity_tags.length === 0 && (type === "special" || type === "hot")')
	//         p.price {{item.store_product_final_price | formatAmount}}
	//       a.add-carts(
	//         v-if='item.store_product_stock_qty != 0',
	//         @click='addToCarts(item)'
	//       )
	//         em.icon-add-carts
	//       span.goods-stock(v-else) 补货中
	// </template>
	// <script lang='babel'>
	exports.default = {
	  props: ['goodsData', 'type', 'category'],
	  data: function data() {
	    return {
	      deviceType: self.home.deviceType
	    };
	  },

	  methods: _extends({}, Vuex.mapActions(['addToCarts']), {
	    goGoodsInfo: function goGoodsInfo(item) {
	      var shopId = item.store_product_store_id;
	      var goodsId = item.store_product_entity_id;
	      _czc.push(['_trackEvent', '' + this.category, 'click', '' + item.product_name]);
	      if (this.deviceType === 'wap') {
	        this.$router.push({
	          name: "goodsInfo",
	          params: {
	            shopId: shopId,
	            goodsId: goodsId
	          }
	        });
	      } else {
	        DIDAJSBridge.callHandler('GOODS_DETAIL', {
	          tagName: 'goods_detail',
	          goodsId: goodsId,
	          storeId: shopId
	        });
	      }
	    },
	    addToCarts: function addToCarts(item) {
	      _czc.push(['_trackEvent', this.category + '_\u52A0\u5165\u8D2D\u7269\u8F66', 'click', '' + item.product_name]);
	      if (this.deviceType === 'wap') {
	        this.$store.dispatch('addToCarts', item);
	      } else {
	        DIDAJSBridge.callHandler('ADD_TO_CART', {
	          tagName: 'add_to_cart',
	          shopId: item.store_product_store_id,
	          productId: item.store_product_entity_id
	        });
	      }
	    }
	  })
	};
	// </script>

/***/ },
/* 243 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"product-item-wrapper\"><li v-for=\"item in goodsData\" class=\"item\"><a @click=\"goGoodsInfo(item)\" :data-id=\"item.store_product_entity_id\" class=\"product\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"item.product_name\" class=\"name\"></h4><div v-if=\"item.activity_tags.length &gt; 0\" class=\"activity-tags\"><span v-for=\"(tag, index) in item.activity_tags\" v-text=\"tag.sell_tag\"></span></div><div v-if=\"item.activity_tags.length === 0 &amp;&amp; (type === &quot;special&quot; || type === &quot;hot&quot;)\" class=\"activity-tags\"></div><p class=\"price\">{{item.store_product_final_price | formatAmount}}</p></a><a v-if=\"item.store_product_stock_qty != 0\" @click=\"addToCarts(item)\" class=\"add-carts\"><em class=\"icon-add-carts\"></em></a><span v-else=\"v-else\" class=\"goods-stock\">补货中</span></li></ul>";

/***/ },
/* 244 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper shop-activity-wrapper\"><div :style=\"{backgroundImage: &quot;url(&quot; + banner + &quot;)&quot;}\" class=\"banner\"></div><div class=\"content\"><h3 class=\"title\">活动简介</h3><p v-text=\"content\"></p></div><div class=\"goods\"><h3 class=\"title\">活动商品</h3><goods-item :goods-data=\"items\"></goods-item></div></div>";

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.COUPON = undefined;

	var _useIndex = __webpack_require__(246);

	var _useIndex2 = _interopRequireDefault(_useIndex);

	var _myCoupon = __webpack_require__(258);

	var _myCoupon2 = _interopRequireDefault(_myCoupon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var COUPON = exports.COUPON = [{
	  path: '/coupon/use',
	  name: 'couponUse',
	  component: _useIndex2.default,
	  meta: {
	    title: "优惠券"
	  }
	}, {
	  path: '/coupon/mine/',
	  name: 'myCoupon',
	  component: _myCoupon2.default,
	  meta: {
	    title: "优惠券"
	  }
	}];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(247)
	__vue_script__ = __webpack_require__(248)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\coupon\\useIndex.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(257)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3d6f65ee/useIndex.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 247 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .coupon-use-wrapper {
	//     position: absolute;
	//     left: 0;
	//     top: 0;
	//     min-height: 100%;
	//     background-color: $bgColor;
	//     z-index: 2;
	//     .tab {
	//       background-color: #fff;
	//       text-align: center;
	//       font-size: 0;
	//       margin-bottom: $margin;
	//       li {
	//         width: 50%;
	//         font-size: 14px;
	//         display: inline-block;
	//       }
	//       a {
	//         padding: 10px 0px;
	//         height: 20px;
	//         display: inline-block;
	//         position: relative;
	//         &.active {
	//           color: $mainColor;
	//           &:before {
	//             content: '';
	//             position: absolute;
	//             left: 0;
	//             bottom: 0;
	//             right: 0;
	//             height: 2px;
	//             background-color: currentColor;
	//           }
	//         }
	//       }
	//     }
	//   }
	//   .coupon-checked {
	//     .coupon-item {
	//       .item {
	//         margin-left: 35px;
	//       }
	//       .icon-big-check {
	//         display: block;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.coupon-use-wrapper
	//     ul.tab
	//       li
	//         a(
	//           :class='{active: status === 1}',
	//           @click='toggleType(1)'
	//         )
	//           span 可用优惠券
	//           em(v-text='"(" + validTotalRows + ")"')
	//       li
	//         a(
	//           :class='{active: status === 0}',
	//           @click='toggleType(0)'
	//         )
	//           span 不可用优惠券
	//           em(v-text='"(" + unvalidTotalRows + ")"')
	//     add-coupon(
	//       :product-info='productInfo'
	//     )
	//     .coupon-item-wrapper(
	//       :class='{"coupon-checked": status === 1}'
	//     )
	//       coupon-item(
	//         v-if='couponList.length > 0',
	//         v-for='item in couponList',
	//         :coupon-data='item',
	//         :shop-id='productInfo.store_id',
	//         :status='status'
	//       )
	//       not-found(v-if='couponList.length === 0')
	//         p 暂无数据~
	// </template>
	//
	// <script lang='babel'>


	var _item = __webpack_require__(249);

	var _item2 = _interopRequireDefault(_item);

	var _addCoupon = __webpack_require__(253);

	var _addCoupon2 = _interopRequireDefault(_addCoupon);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    CouponItem: _item2.default,
	    NotFound: _notFound2.default,
	    AddCoupon: _addCoupon2.default
	  },
	  data: function data() {
	    return {
	      couponSn: '',
	      validTotalRows: 0,
	      unvalidTotalRows: 0,
	      validItems: [],
	      unvalidItems: [],
	      status: 1,

	      couponList: [],
	      productInfo: {
	        store_id: 0
	      },
	      pay_method: ''
	    };
	  },

	  methods: {
	    getCouponList: function getCouponList() {
	      var _this = this;

	      var body = _extends({}, apis.CHOOSE_COUPON);
	      body.pay_method = this.pay_method;
	      body.product_info = self.encodeURIComponent(self.JSON.stringify(this.productInfo));
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.validTotalRows = data.info.valid_coupons.total_rows;
	          _this.unvalidTotalRows = data.info.unvalid_coupons.total_rows;
	          _this.validItems = data.info.valid_coupons.items || [];
	          _this.unvalidItems = data.info.unvalid_coupons.items || [];

	          _this.couponList = _this.validItems;
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    toggleType: function toggleType(status) {
	      this.status = status;
	      if (status) {
	        this.couponList = this.validItems;
	      } else {
	        this.couponList = this.unvalidItems;
	      }
	    }
	  },
	  created: function created() {
	    this.productInfo = self.JSON.parse(self.sessionStorage.getItem('productInfo'));
	    this.pay_method = self.sessionStorage.getItem('payMethod');
	    this.getCouponList();
	  }
	};
	// </script>

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(250)
	__vue_script__ = __webpack_require__(251)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\coupon\\item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(252)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3c1dd0de/item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 250 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .coupon-item {
	//     position: relative;
	//     display: block;
	//     $sizeHeight: 636px;
	//     .icon-big-check {
	//       top: 50%;
	//       margin-top: -20px;
	//       pointer-events: none;
	//       display: none;
	//     }
	//     .item {
	//       pointer-events: none;
	//       overflow: hidden;
	//       margin: 0 $margin 10px $margin;
	//       height: 106px;
	//       padding: 8px 110px 8px 15px;
	//       box-sizing: border-box;
	//       color: #fff;
	//       background: #ffcf98 url(/src/images/coupon_bg.png) 0 0 no-repeat;
	//       -webkit-background-size: auto $sizeHeight;
	//       background-size: auto $sizeHeight;
	//       font-size: 12px;
	//       position: relative;
	//       .title {
	//         font-size: 16px;
	//         margin-bottom: 3px;
	//       }
	//       .sub-title {
	//         font-size: 14px;
	//         margin-bottom: 3px;
	//       }
	//       .des {
	//         height: 30px;
	//         @include ellipsis;
	//       }
	//       .time {
	//         em {
	//           margin: 0 5px;
	//         }
	//       }
	//       em[class^='icon-'] {
	//         $size: (118px/2);
	//         position: absolute;
	//         right: -5px;
	//         top: -3px;
	//         width: $size;
	//         height: $size;
	//       }
	//     }
	//     .price {
	//       position: absolute;
	//       right: 0;
	//       top: 0;
	//       height: 106px;
	//       line-height: 100px;
	//       padding: 0 10px 0 10px;
	//       width: 95px;
	//       text-align: center;
	//       font-size: 0;
	//       background: url(/src/images/coupon_bg.png) 100% -212px no-repeat,
	//                   url(/src/images/coupon_bg.png) -4px -106px no-repeat;
	//       background-color: #ffb561;
	//       -webkit-background-size: auto $sizeHeight;
	//       background-size: auto $sizeHeight;
	//       em {
	//         font-size: 18px;
	//         line-height: 78px;
	//         display: inline-block;
	//         position: relative;
	//         z-index: 1;
	//       }
	//       span {
	//         font-size: 32px;
	//         display: inline-block;
	//         position: relative;
	//         z-index: 1;
	//       }
	//     }
	//     &.disabled {
	//       pointer-events: none;
	//       opacity: 0.8;
	//     }
	//     &.unuse {
	//       opacity: 1;
	//       .item {
	//         background-position: 0 -318px;
	//         background-color: #cbcbcb;
	//       }
	//       .price {
	//         background: url(/src/images/coupon_bg.png) 100% -530px no-repeat,
	//                     url(/src/images/coupon_bg.png) -4px -424px no-repeat;
	//         background-color: #b0b0b0;
	//         -webkit-background-size: auto $sizeHeight;
	//         background-size: auto $sizeHeight;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   a.coupon-item(
	//     :class='{disabled: couponData.status === 1 || (status === 0 && from == "confirm"), unuse: (status === 3 || status === 2), used: couponData.is_own}',
	//     @click='chooseCoupon(couponData)'
	//   )
	//     span.icon-big-check
	//       em.icon-cart-check
	//     div.item
	//       h4.title(v-text='couponData.coupon_name')
	//       p.sub-title(v-text='couponData.coupon_tips')
	//       p.des(v-text='couponData.coupon_desc')
	//       p.time
	//         span.start(v-text='couponData.start_time')
	//         em 至
	//         span.end(v-text='couponData.end_time')
	//       .price
	//         em ¥
	//         span(v-text='couponData.coupon_price')
	//       em.icon-activation(v-if='couponData.status === 1 && status != 3 && status != 2')
	//       em.icon-overdue(v-if='status === 3')
	//       em.icon-inused(v-if='status === 2')
	// </template>
	//
	// <script lang='babel'>


	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
	  props: ['couponData', 'shopId', 'status'],
	  data: function data() {
	    return {
	      from: ''
	    };
	  },

	  methods: {
	    chooseCoupon: function chooseCoupon(item) {
	      var _this = this;

	      if (!this.shopId) {
	        return;
	      }
	      self.DD.loading();
	      var body = _extends({}, apis.OCCUPY_CHOOSE_COUPON);
	      body.coupon_detail_id = item.coupon_detail_id;
	      // is_own === 1 说明是已被占用
	      // 已占用时，再点击时则取消选中状态
	      if (item.is_own) {
	        body.method = 'clear_occupy_coupon';
	      } else {
	        body.use_store_id = this.shopId;
	      }
	      var pay_method = self.sessionStorage.getItem('payMethod');
	      var address_id = this.$route.query.address_id || 0;
	      self.DD.post(body, function (data) {
	        if (data.result === 'success') {
	          if (item.is_own) {
	            item.is_own = 0;
	            self.sessionStorage.removeItem('isClear');
	            self.toast('取消成功!');
	          } else {
	            self.sessionStorage.setItem('isClear', 1);
	            _this.$router.replace({
	              name: "confirm",
	              query: {
	                address_id: address_id,
	                pay_method: pay_method
	              }
	            });
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.from = this.$route.query.from;
	  }
	};
	// </script>

/***/ },
/* 252 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"{disabled: couponData.status === 1 || (status === 0 &amp;&amp; from == &quot;confirm&quot;), unuse: (status === 3 || status === 2), used: couponData.is_own}\" @click=\"chooseCoupon(couponData)\" class=\"coupon-item\"><span class=\"icon-big-check\"><em class=\"icon-cart-check\"></em></span><div class=\"item\"><h4 v-text=\"couponData.coupon_name\" class=\"title\"></h4><p v-text=\"couponData.coupon_tips\" class=\"sub-title\"></p><p v-text=\"couponData.coupon_desc\" class=\"des\"></p><p class=\"time\"><span v-text=\"couponData.start_time\" class=\"start\"></span><em>至</em><span v-text=\"couponData.end_time\" class=\"end\"></span></p><div class=\"price\"><em>¥</em><span v-text=\"couponData.coupon_price\"></span></div><em v-if=\"couponData.status === 1 &amp;&amp; status != 3 &amp;&amp; status != 2\" class=\"icon-activation\"></em><em v-if=\"status === 3\" class=\"icon-overdue\"></em><em v-if=\"status === 2\" class=\"icon-inused\"></em></div></a>";

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(254)
	__vue_script__ = __webpack_require__(255)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\coupon\\addCoupon.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(256)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d0b568ce/addCoupon.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 254 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 255 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .add-coupon {
	//     display: block;
	//     overflow: hidden;
	//     margin: 0 $margin 10px;
	//     padding-right: 30px;
	//     input {
	//       float: left;
	//       height: 36px;
	//       width: 80%;
	//       padding: 0 10px;
	//       border-radius: 3px;
	//     }
	//     button {
	//       width: 16%;
	//       height: 36px;
	//       float: right;
	//       border-radius: 3px;
	//       background-color: #fff;
	//       color: $mainColor;
	//       border: 1px solid currentColor;
	//     }
	//     .coupon-rule {
	//       position: absolute;
	//       right: 10px;
	//     }
	//     .coupon-rule {
	//       position: absolute;
	//       right: 0;
	//       padding: 7px 10px;
	//     }
	//     .icon-rule {
	//       display: block;
	//       border-radius: 50px;
	//       width: 20px;
	//       height: 20px;
	//       border: 1px solid #E60012;
	//       text-align: center;
	//       line-height: 21px;
	//       color: #E60012;
	//       background: #fff;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   form.add-coupon
	//     input(
	//       placeholder='请输入优惠券码',
	//       v-model='couponSn'
	//     )
	//     button(
	//       @click.prevent='addCoupon',
	//       v-text='btnText'
	//     )
	//     a.coupon-rule(href='/website/coupon_rule.html')
	//       span.icon-rule ?
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['productInfo'],
	  data: function data() {
	    return {
	      couponSn: '',
	      from: '',
	      btnText: '绑定'
	    };
	  },

	  methods: {
	    addCoupon: function addCoupon() {
	      if (!this.couponSn) {
	        self.toast('优惠券码不能为空哟~');
	        return;
	      }
	      this.$store.dispatch('addCoupon', {
	        sn: this.couponSn,
	        from: this.from,
	        productInfo: this.productInfo,
	        callback: function () {
	          self.sessionStorage.setItem('isClear', 1);
	          this.$router.replace({
	            name: "confirm"
	          });
	        }.bind(this)
	      });
	    }
	  },
	  created: function created() {
	    this.from = this.$route.query.from;
	    this.btnText = this.from ? '使用' : '绑定';
	  }
	};
	// </script>

/***/ },
/* 256 */
/***/ function(module, exports) {

	module.exports = "<form class=\"add-coupon\"><input placeholder=\"请输入优惠券码\" v-model=\"couponSn\"/><button @click.prevent=\"addCoupon\" v-text=\"btnText\"></button><a href=\"/website/coupon_rule.html\" class=\"coupon-rule\"><span class=\"icon-rule\">?</span></a></form>";

/***/ },
/* 257 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper coupon-use-wrapper\"><ul class=\"tab\"><li><a :class=\"{active: status === 1}\" @click=\"toggleType(1)\"><span>可用优惠券</span><em v-text=\"&quot;(&quot; + validTotalRows + &quot;)&quot;\"></em></a></li><li><a :class=\"{active: status === 0}\" @click=\"toggleType(0)\"><span>不可用优惠券</span><em v-text=\"&quot;(&quot; + unvalidTotalRows + &quot;)&quot;\"></em></a></li></ul><add-coupon :product-info=\"productInfo\"></add-coupon><div :class=\"{&quot;coupon-checked&quot;: status === 1}\" class=\"coupon-item-wrapper\"><coupon-item v-if=\"couponList.length &gt; 0\" v-for=\"item in couponList\" :coupon-data=\"item\" :shop-id=\"productInfo.store_id\" :status=\"status\"></coupon-item><not-found v-if=\"couponList.length === 0\"><p>暂无数据~</p></not-found></div></div>";

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(259)
	__vue_script__ = __webpack_require__(260)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\coupon\\myCoupon.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(261)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-13f552f0/myCoupon.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 259 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .my-coupon-wrapper {
	//     .tab {
	//       background-color: #fff;
	//       text-align: center;
	//       font-size: 0;
	//       margin-bottom: $margin;
	//       li {
	//         width: 33.33333%;
	//         font-size: 14px;
	//         display: inline-block;
	//       }
	//       a {
	//         padding: 10px 0px;
	//         height: 20px;
	//         display: inline-block;
	//         position: relative;
	//         &.active {
	//           color: $mainColor;
	//           &:before {
	//             content: '';
	//             position: absolute;
	//             left: 0;
	//             bottom: 0;
	//             right: 0;
	//             height: 2px;
	//             background-color: currentColor;
	//           }
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.my-coupon-wrapper
	//     ul.tab
	//       li
	//         a(
	//           :class='{active: couponType === 1}',
	//           @click='getMyCouponList(1, $event)'
	//         )
	//           span 未使用
	//           em(v-text='"(" + couponUnusedNum + ")"')
	//       li
	//         a(
	//           :class='{active: couponType === 2}',
	//           @click='getMyCouponList(2, $event)'
	//         )
	//           span 已使用
	//           em(v-text='"(" + couponUsedNum + ")"')
	//       li
	//         a(
	//           :class='{active: couponType === 3}',
	//           @click='getMyCouponList(3, $event)'
	//         )
	//           span 已过期
	//           em(v-text='"(" + couponExpiredNum + ")"')
	//     add-coupon
	//     .coupon-item-wrapper
	//       coupon-item(
	//         v-if='couponList.length > 0',
	//         v-for='item in couponList',
	//         :coupon-data='item',
	//         :status='couponType',
	//       )
	//       not-found(v-if='couponList.length === 0')
	//         p 暂无数据~
	// </template>
	//
	// <script lang='babel'>


	var _item = __webpack_require__(249);

	var _item2 = _interopRequireDefault(_item);

	var _addCoupon = __webpack_require__(253);

	var _addCoupon2 = _interopRequireDefault(_addCoupon);

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    CouponItem: _item2.default,
	    NotFound: _notFound2.default,
	    AddCoupon: _addCoupon2.default
	  },
	  data: function data() {
	    return {
	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  computed: _extends({}, Vuex.mapGetters(['couponType', 'couponList', 'couponUnusedNum', 'couponUsedNum', 'couponExpiredNum'])),
	  methods: {
	    getMyCouponList: function getMyCouponList(type, $event) {
	      if ($event) {
	        this.page = 0;
	        self.document.removeEventListener('scroll', this.next);
	      }
	      this.$store.dispatch('getMyCouponList', {
	        type: type,
	        eventType: $event && $event.type,
	        vm: this
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getMyCouponList();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.my-coupon-wrapper');
	    this.getMyCouponList(1);
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>

/***/ },
/* 261 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper my-coupon-wrapper\"><ul class=\"tab\"><li><a :class=\"{active: couponType === 1}\" @click=\"getMyCouponList(1, $event)\"><span>未使用</span><em v-text=\"&quot;(&quot; + couponUnusedNum + &quot;)&quot;\"></em></a></li><li><a :class=\"{active: couponType === 2}\" @click=\"getMyCouponList(2, $event)\"><span>已使用</span><em v-text=\"&quot;(&quot; + couponUsedNum + &quot;)&quot;\"></em></a></li><li><a :class=\"{active: couponType === 3}\" @click=\"getMyCouponList(3, $event)\"><span>已过期</span><em v-text=\"&quot;(&quot; + couponExpiredNum + &quot;)&quot;\"></em></a></li></ul><add-coupon></add-coupon><div class=\"coupon-item-wrapper\"><coupon-item v-if=\"couponList.length &gt; 0\" v-for=\"item in couponList\" :coupon-data=\"item\" :status=\"couponType\"></coupon-item><not-found v-if=\"couponList.length === 0\"><p>暂无数据~</p></not-found></div></div>";

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADDRESS = undefined;

	var _list = __webpack_require__(263);

	var _list2 = _interopRequireDefault(_list);

	var _add = __webpack_require__(271);

	var _add2 = _interopRequireDefault(_add);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ADDRESS = exports.ADDRESS = [{
	  path: '/address',
	  name: 'addressList',
	  component: _list2.default,
	  meta: {
	    title: "收货地址管理"
	  }
	}, {
	  path: '/address/add',
	  name: 'addressAdd',
	  component: _add2.default,
	  meta: {
	    title: "新增收货地址"
	  }
	}, {
	  path: '/address/edit/:addressId',
	  name: 'addressEdit',
	  component: _add2.default,
	  meta: {
	    title: "编辑收货地址"
	  }
	}];

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(264)
	__vue_script__ = __webpack_require__(265)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\address\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(270)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-431918ae/list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 264 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .address-wrapper {
	//     .add {
	//       display: block;
	//       margin: 10px 0;
	//       position: relative;
	//       padding: 10px 0 10px 30px;
	//       background-color: #fff;
	//       @include borderTop;
	//       @include borderBottom;
	//       .icon-add {
	//         border: 1px solid $mainColor;
	//         width: 13px;
	//         height: 13px;
	//         border-radius: 30px;
	//         position: absolute;
	//         left: 10px;
	//         top: 11px;
	//         &:before {
	//           content: '';
	//           position: absolute;
	//           left: 2px;
	//           top: 6px;
	//           width: 9px;
	//           height: 1px;
	//           background-color: $mainColor;
	//         }
	//         &:after {
	//           content: '';
	//           position: absolute;
	//           left: 6px;
	//           top: 2px;
	//           width: 1px;
	//           height: 9px;
	//           background-color: $mainColor;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.address-wrapper
	//     router-link.add(:to='{name: "addressAdd", query: $route.query}')
	//       span.icon-add
	//       strong 新增收货地址
	//     ul
	//       item(
	//         v-for='(item, index) in addressList',
	//         :address='item',
	//         :data-index='index'
	//       )
	// </template>
	//
	// <script lang='babel'>


	var _item = __webpack_require__(266);

	var _item2 = _interopRequireDefault(_item);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Item: _item2.default
	  },
	  computed: _extends({}, Vuex.mapGetters(['addressList'])),
	  mounted: function mounted() {
	    this.$store.dispatch('getAddressList');
	  }
	};
	// </script>

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(267)
	__vue_script__ = __webpack_require__(268)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\address\\item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(269)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3913a0a3/item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 267 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 268 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .address-item {
	//     display: block;
	//     position: relative;
	//     background-color: #fff;
	//     margin-bottom: 10px;
	//     @include borderTop;
	//     @include borderBottom;
	//     .address-info {
	//       padding: 10px;
	//       position: relative;
	//       display: block;
	//       @include borderBottom;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//       }
	//     }
	//     .name {
	//       width: 65%;
	//     }
	//     .mobile {
	//       width: 34%;
	//     }
	//     .street {
	//       margin-top: 5px;
	//       color: $darkenGrayColor;
	//     }
	//     .options {
	//       position: relative;
	//       overflow: hidden;
	//       text-align: right;
	//       em {
	//         margin-right: 3px;
	//       }
	//       em, span {
	//         vertical-align: middle;
	//       }
	//       a {
	//         padding: 10px;
	//         display: inline-block;
	//         color: $darkenGrayColor;
	//       }
	//       .set-default {
	//         float: left;
	//         &.active {
	//           color: $mainColor;
	//         }
	//       }
	//     }
	//     .icon-confirm {
	//       width: 19px;
	//       height: 19px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   li.address-item
	//     a.address-info(
	//       @click='jump(address.address_id)'
	//     )
	//       span.name(v-text='address.addressee')
	//       span.mobile(v-text='address.mobile_phone')
	//       p.street(v-text='street')
	//     .options
	//       a.set-default(
	//         :class='{active: address.is_default == 1}',
	//         @click='setDefaultAddress({ id: address.address_id, isDefault: address.is_default, index: dataIndex })'
	//       )
	//         em.icon-confirm.icon-36
	//         span 设为默认
	//       router-link.edit(
	//         :to='{name: "addressEdit", params: {addressId: address.address_id}, query: $route.query}'
	//       )
	//         em.icon-editing
	//         span 编辑
	//       a.del(
	//         @click='deleteItemAddress({ id: address.address_id, index: dataIndex, isDefault: address.is_default })'
	//       )
	//         em.icon-delete
	//         span 删除
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['address', 'dataIndex'],
	  computed: {
	    street: function street() {
	      return this.address.province + this.address.city + this.address.county + this.address.street;
	    }
	  },
	  methods: _extends({}, Vuex.mapActions(['deleteItemAddress', 'setDefaultAddress']), {
	    jump: function jump(address_id) {
	      var query = this.$route.query;
	      if (query.from === "confirm") {
	        delete query.from;
	        query.address_id = address_id;
	        this.$router.replace({
	          name: 'confirm',
	          query: query
	        });
	      }
	    }
	  })
	};
	// </script>

/***/ },
/* 269 */
/***/ function(module, exports) {

	module.exports = "<li class=\"address-item\"><a @click=\"jump(address.address_id)\" class=\"address-info\"><span v-text=\"address.addressee\" class=\"name\"></span><span v-text=\"address.mobile_phone\" class=\"mobile\"></span><p v-text=\"street\" class=\"street\"></p></a><div class=\"options\"><a :class=\"{active: address.is_default == 1}\" @click=\"setDefaultAddress({ id: address.address_id, isDefault: address.is_default, index: dataIndex })\" class=\"set-default\"><em class=\"icon-confirm icon-36\"></em><span>设为默认</span></a><router-link :to=\"{name: &quot;addressEdit&quot;, params: {addressId: address.address_id}, query: $route.query}\" class=\"edit\"><em class=\"icon-editing\"></em><span>编辑</span></router-link><a @click=\"deleteItemAddress({ id: address.address_id, index: dataIndex, isDefault: address.is_default })\" class=\"del\"><em class=\"icon-delete\"></em><span>删除</span></a></div></li>";

/***/ },
/* 270 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper address-wrapper\"><router-link :to=\"{name: &quot;addressAdd&quot;, query: $route.query}\" class=\"add\"><span class=\"icon-add\"></span><strong>新增收货地址</strong></router-link><ul><item v-for=\"(item, index) in addressList\" :address=\"item\" :data-index=\"index\"></item></ul></div>";

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(272)
	__vue_script__ = __webpack_require__(273)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\address\\add.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(274)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7961617e/add.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 272 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .add-address-wrapper {
	//     h4 {
	//       padding: 10px;
	//       position: relative;
	//       font-size: 16px;
	//       @include borderBottom;
	//     }
	//     .choice-city {
	//       line-height: 45px;
	//     }
	//     .set-default {
	//       display: inline-block;
	//       padding: 10px;
	//       &.active {
	//         color: $mainColor;
	//       }
	//       em {
	//         margin-right: 5px;
	//       }
	//       em, span {
	//         vertical-align: middle;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.add-address-wrapper
	//     form.add-address(@submit.prevent='submit')
	//       h4 联系人
	//       .items
	//         span.title 姓名:
	//         input.input(v-model='addressee', placeholder='请输入买家名称')
	//       .items
	//         span.title 电话:
	//         input.input(v-model='mobile', type='tel', maxlength='11', placeholder='请填写收货手机号码')
	//       h4 收货地址
	//       .items
	//         span.title 城市/地区
	//         .con.choice-city
	//           get-region(
	//             :region-id='regionId',
	//             :province-id='provinceId',
	//             :city-id='cityId',
	//             :county-id='countyId',
	//             :address-id='addressId',
	//             @region-event='setRegionId'
	//           )
	//       .items
	//         span.title 详细地址:
	//         input.input(v-model='street', placeholder='例: 20号楼2012室')
	//       a.set-default(
	//         :class='{active: isDefault == 1}',
	//         @click='isDefault = isDefault? 0: 1'
	//       )
	//         em.icon-confirm.icon-36
	//         span 设为默认
	//       button.btn-submit(:disabled='disabled', v-text='btnText')
	// </template>
	//
	// <script lang='babel'>


	var _getRegion = __webpack_require__(38);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    GetRegion: _getRegion2.default
	  },
	  data: function data() {
	    return {
	      regionId: 0,
	      addressee: '',
	      isDefault: 0,
	      mobile: '',
	      street: '',

	      addressId: 0,
	      provinceId: 0,
	      cityId: 0,
	      countyId: 0,
	      disabled: true,
	      btnText: '保存'
	    };
	  },

	  watch: {
	    mobile: 'verification',
	    addressee: 'verification',
	    regionId: 'verification',
	    street: 'verification'
	  },
	  methods: {
	    setRegionId: function setRegionId(regionId) {
	      this.regionId = regionId;
	    },
	    verification: function verification() {
	      if (/^1[345678]{1}\d{9}$/.test(this.mobile) && this.addressee && this.regionId && this.street) {
	        this.disabled = false;
	      } else {
	        this.disabled = true;
	      }
	    },
	    submit: function submit() {
	      var _this = this;

	      var $children = this.$children[0].$refs;
	      if ($children.district && !+$children.district.value || $children.city && !+$children.city.value) {
	        self.toast('要填写完整的区域信息哟~');
	        return;
	      }
	      var body = _extends({}, apis.ADD_ADDRESS);
	      if (this.addressId) {
	        body = _extends({}, apis.EDIT_ADDRESS);
	        body.id = this.addressId;
	      }
	      body.addressee = this.addressee;
	      body.default = this.isDefault;
	      body.region_id = this.regionId;
	      body.mobile = this.mobile;
	      body.street = this.street;
	      this.disabled = true;
	      this.btnText = '保存中...';
	      self.DD.post(body, function (data) {
	        var query = _this.$route.query;
	        _this.disabled = false;
	        _this.btnText = '保存';
	        if (data.result === 'success') {
	          _this.$router.replace({
	            name: 'addressList',
	            query: query
	          });
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    getAddressInfo: function getAddressInfo(id) {
	      var _this2 = this;

	      var body = {
	        api: 'customer_address',
	        method: 'get_address_item',
	        id: id
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this2.regionId = data.info.region_id;
	          _this2.addressee = data.info.addressee;
	          _this2.isDefault = +data.info.is_default;
	          _this2.mobile = data.info.mobilephone;
	          _this2.street = data.info.street;

	          _this2.provinceId = data.info.province_id;
	          _this2.cityId = data.info.city_id;
	          _this2.countyId = data.info.county_id;
	          _this2.$nextTick(function () {
	            self.DD.bus.$emit('address-edit');
	          });
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.addressId = this.$route.params.addressId;
	    if (this.addressId) {
	      this.getAddressInfo(this.addressId);
	    }
	  }
	};
	// </script>

/***/ },
/* 274 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper add-address-wrapper\"><form @submit.prevent=\"submit\" class=\"add-address\"><h4>联系人</h4><div class=\"items\"><span class=\"title\">姓名:</span><input v-model=\"addressee\" placeholder=\"请输入买家名称\" class=\"input\"/></div><div class=\"items\"><span class=\"title\">电话:</span><input v-model=\"mobile\" type=\"tel\" maxlength=\"11\" placeholder=\"请填写收货手机号码\" class=\"input\"/></div><h4>收货地址</h4><div class=\"items\"><span class=\"title\">城市/地区</span><div class=\"con choice-city\"><get-region :region-id=\"regionId\" :province-id=\"provinceId\" :city-id=\"cityId\" :county-id=\"countyId\" :address-id=\"addressId\" @region-event=\"setRegionId\"></get-region></div></div><div class=\"items\"><span class=\"title\">详细地址:</span><input v-model=\"street\" placeholder=\"例: 20号楼2012室\" class=\"input\"/></div><a :class=\"{active: isDefault == 1}\" @click=\"isDefault = isDefault? 0: 1\" class=\"set-default\"><em class=\"icon-confirm icon-36\"></em><span>设为默认</span></a><button :disabled=\"disabled\" v-text=\"btnText\" class=\"btn-submit\"></button></form></div>";

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IM = undefined;

	var _list = __webpack_require__(276);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IM = exports.IM = [{
	  path: '/im',
	  name: 'imList',
	  component: _list2.default,
	  meta: {
	    title: "消息"
	  }
	}];

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(277)
	__vue_script__ = __webpack_require__(278)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\im\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(279)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0fa45f44/list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 277 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      items: [],

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  methods: {
	    getList: function getList() {
	      var _this = this;

	      var body = {
	        api: 'notice',
	        method: 'get_notice_items_by',
	        page: this.page + 1
	      };

	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page === 0) {
	            _this.items = data.info.items;
	          } else {
	            _this.items = _this.items.concat(data.info.items);
	          }
	          _this.page = data.info.page;
	          _this.pageCount = data.info.pageCount;

	          if (_this.loadingEl && _this.loadingEl.parentElement) {
	            _this.scrollEl.removeChild(_this.loadingEl);
	          }

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 20 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.getList();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.im-list-wrapper');
	    this.getList();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .im-list-wrapper {
	//     .item {
	//       display: block;
	//       overflow: hidden;
	//       background-color: #fff;
	//       position: relative;
	//       padding: 10px;
	//       @include borderTop($left: 60px);
	//       &:last-child {
	//         @include borderBottom;
	//       }
	//     }
	//     .topic {
	//       float: left;
	//       width: 45px;
	//       height: 45px;
	//       border-radius: 3px;
	//       margin-right: 5px;
	//       background-position: 50% 50%;
	//       background-repeat: no-repeat;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//       text-align: center;
	//       background-color: #538eca;
	//       em {
	//         margin-top: 12px;
	//       }
	//     }
	//     .title,
	//     .des {
	//       overflow: hidden;
	//       white-space: nowrap;
	//       text-overflow: ellipsis;
	//     }
	//     .title {
	//       margin-top: 3px;
	//       margin-bottom: 5px;
	//       padding-right: 70px;
	//     }
	//     .des {
	//       color: $darkenGrayColor;
	//     }
	//     .time {
	//       position: absolute;
	//       right: 10px;
	//       top: 15px;
	//       font-size: 12px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.im-list-wrapper
	//     div(v-if='pageCount > 0')
	//       a.item(
	//         v-for='item in items',
	//         :href='item.info_url'
	//       )
	//         span.topic
	//           em.icon-set.icon-40
	//         h4.title(v-text='item.title')
	//         p.des
	//           time(v-text='item.created_at')
	//     not-found(v-else)
	//       p 未查询到相关数据!
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 279 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper im-list-wrapper\"><div v-if=\"pageCount &gt; 0\"><a v-for=\"item in items\" :href=\"item.info_url\" class=\"item\"><span class=\"topic\"><em class=\"icon-set icon-40\"></em></span><h4 v-text=\"item.title\" class=\"title\"></h4><p class=\"des\"><time v-text=\"item.created_at\"></time></p></a></div><not-found v-else=\"v-else\"><p>未查询到相关数据!</p></not-found></div>";

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PAY = undefined;

	var _index = __webpack_require__(281);

	var _index2 = _interopRequireDefault(_index);

	var _success = __webpack_require__(285);

	var _success2 = _interopRequireDefault(_success);

	var _fail = __webpack_require__(289);

	var _fail2 = _interopRequireDefault(_fail);

	var _help = __webpack_require__(293);

	var _help2 = _interopRequireDefault(_help);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PAY = exports.PAY = [{
	  path: '/pay',
	  name: 'pay',
	  component: _index2.default,
	  meta: {
	    title: "选择支付方式"
	  }
	}, {
	  path: '/pay/success',
	  name: 'paySuccess',
	  component: _success2.default,
	  meta: {
	    title: "支付成功"
	  }
	}, {
	  path: '/pay/fail',
	  name: 'payFail',
	  component: _fail2.default,
	  meta: {
	    title: "支付失败"
	  }
	}, {
	  path: '/pay/help',
	  name: 'payHelp',
	  component: _help2.default,
	  meta: {
	    title: "支付帮助"
	  }
	}];

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(282)
	__vue_script__ = __webpack_require__(283)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\pay\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(284)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6e9af8a6/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 282 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 283 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .pay-wrapper {
	//     padding: 10px;
	//     .price {
	//       background-color: #fff;
	//       border-radius: 3px;
	//       overflow: hidden;
	//       padding: 10px;
	//       margin-bottom: 10px;
	//       strong {
	//         float: right;
	//         color: $priceColor;
	//       }
	//     }
	//     .pay-method {
	//       background-color: #fff;
	//       border-radius: 3px;
	//       .title {
	//         padding: 10px;
	//       }
	//       .item {
	//         display: block;
	//         padding: 10px;
	//         position: relative;
	//         @include borderTop;
	//       }
	//       em:first-child {
	//         $size: (72px/2);
	//         float: left;
	//         width: $size;
	//         height: $size;
	//         margin-right: 10px;
	//       }
	//       h5 {
	//         font-size: 14px;
	//       }
	//       h5, p {
	//         overflow: hidden;
	//       }
	//       p {
	//         color: $darkenGrayColor;
	//         font-size: 12px;
	//         margin-top: 3px;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.pay-wrapper
	//     .price
	//       span 订单金额:
	//       strong(v-text='grand_total | formatAmount')
	//     .pay-method
	//       h5.title 在线支付方式
	//       a.item(
	//         v-for='pay in payment_list',
	//         @click='goPayment(pay.payment_code)'
	//       )
	//         div(v-if='pay.id == 4')
	//           em.icon-pay-yb
	//           h5 易宝支付
	//           p 支持易宝支付
	//           em.icon-more
	//         div(v-if='pay.id == 1')
	//           em.icon-pay-alipay
	//           h5 支付宝
	//           p 推荐使用支付宝账号的用户
	//           em.icon-more
	//         div(v-if='pay.id == 2')
	//           em.icon-pay-wechat
	//           h5 微信支付
	//           p 建议微信5.0版本以上的用户使用
	//           em.icon-more
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      grand_total: '0.00',
	      payment_list: [],
	      payment_number: 0,

	      order_ids: []
	    };
	  },

	  methods: {
	    getOrderPayment: function getOrderPayment() {
	      var _this = this;

	      this.order_ids = self.JSON.parse(self.sessionStorage.getItem('orderIds'));
	      var body = {
	        api: 'sales_order',
	        method: 'order_payment',
	        order_ids: this.order_ids
	      };
	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.grand_total = data.info.grand_total;
	          _this.payment_list = data.info.payment_list;
	          _this.payment_number = data.info.payment_number;
	        } else {
	          self.toast(data.info.errmsg, {
	            callback: function () {
	              if (data.code === '0x9011') {
	                this.$router.replace({
	                  name: 'myOrderAll'
	                });
	              }
	            }.bind(_this)
	          });
	        }
	      });
	    },
	    goPayment: function goPayment(code) {
	      self.DD.loading();
	      if (code === 'yeepay') {
	        var body = {
	          order_ids: this.order_ids,
	          api: 'payment',
	          method: 'get_yeepay_no'
	        };
	        self.DD.post(body, function (data) {
	          if (data.result === 'success') {
	            self.location.href = data.info.payurl;
	          } else {
	            self.toast(data.info.errmsg);
	          }
	        });
	      } else {
	        var url = '/pay/wxpay';
	        if (code === 'alipay') {
	          url = '/pay/alipay';
	        }

	        this.$http.post(url, {
	          order_ids: this.order_ids
	        }).then(function (response) {
	          return response.json();
	        }).then(function (data) {
	          if (data.result === 'success') {
	            if (code === 'alipay') {
	              self.location.href = data.info.payurl;
	            } else {
	              self.location.href = '/website/wxpay';
	            }
	          }
	        });
	      }
	    }
	  },
	  created: function created() {
	    this.getOrderPayment();
	  }
	};
	// </script>

/***/ },
/* 284 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper pay-wrapper\"><div class=\"price\"><span>订单金额:</span><strong v-text=\"grand_total | formatAmount\"></strong></div><div class=\"pay-method\"><h5 class=\"title\">在线支付方式</h5><a v-for=\"pay in payment_list\" @click=\"goPayment(pay.payment_code)\" class=\"item\"><div v-if=\"pay.id == 4\"><em class=\"icon-pay-yb\"></em><h5>易宝支付</h5><p>支持易宝支付</p><em class=\"icon-more\"></em></div><div v-if=\"pay.id == 1\"><em class=\"icon-pay-alipay\"></em><h5>支付宝</h5><p>推荐使用支付宝账号的用户</p><em class=\"icon-more\"></em></div><div v-if=\"pay.id == 2\"><em class=\"icon-pay-wechat\"></em><h5>微信支付</h5><p>建议微信5.0版本以上的用户使用</p><em class=\"icon-more\"></em></div></a></div></div>";

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(286)
	__vue_script__ = __webpack_require__(287)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\pay\\success.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(288)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-51f11f52/success.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 286 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    tips: _tips2.default
	  },
	  created: function created() {
	    self.sessionStorage.clear();
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .pay-result-wrapper {
	//     padding-top: 60px;
	//     text-align: center;
	//     min-height: 100%;
	//     .result {
	//       $borderSize: 3px;
	//       display: inline-block;
	//       position: relative;
	//       width: 50px;
	//       height: 50px;
	//       border: $borderSize solid $mainColor;
	//       border-radius: 100px;
	//       margin-bottom: 20px;
	//       &:before,
	//       &:after {
	//         content: '';
	//         width: 5px;
	//         height: 5px;
	//         background-color: $mainColor;
	//         border-radius: 100px;
	//         position: absolute;
	//         top: 15px;
	//       }
	//       &:before {
	//         left: 13px;
	//       }
	//       &:after {
	//         right: 13px;
	//       }
	//       .mouth {
	//         content: '';
	//         position: absolute;
	//         top: 13px;
	//         left: 12px;
	//         width: 20px;
	//         height: 20px;
	//         border-style: solid;
	//         border-width: 3px;
	//         border-color: transparent transparent #E60012 #E60012;
	//         border-radius: 50px;
	//         -webkit-transform: rotate(-45deg);
	//         transform: rotate(-45deg);
	//       }
	//     }
	//     .btn-submit {
	//       line-height: 45px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.pay-result-wrapper
	//     span.result
	//       em.mouth
	//     p 恭喜您! 订单支付成功!
	//     router-link.btn-submit(
	//       :to='{name: "myOrder", params: {status: 2}}'
	//     ) 查看订单
	//     tips
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 288 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper pay-result-wrapper\"><span class=\"result\"><em class=\"mouth\"></em></span><p>恭喜您! 订单支付成功!</p><router-link :to=\"{name: &quot;myOrder&quot;, params: {status: 2}}\" class=\"btn-submit\">查看订单</router-link><tips></tips></div>";

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(290)
	__vue_script__ = __webpack_require__(291)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\pay\\fail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(292)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-9d2b860c/fail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 290 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tips = __webpack_require__(19);

	var _tips2 = _interopRequireDefault(_tips);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    tips: _tips2.default
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   .pay-result-wrapper {
	//     min-height: 100%;
	//     .explain {
	//       position: absolute;
	//       right: 0;
	//       top: 0;
	//       padding: 10px;
	//       line-height: 1;
	//     }
	//     .result {
	//       .fail {
	//         top: 25px;
	//         border-color: #E60012 #E60012 transparent transparent;
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.pay-result-wrapper
	//     router-link.explain(:to='{name: "payHelp"}')
	//       em.i i
	//       span 支付说明
	//     span.result
	//       em.mouth.fail
	//     p 非常抱歉! 您的订单支付失败!
	//     router-link.btn-submit(
	//       :to='{name: "pay"}'
	//     ) 重新支付
	//     tips
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 292 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper pay-result-wrapper\"><router-link :to=\"{name: &quot;payHelp&quot;}\" class=\"explain\"><em class=\"i\">i</em><span>支付说明</span></router-link><span class=\"result\"><em class=\"mouth fail\"></em></span><p>非常抱歉! 您的订单支付失败!</p><router-link :to=\"{name: &quot;pay&quot;}\" class=\"btn-submit\">重新支付</router-link><tips></tips></div>";

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(294)
	__vue_template__ = __webpack_require__(295)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5a1c6b9d/help.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 294 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 295 */
/***/ function(module, exports) {

	module.exports = "<iframe frameborder=\"0\" src=\"/website/pay_help\" class=\"pay-help-wrapper\"></iframe>";

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.OTHERS = undefined;

	var _index = __webpack_require__(297);

	var _index2 = _interopRequireDefault(_index);

	var _list = __webpack_require__(332);

	var _list2 = _interopRequireDefault(_list);

	var _ = __webpack_require__(336);

	var _2 = _interopRequireDefault(_);

	var _index3 = __webpack_require__(339);

	var _index4 = _interopRequireDefault(_index3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var OTHERS = exports.OTHERS = [{
	  path: '/',
	  name: 'init',
	  component: _index4.default,
	  meta: {
	    title: "邸达电子商务有限公司"
	  }
	}, {
	  path: '/index',
	  name: 'home',
	  component: _index2.default,
	  meta: {
	    title: "邸达电子商务有限公司"
	  },
	  beforeEnter: function beforeEnter(to, from, next) {
	    switch (self.home.reviewStatus) {
	      case 'pending':
	        // 正在审核中...
	        next({
	          name: 'pending'
	        });
	        break;
	      case 'denied':
	        // 审核未通过
	        next({
	          name: 'unpass'
	        });
	        break;
	      case 'on_hold':
	        // 用户已注册，但是没有填写信息
	        next({
	          name: 'registerInfo'
	        });
	        break;
	      case '':
	        next({
	          name: 'login'
	        });
	        break;
	      default:
	        next();
	    }
	  }
	}, {
	  path: '/brand',
	  name: 'brand',
	  component: _list2.default,
	  meta: {
	    title: "推荐品牌"
	  }
	}, {
	  path: 'user/collection',
	  redirect: '/user/collection/goods'
	}, {
	  path: '*',
	  name: '404',
	  component: _2.default,
	  meta: {
	    title: "404"
	  }
	}];

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(298)
	__vue_script__ = __webpack_require__(299)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(331)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-9ddd5d86/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 298 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _navBar = __webpack_require__(10);

	var _navBar2 = _interopRequireDefault(_navBar);

	var _swipe = __webpack_require__(172);

	var _swipe2 = _interopRequireDefault(_swipe);

	var _category = __webpack_require__(300);

	var _category2 = _interopRequireDefault(_category);

	var _shop = __webpack_require__(304);

	var _shop2 = _interopRequireDefault(_shop);

	var _brand = __webpack_require__(312);

	var _brand2 = _interopRequireDefault(_brand);

	var _newProducts = __webpack_require__(316);

	var _newProducts2 = _interopRequireDefault(_newProducts);

	var _hotProducts = __webpack_require__(320);

	var _hotProducts2 = _interopRequireDefault(_hotProducts);

	var _specialProducts = __webpack_require__(323);

	var _specialProducts2 = _interopRequireDefault(_specialProducts);

	var _search = __webpack_require__(327);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Home',
	  components: {
	    Search: _search2.default,
	    Category: _category2.default,
	    NavBar: _navBar2.default,
	    Swipe: _swipe2.default,
	    Shop: _shop2.default,
	    Brand: _brand2.default,
	    NewProducts: _newProducts2.default,
	    HotProducts: _hotProducts2.default,
	    SpecialProducts: _specialProducts2.default
	  }
	};
	// </script>
	// <style lang='sass'>
	//   .home-wrapper {
	//     padding-bottom: 70px;
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.home-wrapper
	//     search
	//     swipe(
	//       :page='"home"',
	//       :height='"49%"'
	//     )
	//     category
	//     new-products
	//     special-products
	//     hot-products
	//     shop
	//     brand
	//     nav-bar
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(301)
	__vue_script__ = __webpack_require__(302)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(303)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d248863a/category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 301 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 302 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   .home-category {
	//       background-color: #fff;
	//       font-size: 0;
	//       padding: 15px 0;
	//       .item {
	//         text-align: center;
	//         font-size: 14px;
	//         display: inline-block;
	//         width: 25%;
	//         margin-bottom: 10px;
	//         &:nth-child(4) {
	//           & ~ a {
	//             margin-bottom: 0;
	//           }
	//         }
	//       }
	//       .icon {
	//         display: block;
	//         margin: 0 auto;
	//         margin-bottom: 5px;
	//         width: 60%;
	//       }
	//     }
	// </style>
	//
	// <template lang='jade'>
	//   section.home-category(v-if='category.length > 0')
	//     a.item(
	//       v-for='item in category',
	//       @click='page(item.category_id, item.category_name)'
	//     )
	//       img.icon(:src='item.app_icon')
	//       p(v-text='item.category_name')
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      category: []
	    };
	  },

	  methods: {
	    page: function page(category_id, category_name) {
	      _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u5206\u7C7B', 'click', '' + category_name]);
	      if (category_id === 0) {
	        this.$router.push({
	          name: 'category'
	        });
	      } else {
	        this.$router.push({
	          name: "goodsList",
	          query: {
	            category_id: category_id
	          }
	        });
	      }
	    }
	  },
	  created: function created() {
	    this.category = self.home.category || [];
	  }
	};
	// </script>

/***/ },
/* 303 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"category.length &gt; 0\" class=\"home-category\"><a v-for=\"item in category\" @click=\"page(item.category_id, item.category_name)\" class=\"item\"><img :src=\"item.app_icon\" class=\"icon\"/><p v-text=\"item.category_name\"></p></a></section>";

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(305)
	__vue_script__ = __webpack_require__(306)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\shop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(311)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-663b4d5b/shop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 305 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _title = __webpack_require__(307);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    HomeTitle: _title2.default
	  },
	  data: function data() {
	    return {
	      limitNum: 3,
	      open: false,
	      shops: [],
	      viewShops: [],
	      category: ''
	    };
	  },

	  watch: {
	    limitNum: function limitNum(val) {
	      this.viewShops = this.shops.slice(0, val);
	    }
	  },
	  methods: {
	    goPage: function goPage(router, label) {
	      this.$router.push(router);
	      this.monitor('' + label);
	    },
	    monitor: function monitor(label) {
	      _czc.push(['_trackEvent', this.category, 'click', '' + label]);
	    },
	    viewMore: function viewMore() {
	      this.monitor('展开/收起');
	      if (this.open) {
	        this.limitNum = 3;
	        this.open = false;
	      } else {
	        this.limitNum = this.shops.length;
	        this.open = true;
	      }
	    }
	  },
	  created: function created() {
	    this.shops = self.home.store_is_recommend || [];
	    this.viewShops = this.shops.slice(0, 3);
	    this.category = self.home.deviceType + '_\u9996\u9875\u5546\u5BB6\u63A8\u8350';
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .home-shop {
	//     article {
	//       padding: 10px 0 0;
	//       background-color: #fff;
	//     }
	//     .item {
	//       position: relative;
	//       display: block;
	//       overflow: hidden;
	//       padding: 8px $margin 8px;
	//       @include borderTop($left: $margin);
	//       &:first-child {
	//         &:before {
	//           display: none;
	//         }
	//       }
	//     }
	//     .topic {
	//       float: left;
	//       width: 60px;
	//       height: 60px;
	//       border-radius: 5px;
	//       overflow: hidden;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       margin-right: 10px;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     h4.title {
	//       margin-top: 3px;
	//       height: 35px;
	//       overflow: hidden;
	//     }
	//     .num {
	//       overflow: hidden;
	//       font-size: 12px;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//       }
	//     }
	//     .sales {
	//       width: 40%;
	//       color: #fd4d3e;
	//       margin-right: 5px;
	//     }
	//     .more {
	//       display: block;
	//       padding-top: 10px;
	//       width: 50px;
	//       margin: -8px auto 0;
	//       font-size: 0;
	//       height: 12px;
	//       overflow: hidden;
	//       text-align: center;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.home-shop(v-if='viewShops.length > 0')
	//     home-title(
	//       :hex-color='"#f6c157"',
	//       :text='"商家推荐"',
	//       :url='{name: "shopList"}',
	//       :icon='"icon-home-shop"',
	//       :category='category'
	//     )
	//     article
	//       a.item(
	//         v-for='item in viewShops',
	//         @click='goPage({name: "shop", params: {shopId: item.store_id}},item.store_name)',
	//       )
	//         span.topic(:style='{backgroundImage: "url(" + item.logo + ")"}')
	//         h4.title(v-text='item.store_name')
	//         p.num
	//           span.sales(v-text='"起送金额 " + item.starting_price + " 元"')
	//           span.godds(v-text='"商品:" + item.items_num + "款"')
	//       a.more(
	//         v-if='shops.length > 3',
	//         @click='viewMore'
	//       )
	//         em.icon-home-shop-more(:class='{open: open}')
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(308)
	__vue_script__ = __webpack_require__(309)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\title.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(310)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-61e617c3/title.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 308 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 309 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   .home-title-wrapper {
	//     display: block;
	//     position: relative;
	//     text-align: center;
	//     padding: 10px 10px 8px;
	//     overflow: hidden;
	//     em[class^='icon-'] {
	//       vertical-align: middle;
	//     }
	//     .text {
	//       font-size: 16px;
	//       margin-left: 5px;
	//       vertical-align: middle;
	//     }
	//     .icon-more {
	//       &:before {
	//         width: 8px;
	//         height: 8px;
	//         border-color: #666;
	//       }
	//     }
	//     .title {
	//       position: relative;
	//       display: inline-block;
	//       padding: 0 10px;
	//       width: 50%;
	//       &:before {
	//         content: '';
	//         position: absolute;
	//         top: 50%;
	//         left: -10%;
	//         width: 30%;
	//         height: 1px;
	//         background-color: currentColor;
	//       }
	//       &:after {
	//         content: '';
	//         position: absolute;
	//         top: 50%;
	//         right: -10%;
	//         width: 30%;
	//         height: 1px;
	//         background-color: currentColor;
	//       }
	//     }
	//     .more-text {
	//       font-size: 12px;
	//       position: absolute;
	//       right: 20px;
	//       top: 50%;
	//       height: 14px;
	//       margin-top: -7px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   a.home-title-wrapper(@click='goPage()')
	//     .title(:style='{color: hexColor}')
	//       em.icon-32(:class='icon')
	//       span.text(v-text='text')
	//     span.more-text 更多
	//     em.icon-more
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  props: ['hexColor', 'text', 'url', 'icon', 'category'],
	  methods: {
	    goPage: function goPage() {
	      this.$router.push(this.url);
	      _czc.push(['_trackEvent', '' + this.category, 'click', '\u67E5\u770B\u66F4\u591A']);
	    },
	    monitor: function monitor() {
	      _czc.push(['_trackEvent', '' + this.category, 'click', '\u67E5\u770B\u66F4\u591A']);
	      return false;
	    }
	  }
	};
	// </script>

/***/ },
/* 310 */
/***/ function(module, exports) {

	module.exports = "<a @click=\"goPage()\" class=\"home-title-wrapper\"><div :style=\"{color: hexColor}\" class=\"title\"><em :class=\"icon\" class=\"icon-32\"></em><span v-text=\"text\" class=\"text\"></span></div><span class=\"more-text\">更多</span><em class=\"icon-more\"></em></a>";

/***/ },
/* 311 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"viewShops.length &gt; 0\" class=\"home-shop\"><home-title :hex-color=\"&quot;#f6c157&quot;\" :text=\"&quot;商家推荐&quot;\" :url=\"{name: &quot;shopList&quot;}\" :icon=\"&quot;icon-home-shop&quot;\" :category=\"category\"></home-title><article><a v-for=\"item in viewShops\" @click=\"goPage({name: &quot;shop&quot;, params: {shopId: item.store_id}},item.store_name)\" class=\"item\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.logo + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"item.store_name\" class=\"title\"></h4><p class=\"num\"><span v-text=\"&quot;起送金额 &quot; + item.starting_price + &quot; 元&quot;\" class=\"sales\"></span><span v-text=\"&quot;商品:&quot; + item.items_num + &quot;款&quot;\" class=\"godds\"></span></p></a><a v-if=\"shops.length &gt; 3\" @click=\"viewMore\" class=\"more\"><em :class=\"{open: open}\" class=\"icon-home-shop-more\"></em></a></article></section>";

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(313)
	__vue_script__ = __webpack_require__(314)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\brand.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(315)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-9b73dd1c/brand.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 313 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _title = __webpack_require__(307);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    HomeTitle: _title2.default
	  },
	  data: function data() {
	    return {
	      brands: [],
	      category: ''
	    };
	  },

	  methods: {
	    goPage: function goPage(router, label) {
	      this.$router.push(router);
	      _czc.push(['_trackEvent', this.category, 'click', '' + label]);
	    }
	  },
	  created: function created() {
	    this.brands = self.home.brand || [];
	    this.category = self.home.deviceType + '_\u9996\u9875\u54C1\u724C\u63A8\u8350';
	  }
	};
	// </script>
	// <style lang='sass'>
	//   .home-brand {
	//     article {
	//       background-color: #fff;
	//       font-size: 0;
	//       position: relative;
	//       a {
	//         display: inline-block;
	//         vertical-align: middle;
	//       }
	//     }
	//     .scroll {
	//       padding-left: 25px;
	//       overflow-x: auto;
	//     }
	//     .item {
	//       width: 90px;
	//       height: 90px;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       margin-right: 10px;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .view-more {
	//       width: 30px;
	//       height: 90px - 15px;
	//       padding-top: 15px;
	//       span {
	//         display: inline-block;
	//         vertical-align: middle;
	//         width: 16px;
	//         font-size: 12px;
	//         margin-left: 3px;
	//       }
	//     }
	//     .recommend-title {
	//       position: absolute;
	//       left: 0;
	//       top: 0;
	//       height: 100%;
	//       z-index: 1;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.home-brand(v-if='brands.length > 0')
	//     home-title(
	//       :hex-color='"#936ad9"',
	//       :text='"品牌推荐"',
	//       :url='{name: "brand"}',
	//       :icon='"icon-home-brand"',
	//       :category='category'
	//     )
	//     article
	//       a.recommend-title(
	//         @click='goPage({name: "brand"}, "查看更多_left")'
	//       )
	//         em.icon-recommend-title
	//       .scroll
	//         .scroll-bar(:style='{width: 100 * brands.length + "px"}')
	//           a.item(
	//             v-for='item in brands',
	//             @click='goPage({name: "goodsList", query: {brand_id: item.brand_id}},item.brand_name)',
	//             :style='{backgroundImage: "url(" + item.brand_icon + ")"}',
	//           )
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 315 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"brands.length &gt; 0\" class=\"home-brand\"><home-title :hex-color=\"&quot;#936ad9&quot;\" :text=\"&quot;品牌推荐&quot;\" :url=\"{name: &quot;brand&quot;}\" :icon=\"&quot;icon-home-brand&quot;\" :category=\"category\"></home-title><article><a @click=\"goPage({name: &quot;brand&quot;}, &quot;查看更多_left&quot;)\" class=\"recommend-title\"><em class=\"icon-recommend-title\"></em></a><div class=\"scroll\"><div :style=\"{width: 100 * brands.length + &quot;px&quot;}\" class=\"scroll-bar\"><a v-for=\"item in brands\" @click=\"goPage({name: &quot;goodsList&quot;, query: {brand_id: item.brand_id}},item.brand_name)\" :style=\"{backgroundImage: &quot;url(&quot; + item.brand_icon + &quot;)&quot;}\" class=\"item\"></a></div></div></article></section>";

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(317)
	__vue_script__ = __webpack_require__(318)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\newProducts.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(319)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-94c97762/newProducts.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 317 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _title = __webpack_require__(307);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    HomeTitle: _title2.default
	  },
	  data: function data() {
	    return {
	      newProducts: [],
	      newProductsAd: [],
	      category: ''
	    };
	  },

	  methods: {
	    goPage: function goPage(router, label) {
	      this.$router.push(router);
	      _czc.push(['_trackEvent', this.category, 'click', '' + label]);
	    },
	    monitor: function monitor(label) {
	      _czc.push(['_trackEvent', this.category + '\u5E7F\u544A', 'click', '' + label]);
	    }
	  },
	  created: function created() {
	    this.newProducts = self.home.new_pro || [];
	    this.newProductsAd = self.home.new_pro_adv || [];
	    this.category = self.home.deviceType + '_\u9996\u9875\u65B0\u54C1\u63A8\u8350';
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .home-new-products {
	//     article {
	//       background-color: #fff;
	//       font-size: 0;
	//     }
	//     .item {
	//       width: 33.33%;
	//       text-align: center;
	//       position: relative;
	//       display: inline-block;
	//       box-sizing: border-box;
	//       padding: 10px;
	//       @include borderBottom;
	//       @include borderRight;
	//     }
	//     .topic {
	//       display: inline-block;
	//       width: 80%;
	//       padding-top: 80%;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       margin-bottom: 10px;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//     }
	//     .name {
	//       overflow : hidden;
	//       text-overflow: ellipsis;
	//       white-space: nowrap;
	//       font-size: 14px;
	//       margin-bottom: 5px;
	//     }
	//     .price {
	//       font-size: 14px;
	//       text-align: left;
	//       color: $priceColor;
	//     }
	//     .new-product-ad {
	//       padding: 0 10px;
	//       overflow: hidden;
	//       a {
	//         background-repeat: no-repeat;
	//         background-position: 50% 50%;
	//         -webkit-background-size: cover;
	//         background-size: cover;
	//         float: left;
	//         &:first-child {
	//           width: 50%;
	//           padding-top: 42%;
	//           margin-right: 2%;
	//         }
	//         &:nth-child(2),
	//         &:nth-child(3) {
	//           width: 48%;
	//           padding-top: 20%;
	//         }
	//         &:nth-child(2) {
	//           margin-bottom: 2%;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.home-new-products(v-if='newProducts.length > 0')
	//     home-title(
	//       :hex-color='"#f467e5"',
	//       :text='"新品推荐"',
	//       :url='{name: "goodsList", query: {type: "new", order: "sell_num"}}',
	//       :icon='"icon-home-recommend"',
	//       :category='category'
	//     )
	//     article.new-product-ad(v-if='newProductsAd.length > 0')
	//       a(
	//         v-for='item in newProductsAd',
	//         :href='item.link',
	//         :title='item.title',
	//         :style='{backgroundImage: "url(" + item.file + ")"}',
	//         @click='monitor(item.product_name)'
	//       )
	//     article
	//       a.item(
	//         v-for='item in newProducts',
	//         @click='goPage({name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}},item.product_name)',
	//         :data-id='item.store_product_entity_id',
	//       )
	//         span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
	//         h4.name(v-text='item.product_name')
	//         p.price(v-text='"¥" + item.store_product_final_price')
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 319 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"newProducts.length &gt; 0\" class=\"home-new-products\"><home-title :hex-color=\"&quot;#f467e5&quot;\" :text=\"&quot;新品推荐&quot;\" :url=\"{name: &quot;goodsList&quot;, query: {type: &quot;new&quot;, order: &quot;sell_num&quot;}}\" :icon=\"&quot;icon-home-recommend&quot;\" :category=\"category\"></home-title><article v-if=\"newProductsAd.length &gt; 0\" class=\"new-product-ad\"><a v-for=\"item in newProductsAd\" :href=\"item.link\" :title=\"item.title\" :style=\"{backgroundImage: &quot;url(&quot; + item.file + &quot;)&quot;}\" @click=\"monitor(item.product_name)\"></a></article><article><a v-for=\"item in newProducts\" @click=\"goPage({name: &quot;goodsInfo&quot;, params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}},item.product_name)\" :data-id=\"item.store_product_entity_id\" class=\"item\"><span :style=\"{backgroundImage: &quot;url(&quot; + item.default_media_gallery_thumb + &quot;)&quot;}\" class=\"topic\"></span><h4 v-text=\"item.product_name\" class=\"name\"></h4><p v-text=\"&quot;¥&quot; + item.store_product_final_price\" class=\"price\"></p></a></article></section>";

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(321)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\hotProducts.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(322)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-bcd0d908/hotProducts.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _title = __webpack_require__(307);

	var _title2 = _interopRequireDefault(_title);

	var _goodsItem = __webpack_require__(240);

	var _goodsItem2 = _interopRequireDefault(_goodsItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template lang='jade'>
	//   section.home-products(v-if='hotProducts.length > 0')
	//     home-title(
	//       :hex-color='"#fc5671"',
	//       :text='"热销商品"',
	//       :url='{name: "goodsList", query: {type: "hot", order: "sell_num"}}',
	//       :icon='"icon-home-hot"',
	//       :category='category'
	//     )
	//     goods-item(
	//       :goods-data="hotProducts",
	//       :type='"hot"',
	//       :category='category'
	//     )
	// </template>
	// <script lang='babel'>
	exports.default = {
	  components: {
	    HomeTitle: _title2.default,
	    GoodsItem: _goodsItem2.default
	  },
	  data: function data() {
	    return {
	      hotProducts: [],
	      category: ''
	    };
	  },
	  mounted: function mounted() {
	    this.hotProducts = self.home.hot || [];
	    this.category = self.home.deviceType + '_\u9996\u9875\u70ED\u9500\u5546\u54C1';
	  }
	};
	// </script>

/***/ },
/* 322 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"hotProducts.length &gt; 0\" class=\"home-products\"><home-title :hex-color=\"&quot;#fc5671&quot;\" :text=\"&quot;热销商品&quot;\" :url=\"{name: &quot;goodsList&quot;, query: {type: &quot;hot&quot;, order: &quot;sell_num&quot;}}\" :icon=\"&quot;icon-home-hot&quot;\" :category=\"category\"></home-title><goods-item :goods-data=\"hotProducts\" :type=\"&quot;hot&quot;\" :category=\"category\"></goods-item></section>";

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(324)
	__vue_script__ = __webpack_require__(325)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\specialProducts.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(326)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-958d0730/specialProducts.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 324 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _title = __webpack_require__(307);

	var _title2 = _interopRequireDefault(_title);

	var _goodsItem = __webpack_require__(240);

	var _goodsItem2 = _interopRequireDefault(_goodsItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   @import '../../scss/css3Module';
	//   .home-products {
	//
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   section.home-products(v-if='specialProducts.length > 0')
	//     home-title(
	//       :hex-color='"#5dd166"',
	//       :text='"特价商品"',
	//       :url='{name: "goodsList", query: {type: "special_offer", order: "sell_num"}}',
	//       :icon='"icon-home-dis"',
	//       :category='category'
	//     )
	//     goods-item(
	//       :goods-data="specialProducts",
	//       :type='"special"',
	//       :category='category'
	//     )
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  components: {
	    HomeTitle: _title2.default,
	    GoodsItem: _goodsItem2.default
	  },
	  data: function data() {
	    return {
	      specialProducts: [],
	      category: ''
	    };
	  },
	  mounted: function mounted() {
	    this.specialProducts = self.home.special_offer || [];
	    this.category = self.home.deviceType + '_\u9996\u9875\u7279\u4EF7\u5546\u54C1';
	  }
	};
	// </script>

/***/ },
/* 326 */
/***/ function(module, exports) {

	module.exports = "<section v-if=\"specialProducts.length &gt; 0\" class=\"home-products\"><home-title :hex-color=\"&quot;#5dd166&quot;\" :text=\"&quot;特价商品&quot;\" :url=\"{name: &quot;goodsList&quot;, query: {type: &quot;special_offer&quot;, order: &quot;sell_num&quot;}}\" :icon=\"&quot;icon-home-dis&quot;\" :category=\"category\"></home-title><goods-item :goods-data=\"specialProducts\" :type=\"&quot;special&quot;\" :category=\"category\"></goods-item></section>";

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(328)
	__vue_script__ = __webpack_require__(329)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\home\\search.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(330)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1cd7afcd/search.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 328 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 329 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .search-home {
	//     position: fixed;
	//     left: 0;
	//     top: 0;
	//     z-index: 5;
	//     width: 100%;
	//     height: 50px;
	//     padding: 10px 45px 10px 10px;
	//     box-sizing: border-box;
	//     .input {
	//       width: 100%;
	//       color: #fff;
	//       background-color: rgba(255, 255, 255, .6);
	//       border-radius: 3px;
	//       padding: 5px 10px;
	//       &::-webkit-input-placeholder {
	//         color: #fff;
	//       }
	//     }
	//     .icon {
	//       width: 44px;
	//       position: absolute;
	//       top: 0;
	//       right: 0;
	//       box-sizing: border-box;
	//       text-align: center;
	//       padding-top: 8px;
	//       p {
	//         font-size: 12px;
	//         color: #fff;
	//         margin-top: -5px;
	//       }
	//     }
	//     .back {
	//       position: absolute;
	//       left: 0;
	//       top: 0;
	//       width: 30px;
	//       height: 50px;
	//       display: none;
	//       em {
	//         left: 13px;
	//       }
	//     }
	//     &.show-hot {
	//       background-color: $mainColor;
	//       padding-left: 30px;
	//       input {
	//         color: #333;
	//         background-color: #fff;
	//         &::-webkit-input-placeholder {
	//           color: #666;
	//         }
	//       }
	//       .back {
	//         display: block;
	//       }
	//     }
	//     &.show-bg {
	//       background-color: $mainColor;
	//     }
	//   }
	//   .home-hot-keys {
	//     position: fixed;
	//     left: 0;
	//     top: 0;
	//     bottom: 0;
	//     width: 100%;
	//     background-color: #fff;
	//     z-index: 4;
	//     padding-top: 50px;
	//     text-align: center;
	//     overflow: auto;
	//     .title {
	//       padding: 10px;
	//       font-size: inherit;
	//       color: $darkenGrayColor;
	//       position: relative;
	//       text-align: left;
	//       @include borderBottom;
	//     }
	//     .item {
	//       display: block;
	//       position: relative;
	//       padding: 10px;
	//       font-size: 12px;
	//       text-align: left;
	//       @include borderBottom($left: $margin);
	//     }
	//
	//     .search-item,
	//     .search-item {
	//       display: inline-block;
	//       vertical-align: middle;
	//       margin: 50px 20px 0;
	//       span {
	//         display: block;
	//         width: 60px;
	//         height: 60px;
	//         border-radius: 200px;
	//         margin-bottom: 5px;
	//         background-color: #d1d2d4;
	//       }
	//       em {
	//         margin-top: 13px;
	//       }
	//     }
	//     .icon-s-store {
	//       margin-left: 2px;
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   div
	//     form.search-home(
	//       :class='{"show-hot": hotToggle}',
	//       :style='{background-color:rgba(230,0,18,scrollToggle)}',
	//       @submit.prevent='search'
	//     )
	//       a.back(
	//         @click='getBack'
	//       )
	//         em.icon-back
	//       input.input(
	//         type="search",
	//         v-model='keywords',
	//         placeholder='搜索商家/商品',
	//         @focus='getHotKey()'
	//       )
	//       a.icon.message(@click='goPage({name: "imList"})')
	//         em.icon-message.icon-40
	//         p 消息
	//     .home-hot-keys(v-if='hotToggle')
	//       h4.title 热搜关键词
	//       a.item(
	//         v-for='item in hotKeys',
	//         v-text='item.tag_label',
	//         @click='search(item.tag_label)'
	//       )
	//     .home-hot-keys(
	//       v-if='choiceToggle'
	//     )
	//       a.search-item(
	//         @click='search(keywords, "goods")'
	//       )
	//         span.goods
	//           em.icon-s-goods
	//         p 商品搜索
	//       a.search-item(
	//         @click='search(keywords, "shop")'
	//       )
	//         span.shop
	//           em.icon-s-store
	//         p 商家搜索
	// </template>
	//
	// <script lang='babel'>
	exports.default = {
	  data: function data() {
	    return {
	      hotKeys: [],
	      keywords: '',
	      hotToggle: false,
	      choiceToggle: false,
	      scrollToggle: 0
	    };
	  },

	  watch: {
	    keywords: function keywords(val) {
	      if (val) {
	        this.choiceToggle = true;
	      } else {
	        this.choiceToggle = false;
	      }
	    }
	  },
	  methods: {
	    goPage: function goPage(router) {
	      this.$router.push(router);
	      _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u6D88\u606F', 'click', '\u6D88\u606F']);
	    },
	    getHotKey: function getHotKey() {
	      var _this = this;

	      _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u641C\u7D22', 'focus', '输入框获取焦点']);
	      if (this.hotKeys.length > 0) {
	        this.hotToggle = true;
	        return;
	      }
	      var body = {
	        api: 'website',
	        method: 'get_website_tags'
	      };
	      self.DD.get(body, function (data) {
	        if (data.result === 'success') {
	          _this.hotKeys = data.info._items;
	          _this.hotToggle = true;
	        }
	      });
	    },
	    search: function search(keywords, type) {
	      this.keywords = this.keywords || keywords;
	      _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u641C\u7D22', 'search', 'keywords=' + this.keywords + '&type=' + type]);
	      if (type === 'shop') {
	        this.$router.push({
	          name: 'shopList',
	          query: {
	            keywords: this.keywords
	          }
	        });
	      } else {
	        this.$router.push({
	          name: 'goodsList',
	          query: {
	            keywords: this.keywords
	          }
	        });
	      }
	    },
	    getBack: function getBack() {
	      _czc.push(['_trackEvent', self.home.deviceType + '_\u9996\u9875\u641C\u7D22', 'click', '取消搜索']);
	      this.keywords = '';
	      this.hotToggle = false;
	      this.choiceToggle = false;
	    },
	    scrollHandler: function scrollHandler() {
	      var st = self.document.body.scrollTop;
	      if (st > 115) {
	        this.scrollToggle = 1;
	      } else {
	        this.scrollToggle = (st / 115).toFixed(2);
	      }
	    }
	  },
	  mounted: function mounted() {
	    self.document.addEventListener('scroll', this.scrollHandler);
	  }
	};
	// </script>

/***/ },
/* 330 */
/***/ function(module, exports) {

	module.exports = "<div><form :class=\"{&quot;show-hot&quot;: hotToggle}\" :style=\"{background-color:rgba(230,0,18,scrollToggle)}\" @submit.prevent=\"search\" class=\"search-home\"><a @click=\"getBack\" class=\"back\"><em class=\"icon-back\"></em></a><input type=\"search\" v-model=\"keywords\" placeholder=\"搜索商家/商品\" @focus=\"getHotKey()\" class=\"input\"/><a @click=\"goPage({name: &quot;imList&quot;})\" class=\"icon message\"><em class=\"icon-message icon-40\"></em><p>消息</p></a></form><div v-if=\"hotToggle\" class=\"home-hot-keys\"><h4 class=\"title\">热搜关键词</h4><a v-for=\"item in hotKeys\" v-text=\"item.tag_label\" @click=\"search(item.tag_label)\" class=\"item\"></a></div><div v-if=\"choiceToggle\" class=\"home-hot-keys\"><a @click=\"search(keywords, &quot;goods&quot;)\" class=\"search-item\"><span class=\"goods\"><em class=\"icon-s-goods\"></em></span><p>商品搜索</p></a><a @click=\"search(keywords, &quot;shop&quot;)\" class=\"search-item\"><span class=\"shop\"><em class=\"icon-s-store\"></em></span><p>商家搜索</p></a></div></div>";

/***/ },
/* 331 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper home-wrapper\"><search></search><swipe :page=\"&quot;home&quot;\" :height=\"&quot;49%&quot;\"></swipe><category></category><new-products></new-products><special-products></special-products><hot-products></hot-products><shop></shop><brand></brand><nav-bar></nav-bar></div>";

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(333)
	__vue_script__ = __webpack_require__(334)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\brand\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(335)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7c58627b/list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 333 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notFound = __webpack_require__(88);

	var _notFound2 = _interopRequireDefault(_notFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NotFound: _notFound2.default
	  },
	  data: function data() {
	    return {
	      items: [],
	      name: '',

	      page: 0,
	      pageCount: 0,
	      scrollToggle: false,
	      loadingEl: null,
	      scrollEl: null
	    };
	  },

	  methods: {
	    getBrandList: function getBrandList() {
	      var _this = this;

	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // 如果 type 存在说明执行的 submit事件, 需要将分页重置为 第一页
	      if (type) {
	        this.page = 0;
	        this.loadingEl = null;
	        self.document.body.scrollTop = 0;
	        // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
	        self.document.removeEventListener('scroll', this.next);
	      }
	      var body = {
	        api: 'brand',
	        method: 'get_brand_items',
	        brand_name: this.name,
	        page: this.page + 1,
	        pagesize: 20
	      };

	      self.DD.loading();
	      self.DD.get(body, function (data) {
	        _this.scrollToggle = true;
	        if (data.result === 'success') {
	          if (_this.loadingEl) {
	            _this.loadingEl.style.display = 'none';
	          }

	          // 如果为第一页，是清空数据，大于1则是追加数据
	          if (_this.page === 0) {
	            _this.items = data.info.items;
	          } else {
	            _this.items = _this.items.concat(data.info.items);
	          }
	          _this.page = +data.info.page;
	          _this.pageCount = +data.info.pageCount;

	          _this.loadingEl = self.document.createElement('div');
	          _this.loadingEl.className = 'next-loading';
	          _this.loadingEl.innerHTML = '努力加载中...';

	          if (_this.page != _this.pageCount) {
	            self.document.addEventListener('scroll', _this.next);
	          } else {
	            self.document.removeEventListener('scroll', _this.next);
	          }
	        } else {
	          self.toast(data.info.errmsg);
	        }
	      });
	    },
	    next: function next() {
	      var scrollHeight = self.document.body.scrollHeight;
	      var scrollTop = self.document.body.scrollTop;
	      if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
	        this.scrollToggle = false;
	        if (this.page < this.pageCount) {
	          this.scrollEl.appendChild(this.loadingEl);
	          this.loadingEl.style.display = 'block';
	          this.getBrandList();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.scrollEl = self.document.querySelector('.brand-list-warpper');
	    this.getBrandList();
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
	    self.document.removeEventListener('scroll', this.next);
	  }
	};
	// </script>
	// <style lang='sass'>
	//   @import '../../scss/variable';
	//   @import '../../scss/line';
	//   .brand-list-warpper {
	//     font-size: 0;
	//     padding-top: 50px;
	//     background-color: #fff;
	//     .search {
	//       position: fixed;
	//       left: 0;
	//       top: 0;
	//       z-index: 2;
	//       width: 100%;
	//       height: 50px;
	//       background-color: #fff;
	//       padding: 10px;
	//       box-sizing: border-box;
	//       font-size: 14px;
	//       @include borderBottom;
	//       .input {
	//         width: 100%;
	//         background-color: #e5e5e5;
	//         border-radius: 3px;
	//         padding: 5px 10px;
	//       }
	//     }
	//     .item {
	//       display: inline-block;
	//       position: relative;
	//       width: 33.33333333%;
	//       padding-top: 33.33333333%;
	//       @include borderRight;
	//       @include borderBottom;
	//       background-repeat: no-repeat;
	//       background-position: 50% 50%;
	//       -webkit-background-size: cover;
	//       background-size: cover;
	//       &:nth-child(3n) {
	//         &:before {
	//           display: none;
	//         }
	//       }
	//     }
	//   }
	// </style>
	//
	// <template lang='jade'>
	//   .wrapper.brand-list-warpper
	//     form.search(
	//       @submit.prevent='getBrandList(true)'
	//     )
	//       input.input(
	//         type="text",
	//         v-model='name',
	//         placeholder='搜索品牌'
	//       )
	//     .content(v-if='pageCount > 0')
	//       router-link.item(
	//         v-for='item in items',
	//         :to='{name: "goodsList", query: {brand_id: item.brand_id}}',
	//         :style='{backgroundImage: "url(" + item.brand_icon + ")"}'
	//       )
	//     not-found(v-else)
	//       p 未查询到相关数据!
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 335 */
/***/ function(module, exports) {

	module.exports = "<div class=\"wrapper brand-list-warpper\"><form @submit.prevent=\"getBrandList(true)\" class=\"search\"><input type=\"text\" v-model=\"name\" placeholder=\"搜索品牌\" class=\"input\"/></form><div v-if=\"pageCount &gt; 0\" class=\"content\"><router-link v-for=\"item in items\" :to=\"{name: &quot;goodsList&quot;, query: {brand_id: item.brand_id}}\" :style=\"{backgroundImage: &quot;url(&quot; + item.brand_icon + &quot;)&quot;}\" class=\"item\"></router-link></div><not-found v-else=\"v-else\"><p>未查询到相关数据!</p></not-found></div>";

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(337)
	__vue_template__ = __webpack_require__(338)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5e7c2c6f/404.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 337 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 338 */
/***/ function(module, exports) {

	module.exports = "<div class=\"not-found\"><div class=\"icon-not-found\"><span class=\"border\"><em class=\"line\"></em></span></div><p>没有找到相关页面！</p><p class=\"bakc-home\"><a href=\"/\">去首页>></a></p></div>";

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(340)
	__vue_script__ = __webpack_require__(341)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(342)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-68850ada/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 340 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _navBar = __webpack_require__(10);

	var _navBar2 = _interopRequireDefault(_navBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    NavBar: _navBar2.default
	  },
	  methods: {
	    init: function init() {
	      self.DD.loading();
	      switch (self.home.reviewStatus) {
	        case 'pending':
	          // 正在审核中...
	          this.$router.replace({
	            name: 'pending'
	          });
	          break;
	        case 'denied':
	          // 审核未通过
	          this.$router.replace({
	            name: 'unpass'
	          });
	          break;
	        case 'on_hold':
	          // 用户已注册，但是没有填写信息
	          this.$router.replace({
	            name: 'registerInfo'
	          });
	          break;
	        case '':
	          this.$router.replace({
	            name: 'login'
	          });
	          break;
	        default:
	          this.$router.replace({
	            name: 'home'
	          });
	      }
	    }
	  },
	  created: function created() {
	    this.init();
	  },
	  destroyed: function destroyed() {
	    self.DD.loading(false);
	  }
	};
	// </script>
	// <style lang='sass'>
	//
	// </style>
	//
	// <template lang='jade'>
	//   nav-bar
	// </template>
	//
	// <script lang='babel'>

/***/ },
/* 342 */
/***/ function(module, exports) {

	module.exports = "<nav-bar></nav-bar>";

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _carts = __webpack_require__(344);

	var _carts2 = _interopRequireDefault(_carts);

	var _shop = __webpack_require__(346);

	var _shop2 = _interopRequireDefault(_shop);

	var _goods = __webpack_require__(347);

	var _goods2 = _interopRequireDefault(_goods);

	var _order = __webpack_require__(348);

	var _order2 = _interopRequireDefault(_order);

	var _address = __webpack_require__(349);

	var _address2 = _interopRequireDefault(_address);

	var _coupon = __webpack_require__(350);

	var _coupon2 = _interopRequireDefault(_coupon);

	var _user = __webpack_require__(351);

	var _user2 = _interopRequireDefault(_user);

	var _common = __webpack_require__(352);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new Vuex.Store({
	  modules: {
	    carts: _carts2.default,
	    shop: _shop2.default,
	    goods: _goods2.default,
	    order: _order2.default,
	    address: _address2.default,
	    coupon: _coupon2.default,
	    user: _user2.default,
	    common: _common2.default
	  },
	  strict: true
	});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var state = {
	  count: 0,
	  cartsList: {
	    all_is_selected: 0,
	    selected_total_amount: 0,
	    cart_items: [],
	    be_settled: 0,
	    toast_msg: ''
	  }
	};

	var getters = {
	  cartsCount: function cartsCount(state) {
	    return state.count;
	  },
	  cartsItems: function cartsItems(state) {
	    return state.cartsList.cart_items;
	  },
	  allIsSelected: function allIsSelected(state) {
	    return state.cartsList.all_is_selected;
	  },
	  totalAmount: function totalAmount(state) {
	    return state.cartsList.selected_total_amount;
	  },
	  beSettled: function beSettled(state) {
	    return state.cartsList.be_settled;
	  },
	  toastMsg: function toastMsg(state) {
	    return state.cartsList.toast_msg;
	  }
	};

	var setCartsData = function setCartsData(_ref, data) {
	  var commit = _ref.commit,
	      state = _ref.state;

	  if (data.result === 'success') {
	    // 页面所需要的数据
	    // data.info为 null 说明购物车已经被清空了
	    var info = {};
	    var count = 0;
	    if (data.info) {
	      info = data.info;
	      count = +data.info.cart_goods_num;
	    }

	    commit(types.GET_CART_LIST, info);
	    commit(types.SET_CARTS_COUNT, count);
	  } else {
	    self.toast(data.info.errmsg);
	  }
	};

	var actions = {
	  /**
	   * 设置购物车商品数量
	   * @param {Number} count - 购物车商品总数.
	   */
	  setCartsCount: function setCartsCount(_ref2, count) {
	    var commit = _ref2.commit,
	        state = _ref2.state;

	    commit(types.SET_CARTS_COUNT, count);
	  },


	  /**
	   * 添加单个商品到购物车中
	   * @param {Object} vm - 当前商品相关的对象.
	   */
	  addToCarts: function addToCarts(_ref3, vm) {
	    var commit = _ref3.commit,
	        state = _ref3.state;

	    var body = _extends({}, apis.ADD_TO_CART);
	    if (vm.store_product_stock_qty && +vm.store_product_stock_qty === 0) {
	      self.toast('您来晚了，没有库存啦~');
	      return;
	    }

	    body.store_product_id = vm.store_product_id || vm.store_product_entity_id;
	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        // - 添加成后要同步更新购物车数量;
	        commit(types.SET_CARTS_COUNT, state.count + 1);
	        self.toast('添加成功!', {
	          time: 1000
	        });
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 获取购物车列表
	   */
	  getCartsList: function getCartsList(_ref4) {
	    var commit = _ref4.commit,
	        state = _ref4.state;

	    self.DD.loading();
	    self.DD.get(apis.GET_CART_LIST, function (data) {
	      setCartsData({ commit: commit, state: state }, data);
	    });
	  },


	  /**
	   * 购物车列表页操作(添加、减少、删除、选择、全选等)
	   * @param {Element} el
	   * @param {Number} type - 1: 全选,
	                            2: 店铺,
	                            3: 单个商品,
	                            4: 添加购物车,
	                            5: 减去购物车,
	                            6: 修改购物车数量
	                            7: 删除购物车
	   * @param {Object} vm - VUE实例对象
	   */
	  optionsCart: function optionsCart(_ref5) {
	    var commit = _ref5.commit,
	        state = _ref5.state;

	    var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        el = _ref6.el,
	        _ref6$type = _ref6.type,
	        type = _ref6$type === undefined ? 1 : _ref6$type,
	        vm = _ref6.vm;

	    var body = _extends({}, apis.OPTIONS_CART);
	    // store_product_ids 是一个对象按引用传递，所以每次请求前要将先前的值手动清空;
	    body.store_product_ids = [];
	    if (el.classList.contains('active')) {
	      body.type = 0;
	    } else {
	      body.type = 1;
	    }

	    switch (type) {
	      case 1:
	        body.all = 1;
	        break;
	      case 2:
	        body.all = 0;
	        vm.map(function (item) {
	          body.store_product_ids.push(item.store_product_id);
	        });
	        break;
	      case 3:
	        body.all = 0;
	        body.store_product_ids.push(vm.store_product_id);
	        break;
	      case 4:
	      case 5:
	      case 6:
	        delete body.store_product_ids;
	        body.method = 'set_cart_item';
	        body.store_product_id = vm.store_product_id;
	        if (type === 4) {
	          body.qty = +vm.qty + 1;
	        } else if (type === 5) {
	          body.qty = +vm.qty - 1;
	        } else {
	          body.qty = +el.value;
	        }
	        // 如果 qty 为 0 则不做任何操作
	        if (!body.qty) {
	          return;
	        }
	        break;
	      default:
	        delete body.store_product_ids;
	        el.previousElementSibling.style.webkitTransform = 'translateX(0px)';
	        el.previousElementSibling.style.transform = 'translateX(0px)';
	        body.method = 'remove_cart_item';
	        body.store_product_id = vm.store_product_id;
	    }

	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      setCartsData({ commit: commit, state: state }, data);
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.SET_CARTS_COUNT, function (state, count) {
	  state.count = count;
	}), _defineProperty(_mutations, types.GET_CART_LIST, function (state, payload) {
	  state.cartsList.all_is_selected = payload.all_is_selected;
	  state.cartsList.selected_total_amount = payload.selected_total_amount;
	  state.cartsList.cart_items = payload.cart_items || [];
	  state.cartsList.be_settled = payload.be_settled;
	  state.cartsList.toast_msg = payload.toast_msg;
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 345 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SET_CARTS_COUNT = exports.SET_CARTS_COUNT = 'SET_CARTS_COUNT';
	var GET_CART_LIST = exports.GET_CART_LIST = 'GET_CART_LIST';
	var OPTIONS_CART = exports.OPTIONS_CART = 'OPTIONS_CART';
	var GET_SHOP_INFO = exports.GET_SHOP_INFO = 'GET_SHOP_INFO';
	var TOGGLE_COLLECTION_GOODS = exports.TOGGLE_COLLECTION_GOODS = 'TOGGLE_COLLECTION_GOODS';
	var ACTIVE_COLLECTION_GOODS = exports.ACTIVE_COLLECTION_GOODS = 'ACTIVE_COLLECTION_GOODS';
	var REMOVE_COLLECTION_GOODS = exports.REMOVE_COLLECTION_GOODS = 'REMOVE_COLLECTION_GOODS';
	var GET_COLLECTION_GOODS = exports.GET_COLLECTION_GOODS = 'GET_COLLECTION_GOODS';
	var GET_FILTER_GOODS = exports.GET_FILTER_GOODS = 'GET_FILTER_GOODS';
	var TOGGLE_FILTER_CATEGORY = exports.TOGGLE_FILTER_CATEGORY = 'TOGGLE_FILTER_CATEGORY';
	var TOGGLE_FILTER_BRAND = exports.TOGGLE_FILTER_BRAND = 'TOGGLE_FILTER_BRAND';
	var TOGGLE_FILTER_ATTR = exports.TOGGLE_FILTER_ATTR = 'TOGGLE_FILTER_ATTR';
	var TOGGLE_COLLECTION_SHOP = exports.TOGGLE_COLLECTION_SHOP = 'TOGGLE_COLLECTION_SHOP';
	var GET_COLLECTION_SHOP = exports.GET_COLLECTION_SHOP = 'GET_COLLECTION_SHOP';
	var REMOVE_COLLECTION_SHOP = exports.REMOVE_COLLECTION_SHOP = 'REMOVE_COLLECTION_SHOP';
	var SET_ORDER_PAY = exports.SET_ORDER_PAY = 'SET_ORDER_PAY';
	var GET_REFUND_REASON = exports.GET_REFUND_REASON = 'GET_REFUND_REASON';
	var SUBMIT_REFUND = exports.SUBMIT_REFUND = 'SUBMIT_REFUND';
	var APPLY_COMPENSATION = exports.APPLY_COMPENSATION = 'APPLY_COMPENSATION';
	var CANCEL_ORDER = exports.CANCEL_ORDER = 'CANCEL_ORDER';
	var GET_ON_LINE_ORDER = exports.GET_ON_LINE_ORDER = 'GET_ON_LINE_ORDER';
	var GET_ADDRESS_LIST = exports.GET_ADDRESS_LIST = 'GET_ADDRESS_LIST';
	var GET_REGION_LIST = exports.GET_REGION_LIST = 'GET_REGION_LIST';
	var DELETE_ITEM_ADDRESS = exports.DELETE_ITEM_ADDRESS = 'DELETE_ITEM_ADDRESS';
	var SET_DEFAULT_ADDRESS = exports.SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS';
	var GET_MY_COUPON_LIST = exports.GET_MY_COUPON_LIST = 'GET_MY_COUPON_LIST';
	var ADD_COUPON = exports.ADD_COUPON = 'ADD_COUPON';
	var GET_USER_INFO = exports.GET_USER_INFO = 'GET_USER_INFO';
	var UPDATE_USER_INFO = exports.UPDATE_USER_INFO = 'UPDATE_USER_INFO';
	var SET_USER_HEAD_IMG = exports.SET_USER_HEAD_IMG = 'SET_USER_HEAD_IMG';

	var MODAL = exports.MODAL = 'MODAL';
	var MODAL_HIDE = exports.MODAL_HIDE = 'MODAL_HIDE';

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var state = {
	  shopInfo: {
	    banner: '',
	    logo: ''
	  },
	  shopCollectionList: []
	};
	var getters = {
	  shopBanner: function shopBanner(state) {
	    return state.shopInfo.banner;
	  },
	  shopLogo: function shopLogo(state) {
	    return state.shopInfo.logo;
	  },
	  shopName: function shopName(state) {
	    return state.shopInfo.store_name;
	  },
	  shopPriceTips: function shopPriceTips(state) {
	    return state.shopInfo.starting_price_tips;
	  },
	  shopCollection: function shopCollection(state) {
	    return state.shopInfo.is_collection;
	  },
	  shopGoodsCategory: function shopGoodsCategory(state) {
	    return state.shopInfo.operation_category;
	  },
	  shopIntroUrl: function shopIntroUrl(state) {
	    return state.shopInfo.intro_url;
	  },
	  shopTel: function shopTel(state) {
	    return state.shopInfo.company_phone;
	  },

	  shopCollectionList: function shopCollectionList(state) {
	    return state.shopCollectionList;
	  }
	};

	var actions = {
	  /**
	   * 获取店铺详细信息
	   * @param {Number} id - 店铺ID.
	   */
	  getShopInfo: function getShopInfo(_ref, id) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var body = _extends({}, apis.GET_SHOP_INFO);
	    body.store_id = id;
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        commit(types.GET_SHOP_INFO, data.info);
	        //  this.setActiveShopInfo(data.info)
	        self.DD.setTitle(data.info.store_name);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 店铺收藏与取消收藏
	   * @param {Number} id - 店铺ID.
	   * @param {Number} status - 1=>已收藏，0=>未收藏
	   * @param {Number} type - 1=>店铺详情页，2=>个人店铺收藏列表页.
	   * @param {Number} index - 在店铺收藏列表中, 操作的当前店铺在整个数组中的索引
	   */
	  toggleCollectionShop: function toggleCollectionShop(_ref2) {
	    var commit = _ref2.commit,
	        state = _ref2.state;

	    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        id = _ref3.id,
	        _ref3$status = _ref3.status,
	        status = _ref3$status === undefined ? 1 : _ref3$status,
	        _ref3$type = _ref3.type,
	        type = _ref3$type === undefined ? 2 : _ref3$type,
	        _ref3$index = _ref3.index,
	        index = _ref3$index === undefined ? 0 : _ref3$index;

	    var body = _extends({}, apis.TOGGLE_COLLECTION_SHOP);
	    body.store_id = id;
	    if (type === 1) {
	      body.method = status ? 'remove_store_wish' : 'add_store_wish';
	    }
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        var tips = '店铺取消收藏成功~';
	        if (type === 1) {
	          commit(types.TOGGLE_COLLECTION_SHOP);
	          if (status === 0) {
	            tips = '店铺收藏成功~';
	          }
	        } else {
	          commit(types.REMOVE_COLLECTION_SHOP, index);
	        }
	        self.toast(tips);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 获取收藏的店铺列表
	   */
	  getCollectionShop: function getCollectionShop(_ref4, vm) {
	    var commit = _ref4.commit,
	        state = _ref4.state;

	    var body = _extends({}, apis.GET_COLLECTION_SHOP);
	    body.page = vm.page + 1;
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      vm.scrollToggle = true;
	      if (data.result === 'success') {
	        //  commit(types.GET_COLLECTION_SHOP, data.info.items);
	        if (vm.loadingEl) {
	          vm.loadingEl.style.display = 'none';
	        }
	        // 如果为第一页，是清空数据，大于1则是追加数据
	        var append = false;
	        if (vm.page > 0) {
	          append = true;
	        }
	        commit(types.GET_COLLECTION_SHOP, {
	          append: append,
	          items: data.info.items
	        });

	        vm.page = data.info.page;
	        vm.pageCount = data.info.pageCount;

	        vm.loadingEl = self.document.createElement('div');
	        vm.loadingEl.className = 'next-loading';
	        vm.loadingEl.innerHTML = '努力加载中...';

	        if (vm.page != vm.pageCount) {
	          self.document.addEventListener('scroll', vm.next);
	        } else {
	          self.document.removeEventListener('scroll', vm.next);
	        }
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.GET_SHOP_INFO, function (state, payload) {
	  state.shopInfo = _extends({}, payload);
	}), _defineProperty(_mutations, types.TOGGLE_COLLECTION_SHOP, function (state) {
	  state.shopInfo.is_collection = +!state.shopInfo.is_collection;
	}), _defineProperty(_mutations, types.GET_COLLECTION_SHOP, function (state) {
	  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref5$append = _ref5.append,
	      append = _ref5$append === undefined ? false : _ref5$append,
	      _ref5$items = _ref5.items,
	      items = _ref5$items === undefined ? [] : _ref5$items;

	  if (append) {
	    var _state$shopCollection;

	    (_state$shopCollection = state.shopCollectionList).push.apply(_state$shopCollection, _toConsumableArray(items));
	  } else {
	    state.shopCollectionList = items;
	  }
	}), _defineProperty(_mutations, types.REMOVE_COLLECTION_SHOP, function (state, index) {
	  state.shopCollectionList.splice(index, 1);
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var state = {
	  collection: {
	    goodsCollectionList: [],
	    goodsCollectionToastToggle: false,
	    activeGoodsCollection: {},
	    activeIndex: -1
	  },
	  filter: {
	    category: [],
	    brand: {},
	    attributes: {},
	    currentId: 0,
	    brandId: 0,
	    attr: {}
	  }
	};
	var getters = {
	  goodsCollectionList: function goodsCollectionList(state) {
	    return state.collection.goodsCollectionList;
	  },
	  goodsCollectionToastToggle: function goodsCollectionToastToggle(state) {
	    return state.collection.goodsCollectionToastToggle;
	  },
	  activeGoodsCollection: function activeGoodsCollection(state) {
	    return state.collection.activeGoodsCollection;
	  },
	  filterCategory: function filterCategory(state) {
	    return state.filter.category;
	  },
	  filterBrand: function filterBrand(state) {
	    return state.filter.brand;
	  },
	  filterAttributes: function filterAttributes(state) {
	    return state.filter.attributes;
	  },
	  filterCurrentId: function filterCurrentId(state) {
	    return state.filter.currentId;
	  },
	  filterBrandId: function filterBrandId(state) {
	    return state.filter.brandId;
	  },
	  filterAttr: function filterAttr(state) {
	    return state.filter.attr;
	  }
	};

	var actions = {
	  /**
	   * 商品筛选
	   */
	  getFilterGoods: function getFilterGoods(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var body = _extends({}, apis.GET_FILTER_GOODS);
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        (function () {
	          var payload = {
	            category: [],
	            brand: {},
	            attributes: {},
	            currentId: {}
	          };
	          data.info.map(function (items) {
	            var brand = [];
	            payload.category.push({
	              category_label: items.category_label,
	              entity_id: items.entity_id
	            });
	            items.brand.map(function (item) {
	              item.checked = false;
	            });
	            items.attributes.map(function (item) {
	              item.values.map(function (attr) {
	                attr.checked = false;
	              });
	            });
	            payload.brand[items.entity_id] = items.brand;
	            payload.attributes[items.entity_id] = items.attributes;
	          });

	          payload.currentId = payload.category[0].entity_id;
	          commit(types.GET_FILTER_GOODS, payload);
	        })();
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },

	  /**
	   * 设置当前分类的ID
	   */
	  toggleFilterCategory: function toggleFilterCategory(_ref2, id) {
	    var commit = _ref2.commit,
	        state = _ref2.state;

	    commit(types.TOGGLE_FILTER_CATEGORY, id);
	  },
	  toggleFilterBrand: function toggleFilterBrand(_ref3, index) {
	    var commit = _ref3.commit,
	        state = _ref3.state;

	    commit(types.TOGGLE_FILTER_BRAND, index);
	  },
	  toggleFilterAttr: function toggleFilterAttr(_ref4) {
	    var commit = _ref4.commit,
	        state = _ref4.state;

	    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref5$parentId = _ref5.parentId,
	        parentId = _ref5$parentId === undefined ? 0 : _ref5$parentId,
	        _ref5$activeIndex = _ref5.activeIndex,
	        activeIndex = _ref5$activeIndex === undefined ? -1 : _ref5$activeIndex;

	    commit(types.TOGGLE_FILTER_ATTR, {
	      parentId: parentId,
	      activeIndex: activeIndex
	    });
	  },

	  /**
	   * 商品收藏与取消收藏
	   * @param {Number} id - 商品ID.
	   * @param {Number} status - 1=>已收藏，0=>未收藏
	   * @param {Number} type - 1=>商品详情页，2=>个人商品收藏列表页.
	   */
	  toggleCollectionGoods: function toggleCollectionGoods(_ref6) {
	    var commit = _ref6.commit,
	        state = _ref6.state;

	    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        id = _ref7.id,
	        _ref7$status = _ref7.status,
	        status = _ref7$status === undefined ? 1 : _ref7$status,
	        _ref7$type = _ref7.type,
	        type = _ref7$type === undefined ? 2 : _ref7$type,
	        callback = _ref7.callback;

	    var body = _extends({}, apis.TOGGLE_COLLECTION_GOODS);
	    var index = state.collection.activeIndex;
	    body.store_product_id = id;
	    if (type === 1) {
	      body.method = status ? 'remove_wisth_store_product' : 'add_wish_store_product';
	    }

	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        var tips = '商品取消收藏成功~';
	        if (type === 1) {
	          callback();
	          if (status === 0) {
	            tips = '商品收藏成功~';
	          }
	        } else {
	          // type === 2时为个人收藏的商品列表页
	          // 只要触发这个方法，就一定有 activeIndex 值，并且遮罩一定是显示的
	          // 所以这里要隐藏遮罩，并且从收藏列表中移除当前的
	          commit(types.REMOVE_COLLECTION_GOODS, index);
	          commit(types.ACTIVE_COLLECTION_GOODS);
	        }
	        self.toast(tips);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 获取收藏的商品列表
	   */
	  getCollctionGoods: function getCollctionGoods(_ref8, vm) {
	    var commit = _ref8.commit;

	    var body = _extends({}, apis.GET_COLLECTION_GOODS);
	    body.page = vm.page + 1;
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      vm.scrollToggle = true;
	      if (data.result === 'success') {
	        if (vm.loadingEl) {
	          vm.loadingEl.style.display = 'none';
	        }
	        // 如果为第一页，是清空数据，大于1则是追加数据
	        var append = false;
	        if (vm.page > 0) {
	          append = true;
	        }
	        commit(types.GET_COLLECTION_GOODS, {
	          append: append,
	          items: data.info.items
	        });

	        vm.page = data.info.page;
	        vm.pageCount = data.info.pageCount;

	        vm.loadingEl = self.document.createElement('div');
	        vm.loadingEl.className = 'next-loading';
	        vm.loadingEl.innerHTML = '努力加载中...';

	        if (vm.page != vm.pageCount) {
	          self.document.addEventListener('scroll', vm.next);
	        } else {
	          self.document.removeEventListener('scroll', vm.next);
	        }
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 当前收藏的商品
	   */
	  activeCollectionGoods: function activeCollectionGoods(_ref9) {
	    var commit = _ref9.commit;

	    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref10$vm = _ref10.vm,
	        vm = _ref10$vm === undefined ? {} : _ref10$vm,
	        _ref10$index = _ref10.index,
	        index = _ref10$index === undefined ? -1 : _ref10$index;

	    commit(types.ACTIVE_COLLECTION_GOODS, {
	      vm: vm,
	      index: index
	    });
	  },


	  /**
	   * 获取商品列表
	   * @param {Object} options - 各种筛选条件
	   * @param {Object} options.attribute - 属性条件，在商品分类页用得到
	   * @param {Number} options.brand_id - 品牌id
	   * @param {Number} options.category_id - 分类id
	   * @param {Boolean} [options.is_list = 0] - 默认0 此值用于sql优化，当列表页使用时请传1,否则keywords和attribute将失效
	   * @param {Number} options.is_top - 是否置顶（用于首页显示，当传此值后，配合type条件首页使用）
	   * @param {String} options.keywords - 关键字搜索
	   * @param {Number} options.max_price - 价格区间搜索 最大价格
	   * @param {Number} options.min_price - 价格区间搜索 最小价格
	   * @param {Array} options.not_store_product_id - 排除的店铺商品id;
	   * @param {String} [options.order = 'updated_at'] - 排序字段，取值: 更新时间 -> 'updated_at' OR 价格 -> 'final_price' OR 销量 -> 'sell_num'
	   * @param {String} [options.order_type = 'desc'] - 排序类型，'desc' OR 'asc'
	   * @param {Number} [options.page = 1] - 显示的页码
	   * @param {Number} [options.pagesize = 10] - 每页显示的条数
	   * @param {String} options.sku - 提供给app条码扫描使用
	   * @param {Number} options.store_id - 卖家id 非必填（用于指定店铺显示）
	   * @param {String} options.type - 定值，特价 -> 'special_offer' OR 推荐 -> 'hot' 新品 -> 'new'
	   * @param {Function} callback - 成功执行的回调.
	   */
	  getGoodsList: function getGoodsList(_ref11) {
	    var commit = _ref11.commit;

	    var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref12$attribute = _ref12.attribute,
	        attribute = _ref12$attribute === undefined ? [] : _ref12$attribute,
	        _ref12$brand_id = _ref12.brand_id,
	        brand_id = _ref12$brand_id === undefined ? '' : _ref12$brand_id,
	        _ref12$category_id = _ref12.category_id,
	        category_id = _ref12$category_id === undefined ? '' : _ref12$category_id,
	        _ref12$is_list = _ref12.is_list,
	        is_list = _ref12$is_list === undefined ? 1 : _ref12$is_list,
	        _ref12$is_top = _ref12.is_top,
	        is_top = _ref12$is_top === undefined ? '' : _ref12$is_top,
	        _ref12$keywords = _ref12.keywords,
	        keywords = _ref12$keywords === undefined ? '' : _ref12$keywords,
	        _ref12$max_price = _ref12.max_price,
	        max_price = _ref12$max_price === undefined ? '' : _ref12$max_price,
	        _ref12$min_price = _ref12.min_price,
	        min_price = _ref12$min_price === undefined ? '' : _ref12$min_price,
	        _ref12$not_store_prod = _ref12.not_store_product_id,
	        not_store_product_id = _ref12$not_store_prod === undefined ? '' : _ref12$not_store_prod,
	        _ref12$order = _ref12.order,
	        order = _ref12$order === undefined ? '' : _ref12$order,
	        _ref12$order_type = _ref12.order_type,
	        order_type = _ref12$order_type === undefined ? '' : _ref12$order_type,
	        _ref12$page = _ref12.page,
	        page = _ref12$page === undefined ? 1 : _ref12$page,
	        _ref12$pagesize = _ref12.pagesize,
	        pagesize = _ref12$pagesize === undefined ? 10 : _ref12$pagesize,
	        _ref12$sku = _ref12.sku,
	        sku = _ref12$sku === undefined ? '' : _ref12$sku,
	        _ref12$store_id = _ref12.store_id,
	        store_id = _ref12$store_id === undefined ? '' : _ref12$store_id,
	        _ref12$type = _ref12.type,
	        type = _ref12$type === undefined ? '' : _ref12$type,
	        _ref12$callback = _ref12.callback,
	        callback = _ref12$callback === undefined ? '' : _ref12$callback;

	    var body = {
	      api: 'store_product',
	      method: 'get_product',
	      attribute: attribute,
	      brand_id: brand_id,
	      category_id: category_id,
	      is_list: is_list,
	      is_top: is_top,
	      keywords: keywords,
	      max_price: max_price,
	      min_price: min_price,
	      not_store_product_id: not_store_product_id,
	      order: order,
	      order_type: order_type,
	      page: page,
	      pagesize: pagesize,
	      sku: sku,
	      store_id: store_id,
	      type: type
	    };

	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success' && typeof callback === 'function') {
	        callback(data.info);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.GET_FILTER_GOODS, function (state, payload) {
	  state.filter.category = payload.category;
	  state.filter.brand = payload.brand;
	  state.filter.attributes = payload.attributes;
	  state.filter.currentId = payload.currentId;
	}), _defineProperty(_mutations, types.TOGGLE_FILTER_CATEGORY, function (state, id) {
	  state.filter.currentId = id;
	  state.filter.brandId = 0;
	  state.filter.attr = {};
	}), _defineProperty(_mutations, types.TOGGLE_FILTER_BRAND, function (state, activeIndex) {
	  var brand = state.filter.brand;
	  var categoryId = state.filter.currentId;
	  brand[categoryId].map(function (item, index) {
	    if (activeIndex === index) {
	      if (item.checked) {
	        item.checked = false;
	        state.filter.brandId = 0;
	      } else {
	        item.checked = true;
	        state.filter.brandId = item.brand_id;
	      }
	    } else {
	      item.checked = false;
	    }
	  });
	}), _defineProperty(_mutations, types.TOGGLE_FILTER_ATTR, function (state) {
	  var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref13$parentId = _ref13.parentId,
	      parentId = _ref13$parentId === undefined ? 0 : _ref13$parentId,
	      _ref13$activeIndex = _ref13.activeIndex,
	      activeIndex = _ref13$activeIndex === undefined ? -1 : _ref13$activeIndex;

	  var attributes = state.filter.attributes;
	  var categoryId = state.filter.currentId;
	  var attr = state.filter.attr;
	  attributes[categoryId].map(function (items) {
	    if (items.attribute_id === parentId) {
	      items.values.map(function (item, index) {
	        if (activeIndex === index) {
	          if (item.checked) {
	            item.checked = false;
	            delete state.filter.attr[parentId];
	          } else {
	            item.checked = true;
	            state.filter.attr[parentId] = item.k;
	          }
	        } else {
	          item.checked = false;
	        }
	      });
	    }
	  });
	}), _defineProperty(_mutations, types.ACTIVE_COLLECTION_GOODS, function (state) {
	  var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref14$vm = _ref14.vm,
	      vm = _ref14$vm === undefined ? {} : _ref14$vm,
	      _ref14$index = _ref14.index,
	      index = _ref14$index === undefined ? -1 : _ref14$index;

	  state.collection.activeGoodsCollection = vm;
	  state.collection.activeIndex = index;
	  state.collection.goodsCollectionToastToggle = !state.collection.goodsCollectionToastToggle;
	}), _defineProperty(_mutations, types.GET_COLLECTION_GOODS, function (state) {
	  var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref15$append = _ref15.append,
	      append = _ref15$append === undefined ? false : _ref15$append,
	      _ref15$items = _ref15.items,
	      items = _ref15$items === undefined ? [] : _ref15$items;

	  if (append) {
	    var _state$collection$goo;

	    (_state$collection$goo = state.collection.goodsCollectionList).push.apply(_state$collection$goo, _toConsumableArray(items));
	  } else {
	    state.collection.goodsCollectionList = items;
	  }
	}), _defineProperty(_mutations, types.REMOVE_COLLECTION_GOODS, function (state, index) {
	  state.collection.goodsCollectionList.splice(index, 1);
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var state = {
	  pay: {
	    price: 0,
	    count: 0
	  },
	  refund: {
	    items: [],
	    toggle: false
	  }
	};

	var getters = {
	  payPrice: function payPrice(state) {
	    return state.pay.price;
	  },
	  payCount: function payCount(state) {
	    return state.pay.count;
	  },
	  refundItems: function refundItems(state) {
	    return state.refund.items;
	  },
	  refundToggle: function refundToggle(state) {
	    return state.refund.toggle;
	  }
	};

	var actions = {
	  /**
	   * 确认收货
	   * @param {Number} id - 订单ID
	   */
	  confirmReceipt: function confirmReceipt(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref2$id = _ref2.id,
	        id = _ref2$id === undefined ? 0 : _ref2$id;

	    var body = _extends({}, apis.CONFIRM_RECEIPT);
	    body.id = id;
	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('操作成功', {
	          callback: function callback() {
	            self.location.reload();
	          }
	        });
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 申请退货, 获取退货原因
	   */
	  getRefundReason: function getRefundReason(_ref3) {
	    var commit = _ref3.commit,
	        state = _ref3.state;

	    var body = _extends({}, apis.GET_REFUND_REASON);
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        commit('GET_REFUND_REASON', data.info);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 提交退货申请
	   */
	  submitRefund: function submitRefund(_ref4) {
	    var commit = _ref4.commit,
	        state = _ref4.state;

	    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref5$id = _ref5.id,
	        id = _ref5$id === undefined ? 0 : _ref5$id,
	        _ref5$comment = _ref5.comment,
	        comment = _ref5$comment === undefined ? '' : _ref5$comment,
	        _ref5$reasonId = _ref5.reasonId,
	        reasonId = _ref5$reasonId === undefined ? 0 : _ref5$reasonId;

	    var body = _extends({}, apis.SUBMIT_REFUND);
	    body.id = id;
	    body.comment = comment;
	    body.reason_id = reasonId;
	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('申请成功', {
	          callback: function callback() {
	            self.location.reload();
	          }
	        });
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 假货先赔
	   * @param {Number} id - 订单ID
	   */
	  applyCompensation: function applyCompensation(_ref6) {
	    var commit = _ref6.commit,
	        state = _ref6.state;

	    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref7$id = _ref7.id,
	        id = _ref7$id === undefined ? 0 : _ref7$id;

	    var body = _extends({}, apis.APPLY_COMPENSATION);
	    body.id = id;
	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('操作成功');
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 取消订单
	   * @param {Number} id - 订单ID
	   */
	  cancelOrder: function cancelOrder(_ref8) {
	    var commit = _ref8.commit,
	        state = _ref8.state;

	    var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref9$id = _ref9.id,
	        id = _ref9$id === undefined ? 0 : _ref9$id;

	    var body = _extends({}, apis.CANCEL_ORDER);
	    body.id = id;
	    self.DD.loading();
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('订单取消成功！', {
	          callback: function callback() {
	            self.location.reload();
	          }
	        });
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 设置去支付的订单总金额及数量
	   */
	  setOrderPay: function setOrderPay(_ref10) {
	    var commit = _ref10.commit,
	        state = _ref10.state;

	    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref11$price = _ref11.price,
	        price = _ref11$price === undefined ? 0 : _ref11$price,
	        _ref11$count = _ref11.count,
	        count = _ref11$count === undefined ? 0 : _ref11$count;

	    commit(types.SET_ORDER_PAY, {
	      price: price,
	      count: count
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.SET_ORDER_PAY, function (state, payload) {
	  state.pay.price = payload.price;
	  state.pay.count = payload.count;
	}), _defineProperty(_mutations, types.GET_REFUND_REASON, function (state, reasons) {
	  state.refund.items = reasons;
	  state.refund.toggle = true;
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var state = {
	  addressList: [],
	  regions: []
	};

	var getters = {
	  addressList: function addressList(state) {
	    return state.addressList;
	  },
	  addressRegions: function addressRegions(state) {
	    return state.regions;
	  }
	};

	var actions = {
	  /**
	   * 获取地址列表
	   */
	  getAddressList: function getAddressList(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var body = _extends({}, apis.GET_ADDRESS_LIST);
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        commit(types.GET_ADDRESS_LIST, data.info);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 删除一条地址
	   */
	  deleteItemAddress: function deleteItemAddress(_ref2) {
	    var commit = _ref2.commit,
	        state = _ref2.state;

	    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref3$id = _ref3.id,
	        id = _ref3$id === undefined ? 0 : _ref3$id,
	        _ref3$index = _ref3.index,
	        index = _ref3$index === undefined ? -1 : _ref3$index,
	        _ref3$isDefault = _ref3.isDefault,
	        isDefault = _ref3$isDefault === undefined ? 0 : _ref3$isDefault;

	    if (+isDefault) {
	      self.toast('默认地址不能删除的哟~');
	      return;
	    } else if (state.addressList.length === 1) {
	      self.toast('至少要保留一条收货地址哟~');
	      return;
	    }
	    var body = _extends({}, apis.DELETE_ITEM_ADDRESS);
	    body.id = id;
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('删除成功!');
	        commit(types.DELETE_ITEM_ADDRESS, index);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 设为默认地址
	   */
	  setDefaultAddress: function setDefaultAddress(_ref4, _ref5) {
	    var commit = _ref4.commit,
	        state = _ref4.state;
	    var _ref5$id = _ref5.id,
	        id = _ref5$id === undefined ? 0 : _ref5$id,
	        _ref5$isDefault = _ref5.isDefault,
	        isDefault = _ref5$isDefault === undefined ? 0 : _ref5$isDefault,
	        _ref5$index = _ref5.index,
	        index = _ref5$index === undefined ? -1 : _ref5$index;

	    if (+isDefault) return;
	    var body = _extends({}, apis.SET_DEFAULT_ADDRESS);
	    body.id = id;
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        self.toast('设置成功!');
	        commit(types.SET_DEFAULT_ADDRESS, index);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 获取省市区
	   */
	  getRegionList: function getRegionList(_ref6) {
	    var commit = _ref6.commit,
	        state = _ref6.state;

	    var storageRegions = self.JSON.parse(self.localStorage.getItem('regions'));
	    if (storageRegions) {
	      commit(types.GET_REGION_LIST, storageRegions);
	      return;
	    }
	    var body = _extends({}, apis.GET_REGION_LIST);
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        commit(types.GET_REGION_LIST, data.info);
	        self.localStorage.setItem('regions', self.JSON.stringify(data.info));
	      }
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.GET_ADDRESS_LIST, function (state, list) {
	  state.addressList = list;
	}), _defineProperty(_mutations, types.GET_REGION_LIST, function (state, list) {
	  state.regions = list;
	}), _defineProperty(_mutations, types.DELETE_ITEM_ADDRESS, function (state, index) {
	  state.addressList.splice(index, 1);
	}), _defineProperty(_mutations, types.SET_DEFAULT_ADDRESS, function (state, setIndex) {
	  state.addressList.map(function (item, index) {
	    if (index === setIndex) {
	      item.is_default = 1;
	    } else {
	      item.is_default = 0;
	    }
	  });
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var state = {
	  myCoupon: {
	    type: 0,
	    list: [],
	    unusedNum: 0,
	    usedNum: 0,
	    expiredNum: 0
	  }
	};

	var getters = {
	  couponType: function couponType(state) {
	    return state.myCoupon.type;
	  },
	  couponList: function couponList(state) {
	    return state.myCoupon.list;
	  },
	  couponUnusedNum: function couponUnusedNum(state) {
	    return state.myCoupon.unusedNum;
	  },
	  couponUsedNum: function couponUsedNum(state) {
	    return state.myCoupon.usedNum;
	  },
	  couponExpiredNum: function couponExpiredNum(state) {
	    return state.myCoupon.expiredNum;
	  }
	};

	var actions = {
	  /**
	   * 获取我的优惠券列表
	   */
	  getMyCouponList: function getMyCouponList(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref2$eventType = _ref2.eventType,
	        eventType = _ref2$eventType === undefined ? '' : _ref2$eventType,
	        _ref2$type = _ref2.type,
	        type = _ref2$type === undefined ? 0 : _ref2$type,
	        _ref2$vm = _ref2.vm,
	        vm = _ref2$vm === undefined ? {} : _ref2$vm;

	    if (eventType === 'click' && type === state.myCoupon.type) return;
	    var body = _extends({}, apis.GET_MY_COUPON_LIST);
	    body.page = vm.page + 1;
	    body.type = type || state.myCoupon.type;
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      vm.scrollToggle = true;
	      if (data.result === 'success') {
	        if (vm.loadingEl) {
	          vm.loadingEl.style.display = 'none';
	        }
	        // 如果为第一页，是清空数据，大于1则是追加数据
	        var append = false;
	        if (vm.page > 0) {
	          append = true;
	        }
	        // commit(types.GET_COLLECTION_GOODS, {
	        //   append,
	        //   items: data.info.items
	        // });
	        commit(types.GET_MY_COUPON_LIST, {
	          append: append,
	          type: type,
	          data: data.info
	        });

	        vm.page = data.info.page;
	        vm.pageCount = data.info.pageCount;

	        vm.loadingEl = self.document.createElement('div');
	        vm.loadingEl.className = 'next-loading';
	        vm.loadingEl.innerHTML = '努力加载中...';

	        if (vm.page != vm.pageCount) {
	          self.document.addEventListener('scroll', vm.next);
	        } else {
	          self.document.removeEventListener('scroll', vm.next);
	        }
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 添加优惠券
	   */
	  addCoupon: function addCoupon(_ref3) {
	    var commit = _ref3.commit,
	        state = _ref3.state;

	    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref4$sn = _ref4.sn,
	        sn = _ref4$sn === undefined ? '' : _ref4$sn,
	        _ref4$from = _ref4.from,
	        from = _ref4$from === undefined ? '' : _ref4$from,
	        _ref4$productInfo = _ref4.productInfo,
	        productInfo = _ref4$productInfo === undefined ? {} : _ref4$productInfo,
	        _ref4$callback = _ref4.callback,
	        callback = _ref4$callback === undefined ? '' : _ref4$callback;

	    var body = _extends({}, apis.ADD_COUPON);
	    body.coupon_sn = sn;

	    if (from === 'confirm') {
	      body.type = 1;
	      body.product_info = self.encodeURIComponent(self.JSON.stringify(productInfo));
	    }
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        if (from === 'confirm') {
	          callback();
	        } else {
	          self.toast('绑定成功');
	          commit(types.ADD_COUPON, data.info);
	        }
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.GET_MY_COUPON_LIST, function (state) {
	  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref5$append = _ref5.append,
	      append = _ref5$append === undefined ? false : _ref5$append,
	      _ref5$data = _ref5.data,
	      data = _ref5$data === undefined ? {} : _ref5$data,
	      _ref5$type = _ref5.type,
	      type = _ref5$type === undefined ? 0 : _ref5$type;

	  if (append) {
	    var _state$myCoupon$list;

	    (_state$myCoupon$list = state.myCoupon.list).push.apply(_state$myCoupon$list, _toConsumableArray(data.items));
	  } else {
	    state.myCoupon.type = type;
	    state.myCoupon.list = data.items || [];
	    state.myCoupon.unusedNum = +data.unused_coupon_num;
	    state.myCoupon.usedNum = +data.used_coupon_num;
	    state.myCoupon.expiredNum = +data.expired_coupon_num;
	  }
	}), _defineProperty(_mutations, types.ADD_COUPON, function (state, item) {
	  state.myCoupon.unusedNum += 1;
	  if (state.myCoupon.type === 1) {
	    state.myCoupon.list.unshift(item);
	  }
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	var _apis = __webpack_require__(18);

	var apis = _interopRequireWildcard(_apis);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var state = {
	  info: {
	    business_license_image: '',
	    identity_card_1_image: '',
	    identity_card_2_image: ''
	  }
	};

	var getters = {
	  userInfo: function userInfo(state) {
	    return state.info;
	  }
	};

	var actions = {
	  /**
	   * 用户中心的用户详细资料
	   */
	  getUserInfo: function getUserInfo(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var body = _extends({}, apis.GET_USER_INFO);
	    self.DD.loading();
	    self.DD.get(body, function (data) {
	      if (data.result === 'success') {
	        commit(types.GET_USER_INFO, data.info);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 更新用户信息
	   */
	  updateUserInfo: function updateUserInfo(_ref2) {
	    var commit = _ref2.commit,
	        state = _ref2.state;

	    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref3$key = _ref3.key,
	        key = _ref3$key === undefined ? '' : _ref3$key,
	        _ref3$value = _ref3.value,
	        value = _ref3$value === undefined ? '' : _ref3$value;

	    commit(types.UPDATE_USER_INFO, {
	      key: key,
	      value: value
	    });
	  },


	  /**
	   * 设置用户头像
	   */
	  setUserHeadImg: function setUserHeadImg(_ref4) {
	    var commit = _ref4.commit,
	        state = _ref4.state;

	    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref5$avatar = _ref5.avatar,
	        avatar = _ref5$avatar === undefined ? '' : _ref5$avatar,
	        _ref5$fullAvatar = _ref5.fullAvatar,
	        fullAvatar = _ref5$fullAvatar === undefined ? '' : _ref5$fullAvatar;

	    var body = _extends({}, apis.SET_USER_HEAD_IMG);
	    body.avatar = avatar;
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        commit(types.SET_USER_HEAD_IMG, fullAvatar);
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  },


	  /**
	   * 退出登录
	   */
	  logout: function logout(_ref6) {
	    var commit = _ref6.commit,
	        state = _ref6.state;

	    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref7$callback = _ref7.callback,
	        callback = _ref7$callback === undefined ? null : _ref7$callback;

	    var body = _extends({}, apis.LOGOUT);
	    self.DD.post(body, function (data) {
	      if (data.result === 'success') {
	        if (callback) {
	          callback();
	        }
	      } else {
	        self.toast(data.info.errmsg);
	      }
	    });
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.GET_USER_INFO, function (state, userInfo) {
	  state.info = userInfo;
	}), _defineProperty(_mutations, types.UPDATE_USER_INFO, function (state) {
	  var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref8$key = _ref8.key,
	      key = _ref8$key === undefined ? '' : _ref8$key,
	      _ref8$value = _ref8.value,
	      value = _ref8$value === undefined ? '' : _ref8$value;

	  state.info[key] = value;
	}), _defineProperty(_mutations, types.SET_USER_HEAD_IMG, function (state, fullAvatar) {
	  state.info.buyer_avatar = fullAvatar;
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	var _mutationTypes = __webpack_require__(345);

	var types = _interopRequireWildcard(_mutationTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// import * as apis from '../apis';

	var state = {
	  modal: {
	    toggle: false,
	    type: '',
	    params: {},
	    options: {}
	  }
	};

	var getters = {
	  modalToggle: function modalToggle(state) {
	    return state.modal.toggle;
	  },
	  modalType: function modalType(state) {
	    return state.modal.type;
	  },
	  modalParams: function modalParams(state) {
	    return state.modal.params;
	  },
	  modalOptions: function modalOptions(state) {
	    return state.modal.options;
	  }
	};

	var actions = {
	  /**
	   * 模态框的显/隐开关
	   * @param {String} type - 要触发的actionsName.
	   * @param {Object} params - actionsName所需要的参数.
	   * @param {Object} options - 模态框的一些设置.
	   */
	  toggleModal: function toggleModal(_ref) {
	    var commit = _ref.commit,
	        state = _ref.state;

	    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        _ref2$type = _ref2.type,
	        type = _ref2$type === undefined ? '' : _ref2$type,
	        _ref2$params = _ref2.params,
	        params = _ref2$params === undefined ? {} : _ref2$params,
	        _ref2$options = _ref2.options,
	        options = _ref2$options === undefined ? {} : _ref2$options;

	    var _options = {
	      className: '',
	      hideCancelBtn: false,
	      confirmText: '确认',
	      cancelText: '取消'
	    };
	    self.DD.assign(_options, options);
	    commit(types.MODAL, {
	      type: type,
	      params: params,
	      options: _options
	    });
	  },


	  /**
	   * 模态框的显/隐开关
	   * @param {String} type - 要触发的actionsName.
	   */
	  hideModal: function hideModal(_ref3) {
	    var commit = _ref3.commit,
	        state = _ref3.state;

	    commit(types.MODAL_HIDE);
	  }
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, types.MODAL, function (state, payload) {
	  state.modal.toggle = !state.modal.toggle;
	  state.modal.type = payload.type;
	  state.modal.params = payload.params;
	  state.modal.options = payload.options;
	  var container = self.document.getElementById('container');
	  var clientHeight = self.document.body.clientHeight;
	  if (state.modal.toggle) {
	    container.style.overflow = 'hidden';
	    container.style.height = clientHeight + 'px';
	  } else {
	    container.style.overflow = 'auto';
	    container.style.height = 'auto';
	  }
	}), _defineProperty(_mutations, types.MODAL_HIDE, function (state) {
	  state.modal.toggle = false;
	  var container = self.document.getElementById('container');
	  container.style.overflow = 'auto';
	  container.style.height = 'auto';
	}), _mutations);

	exports.default = {
	  state: state,
	  getters: getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ }
/******/ ]);