import { Enemy } from './enemyObject'
import { reactive } from 'vue'
export function createEnemy (global, x, fn, id) {
  const enemyMap = global.enemyMap

  if (enemyMap.get(x) && enemyMap.get(x).timer) {
    return
  }
  const player = global.player
  const map = global.map

  if (!enemyMap.has(x)) {
    const enemy = reactive(new Enemy(id))
    // console.log('创建新的敌人', enemy.id)
    enemy.serialNumber = x
    enemyMap.set(x, enemy)
  }

  const enemy = enemyMap.get(x)
  enemy.resetAttribute()
  enemy.originX = enemy.x
  enemy.x -= map.tranX

  if (enemy.x < player.x && !enemy.facingRight) {
    enemy.changeDirection()
  }
  if (enemy.x > 0) {
    global.enemyList.push(enemy)
    enemy.timerStart(enemy)
  }

  fn(enemy)
}
