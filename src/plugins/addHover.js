export function addHover (el, comp) {
  el.style.position = 'relative'
  el.addEventListener('mouseenter', function () {
    this.$showSubInterface(comp, true, el)
  }.bind(this))
  el.addEventListener('mouseleave', function () {
    this.$showSubInterface(comp, false, el)
  }.bind(this))
}
