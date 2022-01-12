<template>
  <div>
    <div v-for="item of bullets"
         class="bulletParent"
         :style="getStyle1(item)"
         :key="item.id">
      <img src="@/assets/img/sucai/weapon.png"
           class="bullet"
          :style="getStyle2(item)" />
     </div>
  </div>
</template>

<script>
import global from '../js/global'
import { reactive, defineComponent, computed } from 'vue'
export default defineComponent({
  setup () {
    global.playerBullets = reactive(global.playerBullets)
    const bullets = global.playerBullets
    const getStyle1 = (item) => {
      return 'transform: rotate(' +
          item.deg +
          'deg);left: ' +
          item.x +
          'px;top:' +
          item.y +
          'px;width:' +
          item.width +
          'px;height:' +
          item.height +
          'px'
    }
    const getStyle2 = computed(() => (item) => {
      return 'transform: translate(-' + item.tranX + 'px,-' + item.tranY + 'px);'
    })
    return {
      bullets,
      getStyle1,
      getStyle2
    }
  }
})
</script>

<style scoped>
.bulletParent {
  position: absolute;
  overflow: hidden;
  transform-origin: 0 50% 0;
}

.bullet {
  position: absolute;
}
</style>
