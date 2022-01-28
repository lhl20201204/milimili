<template>
 <div class="send-comment-wrapper">
  <span><Avatar :src="$store.state.userAvatarSrc" :size="size || 40"/></span>
  &nbsp;&nbsp;
  <a-textarea class="comment-textarea" v-model:value="commentContent" placeholder="发一条友善的评论"  :rows="3" />
  &nbsp;&nbsp;
  <button @click="sendComment" > 发表<div>评论</div></button>
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Avatar from '@/components/Avatar'
export default defineComponent({
  props: ['size'],
  components: {
    Avatar
  },
  setup () {
    const commentContent = ref('')
    function sendComment () {
      console.log(commentContent.value)
    }
    return {
      commentContent,
      sendComment
    }
  }
})
</script>

<style lang="less" scoped>
.send-comment-wrapper {
  display: flex;
  > textarea {
     resize: none;
  }
  > button {
  align-self: flex-end;
  width: 66px;
  height: 66px;
  background: #00a1d6;
  border: 1px solid #00a1d6;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  margin-right: 5px;
  color: white;
  &:hover {
  background: #00b5e5;
  border: 1px solid #00b5e5;
  }
  }
}
</style>
