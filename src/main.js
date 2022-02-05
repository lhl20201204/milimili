import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import { mountApp } from './mount'
const vm = mountApp(App).mount('#app')

export function pageLeaveVideoPage () {
  vm.$socket.emit('videoDisconnect')
}
