<template>
  <div class="video-header-title">
    <h1>{{videoTitle}}</h1>
    <span>{{play.v?play.v.length:0}}播放量&nbsp; * &nbsp; 总弹幕数{{barrage.v? barrage.v.length: 0}} &nbsp; {{time}}</span>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
export default defineComponent({
  setup () {
    const video = inject('video')
    const barrage = inject('barrage')
    const play = inject('play')
    const time = ref(video.time)
    return {
      play,
      barrage,
      videoTitle: video.videoTitle,
      time
    }
  }
})
</script>

<style lang="less" scoped>
.video-header-title {
  padding-bottom: 20px;
  > h1 {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > span {
    display: inline-block;
    height: 12px;
    font-size: 12px;
    color: #999;
  }
}
</style>
