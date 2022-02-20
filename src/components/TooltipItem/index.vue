<template>
  <span class="tooltip"
        :style="{
    'max-width': '50px' || width +'px'
    }">
    <Tooltip :text="text" />
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/Tooltip'
export default defineComponent({
  props: ['text', 'width'],
  components: {
    Tooltip
  }

})
</script>
<style lang="less" scoped>
.tooltip {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
