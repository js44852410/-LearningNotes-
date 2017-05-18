/**
 * Created by zxh on 2017/3/27.
 */
import * as types from '../mutation-types';
const stream = weex.requireModule('stream');

const state = {
  orderInfo: {},
};

const getters = {
  orderInfo: state => state.orderInfo,
};

const actions = {
  /**
   * 获取订单详情
   */
  getOrderInfo({commit, state}, {orderNumber, queryAgain} = {}) {
    if (queryAgain || state.orderInfo.orderNumber !== orderNumber) {
      stream.fetch({
        method: 'POST',
        type: 'json',
        url: `${__APIDIR}appapi/userActivity/getOrderDetail`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "token": __userToken,
        },
        body: `{"orderNumber":"${orderNumber}"}`,
      }, res => {
        if (res.data.code === "1") {
          commit(types.getOrderInfo, res.data.result);
        }
      });
    }
  },

  changeOrderInfo({commit, state}, orderInfo) {
    if (state.orderInfo.orderNumber !== orderInfo.orderNumber) {
      commit(types.getOrderInfo, orderInfo);
    }
  },
};

const mutations = {
  [types.getOrderInfo](state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};