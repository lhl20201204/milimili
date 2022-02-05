<template>
  <div class="video-right-page">
    <UPDetail />
    <comment-section></comment-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommentSection from './CommentSection'
import UPDetail from './UpDetail'
export default defineComponent({
  components: {
    CommentSection,
    UPDetail
  },
  setup () {
  }
})
</script>

<style lang="less" scoped>
.video-right-page {
  padding-left: 10px;
  flex: 1;
}
</style>
