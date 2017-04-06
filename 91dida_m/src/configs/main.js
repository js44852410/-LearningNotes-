import '../scss/style.scss';
import '../js/common';
import '../js/vue-filter';
import '../js/toast';
import { ROUTES } from './router.config';
import store from '../store';

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: ROUTES,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    self.DD.setTitle(to.meta.title);
  }
  next();
});

const app = new Vue({
  router,
  store,
}).$mount('#container')

// 开启调试信息
Vue.config.devtools = true;

// 设置POST请求的数据为application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
