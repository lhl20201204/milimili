import config from '@/config'
export const routes = [
  {
    path: '/',
    component: () => import('@/views/Login')
  },
  ...config.routes.map(({ path }) => {
    const name = path[0].toUpperCase() + path.slice(1)
    return {
      path: '/' + path,
      name,
      component: () => import('@/views/' + name)
    }
  })
]
