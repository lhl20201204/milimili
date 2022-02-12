<template>
  <div class="video-control-item">
    <span>
      <VideoControlItem v-for="(item, index) in videoControlSubRoute"
                        :attr="item"
                        :key="index" />
    </span>
    <Complaint :item="item"
               type="video" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import config from '@/config'
import VideoControlItem from './VideoControlItem'
import Complaint from '@/components/Complaint'
export default defineComponent({
  props: ['item'],
  components: {
    VideoControlItem,
    Complaint
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
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(229, 233, 240);
  > span {
    flex: 1;
    padding: 20px 10px;
    display: flex;
  }
}
</style>
