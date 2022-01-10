import axios from 'axios'
import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
export default {
  install: function (App) {
    const instance = App.config.globalProperties
    instance.$axios = axios
    instance.$showSubInterface = getShowSubInterface(App)
    instance.$addHover = addHover
  }
}
