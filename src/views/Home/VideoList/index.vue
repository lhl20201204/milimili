<template>
   <div class="video-list">
     <video-list-item v-for="item in videoList" :item="item" :key="item.videoId"></video-list-item>
   </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeMount, reactive } from 'vue'
import VideoListItem from './VideoListItem'
export default defineComponent({
  components: {
    VideoListItem
  },
  setup () {
    const videoList = reactive([])
    const { provides } = getCurrentInstance()
    async function loadingVideoList () {
      const { data } = await provides.s.getVideoList()
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
