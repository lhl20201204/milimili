import config from '@/config'
import middleware, { useMiddleWare } from '@/middleware'

const getSplitRoutes = (arr, parentPath = '', parentFile = '', isNested = true) => {
  return arr.reduce((prev, { path, children, nested = true }) => {
    const name = path[0].toUpperCase() + path.slice(1)
    const routePath = parentPath + '/' + path
    const selfPath = (parentFile ? '' : '/') + path
    const routeFile = parentFile + '/' + name
    const childrenRoute = getSplitRoutes(children || [], routePath, routeFile, nested)
    if (nested && childrenRoute.length > 0) {
      const redirect = children.filter(v => v.redirect)
      childrenRoute.unshift({
        path: routePath,
        redirect: routePath + '/' + (redirect.length > 0 ? redirect[0].path : childrenRoute[0].path)
      })
    }
    return [...prev, {
      path: isNested ? selfPath : routePath,
      name,
      component: function () {
        return ((params) => {
          useMiddleWare(params.service, middleware.checkMiddleWare, ['setCtx'], params.service) // 使用中间键，监听网络方法调用
          return new Promise((resolve) => {
            import('@/views' + routeFile).then(res1 => {
              const instance = <res1.default {...params}/>
              resolve(instance)
            })
          })
        })({ service: require('@/service/' + routeFile.split('/')[1]).default })
      },
      children: nested ? childrenRoute : []
    }, ...(nested ? [] : childrenRoute)]
  }, [])
}

export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  ...getSplitRoutes(config.routes)
]
