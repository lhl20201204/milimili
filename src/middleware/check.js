import { message } from 'ant-design-vue'

export default (store) => (next) => function fn () {
  return new Promise((resolve, reject) => {
    if (!store.ctx) {
      message.error('当前方法没有实例')
      console.log('我是中间键劫持请求方法', fn.toString())
      reject(new Error('当前方法没有实例'))
    } else {
      next(...arguments, resolve)
    }
  }
  )
}
