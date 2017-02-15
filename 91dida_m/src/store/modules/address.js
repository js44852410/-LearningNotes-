import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  addressList: [],
  regions: [],
};

const getters = {
  addressList: state => state.addressList,
  addressRegions: state => state.regions,
};

const actions = {
  /**
   * 获取地址列表
   */
  getAddressList({ commit, state }) {
    const body = { ...apis.GET_ADDRESS_LIST };
    self.DD.loading();
    self.DD.get(body, (data) => {
      if (data.result === 'success') {
        commit(types.GET_ADDRESS_LIST, data.info);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 删除一条地址
   */
  deleteItemAddress({ commit, state }, { id = 0, index = -1, isDefault = 0 } = {}) {
    if (+isDefault) {
      self.toast('默认地址不能删除的哟~');
      return;
    } else if (state.addressList.length === 1) {
      self.toast('至少要保留一条收货地址哟~');
      return;
    }
    const body = { ...apis.DELETE_ITEM_ADDRESS };
    body.id = id;
    self.DD.loading();
    self.DD.get(body, data => {
      if (data.result === 'success') {
        self.toast('删除成功!');
        commit(types.DELETE_ITEM_ADDRESS, index);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 设为默认地址
   */
  setDefaultAddress({ commit, state }, { id = 0, isDefault = 0, index = -1 }) {
    if (+isDefault) return;
    const body = { ...apis.SET_DEFAULT_ADDRESS };
    body.id = id;
    self.DD.loading();
    self.DD.get(body, data => {
      if (data.result === 'success') {
        self.toast('设置成功!');
        commit(types.SET_DEFAULT_ADDRESS, index);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 获取省市区
   */
  getRegionList({ commit, state }) {
    const storageRegions = self.JSON.parse(self.localStorage.getItem('regions'));
    if (storageRegions) {
      commit(types.GET_REGION_LIST, storageRegions);
      return;
    }
    const body = { ...apis.GET_REGION_LIST };
    self.DD.loading();
    self.DD.get(body, (data) => {
      if (data.result === 'success') {
        commit(types.GET_REGION_LIST, data.info);
        self.localStorage.setItem('regions', self.JSON.stringify(data.info));
      }
    });
  },
};

const mutations = {
  [types.GET_ADDRESS_LIST](state, list) {
    state.addressList = list;
  },
  [types.GET_REGION_LIST](state, list) {
    state.regions = list;
  },
  [types.DELETE_ITEM_ADDRESS](state, index) {
    state.addressList.splice(index, 1);
  },
  [types.SET_DEFAULT_ADDRESS](state, setIndex) {
    state.addressList.map((item, index) => {
      if (index === setIndex) {
        item.is_default = 1;
      } else {
        item.is_default = 0;
      }
    });
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
