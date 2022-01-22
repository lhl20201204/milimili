import { message } from 'ant-design-vue'
export default (store) => (next) => function fn () {
  return new Promise((resolve, reject) => {
    console.log('请求')
    try {
      next(...arguments, resolve, reject)
    } catch (e) {
      message.error('网络请求失败')
      console.error('我是中间键劫持请求方法', fn.toString())
      reject(e)
    }
  }
  )
}
