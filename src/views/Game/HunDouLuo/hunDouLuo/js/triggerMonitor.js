import { createEnemy } from './generateGeneralEnemy'
import constValue from './constValue'
const delay = 500
const copy = [0]
export function triggerMonitor (global) {
  const player = global.player
  const map = global.map
  const enemyMap = global.enemyMap
  const totalX = player.x + map.tranX
  for (const x of constValue.total) {
    if (totalX > x[0]) {
      if (!enemyMap.has(x[0] * 1000)) {
        let id = 0
        createEnemy(global, x[0] * 1000, function (enemy) {
          id = enemy.dataId
          if (copy.indexOf(enemy.kind) !== -1) {
            for (let i = 1; i <= 3; i++) {
              if (!enemyMap.has(x[0] * 1000 + i) && Math.random() > 0.5) {
                const timeOut = setTimeout(function () {
                  clearTimeout(timeOut)
                  createEnemy(global, x[0] * 1000 + i, function () { }, id)
                }, i * delay)
              }
            }
          }
        })
      }
    }
  }
}
