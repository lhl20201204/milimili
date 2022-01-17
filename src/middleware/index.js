import checkMiddleWare from './check'
export function useMiddleWare (proxyObject, middleWares, unProxyAttr, ctx) {
  unProxyAttr = unProxyAttr || []
  ctx = ctx || {}
  if (!Array.isArray(middleWares)) {
    middleWares = [middleWares]
  }
  const attrs = Object.getOwnPropertyNames(proxyObject).filter(attr => !unProxyAttr.includes(attr) && (typeof proxyObject[attr] === 'function'))
  middleWares = middleWares.map(v => v(ctx)).reverse()
  for (const attr of attrs) {
    const originMethod = proxyObject[attr]
    Object.defineProperty(proxyObject, attr, {
      get () {
        return middleWares.reduce((m, v) => v(m), originMethod)
      }
    })
  }
}

export default {
  useMiddleWare,
  checkMiddleWare
}
