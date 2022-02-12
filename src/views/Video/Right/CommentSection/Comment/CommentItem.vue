<template >
  <div v-if="item.parentCommentId === parentCommentId"
       class="comment-item">
    <span>
      <DynamicAvatar :item="item"
                     :size="parentCommentId===rootCommentId ? 40: 30" />
    </span>

    <div>
      <span>{{item.account}}</span>
      <div ref="commentText"></div>
      <div class="comment-info">
        <span>{{item.sendTime}}</span>&nbsp;&nbsp;
        <ToggleImages v-if="item.loveHadLoad"
                      :initStatic="videoCommentLove"
                      :hoverStatic="videoCommentLoveActivate"
                      :fn="fn"
                      :item="item.love"
                      :click="clickImg" />
        <Image v-else
               :staticPath="videoCommentLove" />
        &nbsp;{{item.love.length}}&nbsp;&nbsp;
        <Image :staticPath="videocommentUnlove" />&nbsp;&nbsp;
        <span class="comment-reply"
              @click="showReply=!showReply">回复</span>
        <Complaint :item="item"
                   :noprimary="true"
                   type="comment" />
        <send-comment v-show="showReply"
                      :comment="item"
                      :size="30"> </send-comment>
        <Comment :parentCommentId="item.commentId" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import ToggleImages from '@/components/ToggleImages'
import Complaint from '@/components/Complaint'
import Image from '@/components/Image'
import SendComment from '../SendComment'
import config from '@/config'
import { useStore } from 'vuex'
import s from '@/service/Video'
import { message } from 'ant-design-vue'
export default defineComponent({
  beforeCreate: function () {
    this.$options.components.Comment = require('./index.vue').default
  },
  props: ['item', 'parentCommentId'],
  components: {
    DynamicAvatar,
    ToggleImages,
    Image,
    SendComment,
    Complaint
  },
  setup (props) {
    const store = useStore()
    const { ctx } = getCurrentInstance()
    async function clickImg () {
      const res = await s._loveHandle.bind(props.item)({
        lovePerson: store.state.userId,
        userApprovedId: props.item.userId,
        time: config.time(),
        commentId: props.item.commentId
      })
      if (res === config.requestFail) {
        message.error('点赞评论请求失败')
      } else if (res === config.insertSuccess) {
        message.success('点赞评论成功')
      } else if (res === config.deleteSuccess) {
        message.success('取消点赞评论成功')
      } else {
        message.error('未知错误')
      }
    }
    const showReply = ref(false)
    const commentText = ref()
    onMounted(() => {
      if (ctx.$refs.commentText) {
        ctx.$refs.commentText.innerHTML = props.item.content.replace(/(?<=@)(.*?)(?=:)/, (v) => {
          return '<span style="color:blue;">' + v + '&nbsp;</span>'
        })
      }
    })
    const fn = config.currentUserHadLove
    return {
      videoCommentLove: config.videoCommentLove,
      videoCommentLoveActivate: config.videoCommentLoveActivate,
      videocommentUnlove: config.videocommentUnlove,
      clickImg,
      showReply,
      rootCommentId: config.rootCommentId,
      commentText,
      fn
    }
  }
})
</script>

<style lang="less" scoped>
.comment-item {
  display: flex;
  padding: 5px 0;
  > div {
    width: 100%;
    margin: 0 0 5px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(153, 162, 170);
    > span:first-child {
      color: rgb(251, 114, 153);
    }
    > div:first-of-type {
      font-size: 14px;
      color: rgb(34, 34, 34);
      padding: 10px 0;
    }
    .comment-info {
      padding-bottom: 10px;
      > span:first-child {
        font-size: 10px;
        color: rgb(153, 162, 170);
      }
      .comment-reply {
        padding: 0 15px 0 10px;
        border-radius: 6px;
        &:hover {
          background: hsl(0, 4%, 50%);
        }
      }
      > .send-comment-wrapper {
        margin-top: 15px;
      }
      > div.comment-item {
        padding-top: 15px;
      }
      > div.comment-item ~ .comment-item {
        padding-top: 5px;
      }
    }
  }
}

.comment-item:last-of-type > div {
  padding-bottom: 0px;
  border-bottom: none;
}
</style>
