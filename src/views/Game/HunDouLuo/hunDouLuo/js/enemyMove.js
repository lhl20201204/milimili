import global from './global'
import { sin, cos } from './util'
import { createEnemy } from './generateGeneralEnemy'
import constValue from './constValue'
const sceneW = 1000
const sceneH = 500
const reLifeDelay = 4000
const timeMap = new Map()
  .set(0, 100)
  .set(1, 1000)
  .set(2, 100)
  .set(3, 250)
  .set(4, 100)
  .set(5, 1000)
  .set(6, 500)
  .set(7, 20000)
  .set(8, 1000)
const delayMap = new Map().set(3, 3500)
const canMove = [0, 2]
const otherMoveType = [2]
const tempIsGift = [3]
const canJump = [0]
const once = [3]
const onceAfterChange = [6]
const canAddlistener = [0]
const canChangeDirection = [1, 5]
const canReLife = [0]
const unMove = [1, 5, 6, 8]
const bridge1FirstX = 1650
const bridge1LastX = 1895
const bridge2FirstX = 2295
const bridge2LastX = 2540
const bridgeW = 35
const bridgeH = 200
const boomTime = 300
const shotDeg = new Map()
  .set(1, 225)
  .set(2, 270)
  .set(3, 315)
  .set(4, 180)
  .set(6, 0)
  .set(7, 135)
  .set(9, 45)

const directionMap = new Map()
  .set(1, constValue.shotEnemyLeftTop)
  .set(3, constValue.shotEnemyRightTop)
  .set(4, constValue.shotEnemyLeft)
  .set(6, constValue.shotEnemyRight)
  .set(7, constValue.shotEnemyleftBottom)
  .set(9, constValue.shotEnemyRightBottom)

const whiteTankDirection = new Map()
  .set(1, constValue.whiteTankLeftTop)
  .set(2, constValue.whiteTankTop)
  .set(3, constValue.whiteTankRightTop)
  .set(4, constValue.whiteTankLeft)
  .set(6, constValue.whiteTankRight)
  .set(7, constValue.whiteTankLeftBottom)
  .set(8, constValue.whiteTankBottom)
  .set(9, constValue.whiteTankRightBottom)

const LEFT = 4
const RIGHT = 6

export function enemyMove (enemy) {
  const player = global.player
  const map = global.map
  const time = timeMap.get(enemy.kind)
  const len = 15
  let deg = enemy.deg
  const originDeg = deg
  let dv = 1
  let delayT = 0
  let shotState = 1
  enemy.timer = setInterval(function () {
    enemy.state++
    if (enemy.state === 6) {
      if (unMove.indexOf(enemy.kind) !== -1) {
        shotState = Math.floor(Math.random() * 5)
      }
      if (onceAfterChange.indexOf(enemy.kind) !== -1) {
        if (enemy.typeIsRedTank) {
          enemy.nowAction = constValue.constRedTank
        }
      }
      enemy.state = 0
      if (canJump.indexOf(enemy.kind) !== -1 && Math.random() < 0.1 && !enemy.lastJump && enemy.notInWater()) {
        enemy.jump(map, 8)
      }
      if (once.indexOf(enemy.kind) !== -1) {
        enemy.state = 5
        delayT += time
        if (tempIsGift.indexOf(enemy.kind) !== -1) {
          enemy.typeIsGift = true
        }
        if (delayT >= delayMap.get(enemy.kind)) {
          enemy.state = 0
          delayT = 0
          if (tempIsGift.indexOf(enemy.kind) !== -1) {
            enemy.typeIsGift = false
          }
        }
      }
    }

    if (canMove.indexOf(enemy.kind) !== -1) {
      if (otherMoveType.indexOf(enemy.kind) === -1) {
        enemy.x -= enemy.speedX * (enemy.facingRight ? -1 : 1)
      } else {
        if (deg <= originDeg - 18 || deg >= originDeg + 18) {
          dv = -dv
        }
        deg = deg + 15 * dv
        enemy.x += len * cos(deg % 360)
        enemy.y += len * sin(deg % 360)
      }

      if (canAddlistener.indexOf(enemy.kind) !== -1) {
        enemy.monitorWaterUpGround(map)
        monitorDropOrJump(map, enemy)
      }
    } else if (unMove.indexOf(enemy.kind) !== -1) {
      handleUnMoveShotEnemy(player, enemy, shotState)
    }

    if (enemy.typeIsBridge) {
      handleBridge(enemy, player, map, global)
    } else if (!enemy.typeIsBridge && (enemy.x < 0 || enemy.y < 0 || enemy.x > sceneW || enemy.y > sceneH)) {
      handleDeleteEnemy(global, enemy, map)
    }
  }, time)
}

