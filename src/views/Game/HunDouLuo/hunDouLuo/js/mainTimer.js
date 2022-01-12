import { touchCheck } from './touchCheck'
import global from './global'
const interval = 40
export function mainTimer () {
  if (global.mainTimer2) {
    clearInterval(global.mainTimer2)
    window.cancelAnimationFrame(global.mainTimer)
  }
  global.mainTimer2 = setInterval(function () {
    touchCheck(global)
    // console.log('2222')
  }, interval)
  // const animate = () => {
  //   touchCheck(global)
  //   console.log('2222')
  //   global.mainTimer = requestAnimationFrame(animate)
  // }
  // animate()
}
