<template>

  <comment-item v-for="item in comment"
                :key="item.commentId"
                :item="item"
                :parentCommentId="parentCommentId"></comment-item>
  <div v-if="!comment || (comment.length === 0 && !comment.datahadLoadedButResultNull)"
       class="a-spin-wrapper">
    <a-spin tip="评论正在加载中不要急..." />
  </div>

</template>

<script>
import { defineComponent, inject } from 'vue'
import CommentItem from './CommentItem.vue'
export default defineComponent({
  components: {
    CommentItem
  },
  props: ['parentCommentId'],
  setup (props) {
    const { v: comment } = inject('comment')
    return {
      comment
    }
  }
})
</script>

<style lang="less" scoped>
.a-spin-wrapper {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}
</style>