function handleDeleteEnemy (global, enemy, map) {
  enemy.clearTimer()
  global.deleteEnemyById(enemy.id)

  if (canReLife.indexOf(enemy.kind) !== -1) {
    const timeout = setTimeout(function () {
      clearTimeout(timeout)
      if (enemy.originX > map.tranX) {
        createEnemy(global, enemy.serialNumber, function () { })
      }
    }, reLifeDelay)
  }
}

function handleUnMoveShotEnemy (player, enemy, shotState) {
  if (canChangeDirection.indexOf(enemy.kind) !== -1) {
    enemy.trackDirection(player)
    enemy.nowAction =
      directionMap.get(enemy.nowDirectionIndex) ||
      (enemy.facingRight ? directionMap.get(RIGHT) : directionMap.get(LEFT))
    if (enemy.typeIsWhiteTank) {
      enemy.nowAction =
        whiteTankDirection.get(enemy.nowDirectionIndex) ||
        (enemy.facingRight ? whiteTankDirection.get(RIGHT) : whiteTankDirection.get(LEFT))
    }
  }

  if (enemy.state === shotState) {
    let index = enemy.nowDirectionIndex
    if (
      enemy.nowDirectionIndex === 0 ||
      enemy.nowDirectionIndex === 5 ||
      enemy.nowDirectionIndex === 8 ||
      enemy.nowDirectionIndex === 10
    ) {
      index = enemy.facingRight ? 6 : 4
    }
    const deg = shotDeg.get(index)
    enemy.shot(global, deg, enemy)
  }
}

function handleBridge (enemy, player, map, global) {
  if (!enemy.isBooming) {
    const total = player.x + map.tranX
    if (total >= bridge1FirstX && enemy.originX <= bridge1LastX) {
      enemy.isBooming = true
      const tou = setTimeout(() => {
        clearTimeout(tou)
        destroyBridge(enemy.originX, map, global)
        enemy.died(global, enemy)
      }, boomTime * ((enemy.originX - bridge1FirstX) / bridgeW + 1))
    } else if (total >= bridge2FirstX && enemy.originX <= bridge2LastX) {
      enemy.isBooming = true
      const tou = setTimeout(() => {
        clearTimeout(tou)
        destroyBridge(enemy.originX, map, global)
        enemy.died(global, enemy)
      }, boomTime * ((enemy.originX - bridge2FirstX) / bridgeW + 1))
    }
  }
}

function destroyBridge (startX, map, global) {
  for (let i = startX; i < startX + bridgeW; i++) {
    for (let j = 0; j < map.map[i].length; j++) {
      if (map.map[i][j] === bridgeH) {
        map.map[i].splice(j, 1)
        break
      }
    }
  }
  const player = global.player

  if (
    !player.hadDied &&
    !player.isDroping &&
    !(player.timer && player.nowDirectionIndex === 10) &&
    map.map[map.tranX + player.x].indexOf(player.heightInMap) === -1 &&
    map.map[map.tranX + player.x + player.getWidth()].indexOf(player.heightInMap) === -1
  ) {
    if (player.y === player.heightInMap) {
      player.nowDirectionIndex = player.facingRight ? 6 : 4
      player.drop(global)
    }
  }
}

function monitorDropOrJump (map, enemy) {
  if (
    map.tranX + enemy.x >= 0 &&
    map.map[map.tranX + enemy.x].indexOf(enemy.heightInMap) === -1 &&
    map.map[map.tranX + enemy.x + enemy.getWidth()].indexOf(enemy.heightInMap) === -1
  ) {
    if (Math.random() < 1 / 3) {
      if (!enemy.lastReverse && !enemy.lastJump) {
        enemy.reverse(map)
      } else {
        enemy.drop(map)
      }
    } else {
      if (Math.random() < 0.5) {
        if (!enemy.lastJump) {
          enemy.jump(map)
        } else {
          enemy.drop(map)
        }
      } else {
        enemy.drop(map)
      }
    }
  }
}
