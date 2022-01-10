import config from '@/config'
export const routes = [
  {
    path: '/',
    redirect: '/login'
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
