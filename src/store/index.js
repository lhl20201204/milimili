import { createStore } from 'vuex'

export default createStore({
  state: {
    login: false,
    userName: 'visitor',
    userId: 0,
    userAvatarSrc: 'user_default_avatar',
    controlBarrage: {
      size: 14,
      type: 1,
      color: '#FFFFFF'
    }
  },
  mutations: {
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
