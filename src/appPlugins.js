import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import plugins from './plugins'
store.commit('changeLoginStatus', sessionStorage.getItem('login'))
store.commit('changeUserStatus', sessionStorage.getItem('currentUser'))
store.commit('changeUserId', sessionStorage.getItem('currentUserId'))
store.commit('changeUserAvatarSrc', sessionStorage.getItem('currentUserAvatarSrc'))
store.commit('changeUserIntroduction', sessionStorage.getItem('currentUserIntroduction'))
store.commit('changeUserTime', sessionStorage.getItem('currentUserTime'))
export const appPlugins = [
  router,
  store,
  Antd,
  plugins
]
