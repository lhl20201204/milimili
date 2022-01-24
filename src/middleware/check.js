import { message } from 'ant-design-vue'
export default (store) => (next) => function fn () {
  return new Promise((resolve, reject) => {
    async function run () {
      try {
        const res = await next(...arguments)
        if (res instanceof Error) {
          throw res
        }
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
