<template>
  <div class="commentPage">
    <comment-nav></comment-nav>
    <send-comment> </send-comment>
    <Comment :parentCommentId="rootCommentId" />
    <div>{{comment.length ? '没有更多评论了' : comment.datahadLoadedButResultNull ? '这里没有评论哦~~快来发一条评论吧~' : ''}}</div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import CommentNav from './CommentNav'
import Comment from './Comment'
import SendComment from './SendComment'
import config from '@/config'
export default defineComponent({
  components: {
    CommentNav,
    Comment,
    SendComment
  },
  setup () {
    const { v: comment } = inject('comment')

    return {
      comment,
      rootCommentId: config.rootCommentId
    }
  }
})
</script>

<style lang="less" scoped>
.commentPage {
  > div:last-child {
    text-align: center;
    padding-top: 10px;
  }
}
</style>
