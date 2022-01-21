import config from '@/config'
import middleware, { useMiddleWare } from '@/middleware'
export function useMiddleware () {
  config.routes.forEach(({ path }) => {
    const service = require('@/service/' + (path[0].toUpperCase() + path.slice(1))).default
    useMiddleWare(service, middleware.checkMiddleWare, [], service)
  })
}
