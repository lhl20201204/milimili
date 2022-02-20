<template>
  <div class="send-comment-wrapper">
    <span>
      <Avatar :src="$store.state.userAvatarSrc"
              :size="size || 40" />
    </span>
    &nbsp;&nbsp;
    <a-textarea class="comment-textarea"
                v-model:value="commentContent"
                :placeholder="!comment ? '发一条友善的评论': '@' + comment.account + ':'"
                :rows="3" />
    &nbsp;&nbsp;
    <button @click="sendComment"
            :disabled="!commentContent"> 发表<div>评论</div></button>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, inject, ref } from 'vue'
import Avatar from '@/components/Avatar'
import { useStore } from 'vuex'
import config from '@/config'
import s from '@/service/Video'
import { message } from 'ant-design-vue'
export default defineComponent({
  props: ['size', 'comment'],
  components: {
    Avatar
  },
  setup (props) {
    const commentContent = ref('')
    const { v: video } = inject('video')
    const store = useStore()
    const instance = getCurrentInstance()
    async function sendComment () {
      const params = {
        auditing: config.commentHadAuditedStatus,
        videoId: props.comment ? props.comment.videoId : video[0].videoId,
        userId: store.state.userId,
        sendTime: config.time(),
        replyUserId: props.comment ? props.comment.userId : video[0].userId,
        content: (props.comment ? `@${props.comment.account}:` : '') + commentContent.value,
        parentCommentId: props.comment ? props.comment.parentCommentId === config.rootCommentId ? props.comment.commentId : props.comment.parentCommentId : config.rootCommentId
      }
      const { data } = await s.insertComment(params)
      if (data.affectedRows !== 1) {
        message.error('发送评论失败')
        return false
      }
      const obj = ({
        ...params,
        love: [],
        loveHadLoad: true,
        loveHandle: s._loveHandle,
        userId: store.state.userId,
        account: store.state.userName,
        avatar: store.state.userAvatarSrc,
        commentId: data.insertId,
        hadHandleItem: false,
        setHandleItem: function (x) {
          this.hadHandleItem = x
        }
      })

      instance.appContext.config.globalProperties.$socket.emit('insertComment', obj)
      commentContent.value = null
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
    &:disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
}
</style>
