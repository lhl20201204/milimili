import { appPlugins } from './appPlugins'
import { createApp } from 'vue'
export function mountApp (comp) {
  return appPlugins.reduce((p, c) => {
    return p.use(c)
  }, createApp(comp))
}
