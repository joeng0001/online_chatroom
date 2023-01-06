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
    },
    setUserID(state, userID) {
      state.userID = userID
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUserID({ commit }, userID) {
      commit('setUserID', userID)
    },
  }
}
export default store