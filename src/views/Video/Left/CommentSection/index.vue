<template>
 <div class="commentPage">
   <comment-nav></comment-nav>
   <send-comment > </send-comment>
   <Comment :parentCommentId="rootCommentId"/>
 </div>
</template>

<script>
import { defineComponent } from 'vue'
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
    return {
      rootCommentId: config.rootCommentId
    }
  }
})
</script>

<style lang="less" scoped>

</style>
