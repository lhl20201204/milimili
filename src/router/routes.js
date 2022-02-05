import config from '@/config'
import { markRaw } from 'vue'
import { firstToUpperCase } from '@/utils'

const getSplitRoutes = (arr, parentPath = '', parentFile = '', isNested = true) => {
  return arr.reduce((prev, { path, children, nested = true }) => {
    const name = firstToUpperCase(path)
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
          return new Promise((resolve) => {
            import('@/views' + routeFile).then(res1 => {
              resolve({
                render () {
                  return <res1.default />
                }
              })
            })
          })
        })(markRaw({}))
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
