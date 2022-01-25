<template>
   <div class="video-list">
     <video-list-item v-for="item in videoList" :item="item" :key="item.videoId"></video-list-item>
     <button class="refresh"
            @click="loadingVideoList">
      <Image :staticPath="staticPath" classes="refresh-img"/>
       换一换
    </button>
   </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive } from 'vue'
import VideoListItem from './VideoListItem'
import s from '@/service/Home'
import config from '@/config'
import Image from '@/components/Image'
export default defineComponent({
  components: {
    VideoListItem,
    Image
  },
  setup () {
    const videoList = reactive([])
    async function loadingVideoList () {
      const { data } = await s.getVideoList()
      videoList.splice(0, videoList.length)
      videoList.splice(0, 0, ...data)
    }

    onBeforeMount(() => {
      loadingVideoList()
    })
    return {
      videoList,
      loadingVideoList,
      staticPath: config.homeRefresh
    }
  }
})
</script>

<style lang="less" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 20px;
  position: relative;
}

.refresh {
  position: absolute;
  left: 100%;
  top: 5%;
  width: 26px;
  height: 100px;
  padding: 0;
}
.refresh-img {
  width: 26px;
  height: 26px;
  transform-origin: center center;
  transition: all 0.5s linear;
}
.refresh:hover > .refresh-img {
  transform-origin: center center;
  transform: rotate(360deg);
}
</style>
