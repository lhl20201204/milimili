import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import config from '@/config'

export default new VueSocketIO({
  debug: true,
  connection: SocketIO(config.socketUrl) // 连接后端地址
})
