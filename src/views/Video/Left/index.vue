<template>
  <div class="video-left-page">
    <video-header> </video-header>
    <div class="video-container">
      <Video :v="video[0]"
             :changeCurrentTime="changeCurrentTime" />
      <Barrage v-for="item in barrage"
               :key="item.barrageId"
               :item="item" />
    </div>
    <video-footer> </video-footer>
    <VideoControl :item="video[0]" />
    <VideoDescription />
    <BarrageList />
    <onlineUsersList />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import Video from '@/components/Video'
import Barrage from './Barrage'
import VideoHeader from './VideoHeader'
import VideoFooter from './VideoFooter'
import VideoControl from './VideoControl'
import VideoDescription from './VideoDescription'
import BarrageList from './BarrageList'
import onlineUsersList from './onlineUsersList'
export default defineComponent({
  components: {
    Video,
    VideoHeader,
    VideoFooter,
    Barrage,
    VideoDescription,
    VideoControl,
    BarrageList,
    onlineUsersList
  },
  setup () {
    const { v: video } = inject('video')
    const { v: barrage } = inject('barrage')
    const changeCurrentTime = inject('changeCurrentTime')
    return {
      video,
      barrage,
      changeCurrentTime
    }
  }
})
</script>

<style lang="less" scoped>
.video-left-page {
  flex: 1;
  > .video-container {
    width: 637px;
    height: 445px;
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
