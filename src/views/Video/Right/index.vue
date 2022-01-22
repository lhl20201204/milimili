<template>
  <div class="video-left-page">我是视频详情左边</div>
</template>

<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup () {
    const video = inject('video')
    console.log(video)
  }
})
</script>

<style lang="less" scoped>
.video-left-page {
  flex:1;
  background: red;
}
</style>
