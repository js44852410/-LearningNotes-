import * as types from '../mutation-types';
const stream = weex.requireModule('stream');

const state = {
  activityInfo: {},
};

const getters = {
  activityInfo: state => {
    return state.activityInfo;
  },
};

const actions = {
  /**
   * 获取活动详情
   */
  getActivityInfo({commit, state}, activityID) {
    if (state.activityInfo.activityID !== activityID) {
      stream.fetch({
        method: 'GET',
        type: 'json',
        url: `${__APIDIR}appapi/activitys/${activityID}`,
        headers: {
          "token": __userToken,
        },
      }, (res) => {
        if (res.ok) {
          let data = res.data;

          if (typeof data === "string") {
            data = eval("(" + data + ")");
          }

          commit(types.getActivityInfo, data);
          commit(types.setActivityID, activityID);
        }
      });
    }
  },
};

const mutations = {
  [types.getActivityInfo](state, list) {
    if (list.activityHistoryImages) {
      for (let i = 0, l = list.activityHistoryImages.length; i < l; i++) {
        let item = list.activityHistoryImages[i];

        item.imageList = item.activityBigImageUrl.split(/[?&]/);

        let width = item.imageList[1].split("=")[1];
        let height = item.imageList[2].split("=")[1];
        item.imageList[1] = 670;
        item.imageList[2] = 670 * height / width;
      }
    }

    if (list.activityImages) {
      for (let i = 0, l = list.activityImages.length; i < l; i++) {
        let item = list.activityImages[i];

        item.imageUrl = item.activityBigImageUrl;
      }
    }

    state.activityInfo = list;
  },

  [types.setActivityID](state, activityID) {
    state.activityInfo.activityID = activityID;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};