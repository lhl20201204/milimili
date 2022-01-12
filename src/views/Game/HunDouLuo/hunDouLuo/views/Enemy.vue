<template>
  <div>
    <div v-for="item of enemyList"
         class="enemyParent"
         :style="getStyle1(item)"
      :t="getStyle1"
         :key="item.id">
      <img :src="item.res"
           class="enemy"
           :style="getStyle2(item)" />
    </div>
  </div>
</template>

<script>
import global from '../js/global'
import { shallowReactive, defineComponent, computed } from 'vue'
export default defineComponent({
  setup () {
    global.enemyList = shallowReactive(global.enemyList)
    const enemyList = global.enemyList
    const getStyle1 = computed(() => (item) => {
      return 'transform: rotate(' +
          item.deg +
          'deg) scale(' +
          item.scale +
          ');left: ' +
          item.x +
          'px;top:' +
          item.y +
          'px;width:' +
          item.nowAction[4 * item.state] +
          'px;height:' +
          item.nowAction[4 * item.state + 1] +
          'px;'
    })
    const getStyle2 = computed(() => (item) => {
      return 'transform: translate(-' +
            item.nowAction[4 * item.state + 2] +
            'px,-' +
            item.nowAction[4 * item.state + 3] +
            'px);'
    })
    return {
      enemyList,
      getStyle1,
      getStyle2
    }
  }
})
</script>

<style scoped>
.enemyParent {
  position: absolute;
  overflow: hidden;
  transform-origin: 0 50% 0;
}

.enemy {
  position: absolute;
}
</style>
