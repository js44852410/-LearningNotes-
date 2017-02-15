import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  info: {
    business_license_image: '',
    identity_card_1_image: '',
    identity_card_2_image: '',
  }
};

const getters = {
  userInfo: state => state.info,
};

const actions = {
  /**
   * 用户中心的用户详细资料
   */
  getUserInfo({ commit, state }) {
    const body = { ...apis.GET_USER_INFO };
    self.DD.loading();
    self.DD.get(body, data => {
      if (data.result === 'success') {
        commit(types.GET_USER_INFO, data.info);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 更新用户信息
   */
  updateUserInfo({ commit, state }, { key = '', value = '' } = {}) {
    commit(types.UPDATE_USER_INFO, {
      key,
      value
    })
  },

  /**
   * 设置用户头像
   */
  setUserHeadImg({ commit, state }, { avatar = '', fullAvatar = '' } = {}) {
    const body = { ...apis.SET_USER_HEAD_IMG };
    body.avatar = avatar;
    self.DD.post(body, (data) => {
      if (data.result === 'success') {
        commit(types.SET_USER_HEAD_IMG, fullAvatar);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 退出登录
   */
  logout({ commit, state }, { callback = null } = {}) {
    const body = { ...apis.LOGOUT };
    self.DD.post(body, data => {
      if (data.result === 'success') {
        if (callback) {
          callback();
        }
      } else {
        self.toast(data.info.errmsg);
      }
    })
  }
};

const mutations = {
  [types.GET_USER_INFO](state, userInfo) {
    state.info = userInfo;
  },
  [types.UPDATE_USER_INFO](state, { key = '', value = '' } = {}) {
    state.info[key] = value;
  },
  [types.SET_USER_HEAD_IMG](state, fullAvatar) {
    state.info.buyer_avatar = fullAvatar;
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
