import { message } from 'ant-design-vue'
export default (store) => (next) => function () {
  if (!store.ctx) {
    message.error('当前方法没有实例')
  } else {
    next(...arguments)
  }
}
