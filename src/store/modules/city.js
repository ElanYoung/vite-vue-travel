const state = {
  currentCity: localStorage.city || '',
};

/**
 * 必须是同步函数
 */
const mutations = {
  change(state, payload) {
    state.currentCity = payload.city;
    // TODO 异常处理
    localStorage.city = payload.city;
  },
};

/**
 * 可以包含任意异步操作
 */
const actions = {
  changeCity({ commit }, city) {
    commit('change', { city });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
