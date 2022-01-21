import axios from 'axios'
import qs from 'qs'
export function get (url, params, config) {
  return axios.get(url, params, config)
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
  return axios.post(url, qs.stringify(params), config)
}

export async function getImg (params) {
  return axios.get('/api/getImg', {
    params,
    responseType: 'blob'
  }).then(async res => {
    if (res.data && res.data.type === 'application/json') {
      const text = await res.data.text()
      if (text && parseInt(JSON.parse(text).code) === 404) {
        throw new Error('请求的图片不存在')
      }
    }
    return res
  })
}
