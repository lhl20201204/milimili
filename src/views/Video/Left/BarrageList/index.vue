<template>
  <div>
    <ToggleShowList :list="barrage.v"
                    title="弹幕列表"
                    keyAttr="barrageId"
                    :childComp="BarrageListItem" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import ToggleShowList from '@/components/ToggleShowList'
import BarrageListItem from './BarrageListItem.vue'
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
