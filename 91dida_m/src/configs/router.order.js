import Order from '../components/order/index.vue';
import Online from '../components/order/online.vue';
import OrderInfo from '../components/order/info.vue';

export const ORDERS = [
  {
    path: '/order',
    name: 'myOrderAll',
    component: Order,
    redirect: '/order/0',
    meta: {
      title: '我的订单',
    },
  }, {
    path: '/order/:status',
    name: 'myOrder',
    component: Order,
    meta: {
      title: '我的订单',
    },
  }, {
    path: '/order/online/:status',
    name: 'online',
    component: Online,
    meta: {
      title: '我的订单',
    },
  }, {
    path: '/order/info/:orderId/:incrementId',
    name: 'orderInfo',
    component: OrderInfo,
    meta: {
      title: '订单详情',
    },
  }
];
