import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  myCoupon: {
    type: 0,
    list: [],
    unusedNum: 0,
    usedNum: 0,
    expiredNum: 0,
  }
};

const getters = {
  couponType: state => state.myCoupon.type,
  couponList: state => state.myCoupon.list,
  couponUnusedNum: state => state.myCoupon.unusedNum,
  couponUsedNum: state => state.myCoupon.usedNum,
  couponExpiredNum: state => state.myCoupon.expiredNum,
};

const actions = {
  /**
   * 获取我的优惠券列表
   */
  getMyCouponList({ commit, state }, { eventType = '', type = 0, vm = {} } = {}) {
    if (eventType === 'click' && type === state.myCoupon.type) return;
    const body = { ...apis.GET_MY_COUPON_LIST };
    body.page = vm.page + 1;
    body.type = type || state.myCoupon.type;
    self.DD.loading();
    self.DD.get(body, data => {
      vm.scrollToggle = true;
      if (data.result === 'success') {
        if (vm.loadingEl) {
          vm.loadingEl.style.display = 'none';
        }
        // 如果为第一页，是清空数据，大于1则是追加数据
        let append = false;
        if (vm.page > 0) {
          append = true;
        }
        // commit(types.GET_COLLECTION_GOODS, {
        //   append,
        //   items: data.info.items
        // });
        commit(types.GET_MY_COUPON_LIST, {
          append,
          type,
          data: data.info,
        })

        vm.page = data.info.page;
        vm.pageCount = data.info.pageCount;

        vm.loadingEl = self.document.createElement('div');
        vm.loadingEl.className = 'next-loading';
        vm.loadingEl.innerHTML = '努力加载中...';

        if (vm.page != vm.pageCount) {
          self.document.addEventListener('scroll', vm.next);
        } else {
          self.document.removeEventListener('scroll', vm.next);
        }
      } else {
        self.toast(data.info.errmsg);
      }
    })
  },

  /**
   * 添加优惠券
   */
  addCoupon({ commit, state }, { sn = '', from = '', productInfo = {}, callback = '' } = {}) {
    const body = { ...apis.ADD_COUPON };
    body.coupon_sn = sn;

    if (from === 'confirm') {
      body.type = 1;
      body.product_info = self.encodeURIComponent(self.JSON.stringify(productInfo));
    }
    self.DD.post(body, data => {
      if (data.result === 'success') {
        if (from === 'confirm') {
          callback();
        } else {
          self.toast('绑定成功');
          commit(types.ADD_COUPON, data.info);
        }
      } else {
        self.toast(data.info.errmsg);
      }
    })

  }
};

const mutations = {
  [types.GET_MY_COUPON_LIST](state, { append = false, data = {}, type = 0 } = {}) {
    if (append) {
      state.myCoupon.list.push(...data.items);
    } else {
      state.myCoupon.type = type;
      state.myCoupon.list = data.items || [];
      state.myCoupon.unusedNum = +data.unused_coupon_num;
      state.myCoupon.usedNum = +data.used_coupon_num;
      state.myCoupon.expiredNum = +data.expired_coupon_num;
    }
  },
  [types.ADD_COUPON](state, item) {
    state.myCoupon.unusedNum += 1;
    if (state.myCoupon.type === 1) {
      state.myCoupon.list.unshift(item);
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
