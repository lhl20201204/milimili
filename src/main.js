import App from './App'
import 'ant-design-vue/dist/antd.css'
import { mountApp } from './mount'
const vm = mountApp(App).mount('#app')

export function pageLeaveVideoPage () {
  vm.$socket.emit('videoDisconnect')
}

export function pageLeaveMessagePage () {
  console.log('退出聊天室')
  vm.$socket.emit('messageDisconnect')
}
