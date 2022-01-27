<template>
  <comment-item v-for="item in comment" :key="item.commentId" :item="item" :parentCommentId="parentCommentId"></comment-item>
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
    console.log(comment)
    return {
      comment
    }
  }
})
</script>

<style lang="less" scoped>
</style>
