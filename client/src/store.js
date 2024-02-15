//import createPersistedState from 'vuex-persistedstate'  //deprecated function in vuex
//createPersistedState()

const store = {
  strict: true,
  plugins: [
    //createPersistedState()
  ],
  state: {
    token: null,
    userID: null,
    loginStatus: false,
  },
  socket: {},
  mutations: {
    setToken(state, token) {
      state.token = token??'';
      state.loginStatus = !!token;
    },
    setUserID(state, userID) {
      state.userID = userID;
    },
    setLoginStatus(state, status) {
      state.loginStatus = status;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUserID({ commit }, userID) {
      commit("setUserID", userID);
    },
    setLoginStatus({ commit }, status) {
      commit("setLoginStatus", status);
    },
  },
};
export default store;
