<template>
   <div class="homePage">
      <Carousel />
     <video-list />
   </div>
</template>
<script>

import VideoList from './VideoList'
import Carousel from './carousel'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Carousel,
    VideoList
  },
  setup () {
    return {
    }
  }
})
</script>
<style lang="less" scoped>
.homePage {
  padding: 0  150px;
  display: flex;
}
</style>
