<template>
   <div class="video-list">
     <video-list-item v-for="item in videoList" :item="item" :key="item.videoId"></video-list-item>
   </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive } from 'vue'
import VideoListItem from './VideoListItem'
import s from '@/service/Home'
export default defineComponent({
  components: {
    VideoListItem
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
      videoList
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
}
</style>
