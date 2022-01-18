import { message } from 'ant-design-vue'
export default (store) => (next) => function () {
  return new Promise((resolve, reject) => {
    if (!store.ctx) {
      message.error('当前方法没有实例')
      reject(new Error('当前方法没有实例'))
    } else {
      next(...arguments, resolve)
    }
  }
  )
}
