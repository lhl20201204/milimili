<template>
<div class="video-left-page">
  <video-header> </video-header>
  <div class="video-container">
        <Video :v="v"/>
        <Barrage v-for="item in barrage" :key="item.barrageId" :item="item" />
  </div>
  <video-footer> </video-footer>
  <comment-section></comment-section>
</div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import Video from '@/components/Video'
import Barrage from './Barrage'
import VideoHeader from './VideoHeader'
import VideoFooter from './VideoFooter'
import CommentSection from './CommentSection'
export default defineComponent({
  components: {
    Video,
    VideoHeader,
    VideoFooter,
    Barrage,
    CommentSection
  },
  setup () {
    const v = inject('video')
    const { v: barrage } = inject('barrage')
    return {
      v,
      barrage
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
   position: relative;
   overflow: hidden;
   > video {
     width: 100%;
     height: 100%;
   }
  }
}
</style>
