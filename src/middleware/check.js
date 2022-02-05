import { message } from 'ant-design-vue'
import _ from 'lodash'
import config from '@/config'
function handle (arr, res) {
  return _.reduce(arr, (p, v) => v(p), res)
}

const transFormDate = (res) => {
  if (res && (res instanceof Object || Array.isArray(res))) {
    for (var attr in res) {
      if (typeof res[attr] === 'string' && res[attr].match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})T(\d{2,2}):(\d{2,2}):(\d{2,2})\.(\d{3,3})Z$/)) {
        res[attr] = config.time(new Date(res[attr]))
      }
      transFormDate(res[attr])
    }
  }
  return res
}
export default (store) => (next) => function fn () {
  return new Promise((resolve, reject) => {
    async function run () {
      try {
        const res = await next(...arguments)
        if (res instanceof Error) {
          throw res
        }
        res.data = handle([transFormDate], res.data)
        resolve(res)
      } catch (e) {
        message.error('网络请求失败', e)
        console.error('我是中间键劫持请求方法', fn.toString())
        reject(e)
      }
    }
    run(...arguments)
  }
  )
}
