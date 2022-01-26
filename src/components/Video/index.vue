<template>
     <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import { getPlayVideo } from '@/service'
import config from '@/config'
import { getVideoComponent } from './Video'
export default defineComponent({
  props: ['v'],
  components: {
    Loading
  },
  setup (props) {
    return {
      promise: getPlayVideo({
        path: props.v.videoId
      }),
      successComp: getVideoComponent(props),
      failComp: config.NotFound()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
