import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  count: 0,
  cartsList: {
    all_is_selected: 0,
    selected_total_amount: 0,
    cart_items: [],
    be_settled: 0,
    toast_msg: '',
  },
};

const getters = {
  cartsCount: state => state.count,
  cartsItems: state => state.cartsList.cart_items,
  allIsSelected: state => state.cartsList.all_is_selected,
  totalAmount: state => state.cartsList.selected_total_amount,
  beSettled: state => state.cartsList.be_settled,
  toastMsg: state => state.cartsList.toast_msg,
};

const setCartsData = function({ commit, state }, data) {
  if (data.result === 'success') {
    // 页面所需要的数据
    // data.info为 null 说明购物车已经被清空了
    let info = {}
    let count = 0
    if (data.info) {
      info = data.info;
      count =  +data.info.cart_goods_num;
    }

    commit(types.GET_CART_LIST, info);
    commit(types.SET_CARTS_COUNT, count);
  } else {
    self.toast(data.info.errmsg);
  }
};

const actions = {
  /**
   * 设置购物车商品数量
   * @param {Number} count - 购物车商品总数.
   */
  setCartsCount({ commit, state }, count) {
    commit(types.SET_CARTS_COUNT, count);
  },

  /**
   * 添加单个商品到购物车中
   * @param {Object} vm - 当前商品相关的对象.
   */
  addToCarts({ commit, state }, vm) {
    const body = { ...apis.ADD_TO_CART };
    if (vm.store_product_stock_qty && +vm.store_product_stock_qty === 0) {
      self.toast('您来晚了，没有库存啦~');
      return;
    }

    body.store_product_id = vm.store_product_id || vm.store_product_entity_id;
    self.DD.loading();
    self.DD.post(body, data => {
      if (data.result === 'success') {
        // - 添加成后要同步更新购物车数量;
        commit(types.SET_CARTS_COUNT, state.count + 1);
        self.toast('添加成功!', {
          time: 1000,
        });
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 获取购物车列表
   */
  getCartsList({ commit, state }) {
    self.DD.loading();
    self.DD.get(apis.GET_CART_LIST, data => {
      setCartsData({ commit, state }, data);
    });
  },

  /**
   * 购物车列表页操作(添加、减少、删除、选择、全选等)
   * @param {Element} el
   * @param {Number} type - 1: 全选,
                            2: 店铺,
                            3: 单个商品,
                            4: 添加购物车,
                            5: 减去购物车,
                            6: 修改购物车数量
                            7: 删除购物车
   * @param {Object} vm - VUE实例对象
   */
  optionsCart({ commit, state }, { el, type = 1, vm } = {}) {
    const body = { ...apis.OPTIONS_CART };
    // store_product_ids 是一个对象按引用传递，所以每次请求前要将先前的值手动清空;
    body.store_product_ids = [];
    if (el.classList.contains('active')) {
      body.type = 0;
    } else {
      body.type = 1;
    }

    switch (type) {
      case 1:
        body.all = 1;
        break;
      case 2:
        body.all = 0;
        vm.map(item => {
          body.store_product_ids.push(item.store_product_id);
        });
        break;
      case 3:
        body.all = 0;
        body.store_product_ids.push(vm.store_product_id);
        break;
      case 4:
      case 5:
      case 6:
        delete body.store_product_ids;
        body.method = 'set_cart_item';
        body.store_product_id = vm.store_product_id;
        if (type === 4) {
          body.qty = +vm.qty + 1;
        } else if (type === 5) {
          body.qty = +vm.qty - 1;
        } else {
          body.qty = +el.value;
        }
        // 如果 qty 为 0 则不做任何操作
        if (!body.qty) {
          return;
        }
        break;
      default:
        delete body.store_product_ids;
        el.previousElementSibling.style.webkitTransform = 'translateX(0px)';
        el.previousElementSibling.style.transform = 'translateX(0px)';
        body.method = 'remove_cart_item';
        body.store_product_id = vm.store_product_id;
    }

    self.DD.loading();
    self.DD.post(body, (data) => {
      setCartsData({ commit, state }, data);
    });
  },
};

const mutations = {
  [types.SET_CARTS_COUNT](state, count) {
    state.count = count;
  },
  [types.GET_CART_LIST](state, payload) {
    state.cartsList.all_is_selected = payload.all_is_selected;
    state.cartsList.selected_total_amount = payload.selected_total_amount;
    state.cartsList.cart_items = payload.cart_items || [];
    state.cartsList.be_settled = payload.be_settled;
    state.cartsList.toast_msg = payload.toast_msg;
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
