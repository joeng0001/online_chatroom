//import createPersistedState from 'vuex-persistedstate'
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
  socket: {

  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.loginStatus = !!(token)
      localStorage.setItem('token', token);
    },
    setUserID(state, userID) {
      state.userID = userID
      localStorage.setItem('userID', userID);
    },
    setLoginStatus(state, status) {
      state.loginStatus = status
      localStorage.setItem('status', status);
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUserID({ commit }, userID) {
      commit('setUserID', userID)
    },
    setLoginStatus({ commit }, status) {
      commit('setLoginStatus', status)
    },
  }
}
export default store