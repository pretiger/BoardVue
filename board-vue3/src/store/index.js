import { createStore } from 'vuex';

const initUser = {
  id: 0,
  username: null,
  password: null,
  role: null,
  email: null,
  createDate: null,
};
export default createStore({
  state: {
    user: initUser,
  },
  getters: {
    getUsername(state) {
      return state.user.username;
    },
  },
  mutations: {
    changeUser(state, val) {
      state.user = val;
      console.log('user : ', state.user);
    },
    initUser(state) {
      state.user = initUser;
    },
  },
  actions: {},
  modules: {},
});
