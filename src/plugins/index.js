import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
export default {
  install: function (Vue) {
    const instance = Vue.config.globalProperties
    instance.$showSubInterface = getShowSubInterface(Vue)
    instance.$addHover = addHover
  }
}
