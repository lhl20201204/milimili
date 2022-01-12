import bus from './global'
export function tanYiTanIndex () {
  const global = {
    create: 0,
    shouldaddball: 0,
    squdeg: 0,
    mouseDown: 0,
    gameover: 0,
    gamepoint: 0,
    trideg: 0,
    setGameover (x) {
      this.gameover = x
    },
    getGameOver () {
      return this.gameover
    },
    getGamePoint () {
      return this.gamepoint
    },
    setGamePoint (x) {
      this.gamepoint = x
    },
    setCreate (x) {
      this.create = x
    },
    getCreate () {
      return this.create
    },
    setAddBall (x) {
      this.shouldaddball = x
    },
    getAddBall () {
      return this.shouldaddball
    },
    getsqudeg () {
      return this.squdeg
    },
    setsqudeg (squdeg) {
      this.squdeg = squdeg
    },
    setMouseDown (x) {
      this.mouseDown = x
    },
    getMouseDown () {
      return this.mouseDown
    },
    gettrideg () {
      return this.trideg
    },
    settrideg (trideg) {
      this.trideg = trideg
    }
  }
  bus.tanYiTanGlobal = global
  global.TIMER = []
  var scene = document.getElementById('tan_yi_tan_scene')
  var pause = document.getElementById('tan_yi_tan_pause')
  var tip = document.getElementById('tan_yi_tan_tip')
  var gamePoint = document.getElementById('tan_yi_tan_gamePoint')
  var displayLinebut = document.getElementById('tan_yi_tan_displayLine')
  var ballList = document.querySelectorAll('.tan_yi_tan_ball')
  var lineList = document.querySelectorAll('.tan_yi_tan_line')
  var ballLineList = document.querySelectorAll('.tan_yi_tan_ballLine')
  var rightBound = document.querySelectorAll('.tan_yi_tan_rightBound')
  var leftBound = document.querySelectorAll('.tan_yi_tan_leftBound')
  var rightBottomBound = document.querySelectorAll('.tan_yi_tan_rightBottomBound')
  var leftBottomBound = document.querySelectorAll('.tan_yi_tan_leftBottomBound')
  var triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
  var triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')

  var circleList = document.querySelectorAll('.tan_yi_tan_circle')
  var circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
  var squareList = document.querySelectorAll('.tan_yi_tan_square')
  var squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')

  var addballList = document.querySelectorAll('.tan_yi_tan_addball')
  var map = []
  for (var i = 0; i <= 1080; i++) {
    map[i] = []
    for (var j = 80; j <= 2000; j++) {
      if (i < 80 || i > 992) {
        map[i][j] = true
        continue
      }
      map[i][j] = false
    }
  }
  var trideg = []
  var squdeg = []

  recordXY(ballList)
  recordXY(rightBound)
  recordXY(leftBound)
  global.setGamePoint(0)
  global.setGameover(false)

  initBallLine(ballLineList)
  initLine(lineList)
  initLBBound(leftBottomBound)
  initRBBound(rightBottomBound)
  initTopBottom(scene, map, -342, -917, 18.3)
  initTopTwoBall(scene, map, 22)
  initTopTwoBall(scene, map, 220)

  global.setsqudeg(squdeg)
  global.settrideg(trideg)
  global.setAddBall(false)

  addEventHandler(pause, 'click', function () {
    alert('继续')
  })
  addEventHandler(tip, 'click', function () {
    alert('鼠标松开的时候会发射，松开的位置在俩侧蓝色边界以及虚线以下，鼠标按着移动可以出辅助线，当有模块到达一定高度游戏结束。')
  })
  var disclicktime = 0

  addEventHandler(displayLinebut, 'click', function () {
    disclicktime++
    if (disclicktime % 2 === 1) {
      displayLine(lineList)
      displayLinebut.innerHTML = '隐藏虚线'
    } else {
      removeLine(lineList)
      displayLinebut.innerHTML = '显示虚线'
    }
  })
  initTimer(ballList)
  resetBall(ballList)
  var ballNum = document.getElementById('tan_yi_tan_ballNum')
  createRandomModel(scene, ballList, circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, map)
  triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
  triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
  circleList = document.querySelectorAll('.tan_yi_tan_circle')
  circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
  squareList = document.querySelectorAll('.tan_yi_tan_square')
  squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
  if (global.getAddBall()) {
    createaddBall(map, scene)
  }
  addballList = document.querySelectorAll('.tan_yi_tan_addball')

  recordAllModelMes(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList)

  var timer = setInterval(function () {
    if (!global.getGameOver()) {
      gamePoint.innerHTML = global.getGamePoint()
      ballNum.innerHTML = getBallNum(ballList)
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      if (!isRunning(ballList)) {
        if (global.getCreate()) {
          resetBall(ballList)
          recordXY(ballList)
          allModelup(map)
          createRandomModel(scene, ballList, circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, map)

          triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
          triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
          circleList = document.querySelectorAll('.tan_yi_tan_circle')
          circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
          squareList = document.querySelectorAll('.tan_yi_tan_square')
          squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
          ballList = document.querySelectorAll('.tan_yi_tan_ball')
          recordXY(ballList)
          if (global.getAddBall()) {
            createaddBall(map, scene)
          }

          addballList = document.querySelectorAll('.tan_yi_tan_addball')
          recordAllModelMes(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList)
          global.setCreate(false)
        }
      }
    } else {
      clearInterval(timer)
      global.TIMER.splice(global.TIMER.indexOf(timer), 1)
      alert('(游戏结束4s后自动重新开始)game over! and autoMatic restart after four seconds')
      setTimeout(function () {
        location.reload()
      }, 4000)
    }
  }, 10)
  global.TIMER.push(timer)

  addEventHandler(scene, 'mousemove', function (e) {
    if (!global.getGameOver()) {
      if (!isRunning(ballList) && global.getMouseDown() && e.offsetY > 55 && e.offsetX !== 132) {
        var deg = arctan((e.offsetY - 55) / (e.offsetX - 132))
        displayBallLine(ballLineList)
        rotateBallLine(ballLineList, deg)
      }
    }
  }

  )

  addEventHandler(scene, 'mousedown', function (e) {
    if (!global.getGameOver()) {
      var deg = arctan((e.offsetY - 55) / (e.offsetX - 132))
      for (var i = 0; i < ballLineList.length; i++) {
        ballLineList[i].deg = deg
      }
      global.setMouseDown(true)
    }
  })

  global.setCreate(false)
  addEventHandler(scene, 'mouseup', function (e) {
    if (!global.getGameOver()) {
      global.setMouseDown(false)

      var d = Math.abs(arctan((e.offsetY - 55) / (e.offsetX - 132)))
      removeBallLine(ballLineList)

      var obj = document.elementFromPoint(e.clientX, e.clientY)
      if ((obj.id === 'tan_yi_tan_scene' && e.offsetY > 55) || obj.className === 'tan_yi_tan_ballLine') {
        if (obj.id === 'tan_yi_tan_scene' || obj.className === 'tan_yi_tan_ballLine') {
          if (!isRunning(ballList)) {
            if (e.offsetX < 132) {
              BallDirection(ballList, -10 * cos(d), 10 * sin(d))
            } else if (e.offsetX === 132) {
              BallDirection(ballList, 0, 10)
            } else if (e.offsetX > 132) {
              BallDirection(ballList, 10 * cos(d), 10 * sin(d))
            }

            if (obj.className === 'tan_yi_tan_ballLine') {
              if (ballLineList[0].deg < 0) {
                d = Math.abs(ballLineList[0].deg)
                BallDirection(ballList, -10 * cos(d), 10 * sin(d))
              } else {
                d = Math.abs(ballLineList[0].deg)
                BallDirection(ballList, 10 * cos(d), 10 * sin(d))
              }
            }

            recordXY(ballList)
            try {
              ballMove(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, map, scene, ballList, rightBound, leftBound, rightBottomBound, leftBottomBound, addballList)
            } catch (e) {
              console.log(e)
            }
          }
        }
      }
    }
  })

  function initTimer (ballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    for (var i = 0; i < ballList.length; i++) {
      ballList[i].timer = -1
    }
  }

  function getBallHasRemoveNum (ballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    var count = 0
    for (var i = 0; i < ballList.length; i++) {
      if (ballList[i].timer === -1 && ballList[i].className === 'tan_yi_tan_ball ballremove') {
        count++
      }
    }
    return count
  }

  function addspeed (i) {
    if (i > 5) {
      return 350 * i
    }
    return 1000 * i
  }

  function getBallNum (ballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    var count = 0
    for (var i = 0; i < ballList.length; i++) {
      if (ballList[i].timer === -1 && ballList[i].className === 'tan_yi_tan_ball') {
        count++
      }
    }
    return count
  }

  function isRunning (ballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    for (var i = 0; i < ballList.length; i++) {
      if (ballList[i].timer !== -1) {
        return true
      }
    }
    return false
  }

  function BallDirection (ballList, x, y) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    for (var i = 0; i < ballList.length; i++) {
      setkx(x, ballList, i)
      setLastkx(getkx(ballList, i), ballList, i)
      setShoudAddtoky(0, ballList, i)
      setShoudAddtokx(0, ballList, i)
      ballList[i].recallinleft = false
      ballList[i].recallinright = false
      ballList[i].touchtriangle = false
      ballList[i].touchsquare = false
      ballList[i].touchcircle = false
      ballList[i].removetriangle = -2
      ballList[i].removesquare = -2
      ballList[i].removecircle = -2
      ballList[i].currenttriangle = -2
      ballList[i].currentsquare = -2
      ballList[i].currentcircle = -2

      setky(y, ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
      if (getkx(ballList, i) === 0) {
        setk(Infinity, ballList, i)
      }
      setShoudAddtok(0, ballList, i)
    }
  }

  function recordXY (divs) {
    for (var i = 0; i < divs.length; i++) {
      if (window.getComputedStyle) {
        divs[i].x = parseInt(window.getComputedStyle(divs[i], null).left)
        divs[i].y = parseInt(window.getComputedStyle(divs[i], null).top)
      } else if (divs[i].getCurrentPosition) {
        divs[i].x = parseInt(divs[i].getCurrentPosition.left)
        divs[i].y = parseInt(divs[i].getCurrentPosition.top)
      }
      divs[i].len = parseInt(divs[i].offsetWidth)
    }
  }

  function resetBall (ballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    for (var i = 0; i < ballList.length; i++) {
      ballList[i].className = 'tan_yi_tan_ball'
      ballList[i].style.left = '127px'
      ballList[i].style.top = '50px'
    }
  }

  function ballMove (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, map, scene, ballList, rightBound, leftBound, rightBottomBound, leftBottomBound, addballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    var leftBoundx = leftBound[0].x + 3
    var rightBoundx = rightBound[0].x - 10

    for (let i = 0; i < ballList.length; i++) {
      setTimeout(function () {
        ballList[i].timer = setInterval(function () {
          try {
            if (typeof (getkx(ballList, i)) === 'undefined' || typeof (getky(ballList, i)) === 'undefined') {
              alert(425 + ' undefind')
            }
            if (getkx(ballList, i) * getkx(ballList, i) + getky(ballList, i) * getky(ballList, i) < 97) {
              var absdeg = Math.abs(arctan(getk(ballList, i)))
              if (getkx(ballList, i) >= 0 && getky(ballList, i) >= 0) {
                setLastky(10 * sin(absdeg), ballList, i)
                setky(10 * sin(absdeg), ballList, i)
                setLastkx(10 * cos(absdeg), ballList, i)
                setkx(10 * cos(absdeg), ballList, i)
              } else if (getkx(ballList, i) >= 0 && getky(ballList, i) < 0) {
                setLastky(-10 * sin(absdeg), ballList, i)
                setky(-10 * sin(absdeg), ballList, i)
                setLastkx(10 * cos(absdeg), ballList, i)
                setkx(10 * cos(absdeg), ballList, i)
              } else if (getkx(ballList, i) < 0 && getky(ballList, i) < 0) {
                setLastky(-10 * sin(absdeg), ballList, i)
                setky(-10 * sin(absdeg), ballList, i)
                setLastkx(-10 * cos(absdeg), ballList, i)
                setkx(-10 * cos(absdeg), ballList, i)
              } else if (getkx(ballList, i) < 0 && getky(ballList, i) >= 0) {
                setLastky(10 * sin(absdeg), ballList, i)
                setky(10 * sin(absdeg), ballList, i)
                setLastkx(-10 * cos(absdeg), ballList, i)
                setkx(-10 * cos(absdeg), ballList, i)
              }
            }
            ballTouchBound(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
            ballList[i].x = ballList[i].x + getkx(ballList, i)
            ballList[i].y = ballList[i].y + getky(ballList, i)
            ballList[i].style.left = (ballList[i].x) + 'px'
            ballList[i].style.top = (ballList[i].y) + 'px'
          } catch (e) {
            clearInterval(ballList[i].timer)
            global.TIMER.splice(global.TIMER.indexOf(ballList[i].timer), 1)
          }
        }, 20)
        global.TIMER.push(ballList[i].timer)
      }, addspeed(i))
    }
  }

  function ballTouchBound (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList) {
    addballList = document.querySelectorAll('.tan_yi_tan_addball')
    if (getdistanceballandcircle(0, circleList, ballList, i) <= circleList[0].len / 2 + 5.05 && getdistanceballandcircle(1, circleList, ballList, i) <= circleList[1].len / 2 + 5.05) {
      ballList[i].x = circleList[1].len + circleList[1].x
      ballList[i].y = 2 + circleList[1].y
      ballList[i].touchcircle = false
      ballList[i].currentcircle = -2
      setkx(0.5, ballList, i)
      setky(Math.sqrt(100 - 0.5 * 0.5), ballList, i)
      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
      if (getkx(ballList, i) === 0) {
        setk(Infinity, ballList, i)
      }
    }

    if (getdistanceballandcircle(0, circleList, ballList, i) <= circleList[0].len / 2 + 5.05 && getdistanceballandcircle(2, circleList, ballList, i) <= circleList[2].len / 2 + 5.05) {
      ballList[i].x = circleList[2].x - 10
      ballList[i].y = 2 + circleList[2].y
      ballList[i].touchcircle = false
      ballList[i].currentcircle = -2
      setkx(-0.5, ballList, i)
      setky(Math.sqrt(100 - 0.5 * 0.5), ballList, i)
      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
      if (getkx(ballList, i) === 0) {
        setk(Infinity, ballList, i)
      }
    }
    if (getdistanceballandcircle(1, circleList, ballList, i) <= circleList[1].len / 2 + 5.05 && ballList[i].x === leftBoundx) {
      ballList[i].x = ballList[i].x + 10
      ballList[i].y = ballList[i].y + 10
      ballList[i].touchcircle = false
      ballList[i].currentcircle = -2
      setkx(0.5, ballList, i)
      setky(Math.sqrt(100 - 0.5 * 0.5), ballList, i)
      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
      if (getkx(ballList, i) === 0) {
        setk(Infinity, ballList, i)
      }
    }
    if (getdistanceballandcircle(2, circleList, ballList, i) <= circleList[2].len / 2 + 5.05 && ballList[i].x === rightBoundx) {
      ballList[i].x = ballList[i].x - 10
      ballList[i].y = ballList[i].y + 10
      ballList[i].touchcircle = false
      ballList[i].currentcircle = -2
      setkx(-0.5, ballList, i)
      setky(Math.sqrt(100 - 0.5 * 0.5), ballList, i)
      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
      if (getkx(ballList, i) === 0) {
        setk(Infinity, ballList, i)
      }
    }

    recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
    recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

    recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

    rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

    rechecktriangle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
    if (isNearcenterBound(leftBottomBound, rightBottomBound, getkx(ballList, i), getky(ballList, i), getk(ballList, i), ballList, i)) {
      if (ballList[i].y > 550) {
        if (ballList[i].x <= 129) {
          ballList[i].x = 78
          ballList[i].y = 10
        } else if (ballList[i].x > 129) {
          ballList[i].x = 183
          ballList[i].y = 10
        }
      } else if (ballList[i].x <= leftBottomBound[0].rx && getkx(ballList, i) < 0 || (ballList[i].x >= rightBottomBound[0].lx - 10 && getkx(ballList, i) >= 0) || (ballList[i].x > leftBottomBound[0].rx && ballList[i].x < rightBottomBound[0].lx && ballList[i].y > 530)) {
        setkx(0, ballList, i)
        setky(10, ballList, i)
        setk(Infinity, ballList, i)
      } else if (ballList[i].x + getkx(ballList, i) <= leftBottomBound[0].rx || ballList[i].x + getkx(ballList, i) >= rightBottomBound[0].lx - 10) {
        if (ballList[i].x + getkx(ballList, i) <= leftBottomBound[0].rx && getkx(ballList, i) < 0) {
          setkx(leftBottomBound[0].rx - ballList[i].x, ballList, i)
          setky(Math.abs(getkx(ballList, i) * getk(ballList, i)), ballList, i)
          if (getky(ballList, i) > 10) {
            setky(10, ballList, i)
          }
          if (getky(ballList, i) < 0.5) {
            setky(0.5, ballList, i)
          }
        } else if (ballList[i].x + getkx(ballList, i) >= rightBottomBound[0].lx - 10 && getkx(ballList, i) >= 0) {
          setkx(rightBottomBound[0].lx - 10 - ballList[i].x, ballList, i)
          setky(Math.abs(getkx(ballList, i) * getk(ballList, i)), ballList, i)
          if (getky(ballList, i) > 10) {
            setky(10, ballList, i)
          }
          if (getky(ballList, i) < 0.5) {
            setky(0.5, ballList, i)
          }
        }
      }
    }

    var addballindex = isnearAddBall(ballList, i, getkx(ballList, i), getky(ballList, i), map, addballList)
    if (addballindex !== -1 && parseInt(getdistanceballandaddball(addballindex, addballList, ballList, i)) <= addballList[addballindex].len / 2 + 5) {
      resetMap(map, addballList[addballindex], 0)

      createNewBall(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, ballList, i, leftBoundx, rightBoundx, rightBottomBound, leftBottomBound, addballList)
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      scene.removeChild(addballList[addballindex])
    }

    if (parseInt(ballList[i].y) <= 40 && parseInt(ballList[i].x) <= 8) {
      ballList[i].className = 'tan_yi_tan_ball tan_yi_tan_ballremove'
      clearInterval(ballList[i].timer)
      global.TIMER.splice(global.TIMER.indexOf(ballList[i].timer), 1)
      ballList[i].timer = -1
      global.setCreate(true)
    } else if (parseInt(ballList[i].x) <= 5) {
      setkx(0, ballList, i)
      setky(-20, ballList, i)
      setk(Infinity, ballList, i)
      ballList[i].className = 'tan_yi_tan_ball tan_yi_tan_ballcall'
    } else if (inLeftBottomBound(leftBottomBound, ballList, i)) {
      setkx(-10, ballList, i)
      setky(10 * leftBottomBound[0].k, ballList, i)
      setk(-leftBottomBound[0].k, ballList, i)
    } else if (isNearLeftBottomBound(leftBottomBound, getkx(ballList, i), getky(ballList, i), getk(ballList, i), ballList, i)) {
      setkx(getNewkxWhenNearLeftBottom(leftBottomBound, ballList, i), ballList, i)
      setky(parseFloat(getkx(ballList, i)) * Math.abs(getk(ballList, i)), ballList, i)
      if (getkx(ballList, i) === 0) {
        setky((distanceTouchLeftBottomBound(leftBottomBound, ballList[i].x + 5, ballList[i].y + 5) - 5) / sin(90 - leftBottomBound[0].rotateDeg), ballList, i)
      } else if (getk(ballList, i) < 0) {
        setkx(-getNewkxWhenNearLeftBottom(leftBottomBound, ballList, i), ballList, i)
      }
    }

    if (parseInt(ballList[i].y) <= 40 && parseInt(ballList[i].x) >= 250) {
      ballList[i].className = 'tan_yi_tan_ball tan_yi_tan_ballremove'
      clearInterval(ballList[i].timer)
      global.TIMER.splice(global.TIMER.indexOf(ballList[i].timer), 1)
      ballList[i].timer = -1
      global.setCreate(true)
    } else
    if (parseInt(ballList[i].x) >= 250) {
      setkx(0, ballList, i)
      setky(-20, ballList, i)
      setk(Infinity, ballList, i)
      ballList[i].className = 'tan_yi_tan_ball tan_yi_tan_ballcall'
    } else
    if (inRightBottomBound(rightBottomBound, ballList, i)) {
      setkx(10, ballList, i)
      setky(10 * rightBottomBound[0].k, ballList, i)
      setk(rightBottomBound[0].k, ballList, i)
    } else if (isNearRightBottomBound(rightBottomBound, getkx(ballList, i), getky(ballList, i), getk(ballList, i), ballList, i)) {
      setkx(getNewkxWhenNearRightBottom(rightBottomBound, ballList, i), ballList, i)
      setky(parseFloat(getkx(ballList, i)) * Math.abs(getk(ballList, i)), ballList, i)
      if (getkx(ballList, i) === 0) {
        setky((distanceTouchRightBottomBound(rightBottomBound, ballList[i].x + 5, ballList[i].y + 5) - 5) / sin(90 - rightBottomBound[0].rotateDeg), ballList, i)
      } else
      if (getk(ballList, i) < 0) {
        setkx(-getNewkxWhenNearRightBottom(rightBottomBound, ballList, i), ballList, i)
      }
    }
  }

  function initTopTwoBall (scene, map, positionleft) {
    var circle = document.createElement('div')
    scene.appendChild(circle)
    circle.className = 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_topBottom'

    circle.x = positionleft
    circle.style.left = circle.x + 'px'
    circle.y = 25
    circle.style.top = circle.y + 'px'
    circle.len = parseFloat(parseFloat(circle.offsetWidth * 0.45).toFixed(1))

    circle.style.transform = ' scale(0.53)'
    var circleafter = document.createElement('div')
    circle.appendChild(circleafter)
    circleafter.className = 'tan_yi_tan_circleafter tan_yi_tan_topBottom'

    circleafter.innerHTML = '+1'
    getdegInScene(map, circle, scene, 0)
  }

  function initTopBottom (scene, map, positionleft, positiontop, scales) {
    var circle = document.createElement('div')
    scene.appendChild(circle)
    circle.className = 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_bigTopBottom'

    circle.x = positionleft
    circle.style.left = circle.x + 'px'
    circle.y = positiontop
    circle.style.top = circle.y + 'px'
    circle.len = parseFloat(parseFloat(circle.offsetWidth * (scales)).toFixed(1))

    circle.style.transform = ' scale(' + scales + ')'
    var circleafter = document.createElement('div')
    circle.appendChild(circleafter)
    circleafter.className = 'tan_yi_tan_circleafter tan_yi_tan_topBottom'

    circleafter.innerHTML = '+1'
    getdegInScene(map, circle, scene, 0)
  }

  function createNewBall (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, ballList, i, leftBoundx, rightBoundx, rightBottomBound, leftBottomBound, addballList) {
    var ball = document.createElement('div')
    ball.className = 'tan_yi_tan_ball'

    ball.x = ballList[i].x
    ball.y = ballList[i].y
    ball.style.left = ball.x + 'px'
    ball.style.top = ball.y + 'px'

    scene.appendChild(ball)
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    recordXY(ballList)
    var index = ballList.length - 1
    setkx(-getkx(ballList, i), ballList, index)
    setky(getky(ballList, i), ballList, index)
    setk(-getk(ballList, i), ballList, index)
    ballList[index].recallinleft = false
    ballList[index].recallinright = false
    ballList[index].touchtriangle = false
    ballList[index].touchsquare = false
    ballList[index].touchcircle = false
    ballList[index].removetriangle = -2
    ballList[index].removesquare = -2
    ballList[index].removecircle = -2
    ballList[index].currenttriangle = -2
    ballList[index].currentsquare = -2
    ballList[index].currentcircle = -2
    setShoudAddtokx(0, ballList, index)
    setShoudAddtoky(0, ballList, index)
    setShoudAddtok(0, ballList, index)
    ballList[index].timer = setInterval(function () {
      ballTouchBound(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, index), getky(ballList, index), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, index, addballList)

      ball.x = ball.x + getkx(ballList, index)
      ball.y = ball.y + getky(ballList, index)
      ball.style.left = (ball.x) + 'px'
      ball.style.top = (ball.y) + 'px'

      if (getBallHasRemoveNum(ballList) === ballList.length) {
        recordXY(ballList)
      }
    }, 20)
    global.TIMER.push(ballList[index].timer)
  }

  function createaddBall (map, scene) {
    var addball = document.createElement('div')
    addball.className = 'tan_yi_tan_model tan_yi_tan_addball'
    scene.appendChild(addball)
    addball.len = 15
    addball.y = 395
    addball.style.background = 'white'
    addball.x = 20 + randomNum(218)
    while (!notInScene(map, addball, 0)) {
      addball.x = 20 + randomNum(218)
    }
    addball.innerHTML = '+'
    addball.style.left = addball.x + 'px'
    addball.style.top = addball.y + 'px'
    global.setAddBall(false)
  }

  function isnearAddBall (ballList, i, kx, ky, map, addballList) {
    var x0
    var x1
    var y0
    var y1
    for (var j = 0; j < addballList.length; j++) {
      x0 = ballList[i].x + kx + 5
      x1 = addballList[j].x + addballList[j].len / 2
      y0 = ballList[i].y + ky + 5
      y1 = addballList[j].y + addballList[j].len / 2
      if (Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)) <= 5 + addballList[j].len / 2) {
        return j
      }
    }
    return -1
  }

  function getdistanceballandaddball (addballindex, addballList, ballList, i) {
    var distance = Math.sqrt((ballList[i].x + 5 - (addballList[addballindex].x + addballList[addballindex].len / 2)) * (ballList[i].x + 5 - (addballList[addballindex].x + addballList[addballindex].len / 2)) + (ballList[i].y + 5 - (addballList[addballindex].y + addballList[addballindex].len / 2)) * (ballList[i].y + 5 - (addballList[addballindex].y + addballList[addballindex].len / 2)))
    return distance
  }

  function isnearsquare (ballList, index, squareList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    squareList = document.querySelectorAll('.tan_yi_tan_square')
    squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
    for (var squareIndex = 0; squareIndex < squareList.length; squareIndex++) {
      const x = squareList[squareIndex].x
      const y = squareList[squareIndex].y
      const deg = squareList[squareIndex].deg
      const len = squareList[squareIndex].len

      const x0 = x
      const y0 = y
      const x1 = parseInt(x + len * cos(deg))
      const y1 = parseInt(y + len * sin(deg))

      const x3 = parseInt(x - len * sin(deg))
      const y3 = parseInt(y + len * cos(deg))
      for (var i = ballList[index].x + getkx(ballList, index); i < ballList[index].x + getkx(ballList, index) + ballList[index].len; i++) {
        for (var j = ballList[index].y + getky(ballList, index); j < ballList[index].y + getky(ballList, index) + ballList[index].len; j++) {
          if ((i - ballList[index].x - getkx(ballList, index) - 5) * (i - ballList[index].x - getkx(ballList, index) - 5) + (j - ballList[index].y - getky(ballList, index) - 5) * (j - ballList[index].y - getky(ballList, index) - 5) >= 24.8 && (i - ballList[index].x - getkx(ballList, index) - 5) * (i - ballList[index].x - getkx(ballList, index) - 5) + (j - ballList[index].y - getky(ballList, index) - 5) * (j - ballList[index].y - getky(ballList, index) - 5) <= 25.2) {
            if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
              return squareIndex
            }
          }
        }
      }
    }

    return -1
  }

  function isinsquare (ballList, index, squareList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    squareList = document.querySelectorAll('.tan_yi_tan_square')

    squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
    for (var squareIndex = 0; squareIndex < squareList.length; squareIndex++) {
      const x = squareList[squareIndex].x
      const y = squareList[squareIndex].y
      const deg = squareList[squareIndex].deg
      const len = squareList[squareIndex].len
      const x0 = x
      const y0 = y
      const x1 = parseInt(x + len * cos(deg))
      const y1 = parseInt(y + len * sin(deg))

      const x3 = parseInt(x - len * sin(deg))
      const y3 = parseInt(y + len * cos(deg))
      for (var i = ballList[index].x; i < ballList[index].x + ballList[index].len; i++) {
        for (var j = ballList[index].y; j < ballList[index].y + ballList[index].len; j++) {
          if ((i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) >= 24.8 && (i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) <= 25.2) {
            if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
              return squareIndex
            }
          }
        }
      }
    }

    return -1
  }

  function nowissquare (ballList, index, squareList, squareIndex) {
    const x = squareList[squareIndex].x
    const y = squareList[squareIndex].y
    const deg = squareList[squareIndex].deg
    const len = squareList[squareIndex].len

    const x0 = x
    const y0 = y
    const x1 = parseInt(x + len * cos(deg))
    const y1 = parseInt(y + len * sin(deg))

    const x3 = parseInt(x - len * sin(deg))
    const y3 = parseInt(y + len * cos(deg))

    for (var i = ballList[index].x; i < ballList[index].x + ballList[index].len; i++) {
      for (var j = ballList[index].y; j < ballList[index].y + ballList[index].len; j++) {
        if ((i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) >= 24.8 && (i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) <= 25.2) {
          if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
            return true
          }
        }
      }
    }

    return false
  }

  function getNewkxkyWhenNearsquare (squareIndex, squareList, ballList, i) {
    var tempx = ballList[i].x
    var tempy = ballList[i].y
    var newkxky = []

    if (isnearsquare(ballList, i, squareList) !== squareIndex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      squareList = document.querySelectorAll('.tan_yi_tan_square')

      squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')

      if (isnearsquare(ballList, i, squareList) !== -1) {
        ballList[i].currentsquare = isnearsquare(ballList, i, squareList)
        squareIndex = ballList[i].currentsquare
      } else {
        newkxky[0] = getLastkx(ballList, i)
        newkxky[1] = getLastky(ballList, i)
        return newkxky
      }
    }

    if (nowissquare(ballList, i, squareList, squareIndex)) {
      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy
      return newkxky
    }

    if (getky(ballList, i) === 0) {
      while (!nowissquare(ballList, i, squareList, squareIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.01
        } else {
          ballList[i].x = ballList[i].x - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) === 0) {
      while (!nowissquare(ballList, i, squareList, squareIndex) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.01
        } else {
          ballList[i].y = ballList[i].y - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) >= -0.5 && getkx(ballList, i) <= 0.5) {
      while (!nowissquare(ballList, i, squareList, squareIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.01 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.01 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.01
        } else {
          ballList[i].y = ballList[i].y - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getky(ballList, i) >= -0.5 && getky(ballList, i) <= 0.5) {
      while (!nowissquare(ballList, i, squareList, squareIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.01 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.01 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.01
        } else {
          ballList[i].y = ballList[i].y - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else {
      while (!nowissquare(ballList, i, squareList, squareIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.1 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.1 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.1
        } else {
          ballList[i].y = ballList[i].y - 0.1
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    }
  }

  function nodeInsquareList (squareList, squareafterList, squareindex, node) {
    if (squareList[squareindex] === node && parseInt(squareafterList[squareindex].innerHTML) === 0) {
      return true
    }
    return false
  }

  function squarrdelete (squdeg, squareindex) {
    squdeg.splice(squareindex, 1)
    return squdeg
  }

  function getsquareReboundKKxKY (ballList, index, squareList, squareIndex) {
    var result = []
    squareafterList = document.querySelectorAll('.tan_yi_tan_square')
    if (isinsquare(ballList, index, squareList) !== squareIndex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      squareList = document.querySelectorAll('.tan_yi_tan_square')
      squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
      alert('2084')
      if (isinsquare(ballList, index, squareList) !== -1
      ) {
        ballList[index].currentsquare = isinsquare(ballList, index, squareList)
        squareIndex = ballList[index].currentsquare
      } else {
        result[0] = 0
        result[1] = 0
        result[2] = 0

        return result
      }
    }

    const x = squareList[squareIndex].x
    const y = squareList[squareIndex].y
    const deg = squareList[squareIndex].deg
    const len = squareList[squareIndex].len

    const x0 = x
    const y0 = y
    const x1 = parseInt(x + len * cos(deg))
    const y1 = parseInt(y + len * sin(deg))

    const x3 = parseInt(x - len * sin(deg))
    const y3 = parseInt(y + len * cos(deg))
    const i = ballList[index].x + 5
    const j = ballList[index].y + 5

    var absdeg
    if (j < tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))
      if (result[0] >= 0) {
        result[1] = 10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
        if (result[0] > tan(deg)) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      } else {
        result[1] = -10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && j < -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))

      if (result[0] >= 0) {
        result[1] = -10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)
      } else {
        result[1] = 10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)
        if (result[0] < -1 / tan(deg)) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j > tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))

      if (result[0] >= 0) {
        result[1] = 10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
        if (result[0] < tan(deg)) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      } else {
        result[1] = 10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j > -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))

      if (result[0] >= 0) {
        result[1] = 10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
      } else {
        result[1] = 10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)
        if (result[0] > -1 / tan(deg)) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      }
    }

    var bounddeg = deg - 45

    if (j < tan(deg) * (i - x0) + y0 && j < -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(bounddeg), getk(ballList, index))
      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
      }
      absdeg = Math.abs(arctan(result[0]))
      if (bounddeg >= 0) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] > tan(bounddeg)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      } else if (bounddeg < 0) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] < tan(bounddeg)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        }
      }

      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
        result[1] = -getLastky(ballList, index)
        result[2] = getLastkx(ballList, index)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && j < -1 / tan(deg) * (i - x0) + y0 && j > tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(tan(bounddeg), getk(ballList, index))
      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
      }
      absdeg = Math.abs(arctan(result[0]))
      if (bounddeg >= 0) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)

          if (result[0] > -1 / tan(bounddeg)) {
            result[1] = 10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        }
      } else if (bounddeg < 0) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)

          if (result[0] > -1 / tan(bounddeg)) {
            result[1] = 10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      }

      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
        result[1] = getLastky(ballList, index)
        result[2] = -getLastkx(ballList, index)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j > tan(deg) * (i - x3) + y3 && j > -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(bounddeg), getk(ballList, index))
      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
      }
      absdeg = Math.abs(arctan(result[0]))
      if (bounddeg >= 0) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] < tan(bounddeg)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      } else if (bounddeg < 0) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] > tan(bounddeg)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        }
      }

      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
        result[1] = -getLastky(ballList, index)
        result[2] = getLastkx(ballList, index)
      }
    } else if (j < tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j > -1 / tan(deg) * (i - x1) + y1) {
      result[0] = getSymmetry(tan(bounddeg), getk(ballList, index))
      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
      }
      absdeg = Math.abs(arctan(result[0]))
      if (bounddeg >= 0) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)

          if (result[0] < -1 / tan(bounddeg)) {
            result[1] = 10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        }
      } else if (bounddeg < 0) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)

          if (result[0] < -1 / tan(bounddeg)) {
            result[1] = 10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      }
      if (bounddeg === 0) {
        result[0] = -getk(ballList, index)
        result[1] = getLastky(ballList, index)
        result[2] = -getLastkx(ballList, index)
      }
    }

    return result
  }

  function rechecksquare (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    squareList = document.querySelectorAll('.tan_yi_tan_square')
    squdeg = global.getsqudeg()
    squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
    if (!ballList[i]) {
      return 0
    }
    if (ballList[i].touchsquare) {
      if (isinsquare(ballList, i, squareList) !== ballList[i].currentsquare) {
        if (isinsquare(ballList, i, squareList) !== -1) {
          ballList[i].currentsquare = isinsquare(ballList, i, squareList)
        } else {
          ballList[i].touchsquare = false
          ballList[i].currentsquare = -2
          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
          if (getkx(ballList, i) === 0) {
            setk(Infinity, ballList, i)
          }
          if (isnearsquare(ballList, i, squareList) !== -1) {
            rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          return
        }
      }

      if (ballList[i].currentsquare < squareList.length) {
        if (squareList[ballList[i].currentsquare].className === 'tan_yi_tan_model tan_yi_tan_square') {
          if (squareafterList[ballList[i].currentsquare].innerHTML > 0) {
            if (squareafterList[ballList[i].currentsquare].className === 'tan_yi_tan_squareafter playAnimation3') {
              squareafterList[ballList[i].currentsquare].className = 'tan_yi_tan_squareafter playAnimation4'
            } else {
              squareafterList[ballList[i].currentsquare].className = 'tan_yi_tan_squareafter playAnimation3'
            }

            squareafterList[ballList[i].currentsquare].innerHTML = parseInt(squareafterList[ballList[i].currentsquare].innerHTML) - 1
          }
          global.setGamePoint(global.getGamePoint() + 1)
        }

        if (parseInt(squareafterList[ballList[i].currentsquare].innerHTML) === 0 && squareList[ballList[i].currentsquare].className === 'tan_yi_tan_model tan_yi_tan_square') {
          resetMap(map, squareList[ballList[i].currentsquare], 0)

          if (nodeInsquareList(squareList, squareafterList, ballList[i].currentsquare, squareList[ballList[i].currentsquare], ballList, i)) {
            squareList[ballList[i].currentsquare].className = 'tan_yi_tan_hasRemove'
            squareafterList[ballList[i].currentsquare].className = 'tan_yi_tan_hasRemove'

            scene.removeChild(squareList[ballList[i].currentsquare])
            showarr(squdeg)
            squdeg = squarrdelete(squdeg, ballList[i].currentsquare)
            global.setsqudeg(squdeg)
            showarr(squdeg)

            squareList = document.querySelectorAll('.tan_yi_tan_square')

            squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')
            recordAllModelMes(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList)
          } else {
            alert(2825)
          }

          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)

          ballList[i].currentsquare = -2
          ballList[i].touchsquare = false

          if (isnearsquare(ballList, i, squareList) !== -1) {
            console.log('diercizhixing'); rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        } else if (squareafterList[ballList[i].currentsquare].innerHTML > 0) {
          var result = getsquareReboundKKxKY(ballList, i, squareList, ballList[i].currentsquare)
          if (result[0] !== 0 || result[1] !== 0 || result[2] !== 0) {
            setkx(result[2], ballList, i)
            setky(result[1], ballList, i)
            setk(result[0], ballList, i)
            setLastkx(getkx(ballList, i), ballList, i)
            setLastky(getky(ballList, i), ballList, i)
          } else if (result[0] === 0 && result[1] === 0 && result[2] === 0) {
            setkx(getLastkx(ballList, i), ballList, i)
            setky(getLastky(ballList, i), ballList, i)
            setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
            if (getkx(ballList, i) === 0) {
              setk(Infinity, ballList, i)
            }
          }

          ballList[i].touchsquare = false
          ballList[i].currentsquare = -2

          if (isnearsquare(ballList, i, squareList) !== -1) {
            rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }
      } else {
        ballList[i].touchsquare = false
        ballList[i].currentsquare = -2
        setkx(getLastkx(ballList, i), ballList, i)
        setky(getLastky(ballList, i), ballList, i)
        setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
        if (getkx(ballList, i) === 0) {
          setk(Infinity, ballList, i)
        }
        if (isnearsquare(ballList, i, squareList) !== -1) {
          rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }
        recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

        recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
      }
    }

    if (isnearsquare(ballList, i, squareList) !== -1) {
      ballList[i].currentsquare = isnearsquare(ballList, i, squareList)

      var newkxky = getNewkxkyWhenNearsquare(ballList[i].currentsquare, squareList, ballList, i)

      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setkx(newkxky[0], ballList, i)

      setky(newkxky[1], ballList, i)

      ballList[i].touchsquare = true
    }
  }

  function rechecktriangle (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
    trideg = global.gettrideg()
    triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
    if (!ballList[i]) {
      return 0
    }
    if (ballList[i].touchtriangle) {
      if (isintriangle(ballList, i, triangleList) !== ballList[i].currenttriangle) {
        if (isintriangle(ballList, i, triangleList) !== -1) {
          ballList[i].currenttriangle = isintriangle(ballList, i, triangleList)
        } else {
          ballList[i].touchtriangle = false
          ballList[i].currenttriangle = -2
          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
          if (getkx(ballList, i) === 0) {
            setk(Infinity, ballList, i)
          }

          if (isneartriangle(ballList, i, triangleList) !== -1) {
            rechecktriangle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }
          rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          return
        }
      }

      if (ballList[i].currenttriangle < triangleList.length) {
        if (triangleList[ballList[i].currenttriangle].className === 'tan_yi_tan_model tan_yi_tan_triangle') {
          if (triangleafterList[ballList[i].currenttriangle].innerHTML > 0) {
            if (triangleafterList[ballList[i].currenttriangle].className === 'tan_yi_tan_triangleafter playAnimation3') {
              triangleafterList[ballList[i].currenttriangle].className = 'tan_yi_tan_triangleafter playAnimation4'
            } else {
              triangleafterList[ballList[i].currenttriangle].className = 'tan_yi_tan_triangleafter playAnimation3'
            }

            triangleafterList[ballList[i].currenttriangle].innerHTML = parseInt(triangleafterList[ballList[i].currenttriangle].innerHTML) - 1
          }
          global.setGamePoint(global.getGamePoint() + 1)
        }

        if (parseInt(triangleafterList[ballList[i].currenttriangle].innerHTML) === 0 && triangleList[ballList[i].currenttriangle].className === 'tan_yi_tan_model tan_yi_tan_triangle') {
          resetMap(map, triangleList[ballList[i].currenttriangle], 0)

          if (nodeIntriangleList(triangleList, triangleafterList, ballList[i].currenttriangle, triangleList[ballList[i].currenttriangle], ballList, i)) {
            triangleList[ballList[i].currenttriangle].className = 'tan_yi_tan_hasRemove'
            triangleafterList[ballList[i].currenttriangle].className = 'tan_yi_tan_hasRemove'

            scene.removeChild(triangleList[ballList[i].currenttriangle])
            showarr(trideg)
            trideg = triarrdelete(trideg, ballList[i].currenttriangle)
            global.settrideg(trideg)
            showarr(trideg)

            triangleList = document.querySelectorAll('.tan_yi_tan_triangle')

            triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
            recordAllModelMes(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList)
          } else {

          }

          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)

          ballList[i].currentsquare = -2
          ballList[i].touchsquare = false

          if (isneartriangle(ballList, i, triangleList) !== -1) {
            rechecktriangle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }
          rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        } else if (triangleafterList[ballList[i].currenttriangle].innerHTML > 0) {
          var result = gettriangleReboundKKxKY(ballList, i, triangleList, ballList[i].currenttriangle)
          if (result[0] !== 0 || result[1] !== 0 || result[2] !== 0) {
            setkx(result[2], ballList, i)
            setky(result[1], ballList, i)
            setk(result[0], ballList, i)
            setLastkx(getkx(ballList, i), ballList, i)
            setLastky(getky(ballList, i), ballList, i)
          } else if (result[0] === 0 && result[1] === 0 && result[2] === 0) {
            setkx(getLastkx(ballList, i), ballList, i)
            setky(getLastky(ballList, i), ballList, i)
            setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
            if (getkx(ballList, i) === 0) {
              setk(Infinity, ballList, i)
            }
          }

          ballList[i].touchtriangle = false
          ballList[i].currenttriangle = -2

          if (isneartriangle(ballList, i, triangleList) !== -1) {
            rechecktriangle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }
          rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }
      } else {
        ballList[i].touchtriangle = false
        ballList[i].currenttriangle = -2
        setkx(getLastkx(ballList, i), ballList, i)
        setky(getLastky(ballList, i), ballList, i)
        setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
        if (getkx(ballList, i) === 0) {
          setk(Infinity, ballList, i)
        }
        if (isneartriangle(ballList, i, triangleList) !== -1) {
          rechecktriangle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }
        rechecksquare(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

        recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)

        recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
      }
    }

    if (isneartriangle(ballList, i, triangleList) !== -1) {
      ballList[i].currenttriangle = isneartriangle(ballList, i, triangleList)

      var newkxky = getNewkxkyWhenNeartriangle(ballList[i].currenttriangle, triangleList, ballList, i)

      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setkx(newkxky[0], ballList, i)

      setky(newkxky[1], ballList, i)

      ballList[i].touchtriangle = true
    }
  }

  function nowistriangle (ballList, index, triangleList, triangleIndex) {
    const x = triangleList[triangleIndex].x
    const y = triangleList[triangleIndex].y
    const deg = triangleList[triangleIndex].deg
    const len = triangleList[triangleIndex].len

    const x0 = x
    const y0 = y
    const x1 = parseInt(x + len * cos(deg))
    const y1 = parseInt(y + len * sin(deg))

    for (var i = ballList[index].x; i < ballList[index].x + ballList[index].len; i++) {
      for (var j = ballList[index].y; j < ballList[index].y + ballList[index].len; j++) {
        if ((i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) >= 24.8 && (i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) <= 25.2) {
          if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
            return true
          }
        }
      }
    }

    return false
  }

  function isintriangle (ballList, index, triangleList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
    triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
    for (var triangleIndex = 0; triangleIndex < triangleList.length; triangleIndex++) {
      const x = triangleList[triangleIndex].x
      const y = triangleList[triangleIndex].y
      const deg = triangleList[triangleIndex].deg
      const len = triangleList[triangleIndex].len

      const x0 = x
      const y0 = y
      const x1 = parseInt(x + len * cos(deg))
      const y1 = parseInt(y + len * sin(deg))

      for (var i = ballList[index].x; i < ballList[index].x + ballList[index].len; i++) {
        for (var j = ballList[index].y; j < ballList[index].y + ballList[index].len; j++) {
          if ((i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) >= 24.8 && (i - ballList[index].x - 5) * (i - ballList[index].x - 5) + (j - ballList[index].y - 5) * (j - ballList[index].y - 5) <= 25.2) {
            if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
              return triangleIndex
            }
          }
        }
      }
    }

    return -1
  }

  function isneartriangle (ballList, index, triangleList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
    triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
    for (var triangleIndex = 0; triangleIndex < triangleList.length; triangleIndex++) {
      const x = triangleList[triangleIndex].x
      const y = triangleList[triangleIndex].y
      const deg = triangleList[triangleIndex].deg
      const len = triangleList[triangleIndex].len

      const x0 = x
      const y0 = y
      const x1 = parseInt(x + len * cos(deg))
      const y1 = parseInt(y + len * sin(deg))

      for (var i = ballList[index].x + getkx(ballList, index); i < ballList[index].x + getkx(ballList, index) + ballList[index].len; i++) {
        for (var j = ballList[index].y + getky(ballList, index); j < ballList[index].y + getky(ballList, index) + ballList[index].len; j++) {
          if ((i - ballList[index].x - getkx(ballList, index) - 5) * (i - ballList[index].x - getkx(ballList, index) - 5) + (j - ballList[index].y - getky(ballList, index) - 5) * (j - ballList[index].y - getky(ballList, index) - 5) >= 24.8 && (i - ballList[index].x - getkx(ballList, index) - 5) * (i - ballList[index].x - getkx(ballList, index) - 5) + (j - ballList[index].y - getky(ballList, index) - 5) * (j - ballList[index].y - getky(ballList, index) - 5) <= 25.2) {
            if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
              return triangleIndex
            }
          }
        }
      }
    }

    return -1
  }

  function getNewkxkyWhenNeartriangle (triangleIndex, triangleList, ballList, i) {
    var tempx = ballList[i].x
    var tempy = ballList[i].y
    var newkxky = []

    if (isneartriangle(ballList, i, triangleList) !== triangleIndex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      triangleList = document.querySelectorAll('.tan_yi_tan_triangle')

      triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')

      if (isneartriangle(ballList, i, triangleList) !== -1) {
        ballList[i].currenttriangle = isneartriangle(ballList, i, triangleList)
        triangleIndex = ballList[i].currenttriangle
      } else {
        newkxky[0] = getLastkx(ballList, i)
        newkxky[1] = getLastky(ballList, i)
        return newkxky
      }
    }

    if (nowistriangle(ballList, i, triangleList, triangleIndex)) {
      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy
      return newkxky
    }

    if (getky(ballList, i) === 0) {
      while (!nowistriangle(ballList, i, triangleList, triangleIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.01
        } else {
          ballList[i].x = ballList[i].x - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) === 0) {
      while (!nowistriangle(ballList, i, triangleList, triangleIndex) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.01
        } else {
          ballList[i].y = ballList[i].y - 0.01
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) >= -0.5 && getkx(ballList, i) <= 0.5) {
      while (!nowistriangle(ballList, i, triangleList, triangleIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.002 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.002 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.002
        } else {
          ballList[i].y = ballList[i].y - 0.002
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getky(ballList, i) >= -0.5 && getky(ballList, i) <= 0.5) {
      while (!nowistriangle(ballList, i, triangleList, triangleIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.002 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.002 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.002
        } else {
          ballList[i].y = ballList[i].y - 0.002
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else {
      while (!nowistriangle(ballList, i, triangleList, triangleIndex) && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.05 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.05 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.05
        } else {
          ballList[i].y = ballList[i].y - 0.05
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    }
  }

  function nodeIntriangleList (triangleList, triangleafterList, triangleindex, node) {
    if (triangleList[triangleindex] === node && parseInt(triangleafterList[triangleindex].innerHTML) === 0) {
      return true
    }
    return false
  }

  function gettriangleReboundKKxKY (ballList, index, triangleList, triangleIndex) {
    var result = []
    triangleafterList = document.querySelectorAll('.tan_yi_tan_triangle')
    if (isintriangle(ballList, index, triangleList) !== triangleIndex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
      triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')

      if (isintriangle(ballList, index, triangleList) !== -1
      ) {
        ballList[index].currenttriangle = isintriangle(ballList, index, triangleList)
        triangleIndex = ballList[index].currenttriangle
      } else {
        result[0] = 0
        result[1] = 0
        result[2] = 0

        return result
      }
    }

    const x = triangleList[triangleIndex].x
    const y = triangleList[triangleIndex].y
    const deg = triangleList[triangleIndex].deg
    const len = triangleList[triangleIndex].len

    const x0 = x
    const y0 = y
    const x1 = parseInt(x + len * cos(deg))
    const y1 = parseInt(y + len * sin(deg))

    const i = ballList[index].x + 5
    const j = ballList[index].y + 5

    var absdeg
    if (j < tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))
      if (result[0] >= 0) {
        result[1] = 10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
        if (result[0] > tan(deg)) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      } else {
        result[1] = -10 * sin(absdeg)
        result[2] = 10 * cos(absdeg)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j > tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg - 60), getk(ballList, index))

      if (deg === 60) {
        result[0] = -getk(ballList, index)
      }

      absdeg = Math.abs(arctan(result[0]))
      if (deg >= 60) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] < tan(deg - 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      } else if (deg < 60) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        } else {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] > tan(deg - 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        }
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && ((j < tan(deg + 60) * (i - x0) + y0 || deg <= 30) * (deg !== 30 || i <= x0) * (j > tan(deg + 60) * (i - x0) + y0 || deg >= 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg + 60), getk(ballList, index))
      if (getkx(ballList, index) < 0.5 && getkx(ballList, index) > -0.5) {
        result[0] = tan(2 * deg - 90)
      }

      if (deg === 30) {
        result[0] = -getk(ballList, index)
      }

      absdeg = Math.abs(arctan(result[0]))

      if (deg >= 30) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        } else {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] < tan(deg + 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
          if (deg === 30) {
            result[1] = getLastky(ballList, index)
            result[2] = -getLastkx(ballList, index)
          }
        }
      } else if (deg < 30) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] < tan(deg + 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        }
      }
    }

    if (j < tan(deg) * (i - x0) + y0 && ((j < tan(deg + 60) * (i - x0) + y0 || deg <= 30) * (deg !== 30 || i <= x0) * (j > tan(deg + 60) * (i - x0) + y0 || deg >= 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg - 60), getk(ballList, index))
      if (deg === 60) {
        result[0] = -getk(ballList, index)
      }
      absdeg = Math.abs(arctan(result[0]))
      if (deg >= 60) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] > tan(deg - 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      } else if (deg < 60) {
        if (result[0] >= 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] < tan(deg - 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        }
      }

      if (deg === 60) {
        result[0] = -getk(ballList, index)
        result[1] = -getLastky(ballList, index)
        result[2] = getLastkx(ballList, index)
      }
    } else if (j >= tan(deg) * (i - x0) + y0 && ((j < tan(deg + 60) * (i - x0) + y0 || deg <= 30) * (deg !== 30 || i <= x0) * (j > tan(deg + 60) * (i - x0) + y0 || deg >= 30)) && j > tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg), getk(ballList, index))

      absdeg = Math.abs(arctan(result[0]))

      if (result[0] >= 0) {
        result[1] = -10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)

        if (result[0] > tan(deg)) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      } else if (result[0] < 0) {
        result[1] = 10 * sin(absdeg)
        result[2] = -10 * cos(absdeg)
      }
    } else if (j < tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j > tan(deg - 60) * (i - x1) + y1) {
      result[0] = getSymmetry(-1 / tan(deg + 60), getk(ballList, index))
      if (deg === 30) {
        result[0] = -getk(ballList, index)
      }

      absdeg = Math.abs(arctan(result[0]))

      if (deg >= 30) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        } else if (result[0] < 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = -10 * cos(absdeg)
          if (result[0] > tan(deg + 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = 10 * cos(absdeg)
          }
        }
      } else if (deg < 30) {
        if (result[0] >= 0) {
          result[1] = 10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
          if (result[0] > tan(deg + 60)) {
            result[1] = -10 * sin(absdeg)
            result[2] = -10 * cos(absdeg)
          }
        } else if (result[0] < 0) {
          result[1] = -10 * sin(absdeg)
          result[2] = 10 * cos(absdeg)
        }
      }
    }

    return result
  }

  function triarrdelete (trideg, triangleindex) {
    trideg.splice(triangleindex, 1)
    return trideg
  }

  function recheckcircle (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    circleList = document.querySelectorAll('.tan_yi_tan_circle')
    circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
    if (!ballList[i]) {
      return 0
    }
    if (ballList[i].touchcircle) {
      if (isinCircle(ballList, i, circleList) !== ballList[i].currentcircle) {
        if (isinCircle(ballList, i, circleList) !== -1) {
          ballList[i].currentcircle = isinCircle(ballList, i, circleList)
        } else {
          ballList[i].touchcircle = false
          ballList[i].currentcircle = -2
          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
          if (getkx(ballList, i) === 0) {
            setk(Infinity, ballList, i)
          }
          if (isnearCircle(ballList, i, circleList) !== -1 && isnearCircle(ballList, i, circleList) !== ballList[i].currentcircle) {
            recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          return
        }
      }

      if (ballList[i].currentcircle < circleList.length) {
        if (circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_topBottom') {
          if (circleafterList[ballList[i].currentcircle].className === 'tan_yi_tan_circleafter playAnimation') {
            circleafterList[ballList[i].currentcircle].className = 'tan_yi_tan_circleafter playAnimation2'
          } else {
            circleafterList[ballList[i].currentcircle].className = 'tan_yi_tan_circleafter playAnimation'
          }
          global.setGamePoint(global.getGamePoint() + 1)
        }

        if (circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle') {
          if (circleafterList[ballList[i].currentcircle].innerHTML > 0) {
            if (circleafterList[ballList[i].currentcircle].className === 'tan_yi_tan_circleafter playAnimation') {
              circleafterList[ballList[i].currentcircle].className = 'tan_yi_tan_circleafter playAnimation2'
            } else {
              circleafterList[ballList[i].currentcircle].className = 'tan_yi_tan_circleafter playAnimation'
            }

            circleafterList[ballList[i].currentcircle].innerHTML = parseInt(circleafterList[ballList[i].currentcircle].innerHTML) - 1
          }
          global.setGamePoint(global.getGamePoint() + 1)
        }

        if (parseInt(circleafterList[ballList[i].currentcircle].innerHTML) === 0 && circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle') {
          resetMap(map, circleList[ballList[i].currentcircle], 0)
          if (nodeInCircleList(circleList, circleafterList, ballList[i].currentcircle, circleList[ballList[i].currentcircle], ballList, i)) {
            circleList[ballList[i].currentcircle].className = 'tan_yi_tan_hasRemove'
            circleafterList[ballList[i].currentcircle].className = 'tan_yi_tan_hasRemove'

            scene.removeChild(circleList[ballList[i].currentcircle])

            circleList = document.querySelectorAll('.tan_yi_tan_circle')
            circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
            recordAllModelMes(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList)
          } else {

          }

          setkx(getLastkx(ballList, i), ballList, i)
          setky(getLastky(ballList, i), ballList, i)
          setk(getky(ballList, i) / getkx(ballList, i), ballList, i)

          ballList[i].currentcircle = -2
          ballList[i].touchcircle = false

          if (isnearCircle(ballList, i, circleList) !== -1 && isnearCircle(ballList, i, circleList) !== ballList[i].currentcircle) {
            recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        } else if ((circleafterList[ballList[i].currentcircle].innerHTML > 0 && circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle') || circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_topBottom' || circleList[ballList[i].currentcircle].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_bigTopBottom') {
          var result = getcircleReboundKKxKY(map, ballList, i, circleList, ballList[i].currentcircle)

          if (result[0] !== 0 || result[1] !== 0 || result[2] !== 0) {
            setkx(result[2], ballList, i)
            setky(result[1], ballList, i)
            setk(result[0], ballList, i)
            setLastkx(getkx(ballList, i), ballList, i)
            setLastky(getky(ballList, i), ballList, i)
          } else if (result[0] === 0 && result[1] === 0 && result[2] === 0) {
            setkx(getLastkx(ballList, i), ballList, i)
            setky(getLastky(ballList, i), ballList, i)
            setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
            if (getkx(ballList, i) === 0) {
              setk(Infinity, ballList, i)
            }
          }

          ballList[i].touchcircle = false
          ballList[i].currentcircle = -2
          if (isnearCircle(ballList, i, circleList) !== -1 && isnearCircle(ballList, i, circleList) !== ballList[i].currentcircle) {
            recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          }

          recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
          recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }
      } else {
        ballList[i].touchcircle = false
        ballList[i].currentcircle = -2
        setkx(getLastkx(ballList, i), ballList, i)
        setky(getLastky(ballList, i), ballList, i)
        setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
        if (getkx(ballList, i) === 0) {
          setk(Infinity, ballList, i)
        }
        if (isnearCircle(ballList, i, circleList) !== -1 && isnearCircle(ballList, i, circleList) !== ballList[i].currentcircle) {
          recheckcircle(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        }

        recheckr(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
        recheckl(circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, getkx(ballList, i), getky(ballList, i), leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i, addballList)
      }
    }

    if (isnearCircle(ballList, i, circleList) !== -1) {
      ballList[i].currentcircle = isnearCircle(ballList, i, circleList)

      var newkxky = getNewkxkyWhenNearCircle(map, ballList[i].currentcircle, circleList, ballList, i, getkx(ballList, i), getky(ballList, i), getk(ballList, i))

      setLastkx(getkx(ballList, i), ballList, i)
      setLastky(getky(ballList, i), ballList, i)
      setkx(newkxky[0], ballList, i)

      setky(newkxky[1], ballList, i)

      ballList[i].touchcircle = true

      if ((((ballList[i].x >= 76 && ballList[i].x <= 80) || (ballList[i].x >= 181 && ballList[i].x <= 185)) && ballList[i].y < 31 && getdistanceballandcircle(0, circleList, ballList, i) > 460 && getdistanceballandcircle(0, circleList, ballList, i) < 480.7) || (ballList[i].x <= 8) || (ballList[i].x >= 250)) {
        setkx(getLastkx(ballList, i), ballList, i)
        setky(getLastky(ballList, i), ballList, i)
        ballList[i].touchcircle = false
      }
    }
  }

  function isnearCircle (ballList, i, circleList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    circleList = document.querySelectorAll('.tan_yi_tan_circle')
    circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
    var x0
    var x1
    var y0
    var y1
    for (var j = 0; j < circleList.length; j++) {
      x0 = ballList[i].x + getkx(ballList, i) + 5
      x1 = circleList[j].x + circleList[j].len / 2
      y0 = ballList[i].y + getky(ballList, i) + 5
      y1 = circleList[j].y + circleList[j].len / 2
      if (Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)) <= 5 + circleList[j].len / 2) {
        return j
      }
    }
    return -1
  }

  function getNewkxkyWhenNearCircle (map, circleindex, circleList, ballList, i) {
    var tempx = ballList[i].x
    var tempy = ballList[i].y
    var newkxky = []

    if (isnearCircle(ballList, i, circleList) !== circleindex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      circleList = document.querySelectorAll('.tan_yi_tan_circle')
      circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
      alert('1608')
      if (isnearCircle(ballList, i, circleList) !== -1) {
        ballList[i].currentcircle = isnearCircle(ballList, i, circleList)
        circleindex = ballList[i].currentcircle
      } else {
        newkxky[0] = getLastkx(ballList, i)
        newkxky[1] = getLastky(ballList, i)
        return newkxky
      }
      console.log(i + '球x' + getkx(ballList, i) + 'y' + getky(ballList, i) + '现在靠近' + circleindex + '圆距离为' + getdistanceballandcircle(circleindex, circleList, ballList, i))
    }

    if (getdistanceballandcircle(circleindex, circleList, ballList, i) <= ballList[i].len / 2 + circleList[circleindex].len / 2) {
      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      return newkxky
    }

    if (getky(ballList, i) === 0) {
      while (getdistanceballandcircle(circleindex, circleList, ballList, i) > ballList[i].len / 2 + circleList[circleindex].len / 2 && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.05
        } else {
          ballList[i].x = ballList[i].x - 0.05
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) === 0) {
      while (getdistanceballandcircle(circleindex, circleList, ballList, i) > ballList[i].len / 2 + circleList[circleindex].len / 2 && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.05
        } else {
          ballList[i].y = ballList[i].y - 0.05
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getkx(ballList, i) >= -0.5 && getkx(ballList, i) <= 0.5) {
      while (getdistanceballandcircle(circleindex, circleList, ballList, i) > ballList[i].len / 2 + circleList[circleindex].len / 2 && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.005 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.005 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.005
        } else {
          ballList[i].y = ballList[i].y - 0.005
        }
      }
      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else if (getky(ballList, i) >= -0.5 && getky(ballList, i) <= 0.5) {
      while (getdistanceballandcircle(circleindex, circleList, ballList, i) > ballList[i].len / 2 + circleList[circleindex].len / 2 && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.005 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.005 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.005
        } else {
          ballList[i].y = ballList[i].y - 0.005
        }
      }
      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    } else {
      while (getdistanceballandcircle(circleindex, circleList, ballList, i) > ballList[i].len / 2 + circleList[circleindex].len / 2 && ((ballList[i].x <= tempx + getkx(ballList, i) && getkx(ballList, i) >= 0) || (ballList[i].x >= tempx + getkx(ballList, i) && getkx(ballList, i) < 0)) && ((ballList[i].y <= tempy + getky(ballList, i) && getky(ballList, i) >= 0) || (ballList[i].y >= tempy + getky(ballList, i) && getky(ballList, i) < 0))) {
        if (getkx(ballList, i) >= 0) {
          ballList[i].x = ballList[i].x + 0.05 / Math.abs(getk(ballList, i))
        } else {
          ballList[i].x = ballList[i].x - 0.05 / Math.abs(getk(ballList, i))
        }
        if (getky(ballList, i) >= 0) {
          ballList[i].y = ballList[i].y + 0.05
        } else {
          ballList[i].y = ballList[i].y - 0.05
        }
      }

      newkxky[0] = ballList[i].x - tempx
      newkxky[1] = ballList[i].y - tempy

      ballList[i].x = tempx
      ballList[i].y = tempy
      return newkxky
    }
  }

  function nodeInCircleList (circleList, circleafterList, circleindex, node) {
    if (circleList[circleindex] === node && parseInt(circleafterList[circleindex].innerHTML) === 0) {
      return true
    }
    return false
  }

  function getdistanceballandcircle (circleindex, circleList, ballList, i) {
    var distance = Math.sqrt((ballList[i].x + 5 - (circleList[circleindex].x + circleList[circleindex].len / 2)) * (ballList[i].x + 5 - (circleList[circleindex].x + circleList[circleindex].len / 2)) + (ballList[i].y + 5 - (circleList[circleindex].y + circleList[circleindex].len / 2)) * (ballList[i].y + 5 - (circleList[circleindex].y + circleList[circleindex].len / 2)))
    return distance
  }

  function getcircleReboundKKxKY (map, ballList, index, circleList, circleindex) {
    var result = []
    circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
    if (isinCircle(ballList, index, circleList) !== circleindex) {
      ballList = document.querySelectorAll('.tan_yi_tan_ball')
      circleList = document.querySelectorAll('.tan_yi_tan_circle')
      circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
      alert('2566')
      if (isinCircle(ballList, index, circleList) !== -1
      ) {
        ballList[index].currentcircle = isinCircle(ballList, index, circleList)
        circleindex = ballList[index].currentcircle
      } else {
        result[0] = 0
        result[1] = 0
        result[2] = 0

        return result
      }
      console.log('xinde' + circleindex)
    }

    var x = ballList[index].x
    var y = ballList[index].y
    var len = ballList[index].len
    var rx = circleList[circleindex].x + circleList[circleindex].len / 2
    var ry = circleList[circleindex].y + circleList[circleindex].len / 2

    if (getkx(ballList, index) === 0) {
      if (getky(ballList, index) > 0) {
        var z = randomNum(1)
        if (z === 1) {
          result[2] = 0.5
        } else {
          result[2] = -0.4
        }

        result[1] = -Math.sqrt(100 - result[2] * result[2])
      } else {
        z = randomNum(1)
        if (z === 1) {
          result[2] = 0.1 * randomNum(10)
        } else {
          result[2] = -0.2 * randomNum(5)
        }
        result[1] = Math.sqrt(100 - result[2] * result[2])
      }
      result[0] = result[1] / result[2]

      return result
    } else if (getky(ballList, index) === 0) {
      if (getkx(ballList, index) > 0) {
        result[1] = 0.1 * randomNum(10)
        result[2] = -Math.sqrt(100 - result[1] * result[1])
      } else {
        result[1] = -0.2 * randomNum(5)
        result[2] = Math.sqrt(100 - result[1] * result[1])
      }
      result[0] = result[1] / result[2]

      return result
    } else {
      for (var i = x; i <= x + len; i = i + 0.01) {
        for (var j = y; j <= y + len; j = j + 0.01) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            if (Math.sqrt((i - rx) * (i - rx) + (j - ry) * (j - ry)) <= circleList[circleindex].len / 2 + 0.2 && Math.sqrt((i - rx) * (i - rx) + (j - ry) * (j - ry)) >= circleList[circleindex].len / 2 - 0.2) {
              var ck = (j - ry) / (i - rx)

              if (i === rx) {
                result[0] = -getk(ballList, index)
                result[1] = -getLastky(ballList, index)
                result[2] = getLastkx(ballList, index)
                return result
              } else {
                result[0] = getSymmetry(ck, getk(ballList, index))

                result[1] = -10 * sin(arctan(result[0]))
                result[2] = 10 * cos(arctan(result[0]))
                var absdeg = Math.abs(arctan(result[0]))
                var r = circleList[circleindex].len / 2
                if (arctan(result[0]) < 0) {
                  if (i >= rx - r * sin(absdeg) && j < ry + r * cos(absdeg)) {
                    result[1] = -10 * sin(absdeg)
                    result[2] = 10 * cos(absdeg)
                  } else {
                    result[1] = 10 * sin(absdeg)
                    result[2] = -10 * cos(absdeg)
                  }
                } else if (arctan(result[0]) >= 0) {
                  if (i < rx + r * sin(absdeg) && j < ry + r * cos(absdeg)) {
                    result[1] = -10 * sin(absdeg)
                    result[2] = -10 * cos(absdeg)
                  } else {
                    result[1] = 10 * sin(absdeg)
                    result[2] = 10 * cos(absdeg)
                  }
                }

                return result
              }
            }
          }
        }
      }
    }
  }

  function isinCircle (ballList, i, circleList) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    circleList = document.querySelectorAll('.tan_yi_tan_circle'); circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
    var x0
    var x1
    var y0
    var y1
    for (var j = 0; j < circleList.length; j++) {
      x0 = ballList[i].x + 5
      x1 = circleList[j].x + circleList[j].len / 2
      y0 = ballList[i].y + 5
      y1 = circleList[j].y + circleList[j].len / 2
      if (Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)) <= 5 + circleList[j].len / 2) {
        return j
      }
    }
    return -1
  }

  function allModelup (map) {
    var triangleList = document.querySelectorAll('.tan_yi_tan_triangle')

    var circleList = document.querySelectorAll('.tan_yi_tan_circle')

    var squareList = document.querySelectorAll('.tan_yi_tan_square')

    var tpList = document.querySelectorAll('.tan_yi_tan_tp')
    var addballList = document.querySelectorAll('.tan_yi_tan_addball')
    for (var i = 0; i < addballList.length; i++) {
      addballList[i].y = addballList[i].y - 35
      if (addballList[i].y < 70) {
        global.setGameover(true)
      }
      addballList[i].style.top = addballList[i].y + 'px'
    }

    for (i = 0; i < tpList.length; i++) {
      tpList[i].y = tpList[i].y - 35

      tpList[i].style.top = tpList[i].y + 'px'
    }

    for (i = 0; i < triangleList.length; i++) {
      triangleList[i].y = triangleList[i].y - 35
      if (triangleList[i].y < 70) {
        global.setGameover(true)
      }
      triangleList[i].style.top = triangleList[i].y + 'px'
    }
    for (i = 0; i < circleList.length; i++) {
      if (circleList[i].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_topBottom' || circleList[i].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_bigTopBottom') {
        continue
      }
      circleList[i].y = circleList[i].y - 35
      if (circleList[i].y < 70) {
        global.setGameover(true)
      }
      circleList[i].style.top = circleList[i].y + 'px'
    }
    for (i = 0; i < squareList.length; i++) {
      squareList[i].y = squareList[i].y - 35
      if (squareList[i].y < 70) {
        global.setGameover(true)
      }
      squareList[i].style.top = squareList[i].y + 'px'
    }

    for (i = 80; i <= 1000; i++) {
      for (var j = 100; j <= 1860; j++) {
        map[i][j] = map[i][j + 140]
      }
    }
  }

  function createRandomModelType (modelNum) {
    var modelType = []
    for (var i = 0; i < modelNum; i++) {
      modelType[i] = randomNum(2)
    }
    return modelType
  }

  function initPositionx (modelNum) {
    var positionx = []
    for (var i = 0; i < modelNum; i++) {
      positionx[i] = -1
    }
    return positionx
  }

  function resort (positionx) {
    for (var i = 0; i < positionx.length; i++) {
      for (var j = 0; j < positionx.length - 1; j++) {
        if (positionx[j] > positionx[j + 1]) {
          var t = positionx[j]
          positionx[j] = positionx[j + 1]
          positionx[j + 1] = t
        }
      }
    }
    return positionx
  }

  function createRandomModel (scene, ballList, circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, map) {
    var gailv = randomNum(20)
    var modelNum
    if (gailv > 18) {
      modelNum = 2 + randomNum(4)
    } else if (gailv > 10) {
      modelNum = 2 + randomNum(2)

      if (modelNum < 4) {
        var gailv2 = randomNum(9)
        if (gailv2 < 7) { global.setAddBall(true) }
      }
    } else {
      modelNum = 3 + randomNum(1)
      if (modelNum < 4) {
        gailv2 = randomNum(9)
        if (gailv2 < 7) { global.setAddBall(true) }
      }
    }
    var positionx = createRandomModelPosition(modelNum)
    positionx = resort(positionx)
    var modelType = createRandomModelType(modelNum)

    for (var i = 0; i < modelNum; i++) {
      if (modelType[i] === 0) {
        var circle = document.createElement('div')

        scene.appendChild(circle)
        circle.className = 'tan_yi_tan_model tan_yi_tan_circle'

        circle.x = positionx[i] - randomNum(11)
        circle.style.left = circle.x + 'px'
        circle.y = 395 - randomNum(5)
        circle.style.top = circle.y + 'px'
        circle.len = parseFloat(parseFloat(circle.offsetWidth * 0.45).toFixed(1))
        circle.style.background = RandomColor()
        circle.style.transform = ' scale(0.45)'
        var circleafter = document.createElement('div')

        circle.appendChild(circleafter)
        circleafter.className = 'tan_yi_tan_circleafter'

        circleafter.value = 1 + getOriginNum(ballList.length)
        circleafter.innerHTML = circleafter.value
        getdegInScene(map, circle, scene, 0)
      } else if (modelType[i] === 1) {
        var square = document.createElement('div')
        scene.appendChild(square)
        square.className = 'tan_yi_tan_model tan_yi_tan_square'

        square.x = positionx[i] - randomNum(11)
        square.style.left = square.x + 'px'
        square.y = 395 - randomNum(5)
        square.style.top = square.y + 'px'
        square.len = parseFloat(square.offsetWidth * 0.4)
        square.style.background = RandomColor()
        square.deg = 1 + randomNum(88)

        square.deg = getdegInScene(map, square, scene, square.deg)
        squdeg[squdeg.length] = square.deg
        global.setsqudeg(squdeg)
        square.style.transform = ' scale(0.4) rotate(' + square.deg + 'deg)'

        var squareafter = document.createElement('div')
        square.appendChild(squareafter)
        squareafter.className = 'tan_yi_tan_squareafter'

        squareafter.style.transform = ' rotate(' + (-square.deg) + 'deg)'

        squareafter.value = 1 + getOriginNum(ballList.length)
        squareafter.innerHTML = squareafter.value
      } else if (modelType[i] === 2) {
        var triangle = document.createElement('div')
        scene.appendChild(triangle)
        triangle.className = 'tan_yi_tan_model tan_yi_tan_triangle'
        triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
        triangle.x = positionx[i] - randomNum(11)
        triangle.style.left = triangle.x + 'px'
        triangle.y = 395 - randomNum(5)
        triangle.style.top = triangle.y + 'px'
        triangle.len = parseFloat(triangle.offsetWidth * 0.5)
        triangle.style.borderColor = RandomColor() + ' transparent transparent '
        triangle.deg = 1 + randomNum(88)
        triangle.deg = getdegInScene(map, triangle, scene, triangle.deg)
        trideg[trideg.length] = triangle.deg
        global.settrideg(trideg)
        triangle.style.transform = ' scale(0.5) rotate(' + triangle.deg + 'deg)'

        var triangleafter = document.createElement('div')
        triangle.appendChild(triangleafter)
        triangleafter.className = 'tan_yi_tan_triangleafter'

        triangleafter.style.transform = ' rotate(' + (-triangle.deg) + 'deg)'
        triangleafter.value = 1 + getOriginNum(ballList.length)
        triangleafter.innerHTML = triangleafter.value
      }
    }
  }

  function isInPositionx (positionx, x) {
    for (var i = 0; i < positionx.length; i++) {
      if (positionx[i] === x) {
        return true
      }
    }
    return false
  }

  function showarr (squdeg) {
    for (var i = 0; i < squdeg.length; i++) {

    }
  }

  function getOriginNum (x) {
    var gailv = randomNum(30)
    if (gailv > 28) {
      return 4 * x + randomNum(x)
    } else if (gailv > 25) {
      return 3 * x + randomNum(x)
    } else if (gailv > 20) {
      return 2 * x + randomNum(x)
    } else if (gailv > 11) {
      return x + randomNum(x)
    } else {
      return randomNum(x)
    }
  }

  function getdegInScene (map, node, scene, deg) {
    var x = node.x * 4
    var y = node.y * 4
    var len = node.len * 4

    if (node.className === 'tan_yi_tan_model tan_yi_tan_circle') {
      notInScene(map, node, 0)
      for (var i = x; i <= x + len; i++) {
        for (var j = y; j < y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            map[i][j] = true
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_square') {
      while (!notInScene(map, node, deg)) {
        deg = 1 + randomNum(88)
      }
      var x0 = x
      var y0 = y
      var x1 = parseInt(x + len * cos(deg))
      var y1 = parseInt(y + len * sin(deg))
      var x2 = parseInt(x + Math.sqrt(2) * len * cos(deg + 45))
      var y2 = parseInt(y + Math.sqrt(2) * len * sin(deg + 45))
      var x3 = parseInt(x - len * sin(deg))
      var y3 = parseInt(y + len * cos(deg))

      for (i = x3; i <= x1; i++) {
        for (j = y0; j <= y2; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
            map[i][j] = true
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_triangle') {
      while (!notInScene(map, node, deg)) {
        deg = 1 + randomNum(88)
      }
      x0 = x
      y0 = y
      x1 = parseInt(x + len * cos(deg))
      y1 = parseInt(y + len * sin(deg))
      x2 = parseInt(x + len * cos(deg + 60))
      y2 = parseInt(y + len * sin(deg + 60))

      var maxy = y1
      if (y2 > y1) {
        maxy = y2
      }
      var minx = x2
      if (deg <= 30) {
        minx = x0
      }

      for (i = minx; i <= x1; i++) {
        for (j = y0; j <= maxy; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
            map[i][j] = true
          }
        }
      }
    }

    return deg
  }

  function notInScene (map, node, deg) {
    var x = node.x * 4
    var y = node.y * 4
    var len = node.len * 4

    if (node.className === 'tan_yi_tan_ball') {
      x = parseInt(x)
      y = parseInt(y)
      for (var i = x; i <= x + len; i++) {
        for (var j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            if (map[i][j]) {
              return false
            }
          }
        }
      }
      return true
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_addball') {
      for (i = x; i <= x + len; i++) {
        for (j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            if (map[i][j]) {
              return false
            }
          }
        }
      }
      for (i = x; i <= x + len; i++) {
        for (j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            map[i][j] = true
          }
        }
      }
      return true
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_circle') {
      for (i = x; i <= x + len; i++) {
        for (j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            if (map[i][j]) {
              return false
            }
          }
        }
      }

      return true
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_square') {
      var x0 = x
      var y0 = y
      var x1 = parseInt(x + len * cos(deg))
      var y1 = parseInt(y + len * sin(deg))
      var x2 = parseInt(x + Math.sqrt(2) * len * cos(deg + 45))
      var y2 = parseInt(y + Math.sqrt(2) * len * sin(deg + 45))
      var x3 = parseInt(x - len * sin(deg))
      var y3 = parseInt(y + len * cos(deg))

      for (i = x3; i <= x1; i++) {
        for (j = y0; j <= y2; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
            if (map[i][j]) {
              return false
            }
          }
        }
      }
      return true
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_triangle') {
      x0 = x
      y0 = y
      x1 = parseInt(x + len * cos(deg))
      y1 = parseInt(y + len * sin(deg))
      x2 = parseInt(x + len * cos(deg + 60))
      y2 = parseInt(y + len * sin(deg + 60))

      var maxy = y1
      if (y2 > y1) {
        maxy = y2
      }
      var minx = x2
      if (deg <= 30) {
        minx = x0
      }

      for (i = minx; i <= x1; i++) {
        for (j = y0; j <= maxy; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
            if (map[i][j]) {
              return false
            }
          }
        }
      }
      return true
    }
  }

  function resetMap (map, node, deg) {
    var x = node.x * 4
    var y = node.y * 4
    var len = node.len * 4

    if (node.className === 'tan_yi_tan_ball') {
      x = parseInt(x)
      y = parseInt(y)
      for (var i = x; i <= x + len; i++) {
        for (var j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            map[i][j] = false
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_addball') {
      for (i = x; i <= x + len; i++) {
        for (j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            map[i][j] = false
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_circle') {
      for (i = x; i <= x + len; i++) {
        for (j = y; j <= y + len; j++) {
          if (Math.sqrt((i - x - len / 2) * (i - x - len / 2) + (j - y - len / 2) * (j - y - len / 2)) <= len / 2) {
            map[i][j] = false
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_square') {
      var x0 = x
      var y0 = y
      var x1 = parseInt(x + len * cos(deg))
      var y1 = parseInt(y + len * sin(deg))
      var x2 = parseInt(x + Math.sqrt(2) * len * cos(deg + 45))
      var y2 = parseInt(y + Math.sqrt(2) * len * sin(deg + 45))
      var x3 = parseInt(x - len * sin(deg))
      var y3 = parseInt(y + len * cos(deg))

      for (i = x3; i <= x1; i++) {
        for (j = y0; j <= y2; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && j >= -1 / tan(deg) * (i - x0) + y0 && j <= tan(deg) * (i - x3) + y3 && j <= -1 / tan(deg) * (i - x1) + y1) {
            map[i][j] = false
          }
        }
      }
    } else if (node.className === 'tan_yi_tan_model tan_yi_tan_triangle') {
      x0 = x
      y0 = y
      x1 = parseInt(x + len * cos(deg))
      y1 = parseInt(y + len * sin(deg))
      x2 = parseInt(x + len * cos(deg + 60))
      y2 = parseInt(y + len * sin(deg + 60))

      var maxy = y1
      if (y2 > y1) {
        maxy = y2
      }
      var minx = x2
      if (deg <= 30) {
        minx = x0
      }

      for (i = minx; i <= x1; i++) {
        for (j = y0; j <= maxy; j++) {
          if (j >= tan(deg) * (i - x0) + y0 && ((j >= tan(deg + 60) * (i - x0) + y0 && deg > 30) || (deg === 30) && i > x0 || (j <= tan(deg + 60) * (i - x0) + y0 && deg < 30)) && j <= tan(deg - 60) * (i - x1) + y1) {
            map[i][j] = false
          }
        }
      }
    }
  }

  function recordAllModelMes (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, addballList) {
    triangleList = document.querySelectorAll('.tan_yi_tan_triangle')
    triangleafterList = document.querySelectorAll('.tan_yi_tan_triangleafter')
    circleList = document.querySelectorAll('.tan_yi_tan_circle')
    circleafterList = document.querySelectorAll('.tan_yi_tan_circleafter')
    squareList = document.querySelectorAll('.tan_yi_tan_square')
    squareafterList = document.querySelectorAll('.tan_yi_tan_squareafter')

    addballList = document.querySelectorAll('.tan_yi_tan_addball')

    squdeg = global.getsqudeg()
    trideg = global.gettrideg()

    for (var i = 0; i < addballList.length; i++) {
      if (window.getComputedStyle) {
        addballList[i].x = parseInt(window.getComputedStyle(addballList[i], null).left)
        addballList[i].y = parseInt(window.getComputedStyle(addballList[i], null).top)
      } else if (addballList[i].getCurrentPosition) {
        addballList[i].x = parseInt(addballList[i].getCurrentPosition.left)
        addballList[i].y = parseInt(addballList[i].getCurrentPosition.top)
      }
      addballList[i].len = addballList[i].offsetWidth
    }

    for (i = 0; i < circleList.length; i++) {
      if (window.getComputedStyle) {
        circleList[i].x = parseInt(window.getComputedStyle(circleList[i], null).left)
        circleList[i].y = parseInt(window.getComputedStyle(circleList[i], null).top)
      } else if (circleList[i].getCurrentPosition) {
        circleList[i].x = parseInt(circleList[i].getCurrentPosition.left)
        circleList[i].y = parseInt(circleList[i].getCurrentPosition.top)
      }
      circleList[i].len = parseFloat(parseFloat(circleList[i].offsetWidth * 0.45).toFixed(1)); if (circleList[i].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_topBottom') {
        circleList[i].len = parseFloat(parseFloat(circleList[i].offsetWidth * 0.53).toFixed(1))
      }
      if (circleList[i].className === 'tan_yi_tan_model tan_yi_tan_circle tan_yi_tan_bigTopBottom') {
        circleList[i].len = parseFloat(parseFloat(circleList[i].offsetWidth * 18.3).toFixed(1))
      }

      circleList[i].value = circleafterList[i].innerHTML
    }

    for (i = 0; i < triangleList.length; i++) {
      if (window.getComputedStyle) {
        triangleList[i].x = parseInt(window.getComputedStyle(triangleList[i], null).left)
        triangleList[i].y = parseInt(window.getComputedStyle(triangleList[i], null).top)
      } else if (triangleList[i].getCurrentPosition) {
        triangleList[i].x = parseInt(triangleList[i].getCurrentPosition.left)
        triangleList[i].y = parseInt(triangleList[i].getCurrentPosition.top)
      }

      triangleList[i].deg = trideg[i]
      triangleList[i].len = parseFloat(triangleList[i].offsetWidth * 0.5)
    }

    for (i = 0; i < squareList.length; i++) {
      if (window.getComputedStyle) {
        squareList[i].x = parseInt(window.getComputedStyle(squareList[i], null).left)
        squareList[i].y = parseInt(window.getComputedStyle(squareList[i], null).top)
      } else if (squareList[i].getCurrentPosition) {
        squareList[i].x = parseInt(squareList[i].getCurrentPosition.left)
        squareList[i].y = parseInt(squareList[i].getCurrentPosition.top)
      }
      squareList[i].deg = squdeg[i]

      squareList[i].len = parseFloat(squareList[i].offsetWidth * 0.4)
    }
  }

  function createRandomModelPosition (modelNum) {
    var positionx = initPositionx(modelNum)

    var index = 0
    while (index < modelNum) {
      var x = 41 + 37 * randomNum(5)
      if (!isInPositionx(positionx, x)) {
        positionx[index] = x
        index++
      }
    }

    return positionx
  }

  function isNearcenterBound (leftBottomBound, rightBottomBound, kx, ky, k, ballList, i) {
    if (ballList[i].y + ky > leftBottomBound[0].ry - 10 && ballList[i].y + ky > rightBottomBound[0].ly - 10 && !isNearLeftBottomBound(leftBottomBound, kx, ky, k, ballList, i) && !isNearRightBottomBound(rightBottomBound, kx, ky, k, ballList, i) && ballList[i].x + kx >= leftBottomBound[0].rx - 10 && ballList[i].x + kx <= rightBottomBound[0].lx + 10) {
      return true
    }

    return false
  }

  function initLine (lineList) {
    for (var i = 0; i < lineList.length; i++) {
      lineList[i].style.left = (25 + 15 * i) + 'px'
      lineList[i].style.top = (55) + 'px'
    }
  }

  function removeLine (lineList) {
    for (var i = 0; i < lineList.length; i++) {
      lineList[i].className = 'tan_yi_tan_line'
    }
  }

  function displayLine (lineList) {
    for (var i = 0; i < lineList.length; i++) {
      lineList[i].className = 'tan_yi_tan_line tan_yi_tan_linedisplay'
    }
  }

  function initBallLine (ballLineList) {
    for (var i = 0; i < ballLineList.length; i++) {
      ballLineList[i].style.left = (129) + 'px'
      ballLineList[i].style.top = (65 + 15 * i) + 'px'
    }
  }

  function displayBallLine (ballLineList) {
    for (var i = 0; i < ballLineList.length; i++) {
      ballLineList[i].className = 'tan_yi_tan_ballLine tan_yi_tan_ballLineDisplay'
    }
  }

  function rotateBallLine (ballLineList, deg) {
    for (var i = 0; i < ballLineList.length; i++) {
      ballLineList[i].deg = deg
      if (deg < 0) {
        ballLineList[i].style.transform = 'translate(' + (-(13 + 15 * i) * sin(deg + 90)) + 'px,' + (-(13 + 15 * i) + (13 + 15 * i) * cos(deg + 90)) + 'px)'
      } else if (deg > 0) {
        ballLineList[i].style.transform = 'translate(' + ((13 + 15 * i) * sin(90 - deg)) + 'px,' + (-(13 + 15 * i) + (13 + 15 * i) * cos(90 - deg)) + 'px)'
      }
    }
  }

  function removeBallLine (ballLineList) {
    for (var i = 0; i < ballLineList.length; i++) {
      ballLineList[i].className = 'tan_yi_tan_ballLine'
    }
  }

  function inRightBound (right, x) {
    if (right === x) {
      return true
    } else {
      return false
    }
  }

  function isNearRightBound (right, x, y, kx) {
    if ((x >= right - kx && kx > 0 && y <= 437)) {
      return true
    } else {
      return false
    }
  }

  function recheckr (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i) {
    if (inRightBound(rightBoundx, ballList[i].x) && ballList[i].className !== 'tan_yi_tan_ball tan_yi_tan_ballcall') {
      setkx(-getLastkx(ballList, i), ballList, i)
      setky(getLastky(ballList, i), ballList, i)
      setk(-getk(ballList, i), ballList, i)
      if (getky(ballList, i) === 0) {
        setky(1, ballList, i)
        if (getkx(ballList, i) < 0) {
          setkx(-Math.abs(Math.sqrt(100 - 1)), ballList, i)
        } else {
          setkx(Math.abs(Math.sqrt(100 - 1)), ballList, i)
        }
        setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
        if (getkx(ballList, i) === 0) {
          setk(Infinity, ballList, i)
        }
        setLastkx(getkx(ballList, i), ballList, i)
        setLastky(getky(ballList, i), ballList, i)
      }
    } else if (isNearRightBound(rightBoundx, ballList[i].x, ballList[i].y, getkx(ballList, i))) {
      setkx(getNewkxWhenNearRight(rightBoundx, ballList, i, ballList[i].x), ballList, i)
      setky(getkx(ballList, i) * getk(ballList, i), ballList, i)
    }
  }

  function getNewkxWhenNearRight (right, ballList, i, x) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    setLastkx(getkx(ballList, i), ballList, i)
    setLastky(getky(ballList, i), ballList, i)
    return right - x
  }

  function inleftBound (left, x) {
    if (left === x) {
      return true
    } else {
      return false
    }
  }

  function isNearLeftBound (left, x, y, kx) {
    if (x <= left - kx && kx < 0 && y <= 435) {
      return true
    } else {
      return false
    }
  }

  function getNewkxWhenNearLeft (left, ballList, i, x) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    setLastkx(getkx(ballList, i), ballList, i)
    setLastky(getky(ballList, i), ballList, i)
    return left - x
  }

  function recheckl (circleList, circleafterList, squareList, squareafterList, triangleList, triangleafterList, trideg, squdeg, scene, map, kx, ky, leftBoundx, rightBoundx, ballList, rightBottomBound, leftBottomBound, i) {
    if (inleftBound(leftBoundx, ballList[i].x) && ballList[i].className !== 'tan_yi_tan_ball tan_yi_tan_ballcall') {
      setkx(-getLastkx(ballList, i), ballList, i)
      setky(getLastky(ballList, i), ballList, i)
      setk(-getk(ballList, i), ballList, i)
      if (getky(ballList, i) === 0) {
        setky(1, ballList, i)
        if (getkx(ballList, i) < 0) {
          setkx(-Math.abs(Math.sqrt(100 - 1)), ballList, i)
        } else {
          setkx(Math.abs(Math.sqrt(100 - 1)), ballList, i)
        }
        setk(getky(ballList, i) / getkx(ballList, i), ballList, i)
        if (getkx(ballList, i) === 0) {
          setk(Infinity, ballList, i)
        }
        setLastkx(getkx(ballList, i), ballList, i)
        setLastky(getky(ballList, i), ballList, i)
      }
    } else if (isNearLeftBound(leftBoundx, ballList[i].x, ballList[i].y, getkx(ballList, i))) {
      setkx(getNewkxWhenNearLeft(leftBoundx, ballList, i, ballList[i].x), ballList, i)

      setky(getkx(ballList, i) * getk(ballList, i), ballList, i)
    }
  }

  function getLineRightBottomPositionX (x, len, deg) {
    return parseFloat(x + len * Math.cos(Math.PI / 180 * deg)).toFixed(2)
  }

  function getLineRightBottomPositionY (y, len, deg) {
    return parseFloat(len * Math.sin(Math.PI / 180 * deg)).toFixed(2)
  }

  function getNewkxWhenNearRightBottom (rightBottomBound, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    setLastkx(-1, ballList, i)
    setLastky(-1, ballList, i)
    ballList[i].recallinright = true
    var currentDistance = distanceTouchRightBottomBound(rightBottomBound, ballList[i].x + 5, ballList[i].y + 5)
    if (arctan(ballList[i].k) < 0) {
      return (currentDistance - 5) / sin(Math.abs(arctan(ballList[i].k)) + rightBottomBound[0].rotateDeg) * cos(Math.abs(arctan(ballList[i].k)))
    } else {
      return (currentDistance - 5) / sin(Math.abs(arctan(ballList[i].k)) - rightBottomBound[0].rotateDeg) * cos(Math.abs(arctan(ballList[i].k)))
    }
  }

  function distanceTouchRightBottomBound (rightBottomBound, x, y) {
    var rightdistance = Math.abs(rightBottomBound[0].k * x - y + rightBottomBound[0].ly - rightBottomBound[0].k * rightBottomBound[0].lx) / (Math.sqrt(1 + rightBottomBound[0].k * rightBottomBound[0].k))
    return rightdistance
  }

  function isNearRightBottomBound (rightBottomBound, kx, ky, k, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    var currentDistance = distanceTouchRightBottomBound(rightBottomBound, ballList[i].x + 5, ballList[i].y + 5)

    var nearDistance
    if (arctan(k) < 0) {
      nearDistance = ky / sin(Math.abs(arctan(k))) * sin(parseFloat(Math.abs(arctan(k)) + rightBottomBound[0].rotateDeg)) + 5
    } else {
      nearDistance = ky / sin(arctan(k)) * sin(parseFloat(arctan(k)) - rightBottomBound[0].rotateDeg) + 5
    }

    if (isAboveRightBottomBound(ballList, i, rightBottomBound) && currentDistance <= nearDistance && ((kx < 0 && ballList[i].x + kx >= rightBottomBound[0].lx - 10) || (kx >= 0 && ballList[i].x + kx >= rightBottomBound[0].lx - 10))) {
      return true
    }
    return false
  }

  function inRightBottomBound (rightBottomBound, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')

    if (ballList[i].recallinright) {
      return true
    } else {
      return false
    }
  }

  function isAboveRightBottomBound (ballList, i, rightBottomBound) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (ballList[i].y + 5 < rightBottomBound[0].k * (ballList[i].x + 5) + rightBottomBound[0].ly - rightBottomBound[0].k * rightBottomBound[0].lx) {
      return true
    }
    return false
  }

  function initRBBound (rightBottomBound) {
    for (var i = 0; i < rightBottomBound.length; i++) {
      rightBottomBound[i].rotateDeg = getTranslate(rightBottomBound[i], 'rotate'); rightBottomBound[i].lx = parseInt(window.getComputedStyle(rightBottomBound[i], null).left)
      rightBottomBound[i].rx = getLineRightBottomPositionX(rightBottomBound[i].lx, rightBottomBound[i].offsetWidth, rightBottomBound[i].rotateDeg); rightBottomBound[i].ly = parseInt(window.getComputedStyle(rightBottomBound[i], null).top)
      rightBottomBound[i].ry = rightBottomBound[i].ly + parseFloat(getLineRightBottomPositionY(rightBottomBound[i].ly, rightBottomBound[i].offsetWidth, rightBottomBound[i].rotateDeg))

      rightBottomBound[i].k = Math.sin(rightBottomBound[i].rotateDeg * (Math.PI / 180)) / Math.cos(Math.PI * rightBottomBound[i].rotateDeg / 180)
    }
  }

  function initLBBound (leftBottomBound) {
    for (var i = 0; i < leftBottomBound.length; i++) {
      leftBottomBound[i].rotateDeg = getTranslate(leftBottomBound[i], 'rotate')

      if (leftBottomBound[i].rotateDeg >= 270) {
        leftBottomBound[i].rotateDeg = 360 - leftBottomBound[i].rotateDeg
      } leftBottomBound[i].lx = parseInt(window.getComputedStyle(leftBottomBound[i], null).left)
      leftBottomBound[i].rx = getLineRightBottomPositionX(leftBottomBound[i].lx, leftBottomBound[i].offsetWidth, leftBottomBound[i].rotateDeg)
      leftBottomBound[i].ly = parseInt(window.getComputedStyle(leftBottomBound[i], null).top)
      leftBottomBound[i].ry = leftBottomBound[i].ly - parseFloat(getLineRightBottomPositionY(leftBottomBound[i].ly, leftBottomBound[i].offsetWidth, leftBottomBound[i].rotateDeg))
      leftBottomBound[i].k = Math.sin(leftBottomBound[i].rotateDeg * (Math.PI / 180)) / Math.cos(Math.PI * leftBottomBound[i].rotateDeg / 180)
    }
  }

  function inLeftBottomBound (leftBottomBound, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (ballList[i].recallinleft) {
      return true
    } else {
      return false
    }
  }

  function isAboveLeftBottomBound (ballList, i, leftBottomBound) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (ballList[i].y + 5 < -leftBottomBound[0].k * (ballList[i].x + 5) + leftBottomBound[0].ly + leftBottomBound[0].k * leftBottomBound[0].lx) {
      return true
    }
    return false
  }

  function distanceTouchLeftBottomBound (leftBottomBound, x, y) {
    var leftdistance = Math.abs(-leftBottomBound[0].k * x - y + leftBottomBound[0].ly + leftBottomBound[0].k * leftBottomBound[0].lx) / (Math.sqrt(1 + leftBottomBound[0].k * leftBottomBound[0].k))

    return leftdistance
  }

  function isNearLeftBottomBound (leftBottomBound, kx, ky, k, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    var currentDistance = distanceTouchLeftBottomBound(leftBottomBound, ballList[i].x + 5, ballList[i].y + 5)
    var nearDistance

    if (arctan(k) > 0) {
      nearDistance = ky / sin(arctan(k)) * sin(parseFloat(arctan(k)) + leftBottomBound[0].rotateDeg) + 5
    } else {
      nearDistance = ky / sin(Math.abs(arctan(k))) * sin(Math.abs(arctan(k)) - leftBottomBound[0].rotateDeg) + 5
    }

    if (currentDistance <= 15) {

    }

    if (isAboveLeftBottomBound(ballList, i, leftBottomBound) && currentDistance <= nearDistance && ((kx < 0 && ballList[i].x + kx <= leftBottomBound[0].rx) || (kx >= 0 && ballList[i].x + kx <= leftBottomBound[0].rx))) {
      return true
    }
    return false
  }

  function getNewkxWhenNearLeftBottom (leftBottomBound, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    setLastkx(0, ballList, i)
    setLastky(0, ballList, i)
    ballList[i].recallinleft = true
    var currentDistance = distanceTouchLeftBottomBound(leftBottomBound, ballList[i].x + 5, ballList[i].y + 5)
    if (arctan(ballList[i].k) > 0) {
      return (currentDistance - 5) / sin(parseFloat(arctan(ballList[i].k)) + leftBottomBound[0].rotateDeg) * cos(arctan(ballList[i].k))
    } else {
      return (currentDistance - 5) / sin(Math.abs(arctan(ballList[i].k)) - leftBottomBound[0].rotateDeg) * cos(Math.abs(arctan(ballList[i].k)))
    }
  }

  function getTranslate (node, sty) {
    var translates = document.defaultView.getComputedStyle(node, null).transform.substring(7)

    var result = translates.match(/\(([^)]*)\)/)
    var matrix = result ? result[1].split(',') : translates.split(',')

    if (sty === 'x' || sty === undefined) {
      return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4])
    } else if (sty === 'y') {
      return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5])
    } else if (sty === 'z') {
      return matrix.length > 6 ? parseFloat(matrix[14]) : 0
    } else if (sty === 'rotate') {
      return matrix.length > 6 ? getRotate([parseFloat(matrix[0]), parseFloat(matrix[1]), parseFloat(matrix[4]), parseFloat(matrix[5])]) : getRotate(matrix)
    }
  }

  function getRotate (matrix) {
    var aa = Math.round(180 * Math.asin(matrix[0]) / Math.PI)
    var bb = Math.round(180 * Math.acos(matrix[1]) / Math.PI)
    var cc = Math.round(180 * Math.asin(matrix[2]) / Math.PI)
    var dd = Math.round(180 * Math.acos(matrix[3]) / Math.PI)
    var deg = 0
    if (aa === bb || -aa === bb) {
      deg = dd
    } else if (-aa + bb === 180) {
      deg = 180 + cc
    } else if (aa + bb === 180) {
      deg = 360 - cc || 360 - dd
    }
    return deg >= 360 ? 0 : deg
  }

  function getSymmetry (k2, k1) {
    var di = (1 + 2 * k1 * k2 - k2 * k2)
    if (di === 0) {
      return Infinity
    }

    var res = (2 * k2 + k1 * k2 * k2 - k1) / di
    if (Number.isNaN(res)) {
      return Infinity
    }

    return res
  }

  function setShoudAddtoky (x, ballList, i) {
    if (!ballList[i]) {
      return 0
    }
    ballList[i].shoudAddtoky = x
  }

  function setShoudAddtokx (x, ballList, i) {
    if (!ballList[i]) {
      return 0
    }
    ballList[i].shoudAddtokx = x
  }

  function setShoudAddtok (x, ballList, i) {
    if (!ballList[i]) {
      return 0
    }
    ballList[i].shoudAddtok = x
  }

  function setkx (x, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    ballList[i].kx = x
  }

  function getkx (ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    return ballList[i].kx || 0
  }

  function setky (x, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    ballList[i].ky = x
  }

  function getky (ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    return ballList[i].ky
  }

  function setLastkx (x, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    ballList[i].lastkx = x
  }

  function getLastkx (ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    return ballList[i].lastkx
  }

  function setLastky (x, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    ballList[i].lastky = x
  }

  function getLastky (ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    return ballList[i].lastky
  }

  function setk (x, ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    ballList[i].k = x
  }

  function getk (ballList, i) {
    ballList = document.querySelectorAll('.tan_yi_tan_ball')
    if (!ballList[i]) {
      return 0
    }
    return ballList[i].k
  }

  function randomNum (num) {
    return Math.floor(Math.random() * (num + 1))
  }
  function addEventHandler (target, type, func) {
    if (target.addEventListener) {
      target.addEventListener(type, func, false)
    } else if (target.attachEvent) {
      target.attachEvent('on' + type, func)
    } else {
      target['on' + type] = func
    }
  }
  function sin (deg) {
    return parseFloat(parseFloat(Math.sin(Math.PI / 180 * deg)).toFixed(3))
  }

  function cos (deg) {
    return parseFloat(parseFloat(Math.cos(Math.PI / 180 * deg)).toFixed(3))
  }
  function tan (deg) {
    return parseFloat(parseFloat(Math.tan(Math.PI / 180 * deg)).toFixed(3))
  }

  function arctan (k) {
    return parseFloat(parseFloat(Math.atan(k) * 180 / Math.PI).toFixed(3))
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
}
