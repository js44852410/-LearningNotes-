/**
 * Created by daibi on 17/3/2.
 */
import Vue from 'vue';
import Router from 'vue-router';
import {ROUTES} from './router.config';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: ROUTES,
});

router.beforeEach((to, from, next) => {
  wx.ready(function() {
    setShare(__shareInfo);
  });

  document.body.scrollTop = 0;
  next();
});

export default router;