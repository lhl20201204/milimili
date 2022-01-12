<template>
  <div class="background">
    <img :src="map.res"
         :style="'transform: translateX(-' + map.tranX + 'px)'" />
    <Player></Player>
    <Bullet></Bullet>
    <Enemy></Enemy>
  </div>
</template>

<script>
import global from '../js/global'
import { monitorKeyboardOperation } from '../js/communicate'
import { actionExecution } from '../js/keyAction'
import { mainTimer } from '../js/mainTimer'
import { triggerMonitor } from '../js/triggerMonitor'
import Player from './Player'
import Bullet from './Bullet'
import Enemy from './Enemy'
import { shallowReactive, defineComponent, onMounted } from 'vue'
export default defineComponent({
  components: {
    Enemy,
    Player,
    Bullet
  },
  setup () {
    global.map = shallowReactive(global.map)
    const map = global.map
    onMounted(() => {
      triggerMonitor(global)
      monitorKeyboardOperation(actionExecution)
      mainTimer()
    })
    return {
      map
    }
  }
})

</script>

<style scoped>
.background {
  position: absolute;
  height: 500px;
  width: 1000px;
  overflow: hidden;
}
.background img {
  height: 100%;
}
</style>
