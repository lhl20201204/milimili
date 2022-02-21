import axios from 'axios'
import qs from 'qs'
import { reactive } from 'vue'
import config from '@/config'
import store from '@/store'
import user from '@/service/User'
export function updateTime (attr) { // 如果出问题去看 user表的time字段值是否是json值
  const time = JSON.parse(store.state.userTime)
  const updateTime = async () => {
    const timeStr = JSON.stringify({
      ...time,
      ...(() => {
        const obj = {}
        obj[attr] = config.time()
        return obj
      })()
    })
    const { data } = await user.updateUser({
      userId: store.state.userId,
      time: timeStr
    })
    if (data.affectedRows !== 1) {
      throw new Error()
    }
    store.commit('changeUserTime', timeStr)
    sessionStorage.setItem('currentUserTime', timeStr)
  }
  updateTime()
  return time[attr]
}

export function get (url, params, config) {
  return axios.get(url, params, config).catch(e => e)
}

export function post (url, params, config) {
  const isFormData = params instanceof FormData
  axios.interceptors.request.use(function (config) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  return axios.post(url, isFormData ? params : qs.stringify(params), config).catch(e => e)
}

async function handleRes (res) {
  if (res.data && res.data.type === 'application/json') {
    const text = await res.data.text()
    if (text && parseInt(JSON.parse(text).code) === 404) {
      throw new Error('请求的资源不存在')
    }
  }
  return res
}

export async function getImg (params) {
  if (config.avatarUseCache && !config.avatarHadCache(config.avatarCacheMap, params.path)) {
    config.avatarCacheMap[params.path] = new Promise((resolve) => {
      (async () => {
        const { data } = await get('/api/image/getImg', {
          params,
          responseType: 'blob'
        }).then(handleRes)
        resolve({ data })
      })()
    })
  }
  return config.avatarUseCache && config.avatarHadCache(config.avatarCacheMap, params.path) ? config.avatarCacheMap[params.path] : get('/api/image/getImg', {
    params,
    responseType: 'blob'
  }).then(handleRes)
}

export async function getPlayVideo (params) {
  return get('/api/video/getVideo', {
    params,
    responseType: 'blob'
  }).then(handleRes)
}
const cacheBuffer = {}
export async function multipleRequestMerge (method, params, arr) {
  //  本方法：可以自由拼接请求结果，自行决定请求方法的串行与同步运行，
  // 创作原因，如果全部数据都由后端去拼接，那延迟时间太高了，
  // 所以我想了这个办法，通过lastResult 方法去获取部分结果
  // 再用cb函数加入默认的属性值，将数据传给组件操作，等到后续请求结果获取时，再交由组件自己去patch。
  // 一个数据所有依赖的方法集中写在一起，方便操作
  // -------------------------------------------------------
  // 自定义意义说明
  // 同步运行： 同时开始运行；
  // 串行运行： 本次运行完才轮到下一个运行；
  // LAST-REQUEST-RESULT: 上次请求方法获得的结果， 传给本次请求方法操作
  // ITEM: RESOURCE 的子项
  // RESOURCE：操作的数组，用于遍历，根据子项的某些属性，（再加上自己加的属性【可不加】）
  //           开始本次请求方法
  //          伪代码如下：
  //          本次请求方法：可以由【method】获得，或者【getMethods(ITEM)】获得
  //          本次请求参数： 可以由【ITEM的某些属性组成的请求参数】或者 【通过getParams(ITEM)返回的参数】获得
  //          RESOURCE.map(ITEM => 本次请求方法(本次请求参数))
  // -------------------------------------------------------
  // 方法请求参数说明
  // method: 最原始请求方法
  // params: 最原始请求方法的参数
  // arr: 配置对象数组：子项为 配置对象 或 配置对象数组
  // 下面的字母b,c...全都代表一个网路请求的配置对象，或则 配置对象数组，
  // -------------------------------------------------------
  // 默认最顶层arr下的子项为串行
  // 比如 (a,params,[b,c]) b,c是最顶层arr的子项，则将 a的请求结果传给b去操作，再将b的请求结果传给c操作
  // 不是最顶层arr的子项，并行用数组表示
  // 比如 (a,params,[[b,c,d]]) 则将 a的请求结果传给b,c,d去操作，b,c,d是同步运行的，
  // 即是将a的请求结果分别传给b,c,d 操作，最后合并b,c,d结果
  // 比如 (a,params,[b,[c,d]]) b是最顶层arr的子项,c，d不是最顶层arr的子项，
  // 则将 a的请求结果传给b去操作，c,d是同步运行的，即是将b的请求结果分别传给c,d 操作，最后合并c,d结果
  // 不是最顶层arr的子项，想串行操作
  // 比如 const f = [b,c]; f.serial = ture;
  // const g = [d,e]; g.serial = ture;
  // (a,params,[[f,g]]) 则将 a的请求结果传给f,g去操作，f,g是同步运行的，b,c 是串行运行，d,e是串行运行的，
  // 即 a的请求结果传给b操作，b的请求结果传给c操作，a的请求结果传给d操作，d的请求结果传给e操作，最后合并c,e结果
  // -------------------------------------------------------
  // 配置对象参数说明（method, attrs, cb, lastResult, getMethod, getParams, serial, getProxyAttr, cache）
  // method ：type：function, 网络请求方法， 优先级低于getMethod方法返回的网络请求方法
  // attrs: type：array, 挑选ITEM的某些属性组成请求参数, 优先级低于getParams方法返回的网络请求参数
  // cb: type：function, 参数（本次请求结果，ITEM） ，返回结果结构拼到ITEM上
  // lastResult: type：function, 参数(LAST-REQUEST-RESULT) ，如果有返回结果则重置LAST-REQUEST-RESULT
  //             伪代码：const result=lastResult（LAST-REQUEST-RESULT）
  //                    LAST-REQUEST-RESULT = result？result：LAST-REQUEST-RESULT
  // getMethod: type：function, 参数（ITEM），返回结果为请求方法
  // getParams: type：function, 参数（ITEM), 返回结果为请求参数
  // serial: type： boolean， 给数组设置，用于设置串行运行, 默认false
  // getProxyAttr：type：function， 不配置或者结果为空则 RESOURCE= LAST-REQUEST-RESULT，
  //              若结果为 '0.comment'则 RESOURCE= LAST-REQUEST-RESULT[0].comment
  // cache: type；object，缓存配置对象
  // {key: 根据params的某些属性组成新的唯一标识符，
  // mapName: 打算存的对象名字
  // getEnable: type：function，参数（ITEM）不传默认开启缓存，返回结果为是否开启 }

  arr = arr || []
  const pick = (obj, attrs) => { // 筛选某些属性形成新的对象
    const ret = {}
    for (const attr in obj) {
      if (attrs.includes(attr)) {
        ret[attr] = obj[attr]
      }
    }
    return ret
  }

  const generateUniqueKey = (obj, attrs) => {
    const obje = pick(obj, attrs)
    let ret = ''
    for (const i in obje) {
      ret = ret + obje[i] + '#'
    }
    return ret
  }

  const reduceFn = (p, next) => {
    return p.then(getHandle(next))
  }

  const flattern = (arr, index = 0) => {
    let ret = {}
    if (Array.isArray(arr) && index < 3) { // 针对数组只结构俩层
      ret = { ...ret, ...arr.reduce((p, v) => ({ ...p, ...flattern(v, index + 1) }), {}) }
    } else {
      ret = { ...ret, ...arr }
    }
    return ret
  }

  const get = (obj, attrStr) => {
    return attrStr.split('.').reduce((p, v) => p[v], obj)
  }

  const set = (obj, attrStr, value) => {
    const arr = attrStr.split('.')
    const o = arr.slice(0, -1).reduce((p, v) => p[v], obj)
    o[arr[arr.length - 1]] = value
  }

  const canUseCache = (cache, c) => {
    return (cache instanceof Object && (!cache.getEnable || cache.getEnable(c)) && cache.key && cache.mapName)
  }

  const getHandle = (item) => {
    const { method, attrs, cb, lastResult, getMethod, getParams, serial, getProxyAttr, cache } = item
    return async resource => {
      if (typeof lastResult === 'function') {
        const temp = lastResult(resource)
        if (temp) {
          resource = temp
        }
      }
      let res = null
      let tempAttr = null
      let request = null
      let cacheMap = null
      if (typeof getProxyAttr === 'function') {
        tempAttr = getProxyAttr()
      }
      res = tempAttr ? get(resource, tempAttr) : resource
      const isArray = Array.isArray(item)
      const callBack = cb || (x => x) // cb 函数返回一个挂载在（ITEM），假设 ITEM为 {a: 1} , 本次请求结果为 {b:2}
      //  默认本次结果全部解构拼在（ITEM），则最终为 {a:1, b:2}
      // 如果像把本次结果存储在（ITEM） 上的xxx属性， cb设为（data）=> ({xxx: data})，则最终为 {a:1 ,xxx: {b:2} }

      const ret = await Promise.all((Array.isArray(res) ? res : [res]).map(async c => {
        if (!isArray) {
          const requestParams = getParams ? getParams(c) : pick(c, attrs)
          const requestMethod = (getMethod ? getMethod(c) : method)
          const useCache = canUseCache(cache, c)
          const uniqueKey = useCache ? generateUniqueKey(requestParams, cache.key) : undefined
          if (useCache) {
            if (!cacheBuffer[cache.mapName]) {
              cacheBuffer[cache.mapName] = {}
            }
            cacheMap = cacheBuffer[cache.mapName]
            if (!(cacheMap[uniqueKey] instanceof Promise)) {
              cacheMap[uniqueKey] = new Promise((resolve) => {
                (async () => {
                  const { data } = await requestMethod(requestParams)
                  resolve({ data })
                })()
              })
            }
          }
          request = useCache ? cacheMap[uniqueKey] : requestMethod(requestParams)
        }
        const resource = await (isArray ? (serial ? (Array.isArray(item) ? item : [item]).reduce(reduceFn, Promise.resolve(c)) : Promise.all(item.map(next => (Array.isArray(next) ? next : [next]).reduce(reduceFn, Promise.resolve(c))))) : request)
        const data = isArray ? flattern(resource) : resource.data
        return {
          ...c,
          ...callBack(data, c)
        }
      }))
      if (tempAttr) {
        set(resource, tempAttr, ret)
        return resource
      }
      return ret
    }
  }

  return arr.reduce(
    reduceFn
    , Promise.resolve((await method(params)).data))
}

export async function loadById (res, method, params, arr, options) {
  let data = await multipleRequestMerge(method, params, arr)
  if (Array.isArray(res.v)) {
    res.v.splice(0, res.v.length)
    if (!Array.isArray(data)) {
      data = [data]
    }
    if (options && options.filter) {
      const t = options.filter(data)
      if (t) {
        data = t
      }
    }
    res.v.splice(0, 0, ...data)
    res.v.hadLoad = true
    if (Array.isArray(data)) {
      res.v.datahadLoadedButResultNull = !data.length
    }
  } else {
    if (!data) {
      return console.error('返回的结果为空')
    }
    res.v = reactive(data)
  }
}
