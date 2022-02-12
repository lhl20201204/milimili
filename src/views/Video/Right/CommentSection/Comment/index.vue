<template>
  <List :list="comment"
        loadingTip="comment loading ..."
        nullDescription="暂时没有评论">
    <template #content>
      <comment-item v-for="item in comment"
                    :key="item.commentId"
                    :item="item"
                    :parentCommentId="parentCommentId"></comment-item>
    </template>
  </List>

</template>

<script>
import { defineComponent, inject } from 'vue'
import CommentItem from './CommentItem'
import List from '@/components/List'
export default defineComponent({
  components: {
    CommentItem,
    List
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
</style>
