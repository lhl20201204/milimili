import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import plugins from './plugins'
store.commit('changeLoginStatus', sessionStorage.getItem('login'))
store.commit('changeUserStatus', sessionStorage.getItem('currentUser'))
export const appPlugins = [
  router,
  store,
  Antd,
  plugins
]
