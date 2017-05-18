/**
 * Created by zxh on 2017/3/15.
 */

/*为图片添加图片服务器*/
Vue.filter("dirImage", url => {
  if (url) {
    return `${__IMGURL}${url}`;
  } else {
    return "/src/img/defaultImage.png";
  }
});

/*默认头像*/
Vue.filter("defaultHead", url => {
  if (url) {
    if (url.indexOf("http://") === 0 || url.indexOf("wxLocalResource") === 0) {
      return url;
    } else {
      return `${__IMGURL}${url}`;
    }
  } else {
    return "/src/img/defaultHead.png";
  }
});

/*价钱格式化*/
Vue.filter("formatPrice", (price = 0) => {
  if (price === 0) {
    return 0;
  } else {
    return price.toFixed(2);
  }
});