<template>
  <div class="video-header-title">
    <h1>{{videoTitle}}</h1>
    <span>{{videoPlayVolume}}播放量&nbsp; * &nbsp; 总弹幕数{{barrageVolume}}</span>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import s from '@/service/Video'
import _ from 'lodash'
export default defineComponent({
  setup () {
    const video = inject('video')
    const videoPlayVolume = ref('0')
    const barrageVolume = ref('0')
    async function getVideoDetailById () {
      const { data } = await s.getVideoDetailById({
        videoId: video.videoId
      })
      console.log(data, video.videoId)
      videoPlayVolume.value = _.size(data)
      // barrageVolume.value = _.size(data2)
    }
    getVideoDetailById()
    return {
      videoPlayVolume,
      barrageVolume,
      videoTitle: video.videoTitle
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
    height: 16px;
    font-size: 100%;
    color: #999;
  }
}
</style>
