/**
 * Created by zxh on 2017/3/27.
 */
import * as types from '../mutation-types';
const stream = weex.requireModule('stream');

const state = {
  userInfo: {},
};

const getters = {
  userInfo: state => state.userInfo,
};

const actions = {
  /**
   * 获取个人信息
   */
  getUserInfo({commit, state}) {
    if (__userToken && !state.userInfo.mobile) {
      stream.fetch({
        method: 'GET',
        type: 'json',
        url: `${__APIDIR}appapi/userinfo`,
        headers: {
          "token": __userToken,
        },
      }, res => {
        if (res.data.code === "1") {
          commit(types.getUserInfo, res.data.result);
        }
      });
    }
  },
};

const mutations = {
  [types.getUserInfo](state, userInfo) {
    state.userInfo = userInfo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};