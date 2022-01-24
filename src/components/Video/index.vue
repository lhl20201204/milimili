<template>
     <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import { getPlayVideo } from '@/service'
import { getImgSrc } from '@/utils'
import config from '@/config'
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
      successComp: {
        render (vue) {
          return <video controls
            preload="preload"
            poster={getImgSrc(props.v.coverSrc)}
          >
            <source v-src={vue.$attrs.res.data}
              type="video/mp4" />
                     你的浏览器不支持 HTML 5 video标签。
          </video>
        }
      },
      failComp: config.NotFound()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
