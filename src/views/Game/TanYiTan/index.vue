<template>
  <div class="tan_yi_tan">
    <button id="tan_yi_tan_pause">暂停</button>
    <button id="tan_yi_tan_displayLine">显示虚线</button>
    <button id="tan_yi_tan_tip">游戏玩法</button>
    <div id="tan_yi_tan_scene">
      <div id="tan_yi_tan_gamePoint"> </div>
      <div class="tan_yi_tan_bound tan_yi_tan_leftBound"></div>
      <div class="tan_yi_tan_bound tan_yi_tan_leftBottomBound"></div>
      <div class="tan_yi_tan_ball"></div>
      <div class="tan_yi_tan_ball"></div>
      <div class="tan_yi_tan_ball"></div>
      <div class="tan_yi_tan_ball"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div class="tan_yi_tan_line"></div>
      <div id="tan_yi_tan_ballNum"> </div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_ballLine"></div>
      <div class="tan_yi_tan_bound tan_yi_tan_rightBottomBound"></div>
      <div class="tan_yi_tan_bound tan_yi_tan_rightBound"></div>
    </div>
  </div>
</template>

<script>
import { tanYiTanIndex } from './tanYiTan/tanYiTanIndex'
import bus from './tanYiTan/global'
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
export default defineComponent({
  setup () {
    onMounted(() => {
      tanYiTanIndex()
    })
    onBeforeUnmount(() => {
      for (const timer of bus.tanYiTanGlobal.TIMER) {
        clearInterval(timer)
      }
    })
  }
})
</script>

<style >
.tan_yi_tan {
  margin: 0px;
  padding: 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
}
#tan_yi_tan_pause {
  position: absolute;
  left: 0px;
  top: 100px;
  width: 80px;
  height: 20px;
  border-radius: 10px;
  background: #c4c4c4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#tan_yi_tan_tip {
  width: 80px;
  height: 20px;
  border-radius: 10px;
  background: #c4c4c4;
  position: absolute;
  left: 0px;
  top: 40px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#tan_yi_tan_displayLine {
  width: 80px;
  height: 20px;
  border-radius: 10px;
  background: #c4c4c4;
  position: absolute;
  left: 0px;
  top: 70px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#tan_yi_tan_scene {
  width: 270px;
  height: 550px;
  background: url("../../../assets/img/sucai/tan_yi_tan.png") no-repeat;
  background-size: 100% 100%;
  margin: 0px auto;
  position: relative;
  overflow: hidden;
}
.tan_yi_tan_leftBound {
  width: 3px;
  height: 412px;
  background: #4f86e0;
  position: absolute;
  left: 17px;
  top: 21px;
  pointer-events: none;
}
.tan_yi_tan_rightBound {
  width: 3px;
  height: 414px;
  background: #4f86e0;
  position: absolute;
  left: 249px;
  top: 21px;
  pointer-events: none;
}
.tan_yi_tan_leftBottomBound {
  width: 126px;
  height: 1px;
  background: black;
  position: absolute;
  transform: rotate(-13deg);
  transform-origin: 0 100%;
  left: 1px;
  top: 456px;
  pointer-events: none;
}

.tan_yi_tan_rightBottomBound {
  width: 126px;
  height: 1px;
  background: black;
  position: absolute;
  transform: rotate(12deg);
  transform-origin: 0 100%;
  left: 144px;
  top: 428px;
  pointer-events: none;
}
.tan_yi_tan_square {
  width: 52px;
  height: 52px;
  position: absolute;
  transform-origin: 0% 0%;
  pointer-events: none;
}
.tan_yi_tan_square:before {
  content: "";
  width: 40px;
  height: 40px;
  background: #423680;
  position: absolute;
  left: 6px;
  top: 6px;
  pointer-events: none;
}
.tan_yi_tan_squareafter {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: white;
  left: 6px;
  top: 6px;
  z-index: 2;
  pointer-events: none;
}
.playAnimation {
  animation: fontScale 0.1s ease 0s;
}
.playAnimation2 {
  animation: removeFontScale 0.1s ease 0s;
}
.playAnimation3 {
  animation: fontScale2 0.1s ease 0s;
}
.playAnimation4 {
  animation: removeFontScale2 0.1s ease 0s;
}

@keyframes fontScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes removeFontScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes fontScale2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes removeFontScale2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
.tan_yi_tan_circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  position: absolute;
  transform-origin: 0% 0%;
  pointer-events: none;
}
.tan_yi_tan_circleafter {
  width: 40px;
  height: 40px;
  background: #423680;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: white;
  left: 6px;
  top: 6px;
  pointer-events: none;
}

.tan_yi_tan_tp {
  width: 1px;
  height: 1px;
  background: white;
  z-index: 10;
  position: absolute;
}

.tan_yi_tan_triangle {
  width: 0;
  height: 0;
  border-width: 45px 26px 0;
  border-style: solid;
  position: absolute;
  pointer-events: none;
  transform-origin: 0% 0%;
}
.tan_yi_tan_triangle:before {
  content: "";
  pointer-events: none;
  border-width: 27.7px 16px 0;
  border-style: solid;
  border-color: #423680 transparent transparent;
  position: absolute;

  left: -16px;
  top: -39px;
}
.tan_yi_tan_triangleafter {
  pointer-events: none;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  color: white;
  left: -9px;
  top: -40px;
  z-index: 2;
}

.tan_yi_tan_addball {
  pointer-events: none;
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
  font-size: 15px;
  color: black;
}

.tan_yi_tan_line {
  width: 10px;
  height: 1px;
  position: absolute;
  pointer-events: none;
}
.tan_yi_tan_linedisplay {
  background: #ffffff;
}

#tan_yi_tan_ballNum {
  width: 30px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  color: white;
  transform-origin: center;
  transform: scale(0.7);
  position: absolute;
  left: 116px;
  top: 31px;
}
#tan_yi_tan_gamePoint {
  width: 30px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  color: white;
  transform-origin: center;
  transform: scale(0.7);
  position: absolute;
  left: 60px;
}

.tan_yi_tan_bigTopBottom {
  overflow: hidden;
}

.tan_yi_tan_ballLine {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  overflow: hidden;
  pointer-events: none;
}
.tan_yi_tan_ballLineDisplay {
  background: #aaaaaa;
  overflow: hidden;
}
.tan_yi_tan_ball {
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 127px;
  top: 50px;
  z-index: 2;
}

.tan_yi_tan_ballcall {
  background: #d8b10f;
}

.tan_yi_tan_ballremove {
  display: none;
}
</style>
