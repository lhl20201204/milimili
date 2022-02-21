import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false,
    userName: 'visitor',
    userId: 0,
    userAvatarSrc: '',
    userIntroduction: '',
    userTime: '',
    controlBarrage: {
      size: 14,
      type: 1,
      color: '#FFFFFF'
    },
    cannotVisitPage: [],
    hadRenderRoute: false,
    isInChatRoom: false
  },
  mutations: {
    resetLogin (state, payload) {
      state.hadRenderRoute = false
      state.cannotVisitPage = []
    },
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
    changeUserIntroduction (state, payload) {
      state.userIntroduction = payload
    },
    controlBarrageSetting (state, payload) {
      for (const attr in payload) {
        state.controlBarrage[attr] = payload[attr]
      }
    },
    changeIsInChatRoom (state, payload) {
      state.isInChatRoom = payload
    },
    changeUserTime (state, payload) {
      state.userTime = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
