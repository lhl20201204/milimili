import axios from 'axios'
import qs from 'qs'
export function get (url, params, config) {
  return axios.get(url, params, config).catch(e => e)
}

export function post (url, params, config) {
  axios.interceptors.request.use(function (config) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  return axios.post(url, qs.stringify(params), config).catch(e => e)
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
  return get('/api/getImg', {
    params,
    responseType: 'blob'
  }).then(handleRes)
}

export async function getPlayVideo (params) {
  return get('/api/getVideo', {
    params,
    responseType: 'blob'
  }).then(handleRes)
}

export async function multipleRequestMerge (method, params, arr) {
  // 调用示例
  // const data = await multipleRequestMerge(s.getCommentById,
  //   params,
  // [
  //   [
  //     [
  //       [
  //         {
  //           method: s.getUserById,
  //           attrs: ['userId']
  //         },
  //         {
  //           method: s.getPlayById,
  //           attrs: ['videoId'],
  //           cb: data => ({ play: data })
  //         }
  //       ],
  //       {
  //         method: s.getBarrageById,
  //         attrs: ['videoId'],
  //         cb: data => ({ barrage: data })
  //       }
  //     ],
  //     {
  //       method: s.getLoveById,
  //       attrs: ['commentId'],
  //       cb: data => ({ love: data })
  //     }
  //   ]
  // ]
  // )
  // method初始请求，params请求参数，第一个结果返回后的arr数组链式调用顺序，
  // arr参数为对象时 method ：网络请求方法，attrs：依赖上次请求结果的哪些属性，cb： 本次请求结果的处理函数，可不传， 为数组则解构到下一层
  arr = arr || []
  const pick = (obj, attrs) => { // 筛选某些属性形成新的对象
    const ret = Object.create(null)
    for (const attr in obj) {
      if (attrs.includes(attr)) {
        ret[attr] = obj[attr]
      }
    }
    return ret
  }

  const reduceFn = (p, next) => {
    return p.then(getHandle(next.method, next.attrs, next, next.cb))
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

  const getHandle = (method, attrs, item, cb) =>
    async res => {
      const isArray = Array.isArray(item)
      cb = cb || (x => x) // cb 函数返回一个挂载在（上次请求结果对象）提供的对象，假设 上次请求结果为 {a: 1} , 本次请求结果为 {b:2}
      //  默认本次结果全部解构拼在（上次请求结果对象），则最终为 {a:1, b:2}
      // 如果像把本次结果存储在（上次请求结果对象） 上的xxx属性， cb设为（data）=> ({xxx: data})，则最终为 {a:1 ,xxx: {b:2} }
      return await Promise.all((Array.isArray(res) ? res : [res]).map(async c => {
        const resource = await (isArray ? Promise.all(item.map(next => (Array.isArray(next) ? next : [next]).reduce(reduceFn, Promise.resolve(c)))) : method(pick(c, attrs)))
        const data = isArray ? flattern(resource) : resource.data
        return {
          ...c,
          ...cb(data)
        }
      }))
    }

  return arr.reduce(
    reduceFn
    , Promise.resolve((await method(params)).data))
}
