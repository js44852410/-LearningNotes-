/**
 * Created by zxh on 2017/5/4.
 */
import newsList from '../src/components/news/newsList.vue'; //绑定手机号

export const NEWS = [
  {
    path: '/newsList',
    name: 'newsList',
    component: newsList,
    meta: {
      title: "科米熊",
    },
    beforeEnter: (to, from, next) => {
      if (!__userToken) {
        if (!__weiSurfaceId) {
          next(false);
        } else {
          next("/bindMobile");
        }
      } else {
        next();
      }
    },
  },
];