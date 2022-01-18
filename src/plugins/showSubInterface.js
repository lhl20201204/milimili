import { createApp } from 'vue'
import { appPlugins } from '../appPlugins'
import 'ant-design-vue/dist/antd.css'
export function getShowSubInterface (app) {
  const els = new Map()
  return function showSubInterface (comp, isShow, el) {
    if (!els.get(el)) {
      const instance = appPlugins.reduce((p, c) => {
        return p.use(c)
      }, createApp(comp)).mount(document.createElement('div'))
      instance.appContext = app._context
      el.appendChild(instance.$el)
      els.set(el, instance)
    }
    els.get(el).show = isShow
  }
}
