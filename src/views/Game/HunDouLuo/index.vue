<template>
  <div id="hundouluo">
    <background></background>
   </div>
</template>

<script>
import Background from './hunDouLuo/views/Background'
import global from './hunDouLuo/js/global'
export default {
  components: {
    Background
  },
  methods: {
    alertMsg () {
      alert(
        '可按键，q（左上）  w（上）  e（右上）  a(左)   s(下落)  d（右）  z （左下） x（趴下）  c（右上）  shift(射击)  space（跳） enter （切换子弹） 先按shift再按方向键可边动边射击，通关条件，在终点将俩个喷射散弹的装置破坏掉 '
      )
    }
  },
  beforeUnmount () {
    clearInterval(global.mainTimer2)
    window.cancelAnimationFrame(global.mainTimer)
    document.removeEventListener('keydown', global.keyListener)
  }
}
</script>

<style scoped>
.hundouluo {
  position: relative;
}
</style>
