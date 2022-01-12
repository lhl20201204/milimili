import bus from './bus'
export function eLuoSiFangKuaiIndex () {
  bus.eLuoSiFangKuaiGlbal = bus.eLuoSiFangKuaiGlbal || {}
  bus.eLuoSiFangKuaiGlbal.isRunning = true
  var map = document.getElementById('e_luo_si_fang_kuai_map')
  var button = document.getElementById('e_luo_si_fang_kuai_button')
  var button2 = document.getElementById('e_luo_si_fang_kuai_button2')
  var divs = [0, 0, 0, 0]
  var bound = []
  var di
  var num
  var deg = 0
  var point = 0
  var isRunning = false
  deleteModel()

  function Model () {
    this.movdiection = 0
  }
  function setDirection (e) {
    di = e
  }

  function createModel () {
    var map = document.getElementById('e_luo_si_fang_kuai_map')
    const color = RandomColor()
    for (var i = 0; i < 4; i++) {
      divs[i] = document.createElement('div')
      divs[i].style.width = '20px'
      divs[i].style.height = '20px'
      divs[i].style.backgroundColor = color
      divs[i].style.position = 'absolute'
      divs[i].className = 'e_luo_si_fang_kuai_model'
      map.appendChild(divs[i])
    }

    createRandomModelPositon(map, divs)
  }

  function initBound (map) {
    var len = (map.offsetWidth - 10) / 20
    var len2 = (map.offsetHeight - 10) / 20

    for (var i = 0; i < len; i++) {
      bound[i] = document.createElement('div')
      bound[i].style.width = '20px'
      bound[i].style.height = '20px'
      bound[i].style.position = 'absolute'
      bound[i].x = 20 * i
      bound[i].style.left = (bound[i].x) + 'px'
      bound[i].y = parseInt(map.offsetHeight) - 10
      bound[i].style.top = (bound[i].y) + 'px'
      bound[i].className = 'e_luo_si_fang_kuai_bound e_luo_si_fang_kuai_bound2'
      map.appendChild(bound[i])
    }
    for (i = len; i < len + len2 + 1; i++) {
      bound[i] = document.createElement('div')
      bound[i + len2] = document.createElement('div')
      bound[i].style.width = '20px'
      bound[i].style.height = '20px'
      bound[i].style.position = 'absolute'
      bound[i + len2].style.width = '20px'
      bound[i + len2].style.height = '20px'
      bound[i + len2].style.position = 'absolute'
      bound[i].x = -20
      bound[i].style.left = (bound[i].x) + 'px'
      bound[i].y = 20 * (i - len - 1)
      bound[i].style.top = (bound[i].y) + 'px'
      bound[i + len2].x = parseInt(map.offsetWidth) - 10
      bound[i + len2].style.left = (bound[i + len2].x) + 'px'
      bound[i + len2].y = 20 * (i - len - 1)
      bound[i + len2].style.top = (bound[i + len2].y) + 'px'
      bound[i].className = 'e_luo_si_fang_kuai_bound e_luo_si_fang_kuai_bound2'
      bound[i + len2].className = 'e_luo_si_fang_kuai_bound e_luo_si_fang_kuai_bound2'
      map.appendChild(bound[i])
      map.appendChild(bound[i + len2])
    }
  }

  function createRandomModelPositon (map, divs) {
    var len = (parseInt(map.offsetWidth) - 10) / 20
    switch (createRandomModelNum()) {
      case 0: createModelType(0, divs)
        ModelMove(divs, (randomNum(len - 4) * 20), 0)
        break
      case 1: createModelType(1, divs); ModelMove(divs, (randomNum(len - 2) * 20), 0); break
      case 2: createModelType(2, divs); ModelMove(divs, (randomNum(len - 3) * 20), 0); break
      case 3: createModelType(3, divs); ModelMove(divs, (randomNum(len - 3) * 20), 0); break
      case 4: createModelType(4, divs); ModelMove(divs, (randomNum(len - 3) * 20), 0); break
      case 5: createModelType(5, divs); ModelMove(divs, (randomNum(len - 3) * 20), 0); break
      case 6: createModelType(6, divs); ModelMove(divs, (randomNum(len - 3) * 20), 0); break
    }
  }

  function createModelType (num, divs) {
    switch (num) {
      case 0: divs[0].style.left = '0px'
        divs[0].style.top = '-20px'
        divs[1].style.left = '20px'
        divs[1].style.top = '-20px'
        divs[2].style.left = '40px'
        divs[2].style.top = '-20px'
        divs[3].style.left = '60px'
        divs[3].style.top = '-20px'
        break
      case 1: divs[0].style.left = '0px'
        divs[0].style.top = '-20px'
        divs[1].style.left = '20px'
        divs[1].style.top = '-20px'
        divs[2].style.left = '0px'
        divs[2].style.top = '0px'
        divs[3].style.left = '20px'
        divs[3].style.top = '0px'
        break
      case 2: divs[0].style.left = '0px'
        divs[0].style.top = '0px'
        divs[1].style.left = '20px'
        divs[1].style.top = '0px'
        divs[2].style.left = '40px'
        divs[2].style.top = '0px'
        divs[3].style.left = '40px'
        divs[3].style.top = '-20px'; break
      case 3: divs[0].style.left = '0px'
        divs[0].style.top = '0px'
        divs[1].style.left = '20px'
        divs[1].style.top = '0px'
        divs[2].style.left = '40px'
        divs[2].style.top = '0px'
        divs[3].style.left = '20px'
        divs[3].style.top = '-20px'; break
      case 4: divs[0].style.left = '0px'
        divs[0].style.top = '0px'
        divs[1].style.left = '20px'
        divs[1].style.top = '0px'
        divs[2].style.left = '40px'
        divs[2].style.top = '0px'
        divs[3].style.left = '0px'
        divs[3].style.top = '-20px'; break
      case 5: divs[0].style.left = '0px'
        divs[0].style.top = '-20px'
        divs[1].style.left = '20px'
        divs[1].style.top = '-20px'
        divs[2].style.left = '20px'
        divs[2].style.top = '0px'
        divs[3].style.left = '40px'
        divs[3].style.top = '0px'; break
      case 6: divs[0].style.left = '20px'
        divs[0].style.top = '-20px'
        divs[1].style.left = '40px'
        divs[1].style.top = '-20px'
        divs[2].style.left = '0px'
        divs[2].style.top = '0px'
        divs[3].style.left = '20px'
        divs[3].style.top = '0px'; break
    }
    recordDivXY(divs)
  }

  function recordDivXY (divs) {
    for (var i = 0; i < divs.length; i++) {
      if (window.getComputedStyle) {
        divs[i].x = parseInt(window.getComputedStyle(divs[i], null).left)
        divs[i].y = parseInt(window.getComputedStyle(divs[i], null).top)
      } else if (divs[i].getCurrentPosition) {
        divs[i].x = parseInt(divs[i].getCurrentPosition.left)
        divs[i].y = parseInt(divs[i].getCurrentPosition.top)
      }
    }
  }

  function getXdeg (deg) {
    if (deg === 270 || deg === 0) {
      return -1
    } else if (deg === 90 || deg === 180) {
      return 1
    }
  }
  function getYdeg (deg) {
    if (deg === 90 || deg === 0) {
      return -1
    } else if (deg === 270 || deg === 180) {
      return 1
    }
  }

  function getXdeg2 (deg) {
    if (deg === 0) {
      return 1
    } else if (deg === 90) {
      return 0
    } else if (deg === 180) {
      return -1
    } else if (deg === 270) {
      return 0
    }
  }
  function getYdeg2 (deg) {
    if (deg === 0) {
      return 0
    } else if (deg === 90) {
      return 1
    } else if (deg === 180) {
      return 0
    } else if (deg === 270) {
      return -1
    }
  }

  function getXdeg3 (deg) {
    if (deg === 0) {
      return 1
    } else if (deg === 90) {
      return 1
    } else if (deg === 180) {
      return -1
    } else if (deg === 270) {
      return -1
    }
  }
  function getYdeg3 (deg) {
    if (deg === 0) {
      return 1
    } else if (deg === 90) {
      return -1
    } else if (deg === 180) {
      return -1
    } else if (deg === 270) {
      return 1
    }
  }
  function getXdeg4 (deg) {
    if (deg === 0) {
      return 0
    } else if (deg === 90) {
      return 1
    } else if (deg === 180) {
      return 0
    } else if (deg === 270) {
      return -1
    }
  }
  function getYdeg4 (deg) {
    if (deg === 0) {
      return -1
    } else if (deg === 90) {
      return 0
    } else if (deg === 180) {
      return 1
    } else if (deg === 270) {
      return 0
    }
  }
  function getXdeg5 (deg) {
    if (deg === 0) {
      return 0
    } else if (deg === 90) {
      return -1
    } else if (deg === 180) {
      return 0
    } else if (deg === 270) {
      return 1
    }
  }
  function getYdeg5 (deg) {
    if (deg === 0) {
      return 1
    } else if (deg === 90) {
      return 0
    } else if (deg === 180) {
      return -1
    } else if (deg === 270) {
      return 0
    }
  }

  function ModelRotate (divs) {
    deg = (deg + 90) % 360

    var temp = copy(divs)

    switch (num) {
      case 0: temp[0].x = (divs[0].x + getXdeg(deg) * 20)
        temp[0].y = (divs[0].y + getYdeg(deg) * 20)

        temp[2].x = (divs[2].x - getXdeg(deg) * 20)
        temp[2].y = (divs[2].y - getYdeg(deg) * 20)
        temp[3].x = (divs[3].x - getXdeg(deg) * 40)
        temp[3].y = (divs[3].y - getYdeg(deg) * 40)
        break
      case 1:
        break
      case 2: temp[0].x = (divs[0].x + getXdeg(deg) * 20)
        temp[0].y = (divs[0].y + getYdeg(deg) * 20)

        temp[2].x = (divs[2].x - getXdeg(deg) * 20)
        temp[2].y = (divs[2].y - getYdeg(deg) * 20)
        temp[3].x = (divs[3].x + getXdeg2(deg) * 40)
        temp[3].y = (divs[3].y + getYdeg2(deg) * 40); break
      case 3: temp[0].x = (divs[0].x + getXdeg(deg) * 20)
        temp[0].y = (divs[0].y + getYdeg(deg) * 20)

        temp[2].x = (divs[2].x - getXdeg(deg) * 20)
        temp[2].y = (divs[2].y - getYdeg(deg) * 20)
        temp[3].x = (divs[3].x + getXdeg3(deg) * 20)
        temp[3].y = (divs[3].y - getYdeg3(deg) * 20); break
      case 4: temp[0].x = (divs[0].x + getXdeg(deg) * 20)
        temp[0].y = (divs[0].y + getYdeg(deg) * 20)

        temp[2].x = (divs[2].x - getXdeg(deg) * 20)
        temp[2].y = (divs[2].y - getYdeg(deg) * 20)
        temp[3].x = (divs[3].x + getXdeg4(deg) * 40)
        temp[3].y = (divs[3].y + getYdeg4(deg) * 40); break
      case 5: temp[0].x = (divs[0].x + getXdeg(deg) * 20)
        temp[0].y = (divs[0].y + getYdeg(deg) * 20)

        temp[2].x = (divs[2].x + getYdeg(deg) * 20)
        temp[2].y = (divs[2].y - getXdeg(deg) * 20)
        temp[3].x = (divs[3].x + getXdeg5(deg) * 40)
        temp[3].y = (divs[3].y + getYdeg5(deg) * 40); break
      case 6: temp[1].x = (divs[1].x + getYdeg3(deg) * 20)
        temp[1].y = (divs[1].y + getXdeg3(deg) * 20)

        temp[3].x = (divs[3].x + getYdeg(deg) * 20)
        temp[3].y = (divs[3].y + getYdeg3(deg) * 20)
        temp[2].x = (divs[2].x + getYdeg4(deg) * 40)
        temp[2].y = (divs[2].y - getXdeg4(deg) * 40); break
    }
    var bound = document.querySelectorAll('.e_luo_si_fang_kuai_bound')
    if (notIsBound(temp, bound) && notOverBound(temp, bound)) {
      for (var i = 0; i < temp.length; i++) {
        divs[i].style.left = temp[i].x + 'px'
        divs[i].style.top = temp[i].y + 'px'
      }
    }
    recordDivXY(divs)
  }

  function copy (divs) {
    var temp = []
    for (var i = 0; i < divs.length; i++) {
      temp[i] = divs[i]
      temp[i].x = divs[i].x
      temp[i].y = divs[i].y
    }

    return temp
  }

  function createRandomModelNum () {
    num = randomNum(6)

    return num
  }

  function notOverBound (divs, bound) {
    for (var i = 0; i < bound.length; i++) {
      for (var j = 0; j < divs.length; j++) {
        if (divs[j].x === bound[i].x && divs[j].y === bound[i].y) {
          return false
        }
      }
    }
    return true
  }

  function notIsBound (divs, bound) {
    for (var i = 0; i < bound.length; i++) {
      for (var j = 0; j < divs.length; j++) {
        if (divs[j].x === bound[i].x && divs[j].y === bound[i].y - 20) {
          return false
        }
      }
    }
    return true
  }

  function notIsLeftBound (divs, bound) {
    for (var i = 0; i < bound.length; i++) {
      for (var j = 0; j < divs.length; j++) {
        if ((divs[j].x === bound[i].x + 20) && divs[j].y === bound[i].y) {
          return false
        }
      }
    }
    return true
  }
  function notIsRightBound (divs, bound) {
    for (var i = 0; i < bound.length; i++) {
      for (var j = 0; j < divs.length; j++) {
        if ((divs[j].x === bound[i].x - 20) && divs[j].y === bound[i].y) {
          return false
        }
      }
    }
    return true
  }

  function notIsbottomBound (divs, bound) {
    for (var i = 0; i < bound.length; i++) {
      for (var j = 0; j < divs.length; j++) {
        if ((divs[j].x === bound[i].x) && divs[j].y === bound[i].y - 40) {
          return false
        }
      }
    }
    return true
  }

  function changeClass (divs) {
    for (var i = 0; i < divs.length; i++) {
      divs[i].className = 'e_luo_si_fang_kuai_bound e_luo_si_fang_kuai_delete'
    }
  }

  function deleteModel () {
    var map = document.getElementById('e_luo_si_fang_kuai_map')
    var list = document.querySelectorAll('.e_luo_si_fang_kuai_delete')
    for (var i = 0; i < list.length; i++) {
      map.removeChild(list[i])
    }

    list = document.querySelectorAll('.e_luo_si_fang_kuai_model')
    for (i = 0; i < list.length; i++) {
      map.removeChild(list[i])
    }
  }

  function check (divs) {
    var result = []

    var bound = document.querySelectorAll('.e_luo_si_fang_kuai_bound')
    var map = document.getElementById('e_luo_si_fang_kuai_map')
    var len = (parseInt(map.offsetWidth) - 10) / 20
    var len2 = (map.offsetHeight - 10) / 20

    for (var i = 0; i <= (len2 - 1) * 20; i = i + 20) {
      result[i] = 0
    }

    for (i = 0; i < bound.length; i++) {
      if (bound[i].x === -20 || bound[i].x === 20 * len || bound[i].y === 20 * len2) {
        continue
      }
      var n = bound[i].y
      result[n] = result[n] + 1

      if (result[0] > 0) {
        gameover()
        return
      }

      if (result[n] === len) {
        remove(divs, map, bound, n, len, len2)

        break
      }
    }
  }

  function setPoint (x) {
    point = x
  }

  function remove (divs, map, bound, n, len, len2) {
    var button3 = document.getElementById('e_luo_si_fang_kuai_button3')
    point = point + 10
    setPoint(point)
    button3.innerHTML = '当前得分：' + point

    for (var i = 0; i < bound.length; i++) {
      if (bound[i].x === -20 || bound[i].x === 20 * len || bound[i].y === 20 * len2) {
        continue
      }
      if (bound[i].y === n) {
        map.removeChild(bound[i])
      }
    }
    for (i = 0; i < bound.length; i++) {
      if (bound[i].x === -20 || bound[i].x === 20 * len || bound[i].y === 20 * (len2)) {
        continue
      }

      if (bound[i].y < n) {
        bound[i].y = bound[i].y + 20
        bound[i].style.top = bound[i].y + 'px'
      }
    }

    recordDivXY(bound)
    check(divs)
  }

  function ModelMove (divs, x, y) {
    var bound = document.querySelectorAll('.e_luo_si_fang_kuai_bound')

    if (!notIsBound(divs, bound)) {
      changeClass(divs)

      check(divs)
      recordDivXY(bound)

      createModel()

      deg = 0
      return
    }
    if (!notIsLeftBound(divs, bound)) {
      if (di === 65) {
        x = 0
        y = 0
      }
    }
    if (!notIsRightBound(divs, bound)) {
      if (di === 68) {
        x = 0
        y = 0
      }
    }
    if (!notIsbottomBound(divs, bound)) {
      if (di === 83) {
        x = 0
        y = 20
        di = 0
      }
    }

    for (var i = 0; i < divs.length; i++) {
      var posx = divs[i].x + x
      divs[i].x = posx
      divs[i].style.left = (posx) + 'px'

      var posy = y + divs[i].y

      divs[i].y = posy
      divs[i].style.top = (posy) + 'px'
    }
  }

  function randomNum (num) {
    return Math.floor(Math.random() * (num + 1))
  }

  function RandomColor () {
    var random = randomNum(10)
    switch (random) {
      case 0: return 'red'
      case 1: return 'orange'
      case 2: return 'yellow'
      case 3: return 'green'
      case 4: return 'aqua'
      case 5: return 'skyblue'
      case 6: return 'purple'
      case 7: return 'brown'
      case 8: return 'hotpink'
      case 9: return 'lightslategray'
    }

    return 'black'
  }
  bus.eLuoSiFangKuaiGlbal.btn1fn = function () {
    alert('必须在电脑运行，按键为asd下左右空格7个键,其中s和下俩个按键使模块加速下落，a和左键使模块水平左移，d和右键使模块右移，空格使模块旋转90度,游戏结束，可以按重开')
  }
  bus.eLuoSiFangKuaiGlbal.btn2fn = function () {
    if (isRunning) {
      alert('暂停')
    } else {
      gameover(true)
      eLuoSiFangKuaiIndex()
    }
  }
  button.addEventListener('click', bus.eLuoSiFangKuaiGlbal.btn1fn, false)
  button2.addEventListener('click', bus.eLuoSiFangKuaiGlbal.btn2fn, false)

  var model = new Model()
  model.movdirection = 0
  setDirection(model.movdirection)
  createModel()
  initBound(map)

  var lastTime = new Date().getTime()

  var nowTime
  var divList

  bus.eLuoSiFangKuaiGlbal.keyAction = function (event) {
    var e = event || window.event
    nowTime = (new Date().getTime())
    divList = document.querySelectorAll('.e_luo_si_fang_kuai_model')

    if (e && (e.keyCode === 65 || e.keyCode === 37)) {
      model.movdirection = 65
      lastTime = nowTime
    } else if (e && (e.keyCode === 68 || e.keyCode === 39)) {
      model.movdirection = 68
      lastTime = nowTime
    } else if (e && (e.keyCode === 83 || e.keyCode === 40)) {
      model.movdirection = 83
      lastTime = nowTime
    } else if (e && (e.keyCode === 32) && (nowTime - lastTime > 100)) {
      recordDivXY(divs)

      ModelRotate(divList)
      lastTime = nowTime
    }
  }

  document.addEventListener('keydown', bus.eLuoSiFangKuaiGlbal.keyAction, false)

  function gameover (flag) {
    !flag && alert('gameOver')
    deleteModel()
    isRunning = false
    document.removeEventListener('keydown', bus.eLuoSiFangKuaiGlbal.keyAction)
    flag && button2.removeEventListener('click', bus.eLuoSiFangKuaiGlbal.btn2fn)
    button.removeEventListener('click', bus.eLuoSiFangKuaiGlbal.btn1fn)
    if (bus.eLuoSiFangKuaiGlbal.timer) {
      clearInterval(bus.eLuoSiFangKuaiGlbal.timer)
      bus.eLuoSiFangKuaiGlbal.timer = null
    }
  }
  bus.eLuoSiFangKuaiGlbal.setGameOver = gameover

  function start () {
    if (isRunning) {
      return
    }
    isRunning = true
    bus.eLuoSiFangKuaiGlbal.timer = setInterval(function () {
      divList = document.querySelectorAll('.e_luo_si_fang_kuai_model')

      setDirection(model.movdirection)
      if (model.movdirection === 0) {
        ModelMove(divList, 0, 20)
      } else if (model.movdirection === 65) {
        ModelMove(divList, -20, 0)
      } else if (model.movdirection === 68) {
        ModelMove(divList, 20, 0)
      } else if (model.movdirection === 83) {
        ModelMove(divList, 0, 40)
      }

      model.movdirection = 0
    }, 200)
  }
  start()
}
