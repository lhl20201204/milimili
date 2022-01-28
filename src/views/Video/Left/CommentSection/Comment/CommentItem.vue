<template >
  <div v-if="item.parentCommentId === parentCommentId" class="comment-item">
  <span><Avatar :src="item.avatar" :size="parentCommentId===rootCommentId ? 40: 30"/></span>
  <div>
    <span>{{item.account}}</span>
    <div>{{item.content}}</div>
    <div class="comment-info">
      <span>{{item.sendTime}}</span>&nbsp;&nbsp;
    <ToggleImage :initStatic="videoCommentLove" :hoverStatic="videoCommentLoveActivate" :initHasClick="false" :click="clickImg"/>&nbsp;&nbsp;
    <Image :staticPath="videocommentUnlove"/>&nbsp;&nbsp;
     <span class="comment-reply"
          @click="showReply=!showReply">回复</span>
     <send-comment v-show="showReply" :size="30"> </send-comment>
     <Comment :parentCommentId="item.commentId"/>
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Avatar from '@/components/Avatar'
import ToggleImage from '@/components/ToggleImage'
import Image from '@/components/Image'
import SendComment from '../SendComment'
import config from '@/config'
export default defineComponent({
  beforeCreate: function () {
    this.$options.components.Comment = require('./index.vue').default
  },
  props: ['item', 'parentCommentId'],
  components: {
    Avatar,
    ToggleImage,
    Image,
    SendComment
  },
  setup (props) {
    function clickImg () {
      console.log('click')
    }
    const showReply = ref(false)
    return {
      videoCommentLove: config.videoCommentLove,
      videoCommentLoveActivate: config.videoCommentLoveActivate,
      videocommentUnlove: config.videocommentUnlove,
      clickImg,
      showReply,
      rootCommentId: config.rootCommentId
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
    margin:0 0 5px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(153, 162, 170);
    > span:first-child {
      color: rgb(251, 114, 153)
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
       padding: 0 5px;
       border-radius: 6px;
        &:hover {
         background: hsl(0, 4%, 50%);
       }
     }
     > .send-comment-wrapper {
       margin-top: 15px;
     }
     >  div.comment-item{
       padding-top:  15px;
     }
     >  div.comment-item ~ .comment-item{
       padding-top:  5px;
     }
    }

  }
}

.comment-item:last-of-type > div {
  padding-bottom: 0px;
  border-bottom: none;
}

</style>
