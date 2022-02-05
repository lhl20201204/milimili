<template>
  <div class="video-control-item">
    <VideoControlItem v-for="(item, index) in videoControlSubRoute"
                      :attr="item"
                      :key="index" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import config from '@/config'
import VideoControlItem from './VideoControlItem.vue'
export default defineComponent({
  components: {
    VideoControlItem
  },
  setup () {
    return {
      videoControlSubRoute: config.videoControlSubRoute
    }
  }
})
</script>

<style lang="less" scoped>
.video-control-item {
  padding: 20px 10px;
  display: flex;
  border-bottom: 1px solid rgb(229, 233, 240);
}
</style>
