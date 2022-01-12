import config from '@/config'

const getSplitRoutes = (arr, parentPath = '', parentFile = '', isNested = true) => {
  return arr.reduce((prev, { path, children, nested = true }) => {
    const name = path[0].toUpperCase() + path.slice(1)
    const routePath = parentPath + '/' + path
    const selfPath = (parentFile ? '' : '/') + path
    const routeFile = parentFile + '/' + name
    const childrenRoute = getSplitRoutes(children || [], routePath, routeFile, nested)
    // console.log(children, nested, routePath)
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
      component: () => import('@/views' + routeFile),
      children: nested ? childrenRoute : []
    }, ...(nested ? [] : childrenRoute)]
  }, [])
}

// const getNestedRoutes = (arr, parentPath = '', parentFile = '') => {
//   return arr.reduce((prev, { path, children }) => {
//     const name = path[0].toUpperCase() + path.slice(1)
//     const routePath = parentPath + '/' + path
//     const selfPath = (parentFile ? '' : '/') + path
//     const routeFile = parentFile + '/' + name
//     const childrenRoute = getNestedRoutes(children || [], routePath, routeFile)
//     if (childrenRoute.length > 0) {
//       childrenRoute.unshift({
//         path: routePath,
//         redirect: routePath + '/' + childrenRoute[0].path
//       })
//     }
//     return [...prev, {
//       path: selfPath,
//       name,
//       component: () => import('@/views' + routeFile),
//       children: childrenRoute
//     }]
//   }, [])
// }

// console.log(getNestedRoutes(config.routes))

export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  ...getSplitRoutes(config.routes)
]
console.log(routes)
