<template>
  <div class="video-list-item"
       :class="{
    'video-list-max-item': isAuto
  }"
       @click="goVideoDetail">
    <Image :src="item.coverSrc"
           classes="video-list-item-src"
           :fail="failComp" />
    <span class="video_title">“{{item.videoTitle}}”</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Image from '@/components/Image'
import config from '@/config'
import { useRouter } from 'vue-router'
import _ from 'lodash'
export default defineComponent({
  props: ['item', 'isAuto'],
  components: {
    Image
  },
  setup (props) {
    const router = useRouter()
    function goVideoDetail () {
      router.push({
        path: '/video',
        query: _.pick(props.item, config.videoDetailRouteAttrSubRoute)
      })
    }
    return {
      goVideoDetail,
      failComp: config.NotFound('div', 'defaultImgParent')
    }
  }
})
</script>

<style lang="less" scoped>
.video-list-item {
  width: 170px;
  height: 100px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.video-list-max-item {
  width: 100%;
  height: 100%;
  ~ .video_title {
    transition: all 2.3s;
    padding-top: 180px;
    font-size: 20px;
  }
}

.video-list-item-src {
  width: 100%;
  height: 100%;
}

.defaultImgParent {
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video_title {
  position: absolute;
  width: 100%;
  padding-top: 80px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
  font-size: 13px;
  font-weight: bold;
  transition: all 1.3s;
}

.video-list-item:hover > .video_title {
  width: 90%;
  height: 90%;
  padding-top: 10px;
  background: rgba(0, 0, 0, 0.3);
  text-align: left;
  overflow: visible;
  white-space: normal;
  text-overflow: unset;
}
</style>
