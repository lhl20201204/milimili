<template>
   <div class="video-list">
     <video-list-item v-for="item in videoList" :item="item" :key="item.videoId"></video-list-item>
     <button class="refresh"
            @click="loadingVideoList">
      <Loading :promise="promise" :successComp="successComp" :failComp="failComp"/>
       换一换
    </button>
   </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import VideoListItem from './VideoListItem'
import s from '@/service/Home'
import config from '@/config'
import Loading from '@/components/Loading'
export default defineComponent({
  components: {
    VideoListItem,
    Loading
  },
  setup () {
    const videoList = reactive([])
    const refreshUrl = ref(require('@/assets' + config.homeRefresh))
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
      refreshUrl,
      promise: Promise.resolve(require('@/assets' + config.homeRefresh)),
      successComp: {
        render (vue) {
          return <img class="refresh-img" src={vue.$attrs.res} />
        }
      },
      failComp: config.NotFound()
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
