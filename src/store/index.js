import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false,
    userName: 'visitor'
  },
  mutations: {
    changeLoginStatus (state, payload) {
      state.login = payload
    },
    changeUserStatus (state, payload) {
      state.userName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
