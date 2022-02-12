<template>
  <span class="progress"
        :style="{
    width: tw + 'px',
    height: th + 'px',
    border: border
    }">
    <div :style="{
    width: (style.ratio*tw|| 0)+'px',
    height: '100%',
    background: `${color}`
    }">
    </div>
  </span>
  <span>{{style.ratio * 100}}%</span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['style'],
  setup (props) {
    return {
      tw: (props.style.totalWidth || 100),
      th: (props.style.totalHeight || 20),
      color: props.style.color || 'grey',
      border: `${props.style.borderW || 1}px ${props.style.borderT || 'solid'} ${props.style.borderColor || 'black'}`
    }
  }
})
</script>
<style lang="less" scoped>
.progress {
  display: inline-block;
  margin: 0 5px 0 2px;
}
</style>
