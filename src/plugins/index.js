import axios from 'axios'
import { post } from './network'
import { addHover } from './addHover'
import { getShowSubInterface } from './showSubInterface'
import { mixin } from './mixin'
import { directive } from './directive'
export default {
  install: function (App) {
    mixin(App)
    directive(App)
    const instance = App.config.globalProperties
    instance.$axios = axios
    instance.$post = post
    instance.$showSubInterface = getShowSubInterface(App)
    instance.$addHover = addHover
  }
}
