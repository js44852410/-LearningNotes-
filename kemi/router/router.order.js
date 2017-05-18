import confirmOrder from '../src/components/order/confirm-order.vue'; //下单页
import orderPay from '../src/components/order/order-pay.vue'; //支付页
import paySuccess from '../src/components/order/pay-success.vue'; //支付成功回调页
import myActivityList from '../src/components/order/my-activity-list.vue'; //我的活动列表
import myActivityInfo from '../src/components/order/my-activity-info.vue'; //我的活动详情

export const ORDER = [
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: confirmOrder,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/orderPay',
    name: 'orderPay',
    component: orderPay,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/paySuccess/:orderNumber',
    name: 'paySuccess',
    component: paySuccess,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/myActivityList/:status',
    name: 'myActivityList',
    component: myActivityList,
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
  {
    path: '/myActivityList',
    name: 'myActivityListToPay',
    component: myActivityList,
    redirect: '/myActivityList/to_pay',
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
  {
    path: '/myActivityInfo/:orderNumber',
    name: 'myActivityInfo',
    component: myActivityInfo,
    meta: {
      title: "科米熊",
    },
  },
];