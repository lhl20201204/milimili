import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
// import { mixin } from './mixin'
import { directive } from './directive'
import { useMiddleware } from './useMiddleWare'
// import socket from '@/socket'
export default {
  install: function (App) {
    const instance = App.config.globalProperties
    instance.$showSubInterface = getShowSubInterface(App)
    instance.$addHover = addHover
    // instance.$socket = socket.io
    // instance.$vueSocketIo = socket
    // mixin(App)
    directive(App)
    useMiddleware()
  }
}
