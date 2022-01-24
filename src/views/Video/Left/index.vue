<template>
<div class="video-left-page">
  <video-header> </video-header>
  <div class="video-container">
        <Video :v="v"/>
  </div>
</div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import Video from '@/components/Video'
import VideoHeader from './VideoHeader.vue'
export default defineComponent({
  components: {
    Video,
    VideoHeader
  },
  setup () {
    const v = inject('video')
    return {
      v
    }
  }
})
</script>

<style lang="less" scoped>
.video-left-page {
  flex:1;
  > .video-container {
   width: 637px;
   height: 435px;
   display: flex;
   justify-content: center;
   align-items: center;
   background: black;
   color: white;
   > video {
     width: 100%;
     height: 100%;
   }
  }
}
</style>
