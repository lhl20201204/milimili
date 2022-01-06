export function addHover (el, compName) {
  el.style.position = 'relative'
  el.addEventListener('mouseenter', function () {
    this.$showSubInterface(compName, true, el)
  }.bind(this))
  el.addEventListener('mouseleave', function () {
    this.$showSubInterface(compName, false, el)
  }.bind(this))
}
