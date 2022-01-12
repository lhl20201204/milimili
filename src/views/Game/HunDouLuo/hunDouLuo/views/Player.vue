<template>
  <div class="player"
       ref="pla"
       :style="getStyle2">
    <img src="@/assets/img/sucai/player.png"
         ref="people"
         :style="getStyle1">
  </div>
</template>

<script>
import global from '../js/global'
import { shallowReactive, computed, defineComponent } from 'vue'
export default defineComponent({
  setup () {
    global.player = shallowReactive(global.player)
    const player = global.player
    const getStyle1 = computed(() => ' transform: translate(-' + player.nowAction[4 * player.state] + 'px,-' + player.nowAction[4 * player.state + 1] + 'px);')
    const getStyle2 = computed(() => 'left: ' + player.x + 'px;top:' + player.y + 'px;width:' + player.nowAction[4 * player.state + 2] + 'px;height:' + player.nowAction[4 * player.state + 3] + 'px')
    return {
      getStyle2,
      getStyle1,
      player
    }
  }
})
</script>

<style scoped>
.player {
  position: absolute;
  overflow: hidden;
  transform: scale(1.2);
}
</style>
