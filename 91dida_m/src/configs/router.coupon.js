import UseIndex from '../components/coupon/useIndex.vue';
import MyCoupon from '../components/coupon/myCoupon.vue';

export const COUPON = [
  {
    path: '/coupon/use',
    name: 'couponUse',
    component: UseIndex,
    meta: {
      title: "优惠券",
    },
  }, {
    path: '/coupon/mine/',
    name: 'myCoupon',
    component: MyCoupon,
    meta: {
      title: "优惠券",
    },
  }
];
