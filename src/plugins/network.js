import axios from 'axios'
import qs from 'qs'
export function post (url, option, config) {
  axios.interceptors.request.use(function (config) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  return axios.post(url, qs.stringify(option), config)
}
