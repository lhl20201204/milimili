import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false
  },
  mutations: {
    changeLoginStatus (state, payload) {
      state.login = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
