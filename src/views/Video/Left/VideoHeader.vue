<template>
  <div class="video-header-title">
    <h1>{{videoTitle}}</h1>
    <span>{{play.v.length}}播放量&nbsp; * &nbsp; 总弹幕数{{barrage.v.length}} &nbsp; {{time}}</span>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
export default defineComponent({
  setup () {
    const { v: video } = inject('video')
    const barrage = inject('barrage')
    const play = inject('play')
    const time = ref(video[0].time || '默认时间')
    return {
      play,
      barrage,
      videoTitle: video[0].videoTitle || '默认标题',
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
