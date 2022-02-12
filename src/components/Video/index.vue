<template>
  <Loading :key="v.videoId"
           :promise="p.promise"
           :successComp="successComp"
           :failComp="failComp" />
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import Loading from '@/components/Loading'
import { getPlayVideo } from '@/service'
import config from '@/config'
import { getVideoComponent } from './Video'
export default defineComponent({
  props: ['v', 'isNotNeedAddeventListener', 'width', 'height', 'changeCurrentTime'],
  components: {
    Loading
  },
  setup (props) {
    const getPromise = () => getPlayVideo({
      path: props.v.videoId
    })
    const p = reactive({
      promise: getPromise()
    })
    watch(() => props.v.videoId, () => {
      p.promise = getPromise()
    })

    return {
      p,
      successComp: getVideoComponent(props),
      failComp: config.NotFound()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
