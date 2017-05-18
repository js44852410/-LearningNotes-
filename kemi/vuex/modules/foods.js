import * as types from '../mutation-types';

const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');

const state = {
  id: "",
  foodsList: [],
  keywords: "",
  page: 0,
  loadmoreoffset: 1000,
  ajaxFlag: false,
};

const getters = {
  id: state => state.id,
  foodsList: state => state.foodsList,
  keywords: state => state.keywords,
  page: state => state.page,
  loadmoreoffset: state => state.loadmoreoffset,
};

const actions = {
  /**
   * 获取食物列表
   */
  getFoodsList({commit, state}, {keywords = state.keywords || "", page = state.page || 0, size = 5} = {}) {
    if (!state.ajaxFlag) {
      commit(types.changeAjaxFlag);
      stream.fetch({
        method: 'POST',
        type: 'json',
        url: `${__APIDIR}appapi/foodEat/getByPage`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: `{"page":${page}, "size":${size}, "keyWord":"${keywords}"}`,
      }, res => {
        if (res.ok) {
          commit(types.changeAjaxFlag);
          let data = res.data;

          if (typeof data === "string") {
            data = eval("(" + data + ")");
          }

          if (data.code === "1") {
            if (data.result.length) {
              commit(types.getFoodsList, data.result);
              commit(types.setKeywords, keywords);
              commit(types.setPage, ++page);
            } else {
              commit(types.noloadmoreoffset, -500);
            }
          } else {
            modal.toast({
              message: "请求数据失败",
              duration: 1,
            });
          }
        }
      });
    }
  },

  /**
   * 重置分屏数据
   */
  resetPageInfo({commit, state}) {
    commit(types.noloadmoreoffset, 1000);
    commit(types.setPage, 0);
    commit(types.getFoodsList, []);
  },

  /**
   * 重置搜索关键词
   */
  resetKeywords({commit, state}, keywords = "") {
    commit(types.setKeywords, keywords);
  },

  /**
   * 记录状态
   */
  rememberInfo({commit, state}, id) {
    commit(types.rememberInfo, id);
  },
};

const mutations = {
  [types.getFoodsList](state, list) {
    if (state.page) {
      state.foodsList = state.foodsList.concat(list);
    } else {
      state.foodsList = list;
    }
  },

  [types.setKeywords](state, keywords) {
    state.keywords = keywords;
  },

  [types.setPage](state, page) {
    state.page = page;
  },
  [types.noloadmoreoffset](state, num) {
    state.loadmoreoffset = num;
  },

  [types.changeAjaxFlag](state) {
    state.ajaxFlag = !state.ajaxFlag;
  },

  [types.rememberInfo](state) {
    state.id = !state.id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};