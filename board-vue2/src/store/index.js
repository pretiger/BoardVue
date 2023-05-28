import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initUser = {
  id: 0,
  username: null,
  password: null,
  outh: null,
  role: null,
  createDate: null,
};

export default new Vuex.Store({
  state: {
    user: initUser,
    items: [
      { title: 'Login', icon: 'mdi-view-dashboard', show: true, to: '/login' },
      { title: 'Join', icon: 'mdi-view-dashboard', show: true, to: '/join' },
      { title: 'Write', icon: 'mdi-view-dashboard', show: false, to: '/write' },
    ],
  },
  mutations: {
    changeItem(state, value) {
      state.items[2].show = value;
    },
    changeUser(state, user) {
      state.user = user;
    },
    initUserInfo(state) {
      state.user = initUser;
    },
  },
  actions: {
    changeUser({ commit }, user) {
      commit('changeUser', user);
    },
  },
  getters: {
    getUsername(state) {
      return state.user.username;
    },
  },
});
