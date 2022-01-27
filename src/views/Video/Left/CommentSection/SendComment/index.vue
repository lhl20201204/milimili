<template>
 <div class="send-comment-wrapper">
  <span><Avatar :src="src"/></span>
  &nbsp;&nbsp;
  <a-textarea class="comment-textarea" v-model:value="comment" placeholder="发一条友善的评论"  :rows="3" />
  &nbsp;&nbsp;
  <a-button type="primary" :disabled="comment===''" @click="sendComment">发表评论</a-button>
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Avatar from '@/components/Avatar'
export default defineComponent({
  components: {
    Avatar
  },
  props: ['src'],
  setup () {
    const comment = ref('')
    function sendComment () {
      console.log(comment.value)
    }
    return {
      comment,
      sendComment
    }
  }
})
</script>

<style lang="less" scoped>
.send-comment-wrapper {
  display: flex;
  textarea {
     resize: none;
  }
  button {
    align-self: flex-end;
  }
}
</style>
