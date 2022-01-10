import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import plugins from './plugins'
export const appPlugins = [
  router,
  store,
  Antd,
  plugins
]
