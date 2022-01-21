import { message } from 'ant-design-vue'

export function addHover (el, comp) {
  if (!el || !el.style || !el.addEventListener) {
    message.error('挂载失败')
    return console.error('挂载失败')
  }
  el.style.position = 'relative'
  el.addEventListener('mouseenter', function () {
    this.$showSubInterface(comp, true, el)
  }.bind(this))
  el.addEventListener('mouseleave', function () {
    this.$showSubInterface(comp, false, el)
  }.bind(this))
}
