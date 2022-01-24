<template>
  <div class="video-right-page">我是视频详情右边</div>
</template>

<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup () {
    const video = inject('video')
    !video && console.log(video)
  }
})
</script>

<style lang="less" scoped>
.video-right-page {
  flex:1;
  background: red;
}
</style>
