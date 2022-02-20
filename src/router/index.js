import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import store from '@/store'
import config from '@/config'
import { pageLeaveVideoPage, pageLeaveMessagePage } from '../main'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (from.path.startsWith('/video')) {
    pageLeaveVideoPage()
  }
  if (store.state.isInChatRoom) {
    pageLeaveMessagePage()
  }

  if (to.path !== '/login') {
    if (config.hasAccessNotLogin() || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
