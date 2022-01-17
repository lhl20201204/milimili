import axios from 'axios'
import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
import { mixin } from './mixin'
export default {
  install: function (App) {
    mixin(App)
    const instance = App.config.globalProperties
    instance.$axios = axios
    instance.$showSubInterface = getShowSubInterface(App)
    instance.$addHover = addHover
  }
}
