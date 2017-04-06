import carts from './modules/carts';
import shop from './modules/shop';
import goods from './modules/goods';
import order from './modules/order';
import address from './modules/address';
import coupon from './modules/coupon';
import user from './modules/user';
import common from './modules/common';
export default new Vuex.Store({
  modules: {
    carts,
    shop,
    goods,
    order,
    address,
    coupon,
    user,
    common,
  },
  strict: true,
});
