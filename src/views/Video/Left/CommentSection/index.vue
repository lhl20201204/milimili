<template>
 <div class="commentPage">
   <comment-nav></comment-nav>
   <send-comment :src="$store.state.userAvatarSrc"> </send-comment>
   <Comment parentCommentId="00000000000000000000"/>
 </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommentNav from './CommentNav'
import Comment from './Comment'
import SendComment from './SendComment'
export default defineComponent({
  components: {
    CommentNav,
    Comment,
    SendComment
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="less" scoped>

</style>
