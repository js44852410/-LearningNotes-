import CartsIndex from '../components/carts/index.vue';
import Confirm from '../components/carts/confirm.vue';

export const CARTS = [
  {
    path: '/cart',
    name: 'cart',
    component: CartsIndex,
    meta: {
      title: '购物车',
    },
  }, {
    path: '/cart/confirm',
    name: 'confirm',
    component: Confirm,
    meta: {
      title: '确认订单',
    },
  }
];
