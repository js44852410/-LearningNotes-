import Home from '../components/home/index.vue';
import Brand from '../components/brand/list.vue';
import NotFound from '../components/common/404.vue';
import Init from '../components/index.vue';

export const OTHERS = [
  {
    path: '/',
    name: 'init',
    component: Init,
    meta: {
      title: "邸达电子商务有限公司",
    },
  }, {
    path: '/index',
    name: 'home',
    component: Home,
    meta: {
      title: "邸达电子商务有限公司",
    },
    beforeEnter: (to, from, next) => {
      switch (self.home.reviewStatus) {
        case 'pending':
          // 正在审核中...
          next({
            name: 'pending',
          });
          break;
        case 'denied':
          // 审核未通过
          next({
            name: 'unpass',
          });
          break;
        case 'on_hold':
          // 用户已注册，但是没有填写信息
          next({
            name: 'registerInfo',
          });
          break;
        case '':
          next({
            name: 'login',
          });
          break;
        default:
          next();
      }
    },
  }, {
    path: '/brand',
    name: 'brand',
    component: Brand,
    meta: {
      title: "推荐品牌",
    },
  }, {
    path: 'user/collection',
    redirect: '/user/collection/goods',
  }, {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: "404",
    },
  },
];
