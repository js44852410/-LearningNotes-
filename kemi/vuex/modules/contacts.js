import * as types from '../mutation-types';

const stream = weex.requireModule('stream');

const state = {
  contactsList: [{}],
  selectedList: [],
  contactsInfo: {},
};

const getters = {
  contactsList: state => state.contactsList,
  selectedList: state => state.selectedList,
  contactsInfo: state => state.contactsInfo,
};

const actions = {
  /**
   * 获取联系人列表
   */
  getContactsList({commit, state}, selectedList = []) {
    stream.fetch({
      method: 'POST',
      type: 'json',
      url: `${__APIDIR}appapi/user/topContacts/getByPage`,
      headers: {
        "token": __userToken,
      },
    }, (res) => {
      if (res.data.code === "1") {
        commit(types.getContactsList, res.data.result);
        commit(types.setSelectedList, selectedList);
      }
    });
  },

  getContactsInfo({commit, state}, id) {
    if (id === "") {
      commit(types.getContactsInfo);
    } else if (state.contactsInfo.id !== id) {
      let contactsList = state.contactsList;

      for (let i = 0, l = contactsList.length; i < l; i++) {
        if (contactsList[i].id === id) {
          commit(types.getContactsInfo, contactsList[i]);
          break;
        }
      }
    }
  },

  changeSelectedList({commit, state}, selectedList = []) {
    commit(types.setSelectedList, selectedList);
  },

  deleteContacts({commit, state}, id) {
    commit(types.deleteContacts, id);
  },
};

const mutations = {
  [types.getContactsList](state, list = []) {
    for (let i = 0, l = list.length; i < l; i++) {
      list[i].isSelected = false;
    }

    state.contactsList = list;
  },

  [types.getContactsInfo](state, contactsInfo = {}) {
    state.contactsInfo = contactsInfo;
  },

  [types.setSelectedList](state, list = []) {
    state.selectedList = list;

    for (let i = 0, l = state.contactsList.length; i < l; i++) {
      if (state.selectedList.indexOf(state.contactsList[i].id) === -1) {
        state.contactsList[i].isSelected = false;
      } else {
        state.contactsList[i].isSelected = true;
      }
    }
  },

  [types.deleteContacts](state, id) {
    let index = -1,
      selectedIndex = -1;

    for (let i = 0, l = state.contactsList.length; i < l; i++) {
      if (state.contactsList[i].id === id) {
        index = i;
        break;
      }
    }

    state.contactsList.splice(index, 1);

    for (let i = 0, l = state.selectedList.length; i < l; i++) {
      if (state.selectedList[i] === id) {
        selectedIndex = i;
        break;
      }
    }

    if (selectedIndex !== -1) {
      state.selectedList.splice(selectedIndex, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};