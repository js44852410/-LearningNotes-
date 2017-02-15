import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  pay: {
    price: 0,
    count: 0,
  },
  refund: {
    items: [],
    toggle: false,
  }
};

const getters = {
  payPrice: state => state.pay.price,
  payCount: state => state.pay.count,
  refundItems: state => state.refund.items,
  refundToggle: state => state.refund.toggle,
};

const actions = {
  /**
   * 确认收货
   * @param {Number} id - 订单ID
   */
  confirmReceipt({ commit, state }, { id = 0 } = {}) {
    const body = { ...apis.CONFIRM_RECEIPT };
    body.id = id;
    self.DD.loading();
    self.DD.post(body, data => {
      if (data.result === 'success') {
        self.toast('操作成功', {
          callback() {
            self.location.reload();
          }
        });
      } else {
        self.toast(data.info.errmsg);
      }
    })
  },

  /**
   * 申请退货, 获取退货原因
   */
  getRefundReason({ commit, state }) {
    const body = { ...apis.GET_REFUND_REASON };
    self.DD.loading();
    self.DD.get(body, data => {
      if (data.result === 'success') {
        commit('GET_REFUND_REASON', data.info);
       }else{
        self.toast(data.info.errmsg);
       }
    })
  },

  /**
   * 提交退货申请
   */
  submitRefund({ commit, state }, { id = 0, comment = '', reasonId = 0 } = {}) {
    const body = { ...apis.SUBMIT_REFUND };
    body.id = id;
    body.comment = comment;
    body.reason_id = reasonId;
    self.DD.loading();
    self.DD.post(body, data => {
      if (data.result === 'success') {
        self.toast('申请成功', {
          callback() {
            self.location.reload();
          }
        });
       }else{
        self.toast(data.info.errmsg);
       }
    })
  },

  /**
   * 假货先赔
   * @param {Number} id - 订单ID
   */
  applyCompensation({ commit, state }, { id = 0 } = {}) {
    const body = { ...apis.APPLY_COMPENSATION };
    body.id = id;
    self.DD.loading();
    self.DD.post(body, data => {
      if (data.result === 'success') {
        self.toast('操作成功');
       }else{
        self.toast(data.info.errmsg);
       }
    })
  },

  /**
   * 取消订单
   * @param {Number} id - 订单ID
   */
  cancelOrder({ commit, state }, { id = 0 } = {}) {
    const body = { ...apis.CANCEL_ORDER };
    body.id = id;
    self.DD.loading();
    self.DD.post(body, data => {
      if (data.result === 'success') {
        self.toast('订单取消成功！', {
          callback() {
            self.location.reload();
          }
        });
       }else{
        self.toast(data.info.errmsg);
       }
    })
  },

  /**
   * 设置去支付的订单总金额及数量
   */
   setOrderPay({ commit, state }, { price = 0, count = 0 } = {}) {
     commit(types.SET_ORDER_PAY, {
       price,
       count,
     })
   },
};

const mutations = {
  [types.SET_ORDER_PAY](state, payload) {
    state.pay.price = payload.price;
    state.pay.count = payload.count;
  },
  [types.GET_REFUND_REASON](state, reasons) {
    state.refund.items = reasons;
    state.refund.toggle = true;
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
