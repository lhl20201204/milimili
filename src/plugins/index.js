import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
import { mixin } from './mixin'
import { directive } from './directive'
import { useMiddleware } from './useMiddleWare'
export default {
  install: function (App) {
    mixin(App)
    directive(App)
    useMiddleware()
    const instance = App.config.globalProperties
    instance.$showSubInterface = getShowSubInterface(App)
    instance.$addHover = addHover
  }
}
