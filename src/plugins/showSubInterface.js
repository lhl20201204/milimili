import HoverGame from '@/views/Game/hoverViews/HoverGame'
import { createVNode, render } from 'vue'
export function getShowSubInterface (app) {
  const map = new Map().set('HoverGame', HoverGame)
  const els = new Map()
  return function showSubInterface (compName, isShow, el) {
    if (!els.get(el)) {
      const vm = createVNode(map.get(compName))
      vm.appContext = app._context
      render(vm, el)
      els.set(el, vm)
      console.log(vm)
    }
    console.log(isShow)
    els.get(el).show = isShow
  }
}
