import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false,
    userName: 'visitor',
    userId: 0,
    userAvatarSrc: '',
    controlBarrage: {
      size: 14,
      type: 1,
      color: '#FFFFFF'
    },
    cannotVisitPage: [],
    hadRenderRoute: false
  },
  mutations: {
    setCannotVisitPage (state, payload) {
      if (Array.isArray) {
        state.cannotVisitPage.splice(0, state.cannotVisitPage.length)
        state.cannotVisitPage.splice(0, 0, ...payload)
        state.hadRenderRoute = true
      } else {
        console.error('payload不是数组')
      }
    },
    changeLoginStatus (state, payload) {
      state.login = payload
    },
    changeUserStatus (state, payload) {
      state.userName = payload
    },
    changeUserId (state, payload) {
      state.userId = payload
    },
    changeUserAvatarSrc (state, payload) {
      state.userAvatarSrc = payload
    },
    controlBarrageSetting (state, payload) {
      for (const attr in payload) {
        state.controlBarrage[attr] = payload[attr]
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
