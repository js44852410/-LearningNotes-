// { "framework": "Vue" }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_index2.default.el = '#root';
	exports.default = new Vue(_index2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(2)
	)

	/* script */
	__vue_exports__ = __webpack_require__(3)

	/* template */
	var __vue_template__ = __webpack_require__(4)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\git download\\weexVue\\src\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  "home-swiper": {
	    "position": "relative"
	  },
	  "home-swiper-container": {
	    "width": 750,
	    "height": 375
	  },
	  "home-swiper-img": {
	    "width": 750,
	    "height": 375,
	    "backgroundPosition": "center",
	    "backgroundColor": "#f0f0f0"
	  },
	  "indicator": {
	    "backgroundColor": "#f0f0f0"
	  },
	  "active": {
	    "backgroundColor": "#ffffff"
	  },
	  "home-category": {
	    "flexDirection": "row",
	    "flexWrap": "wrap",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#ffffff"
	  },
	  "category-item": {
	    "width": 187.5,
	    "alignItems": "center",
	    "marginTop": 15,
	    "marginBottom": 15
	  },
	  "category-img": {
	    "width": 112.5,
	    "height": 112.5
	  },
	  "category-title": {
	    "textAlign": "center",
	    "fontSize": 28,
	    "lineHeight": 36,
	    "color": "#333333"
	  },
	  "home-more": {
	    "width": 750,
	    "height": 80
	  },
	  "home-pro-container": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "flexWrap": "wrap"
	  },
	  "home-pro-item": {
	    "width": 373,
	    "padding": 20,
	    "alignItems": "center",
	    "position": "relative",
	    "backgroundColor": "#ffffff",
	    "marginBottom": 4
	  },
	  "home-pro-img": {
	    "width": 270,
	    "height": 270,
	    "marginBottom": 20
	  },
	  "home-pro-title": {
	    "lines": 1,
	    "textAlign": "left",
	    "textOverflow": "ellipsis",
	    "fontSize": 28,
	    "lineHeight": 36,
	    "height": 36,
	    "wordWrap": "break-word",
	    "overflow": "hidden",
	    "whiteSpace": "nowrap",
	    "marginBottom": 5,
	    "width": 300,
	    "color": "#333333"
	  },
	  "pro-activity": {
	    "width": 300,
	    "height": 30,
	    "flexDirection": "row",
	    "justifyContent": "flex-start"
	  },
	  "sell-tag": {
	    "color": "#fd4d3e",
	    "borderTopWidth": 1,
	    "borderRightWidth": 1,
	    "borderBottomWidth": 1,
	    "borderLeftWidth": 1,
	    "borderTopColor": "#fd4d3e",
	    "borderRightColor": "#fd4d3e",
	    "borderBottomColor": "#fd4d3e",
	    "borderLeftColor": "#fd4d3e",
	    "fontSize": 16,
	    "marginRight": 10,
	    "borderRadius": 2,
	    "padding": 2
	  },
	  "home-pro-price": {
	    "lines": 1,
	    "lineHeight": 36,
	    "fontSize": 28,
	    "color": "#fd4d3e",
	    "textAlign": "left",
	    "width": 300
	  },
	  "add-carts": {
	    "position": "absolute",
	    "right": 0,
	    "bottom": 0,
	    "padding": 20
	  },
	  "add-cart-icon": {
	    "width": 50,
	    "height": 50
	  },
	  "home-new-pro-item": {
	    "width": 249,
	    "padding": 20,
	    "alignItems": "center",
	    "marginBottom": 1,
	    "backgroundColor": "#ffffff"
	  },
	  "home-new-pro-img": {
	    "width": 168,
	    "height": 168,
	    "marginBottom": 20
	  },
	  "new-pro-title": {
	    "lines": 1,
	    "textAlign": "center",
	    "textOverflow": "ellipsis",
	    "fontSize": 28,
	    "lineHeight": 36,
	    "height": 36,
	    "wordWrap": "break-word",
	    "overflow": "hidden",
	    "whiteSpace": "nowrap",
	    "marginBottom": 10,
	    "width": 200,
	    "color": "#333333"
	  },
	  "new-pro-price": {
	    "lines": 1,
	    "lineHeight": 36,
	    "fontSize": 28,
	    "color": "#fd4d3e",
	    "textAlign": "left",
	    "width": 200
	  },
	  "home-hot-pro": {
	    "marginTop": -4
	  },
	  "home-recommend-store": {
	    "marginTop": -4
	  },
	  "home-shop-item": {
	    "padding": 16,
	    "flexDirection": "row",
	    "justifyContent": "flex-start",
	    "backgroundColor": "#ffffff",
	    "marginBottom": 2
	  },
	  "home-shop-img": {
	    "width": 120,
	    "height": 120,
	    "marginRight": 20,
	    "borderRadius": 10
	  },
	  "shop-detail-container": {
	    "flex": 1,
	    "justifyContent": "space-between"
	  },
	  "home-shop-title": {
	    "fontSize": 28,
	    "color": "#333333"
	  },
	  "home-shop-detail": {
	    "flexDirection": "row",
	    "justifyContent": "flex-start"
	  },
	  "home-shop-starting-price": {
	    "flex": 1,
	    "fontSize": 24,
	    "color": "#fd4d3e"
	  },
	  "home-shop-goods-num": {
	    "flex": 1,
	    "fontSize": 24,
	    "color": "#333333"
	  },
	  "shop-more": {
	    "alignItems": "center",
	    "backgroundColor": "#ffffff",
	    "marginTop": -3
	  },
	  "shop-more-img": {
	    "width": 76,
	    "height": 25
	  },
	  "home-brand": {
	    "position": "relative"
	  },
	  "home-brand-left-more": {
	    "position": "absolute",
	    "left": 0,
	    "bottom": 0,
	    "zIndex": 2
	  },
	  "home-brand-left-img": {
	    "width": 48,
	    "height": 180
	  },
	  "home-brand-container": {
	    "marginLeft": 50,
	    "height": 180,
	    "backgroundColor": "#ffffff"
	  },
	  "home-brand-item": {
	    "marginRight": 10
	  },
	  "home-brand-icon": {
	    "width": 180,
	    "height": 180
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = {
	  data: function data() {
	    return {
	      home: { "adv": [{ "title": "itd flc", "stop_time": "1488556800", "link_type": "activity", "link": "http:\/\/betam.91dida.cn\/#\/shop\/activity\/69", "region_id": "2", "file": "http:\/\/image.91dida.cn\/.\/var\/media\/adv\/2016\/12\/29\/5864e0f23a775.828x406.jpg", "width": "828", "height": "406", "activity_id": "69" }, { "title": "\u6D4B\u8BD5banner", "stop_time": "1490889600", "link_type": "url", "link": "https:\/\/www.taobao.com\/", "region_id": "2", "file": "http:\/\/image.91dida.cn\/.\/var\/media\/adv\/2016\/12\/27\/58620b2756071.828x406.png", "width": "828", "height": "406" }], "category": [{ "category_id": "13", "category_name": "\u996E\u6599", "category_code": "yinliao", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/10\/12\/57fe0f7f4effd.0x0.jpg" }, { "category_id": "12", "category_name": "\u6C34|\u996E\u6599", "category_code": "test", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/10\/10\/57fb5329b4e88.0x0.jpg" }, { "category_id": "1", "category_name": "\u767D\u9152", "category_code": "baijiu", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/08\/31\/57c68a2ae303d.0x0.png" }, { "category_id": "2", "category_name": "\u8461\u8404\u9152", "category_code": "putaojiu", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/08\/31\/57c68a429159c.0x0.png" }, { "category_id": "10", "category_name": "\u5564\u9152", "category_code": "pijiu", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/08\/31\/57c68a55218ea.0x0.png" }, { "category_id": "8", "category_name": "\u5176\u4ED6\u9152\u7C7B", "category_code": "qitajiulei", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/08\/31\/57c68a1bf235e.0x0.png" }, { "category_id": "11", "category_name": "\u98DF\u54C1\u996E\u6599", "category_code": "shipinyinliao", "app_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/category\/2016\/08\/31\/57c68a75e349b.0x0.png" }, { "category_id": 0, "category_name": "\u5546\u54C1\u5206\u7C7B", "category_code": "shangpinfenlei", "app_icon": "http:\/\/cdn.91dida.cn\/skin\/frontend\/default\/images\/app_category_icon.png" }], "wx_share_config": { "wx_share_title": "", "wx_share_content": "", "wx_share_url": "", "wx_share_thumbnail": "" }, "store_is_recommend": [{ "store_id": "285", "company_id": "287", "store_name": "\u9152\u4E00\u4E8C\u676F", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/11\/22\/583406e89f14d.150x150.jpg", "starting_price": "0", "sales_num": "22", "items_num": "1" }, { "store_id": "35", "company_id": "35", "store_name": "\u5F20\u65AF\u4EAE\u7684\u5E97\u94FA02", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/06\/15\/57612536ebba3.150x150.jpg", "starting_price": "3.56", "sales_num": "26", "items_num": "1" }, { "store_id": "274", "company_id": "276", "store_name": "\u9152\u6653\u5B9D", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/11\/17\/582d64dd3fbf4.150x150.jpg", "starting_price": "0.04", "sales_num": "15", "items_num": "4" }, { "store_id": "236", "company_id": "238", "store_name": "\u53F2\u4E50\u6D4B\u8BD5123", "logo": "http:\/\/cdn.91dida.cn\/skin\/frontend\/default\/seller\/images\/app_store_default_logo.png", "starting_price": "0", "sales_num": "1", "items_num": "1" }, { "store_id": "270", "company_id": "272", "store_name": "\u4E00\u9635\u98CE", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/11\/16\/582c180a2ac9e.150x150.png", "starting_price": "0", "sales_num": "4", "items_num": "1" }, { "store_id": "116", "company_id": "117", "store_name": "\u4F60\u6211\u6211\u6211", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/06\/27\/5771441d39cfb.150x150.jpg", "starting_price": "0", "sales_num": "0", "items_num": "0" }, { "store_id": "101", "company_id": "102", "store_name": "\u9AD8\u5B87", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/06\/24\/576cdd7a9379e.150x150.jpg", "starting_price": "0", "sales_num": "0", "items_num": "4" }, { "store_id": "100", "company_id": "101", "store_name": "\u5218\u8001\u677F\u5BB6", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/07\/04\/5779856f6bb0c.150x150.jpg", "starting_price": "0", "sales_num": "56380", "items_num": "13" }, { "store_id": "94", "company_id": "95", "store_name": "\u53F2\u4E50\u6D4B\u8BD5\u5E97\u94FA", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/06\/29\/57739baa877df.150x150.png", "starting_price": "0", "sales_num": "1", "items_num": "3" }, { "store_id": "87", "company_id": "88", "store_name": "\u5DE6\u4E39\u5E97\u94FA", "logo": "http:\/\/image.91dida.cn\/.\/var\/media\/customer\/2016\/07\/02\/577774b7cc4bf.150x150.jpg", "starting_price": "12.56", "sales_num": "1565", "items_num": "18" }], "brand": [{ "brand_id": "84", "brand_name": "\u7EA2\u725B", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/24\/576ca5c55c0c3.0x0.jpg", "category_id": "11" }, { "brand_id": "64", "brand_name": "\u767E\u52A0\u5FB7", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/24\/576c9df068105.0x0.jpg", "category_id": "8" }, { "brand_id": "21", "brand_name": "\u6C34\u4E95\u574A", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576bac1df1d9e.0x0.jpg", "category_id": "1" }, { "brand_id": "15", "brand_name": "\u6CF8\u5DDE\u8001\u7A96", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576ba78457e85.0x0.jpg", "category_id": "1" }, { "brand_id": "14", "brand_name": "\u6D0B\u6CB3", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576ba5e272761.0x0.jpg", "category_id": "1" }, { "brand_id": "13", "brand_name": "\u6E58\u7A96", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576ba52cdb862.0x0.jpg", "category_id": "1" }, { "brand_id": "12", "brand_name": "\u4ECA\u7F18\u6625", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576ba49eb3579.0x0.jpg", "category_id": "1" }, { "brand_id": "10", "brand_name": "\u91D1\u516D\u798F", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576b9a8234a40.0x0.jpg", "category_id": "1" }, { "brand_id": "6", "brand_name": "\u767E\u4E8B", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576ba2e1cb448.0x0.jpg", "category_id": "11" }, { "brand_id": "3", "brand_name": "\u4E94\u7CAE\u6DB2", "brand_icon": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/brand\/2016\/06\/23\/576b9f3fe2433.0x0.jpg", "category_id": "1" }], "new_pro_adv": [], "new_pro": [{ "entity_id": "764", "product_name": "\u54C8\u54C8", "sku": "83737383939", "store_product_entity_id": "836", "store_product_store_id": "27", "store_product_final_price": "0.50", "store_product_sub_title": "\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\u5916\u4EFD\u989D\u4EFD\u989D\u989D\uFF0C\uFF0C\u5916\u4EFD", "store_product_stock_qty": "12323", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5F20\u65AF\u4EAE\u7684\u5E97\u94FA", "category_name": "\u767D\u9152", "brand_name": "\u8305\u53F0", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/10\/27\/5811befff0526.250x250.jpg", "default_media_gallery": "2016\/10\/27\/5811befff0526.jpg", "activity_tags": [{ "act_name": "zsl\u7684\u8FD4\u70B9\u6D3B\u52A8", "sell_tag": "\u6211\u7684\u8FD4\u70B9\u6211\u7684\u8FD4\u70B9", "tips": "\u6211\u7684\u8FD4\u70B9", "type": 3, "is_show_detail": 1 }] }, { "entity_id": "509", "product_name": "\u4E94\u7CAE\u6DB2\u5E74\u4EFD\u9152\u5341\u5E7450\u5EA6 500ml*6\u74F6", "sku": "6901382023103", "store_product_entity_id": "503", "store_product_store_id": "100", "store_product_final_price": "0.02", "store_product_sub_title": "\u6B22\u8FCE\u56DE\u8BBF\u548C\u73AF\u5883", "store_product_stock_qty": "14768672", "store_product_is_discount": "1", "store_product_is_new": "1", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u5218\u8001\u677F\u5BB6", "category_name": "\u767D\u9152", "brand_name": "\u4E94\u7CAE\u6DB2", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/29\/577375dd9e182.250x250.jpg", "default_media_gallery": "2016\/06\/29\/577375dd9e182.jpg", "activity_tags": [] }, { "entity_id": "751", "product_name": "\u98D2\u98D2", "sku": "3434278979878", "store_product_entity_id": "738", "store_product_store_id": "27", "store_product_final_price": "60.00", "store_product_sub_title": "\u7279\u4EF7\u5546\u54C1", "store_product_stock_qty": "1", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5F20\u65AF\u4EAE\u7684\u5E97\u94FA", "category_name": "\u6C34|\u996E\u6599", "brand_name": "\u9752\u5C9B", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/11\/04\/581c20f4e4c42.250x250.jpg", "default_media_gallery": "2016\/11\/04\/581c20f4e4c42.jpg", "activity_tags": [] }, { "entity_id": "138", "product_name": "\u53EF\u4E50", "sku": "34466778889999", "store_product_entity_id": "158", "store_product_store_id": "52", "store_product_final_price": "10.00", "store_product_sub_title": "\u53EF\u4E50", "store_product_stock_qty": "0", "store_product_is_discount": "1", "store_product_is_new": "1", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u5E97\u94FAtest\u2014\u2014zhou", "category_name": "\u98DF\u54C1\u996E\u6599", "brand_name": "\u767E\u4E8B", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/15\/576108db29f16.250x250.jpg", "default_media_gallery": "2016\/06\/15\/576108db29f16.jpg", "activity_tags": [] }, { "entity_id": "54", "product_name": "\u9177\u68A6\u6717\u59C6\u9884\u8C03\u9E21\u5C3E\u9152\u8349\u8393\u54734\u5EA6275ml*6\u74F6", "sku": "6949246112396", "store_product_entity_id": "264", "store_product_store_id": "20", "store_product_final_price": "5.00", "store_product_sub_title": "\u9177\u68A6\u6717\u59C6\u9884\u8C03\u9E21\u5C3E\u9152275ml.\u8349\u8393\u5473", "store_product_stock_qty": "1110", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5B59\u4E8C\u5A18\u5305\u5B50\u94FA", "category_name": "\u5176\u4ED6\u9152\u7C7B", "brand_name": "\u8001\u7237\u7237", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/04\/577a0151074c6.250x250.jpg", "default_media_gallery": "2016\/07\/04\/577a0151074c6.jpg", "activity_tags": [] }, { "entity_id": "617", "product_name": "\u5FAE\u5C71\u6E56\u94C1\u76D235\u5EA6500ML*6\u74F6", "sku": "6925439363134", "store_product_entity_id": "555", "store_product_store_id": "165", "store_product_final_price": "12.60", "store_product_sub_title": "\u5FAE\u5C71\u6E56\u94C1\u76D235\u5EA6500ML*6\u74F6", "store_product_stock_qty": "1762", "store_product_is_discount": "1", "store_product_is_new": "1", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u6211\u4EEC\u8BF4\u597D\u7684", "category_name": "\u767D\u9152", "brand_name": "\u5FAE\u5C71\u6E56", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/01\/57760e1c39975.250x250.jpg", "default_media_gallery": "2016\/07\/01\/57760e1c39975.jpg", "activity_tags": [] }], "special_offer": [{ "entity_id": "751", "product_name": "\u98D2\u98D2", "sku": "3434278979878", "store_product_entity_id": "738", "store_product_store_id": "27", "store_product_final_price": "60.00", "store_product_sub_title": "\u7279\u4EF7\u5546\u54C1", "store_product_stock_qty": "1", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5F20\u65AF\u4EAE\u7684\u5E97\u94FA", "category_name": "\u6C34|\u996E\u6599", "brand_name": "\u9752\u5C9B", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/11\/04\/581c20f4e4c42.250x250.jpg", "default_media_gallery": "2016\/11\/04\/581c20f4e4c42.jpg", "activity_tags": [] }, { "entity_id": "41", "product_name": "\u897F\u51E4\u53E4\u9152\u4F73\u5BB445\u5EA6500ml*6\u74F6", "sku": "6902212051501", "store_product_entity_id": "69", "store_product_store_id": "1", "store_product_final_price": "50.00", "store_product_sub_title": "\u897F\u51E4\u53E4\u9152", "store_product_stock_qty": "288", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5C3C\u53E4\u62C9\u65AF.\u5927\u8868\u54E5", "category_name": "\u767D\u9152", "brand_name": "\u897F\u51E4", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/13\/575e9109a0335.250x250.JPG", "default_media_gallery": "2016\/06\/13\/575e9109a0335.JPG", "activity_tags": [{ "act_name": "\u6EE1\u8D60\u5F00\u53D1\u6D4B\u8BD5--\u803F\u4F20\u4E1C", "sell_tag": "\u6EE1\u8D60G", "tips": "\u6EE1\u8D60\u6D4B\u8BD5 \uFF0C\u6EE1100\u8D60", "type": 1, "is_show_detail": 1 }] }, { "entity_id": "274", "product_name": "\u9510\u6FB3\u8461\u8404+\u767D\u5170\u57303\u5EA6330ml*24\u74F6", "sku": "6935145303041", "store_product_entity_id": "305", "store_product_store_id": "87", "store_product_final_price": "1.00", "store_product_sub_title": "\u9510\u6FB3\u8461\u8404+\u767D\u5170\u5730", "store_product_stock_qty": "24440", "store_product_is_discount": "1", "store_product_is_new": "0", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5DE6\u4E39\u5E97\u94FA", "category_name": "\u5176\u4ED6\u9152\u7C7B", "brand_name": "\u9510\u6FB3", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/06\/577cc54d27760.250x250.jpg", "default_media_gallery": "2016\/07\/06\/577cc54d27760.jpg", "activity_tags": [] }, { "entity_id": "743", "product_name": "\u725B\u680F\u5C71\u4E8C\u9505\u593452\u5EA6500ml*12\u74F6", "sku": "6906151608635", "store_product_entity_id": "714", "store_product_store_id": "76", "store_product_final_price": "160.00", "store_product_sub_title": "\u7279\u4EF7\u5546\u54C1", "store_product_stock_qty": "2991", "store_product_is_discount": "1", "store_product_is_new": "0", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5C0F\u9152\u9986", "category_name": "\u767D\u9152", "brand_name": "\u725B\u680F\u5C71", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/07\/577dbeb9d9dca.250x250.jpg", "default_media_gallery": "2016\/07\/07\/577dbeb9d9dca.jpg", "activity_tags": [] }, { "entity_id": "694", "product_name": "\u5F20\u88D5\u4E09\u661F\u91D1\u5956\u767D\u5170\u573038\u5EA6 700ml*6\u74F6", "sku": "6901584030305", "store_product_entity_id": "684", "store_product_store_id": "229", "store_product_final_price": "100.00", "store_product_sub_title": "\u526F\u6807\u9898\u526F\u6807\u9898\u526F\u6807\u9898", "store_product_stock_qty": "83", "store_product_is_discount": "1", "store_product_is_new": "0", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u4E13\u6740\u5C0F\u738B\u516B", "category_name": "\u8461\u8404\u9152", "brand_name": "\u5F20\u88D5", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/04\/5779f68f369d4.250x250.jpg", "default_media_gallery": "2016\/07\/04\/5779f68f369d4.jpg", "activity_tags": [] }, { "entity_id": "509", "product_name": "\u4E94\u7CAE\u6DB2\u5E74\u4EFD\u9152\u5341\u5E7450\u5EA6 500ml*6\u74F6", "sku": "6901382023103", "store_product_entity_id": "503", "store_product_store_id": "100", "store_product_final_price": "0.02", "store_product_sub_title": "\u6B22\u8FCE\u56DE\u8BBF\u548C\u73AF\u5883", "store_product_stock_qty": "14768672", "store_product_is_discount": "1", "store_product_is_new": "1", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u5218\u8001\u677F\u5BB6", "category_name": "\u767D\u9152", "brand_name": "\u4E94\u7CAE\u6DB2", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/29\/577375dd9e182.250x250.jpg", "default_media_gallery": "2016\/06\/29\/577375dd9e182.jpg", "activity_tags": [] }], "hot": [{ "entity_id": "623", "product_name": "\u96EA\u82B1\u5564\u9152\uFF08Snowbeer\uFF09 8\u5EA6\u7EAF\u751F500ml*12\u542C", "sku": "6949352200215", "store_product_entity_id": "734", "store_product_store_id": "27", "store_product_final_price": "1.00", "store_product_sub_title": "123456789012345678901234567890", "store_product_stock_qty": "12345656", "store_product_is_discount": "0", "store_product_is_new": "0", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u5F20\u65AF\u4EAE\u7684\u5E97\u94FA", "category_name": "\u5564\u9152", "brand_name": "\u96EA\u82B1", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/01\/577628ca0e6f0.250x250.jpg", "default_media_gallery": "2016\/07\/01\/577628ca0e6f0.jpg", "activity_tags": [{ "act_name": "zsl\u7684\u8FD4\u70B9\u6D3B\u52A8", "sell_tag": "\u6211\u7684\u8FD4\u70B9\u6211\u7684\u8FD4\u70B9", "tips": "\u6211\u7684\u8FD4\u70B9", "type": 3, "is_show_detail": 1 }, { "act_name": "\u6EE1\u8D60\u5F00\u53D1\u6D4B\u8BD5--\u803F\u4F20\u4E1C", "sell_tag": "\u6EE1\u8D60G", "tips": "\u6EE1\u8D60\u6D4B\u8BD5 \uFF0C\u6EE1100\u8D60", "type": 1, "is_show_detail": 1 }] }, { "entity_id": "41", "product_name": "\u897F\u51E4\u53E4\u9152\u4F73\u5BB445\u5EA6500ml*6\u74F6", "sku": "6902212051501", "store_product_entity_id": "69", "store_product_store_id": "1", "store_product_final_price": "50.00", "store_product_sub_title": "\u897F\u51E4\u53E4\u9152", "store_product_stock_qty": "288", "store_product_is_discount": "0", "store_product_is_new": "1", "store_product_is_best_sold": "0", "store_product_status": "on_sale", "store_name": "\u5C3C\u53E4\u62C9\u65AF.\u5927\u8868\u54E5", "category_name": "\u767D\u9152", "brand_name": "\u897F\u51E4", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/13\/575e9109a0335.250x250.JPG", "default_media_gallery": "2016\/06\/13\/575e9109a0335.JPG", "activity_tags": [{ "act_name": "\u6EE1\u8D60\u5F00\u53D1\u6D4B\u8BD5--\u803F\u4F20\u4E1C", "sell_tag": "\u6EE1\u8D60G", "tips": "\u6EE1\u8D60\u6D4B\u8BD5 \uFF0C\u6EE1100\u8D60", "type": 1, "is_show_detail": 1 }] }, { "entity_id": "509", "product_name": "\u4E94\u7CAE\u6DB2\u5E74\u4EFD\u9152\u5341\u5E7450\u5EA6 500ml*6\u74F6", "sku": "6901382023103", "store_product_entity_id": "503", "store_product_store_id": "100", "store_product_final_price": "0.02", "store_product_sub_title": "\u6B22\u8FCE\u56DE\u8BBF\u548C\u73AF\u5883", "store_product_stock_qty": "14768672", "store_product_is_discount": "1", "store_product_is_new": "1", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u5218\u8001\u677F\u5BB6", "category_name": "\u767D\u9152", "brand_name": "\u4E94\u7CAE\u6DB2", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/06\/29\/577375dd9e182.250x250.jpg", "default_media_gallery": "2016\/06\/29\/577375dd9e182.jpg", "activity_tags": [] }, { "entity_id": "324", "product_name": "\u6CF8\u5DDE\u8001\u7A96\u56FD\u7A961573\u7EA2\u5B9D\u77F3 52\u5EA6500ml*6\u74F6", "sku": "6901798145604", "store_product_entity_id": "369", "store_product_store_id": "95", "store_product_final_price": "100.00", "store_product_sub_title": "\u6CF8\u5DDE\u8001\u7A9652\u5EA6*12\u74F6/\u7BB1", "store_product_stock_qty": "980", "store_product_is_discount": "0", "store_product_is_new": "0", "store_product_is_best_sold": "1", "store_product_status": "on_sale", "store_name": "\u4E0D\u77E5\u9053\u53EB\u4EC0\u4E48", "category_name": "\u767D\u9152", "brand_name": "\u6CF8\u5DDE\u8001\u7A96", "default_media_gallery_thumb": "http:\/\/image.91dida.cn\/.\/var\/media\/catalog\/product\/2016\/07\/07\/577df00f42347.250x250.jpg", "default_media_gallery": "2016\/07\/07\/577df00f42347.jpg", "activity_tags": [] }], "cart_num": 4 },
	      banner: [],
	      bannerCurrIndex: 0,
	      hideHomeStore: [],
	      shopMoreImage: "//betam.91dida.cn/skin/m/images/open.png"
	    };
	  },

	  methods: {
	    fn: function fn() {
	      console.log('aaaaaaaaaaaa.................bbbbbbbbbbbb');
	    },
	    getHomeData: function getHomeData(callback) {
	      return stream.fetch({
	        method: 'GET',
	        type: 'json',
	        url: 'https://api.github.com/repos/'
	      }, callback);
	    },
	    goPage: function goPage() {
	      //__weex_require_module__('myModule').printLog(file, function (ret) {});

	      var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'llpTest';
	    },
	    swiperChange: function swiperChange(event) {
	      console.log(event);
	      this.bannerCurrIndex++;
	      this.bannerCurrIndex %= this.banner.length;
	    },
	    toggleShop: function toggleShop() {
	      if (this.home.store_is_recommend.length > 3) {
	        this.home.store_is_recommend = this.home.store_is_recommend.slice(0, 3);
	        this.shopMoreImage = '//betam.91dida.cn/skin/m/images/open.png';
	      } else {
	        this.home.store_is_recommend = this.home.store_is_recommend.concat(this.hideHomeStore);
	        this.shopMoreImage = '//betam.91dida.cn/skin/m/images/opened.png';
	      }
	    }
	  },
	  init: function init() {
	    /*this.$on("RichText", function (params) {
	      console.log("_____________++++++_____________________");
	      console.log(params);
	      console.log("________________________________________");
	    })*/
	  },
	  created: function created() {
	    this.banner = this.home.adv.length ? this.home.adv : [{
	      file: '//static.91dida.cn/skin/m/images/banner.png'
	    }];

	    if (this.home.store_is_recommend.length > 3) {
	      this.hideHomeStore = this.home.store_is_recommend.slice(3);
	      this.home.store_is_recommend.length = 3;
	    }
	  },
	  mounted: function mounted() {
	    /*var globalEvent = __weex_require_module__('globalEvent');
	     console.log("!@#$%^&*()");
	    globalEvent.addEventListener("globalevent", function (event) {
	      console.log("____________________________");
	    });
	    console.log("QWERTYUIOP");*/
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('list', {
	    staticStyle: {
	      backgroundColor: "#f0f0f0"
	    }
	  }, [_h('cell', {
	    staticClass: ["home-swiper"]
	  }, [_h('slider', {
	    staticClass: ["home-swiper-container"],
	    attrs: {
	      "auto-play": "true",
	      "interval": "3000"
	    },
	    on: {
	      "change": _vm.swiperChange
	    }
	  }, [_vm._l((_vm.banner), function(item) {
	    return _h('container', [(item.link_type == 'url' || item.link_type == 'activity') ? _h('a', {
	      on: {
	        "click": _vm.goPage
	      }
	    }, [_h('image', {
	      staticClass: ["home-swiper-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.file
	      }
	    })]) : _vm._e(), (item.link_type == 'products') ? _h('a', {
	      on: {
	        "click": _vm.goPage
	      }
	    }, [_h('image', {
	      staticClass: ["home-swiper-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.file
	      }
	    })]) : _vm._e()])
	  }), _h('indicator', {
	    staticClass: ["indicator"]
	  })])]), (!!_vm.home.category.length) ? _h('cell', {
	    staticClass: ["home-category"]
	  }, [_vm._l((_vm.home.category), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["category-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.category_id)
	      }
	    }, [_h('image', {
	      staticClass: ["category-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.app_icon,
	        "alt": ""
	      }
	    }), _h('text', {
	      staticClass: ["category-title"]
	    }, [_vm._s(item.category_name)])])])
	  })]) : _vm._e(), (!!_vm.home.new_pro.length || !!_vm.home.new_pro_adv.length) ? _h('cell', {
	    staticClass: ["home-new-pro"]
	  }, [_h('a', {
	    attrs: {
	      "href": "http://m.91dida.cn"
	    }
	  }, [_h('image', {
	    staticClass: ["home-more"],
	    attrs: {
	      "resize": "contain",
	      "src": "//static.91dida.cn/skin/m/images/new_pro_title.png"
	    }
	  })]), _h('div', {
	    staticClass: ["home-pro-container"]
	  }, [_vm._l((_vm.home.new_pro_adv), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["home-new-pro-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.store_product_store_id) + '/' + (item.store_product_entity_id)
	      }
	    }, [_h('image', {
	      staticClass: ["home-new-pro-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.default_media_gallery_thumb
	      }
	    }), _h('text', {
	      staticClass: ["new-pro-title"]
	    }, [_vm._s(item.product_name)]), _h('text', {
	      staticClass: ["new-pro-price"]
	    }, ["¥" + _vm._s(item.store_product_final_price)])])])
	  })]), _h('div', {
	    staticClass: ["home-pro-container"]
	  }, [_vm._l((_vm.home.new_pro), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["home-new-pro-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.store_product_store_id) + '/' + (item.store_product_entity_id)
	      }
	    }, [_h('image', {
	      staticClass: ["home-new-pro-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.default_media_gallery_thumb
	      }
	    }), _h('text', {
	      staticClass: ["new-pro-title"]
	    }, [_vm._s(item.product_name)]), _h('text', {
	      staticClass: ["new-pro-price"]
	    }, ["¥" + _vm._s(item.store_product_final_price)])])])
	  })])]) : _vm._e(), (!!_vm.home.special_offer.length) ? _h('cell', {
	    staticClass: ["home-special-pro"]
	  }, [_h('a', {
	    attrs: {
	      "href": "http://m.91dida.cn"
	    }
	  }, [_h('image', {
	    staticClass: ["home-more"],
	    attrs: {
	      "resize": "contain",
	      "src": "//static.91dida.cn/skin/m/images/special_offer_title.png"
	    }
	  })]), _h('div', {
	    staticClass: ["home-pro-container"]
	  }, [_vm._l((_vm.home.special_offer), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["home-pro-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.store_product_store_id) + '/' + (item.store_product_entity_id)
	      }
	    }, [_h('image', {
	      staticClass: ["home-pro-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.default_media_gallery_thumb
	      }
	    }), _h('text', {
	      staticClass: ["home-pro-title"]
	    }, [_vm._s(item.product_name)]), _h('div', {
	      staticClass: ["pro-activity"]
	    }, [_vm._l((item.activity_tags), function(tag) {
	      return _h('container', [_h('text', {
	        staticClass: ["sell-tag"]
	      }, [_vm._s(tag.sell_tag)])])
	    })]), _h('text', {
	      staticClass: ["home-pro-price"]
	    }, ["¥" + _vm._s(item.store_product_final_price)])]), _h('div', {
	      staticClass: ["add-carts"]
	    }, [_h('image', {
	      staticClass: ["add-cart-icon"],
	      attrs: {
	        "resize": "contain",
	        "src": "//betam.91dida.cn/skin/m/images/add_cart.png"
	      }
	    })])])
	  })])]) : _vm._e(), (!!_vm.home.hot.length) ? _h('cell', {
	    staticClass: ["home-hot-pro"]
	  }, [_h('a', {
	    attrs: {
	      "href": "http://m.91dida.cn"
	    }
	  }, [_h('image', {
	    staticClass: ["home-more"],
	    attrs: {
	      "resize": "contain",
	      "src": "//static.91dida.cn/skin/m/images/hot_title.png"
	    }
	  })]), _h('div', {
	    staticClass: ["home-pro-container"]
	  }, [_vm._l((_vm.home.hot), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["home-pro-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.store_product_store_id) + '/' + (item.store_product_entity_id)
	      }
	    }, [_h('image', {
	      staticClass: ["home-pro-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.default_media_gallery_thumb
	      }
	    }), _h('text', {
	      staticClass: ["home-pro-title"]
	    }, [_vm._s(item.product_name)]), _h('div', {
	      staticClass: ["pro-activity"]
	    }, [_vm._l((item.activity_tags), function(tag) {
	      return _h('container', [_h('text', {
	        staticClass: ["sell-tag"]
	      }, [_vm._s(tag.sell_tag)])])
	    })]), _h('text', {
	      staticClass: ["home-pro-price"]
	    }, ["¥" + _vm._s(item.store_product_final_price)])]), _h('div', {
	      staticClass: ["add-carts"]
	    }, [_h('image', {
	      staticClass: ["add-cart-icon"],
	      attrs: {
	        "resize": "contain",
	        "src": "//betam.91dida.cn/skin/m/images/add_cart.png"
	      }
	    })])])
	  })])]) : _vm._e(), (!!_vm.home.store_is_recommend) ? _h('cell', {
	    staticClass: ["home-recommend-store"]
	  }, [_h('a', {
	    attrs: {
	      "href": "http://m.91dida.cn"
	    }
	  }, [_h('image', {
	    staticClass: ["home-more"],
	    attrs: {
	      "resize": "contain",
	      "src": "//static.91dida.cn/skin/m/images/recommend_store_title.png"
	    }
	  })]), _h('div', {
	    staticClass: ["home-shop-container"]
	  }, [_vm._l((_vm.home.store_is_recommend), function(item) {
	    return _h('container', {
	      attrs: {
	        "track-by": "store_id"
	      }
	    }, [_h('a', {
	      staticClass: ["home-shop-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/?' + (item.store_id) + '/' + (item.store_name)
	      }
	    }, [_h('image', {
	      staticClass: ["home-shop-img"],
	      attrs: {
	        "resize": "contain",
	        "src": item.logo
	      }
	    }), _h('div', {
	      staticClass: ["shop-detail-container"]
	    }, [_h('text', {
	      staticClass: ["home-shop-title"]
	    }, [_vm._s(item.store_name)]), _h('div', {
	      staticClass: ["home-shop-detail"]
	    }, [_h('text', {
	      staticClass: ["home-shop-starting-price"]
	    }, ["起送金额" + _vm._s(item.starting_price) + "元"]), _h('text', {
	      staticClass: ["home-shop-goods-num"]
	    }, ["商品：" + _vm._s(item.items_num) + "款"])])])])])
	  }), (!!_vm.hideHomeStore.length) ? _h('container', [_h('div', {
	    staticClass: ["shop-more"],
	    on: {
	      "click": _vm.toggleShop
	    }
	  }, [_h('image', {
	    staticClass: ["shop-more-img"],
	    attrs: {
	      "resize": "contain",
	      "src": _vm.shopMoreImage
	    }
	  })])]) : _vm._e()])]) : _vm._e(), (!!_vm.home.brand) ? _h('cell', {
	    staticClass: ["home-brand"]
	  }, [_h('a', {
	    attrs: {
	      "href": "http://m.91dida.cn"
	    }
	  }, [_h('image', {
	    staticClass: ["home-more"],
	    attrs: {
	      "resize": "contain",
	      "src": "//static.91dida.cn/skin/m/images/brand_title.png"
	    }
	  })]), _vm._m(0), _h('scroller', {
	    staticClass: ["home-brand-container"],
	    attrs: {
	      "show-scrollbar": "false",
	      "scroll-direction": "horizontal"
	    }
	  }, [_vm._l((_vm.home.brand), function(item) {
	    return _h('container', [_h('a', {
	      staticClass: ["home-brand-item"],
	      attrs: {
	        "href": 'http://m.91dida.cn/' + (item.brand_id)
	      }
	    }, [_h('image', {
	      staticClass: ["home-brand-icon"],
	      attrs: {
	        "resize": "contain",
	        "src": item.brand_icon
	      }
	    })])])
	  })])]) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["home-brand-left-more"]
	  }, [_h('image', {
	    staticClass: ["home-brand-left-img"],
	    attrs: {
	      "resize": "contain",
	      "src": "//betam.91dida.cn/skin/m/images/brand_left.png"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true

/***/ }
/******/ ]);