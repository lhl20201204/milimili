<template>
  <Image :src="src"
         :click="click||(()=>null)"
         :style="{
  width: `${width}px`,
  height: `${height}px`,
  'border-radius': radius?`${radius}px`: '50%',
  overflow: 'hidden'
}" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import Image from '@/components/Image'
export default defineComponent({
  props: ['src', 'size', 'radius', 'click'],
  components: {
    Image
  },
  setup (props) {
    const width = ref(props.size || 40)
    const height = ref(props.size || 40)
    return {
      width,
      height
    }
  }
})
</script>

<style lang="less">
</style>
