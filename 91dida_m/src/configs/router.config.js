import { USER } from './router.user';
import { ORDERS } from './router.order';
import { GOODS } from './router.goods';
import { CARTS } from './router.carts';
import { SHOP } from './router.shop';
import { COUPON } from './router.coupon';
import { ADDRESS } from './router.address';
import { IM } from './router.im';
import { PAY } from './router.pay';
import { OTHERS } from './router.other';

export const ROUTES = [
  ...USER,
  ...ORDERS,
  ...GOODS,
  ...CARTS,
  ...SHOP,
  ...COUPON,
  ...ADDRESS,
  ...IM,
  ...PAY,
  ...OTHERS,
];
