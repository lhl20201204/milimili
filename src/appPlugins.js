import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import plugins from './plugins'
store.commit('changeLoginStatus', sessionStorage.getItem('login'))
store.commit('changeUserStatus', sessionStorage.getItem('currentUser'))
store.commit('changeUserId', sessionStorage.getItem('currentUserId'))
store.commit('changeUserAvatarSrc', sessionStorage.getItem('currentUserAvatarSrc'))
export const appPlugins = [
  router,
  store,
  Antd,
  plugins
]
