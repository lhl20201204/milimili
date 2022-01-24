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
