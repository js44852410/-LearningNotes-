import Pay from '../components/pay/index.vue';
import PaySuccess from '../components/pay/success.vue';
import PayFail from '../components/pay/fail.vue';
import PayHelp from '../components/pay/help.vue';

export const PAY = [
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: {
      title: "选择支付方式",
    },
  }, {
    path: '/pay/success',
    name: 'paySuccess',
    component: PaySuccess,
    meta: {
      title: "支付成功",
    },
  }, {
    path: '/pay/fail',
    name: 'payFail',
    component: PayFail,
    meta: {
      title: "支付失败",
    },
  }, {
    path: '/pay/help',
    name: 'payHelp',
    component: PayHelp,
    meta: {
      title: "支付帮助",
    },
  }
];
