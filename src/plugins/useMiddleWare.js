import config from '@/config'
import middleware, { useMiddleWare } from '@/middleware'
import { firstToUpperCase } from '@/utils'
export function useMiddleware () {
  config.routes.forEach(({ path }) => {
    const service = require('@/service/' + (firstToUpperCase(path))).default
    useMiddleWare(service, middleware.checkMiddleWare, [], service)
  })
}
