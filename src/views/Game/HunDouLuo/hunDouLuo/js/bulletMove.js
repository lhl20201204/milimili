import { sin, cos } from './util'
const sceneW = 1000
const sceneH = 500
const time = 100
export function bulletMove (global, bullet, enemy) {
  const player = enemy || global.player
  let len = 25
  if (player.bulletKind === 5) {
    len = 30
  }
  if (player.bulletKind === 4) {
    len = 15
  }
  let deg = bullet.deg
  let butX = len * cos(deg)
  let butY = len * sin(deg)
  const originDeg = deg
  let dv = 1
  bullet.timer = setInterval(function () {
    if (player.bulletKind === 4) {
      if (deg <= originDeg - 18 || deg >= originDeg + 18) {
        dv = -dv
      }
      deg = deg + 15 * dv
      butX = len * cos(deg % 360)
      butY = len * sin(deg % 360)
    }
    bullet.x += butX
    bullet.y += butY
    if (bullet.x < 0 || bullet.y < 0 || bullet.x > sceneW || bullet.y > sceneH) {
      clearInterval(bullet.timer)
      if (!enemy) {
        global.deleteBulletById(bullet.id)
      } else {
        global.deleteEnemyById(bullet.id)
      }
    }
  }, time)
}
