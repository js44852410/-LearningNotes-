import * as types from '../mutation-types';
// import * as apis from '../apis';

const state = {
  modal: {
    toggle: false,
    type: '',
    params: {},
    options: {}
  },
};

const getters = {
  modalToggle: state => state.modal.toggle,
  modalType: state => state.modal.type,
  modalParams: state => state.modal.params,
  modalOptions: state => state.modal.options,
};

const actions = {
  /**
   * 模态框的显/隐开关
   * @param {String} type - 要触发的actionsName.
   * @param {Object} params - actionsName所需要的参数.
   * @param {Object} options - 模态框的一些设置.
   */
  toggleModal({ commit, state }, { type = '', params = {}, options = {}} = {}) {
    const _options = {
      className: '',
      hideCancelBtn: false,
      confirmText: '确认',
      cancelText: '取消'
    };
    self.DD.assign(_options, options);
    commit(types.MODAL, {
      type,
      params,
      options: _options,
    });
  },

  /**
   * 模态框的显/隐开关
   * @param {String} type - 要触发的actionsName.
   */
  hideModal({ commit, state }) {
    commit(types.MODAL_HIDE)
  },
};

const mutations = {
  [types.MODAL](state, payload) {
    state.modal.toggle = !state.modal.toggle;
    state.modal.type = payload.type;
    state.modal.params = payload.params;
    state.modal.options = payload.options;
    const container = self.document.getElementById('container');
    const clientHeight = self.document.body.clientHeight;
    if (state.modal.toggle) {
      container.style.overflow = 'hidden';
      container.style.height = `${clientHeight}px`;
    } else {
      container.style.overflow = 'auto';
      container.style.height = 'auto';
    }
  },
  [types.MODAL_HIDE](state) {
    state.modal.toggle = false;
    const container = self.document.getElementById('container');
    container.style.overflow = 'auto';
    container.style.height = 'auto';
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
