<template>
   <div class="homePage">
      <Carousel />
      <video-show />
   </div>
</template>
<script>

import VideoShow from './VideoShow'
import Carousel from './carousel'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Carousel,
    VideoShow
  },
  setup () {
    return {
    }
  }
})
</script>
<style lang="less" scoped>
.homePage {
  padding: 0  100px;
  display: flex;
}
</style>
