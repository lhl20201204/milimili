import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
// import Antd from 'ant-design-vue'
// import plugins from './plugins'
import { appPlugins } from './appPlugins'
import 'ant-design-vue/dist/antd.css'
appPlugins.reduce((p, c) => {
  return p.use(c)
}, createApp(App)).mount('#app')
