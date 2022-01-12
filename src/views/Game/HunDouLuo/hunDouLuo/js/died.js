import constValue from './constValue'
import { createEnemy } from './generateGeneralEnemy'

const diedTime = 100
const max = 5
const canReLife = [0]
const delay = 10000
export function died (global, enemy) {
  enemy.typeIsGift = false
  enemy.canTouch = true
  enemy.clearTimer()
  let count = 0
  enemy.state = 0
  const t2 = enemy.nowAction
  enemy.nowAction = constValue.effectTranslate
  const t = enemy.res
  enemy.res = require('@/assets/img/sucai/weapon.png')
  enemy.timer = setInterval(
    function () {
      enemy.state++
      if (enemy.state === max) {
        enemy.state = 0
      }
      count++
      if (count === max) {
        enemy.clearTimer()
        enemy.canTouch = false
        enemy.res = t
        enemy.nowAction = t2
        global.deleteEnemyById(enemy.id)
        if (canReLife.indexOf(enemy.kind) !== -1) {
          const timeout = setTimeout(function () {
            clearTimeout(timeout)

            if (enemy.originX > global.map.tranX) {
              createEnemy(global, enemy.serialNumber, function () { })
            }
          }, delay)
        }
      }
    },
    diedTime
  )
}
