import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
