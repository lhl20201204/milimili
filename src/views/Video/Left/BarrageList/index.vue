<template>
  <div>
    <ToggleShowList :list="barrage.v"
                    title="弹幕列表"
                    :classes="{
                    'not-allow': barrage.v.length === 0 && !barrage.v.datahadLoadedButResultNull
                    }"
                    keyAttr="barrageId"
                    :childComp="BarrageListItem" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import ToggleShowList from '@/components/ToggleShowList'
import BarrageListItem from './BarrageListItem'
export default defineComponent({
  components: {
    ToggleShowList
  },
  setup () {
    const barrage = inject('barrage')
    return {
      barrage,
      BarrageListItem
    }
  }
})
</script>

<style lang="less" scoped>
</style>
