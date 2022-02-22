<template>
  <div class="chat-room">
    <div class="header">
      <DynamicAvatar :item="targetUser" />
      <span> {{targetUser.account}}</span>
      <span>{{isOnline? '在线': '离线'}} </span>
    </div>
    <a-card>
      <div class="content"
           ref="message">
        <ChatMessageItem v-for="item in messageList.v"
                         :key="item.messageId"
                         :item="item"
                         :alignLeft="item.user.userId!=$store.state.userId" />
      </div>
    </a-card>
    <a-input-search v-model:value="content"
                    placeholder="请保持友善哦~~"
                    size="large"
                    @search="sendMessage">
      <template #enterButton>
        <a-button type="primary">发送消息</a-button>
      </template>
    </a-input-search>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import ChatMessageItem from './ChatMessageItem'
import { useStore } from 'vuex'
import config from '@/config'
import s from '@/service/User'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    DynamicAvatar,
    ChatMessageItem
  },
  sockets: {
    message (data) {
      this.messageList.v.push(data)
    }
  },
  props: ['targetUser', 'isOnline', 'cache'],
  setup (props) {
    const content = ref('')
    const store = useStore()
    const instance = getCurrentInstance()
    const messageList = reactive({
      v: [...props.cache]
    })

    watch(() => messageList.v.length, () => {
      if (instance.ctx.$refs.message) {
        nextTick(() => {
          const dom = (instance.ctx.$refs.message)
          dom.scrollTop = dom.scrollHeight
        })
      }
    })

    onMounted(() => {
      nextTick(() => {
        const dom = (instance.ctx.$refs.message)
        dom.scrollTop = dom.scrollHeight
      })
    })

    const sendMessage = async () => {
      const obj = {
        userId: store.state.userId,
        receivedUserId: props.targetUser.userId,
        time: config.time(),
        content: content.value
      }
      const { data } = await s.insertMessage(obj)
      if (data.affectedRows !== 1) {
        throw new Error('插入错误')
      }
      instance.appContext.config.globalProperties.$socket.emit('message', {
        user: {
          userId: store.state.userId,
          account: store.state.userName,
          introduction: store.state.userIntroduction,
          avatar: store.state.userAvatarSrc
        },
        ...obj,
        messageId: data.insertId
      })
      content.value = ''
      message.success('发送成功')
    }
    return {
      content,
      sendMessage,
      messageList
    }
  }

})
</script>

<style lang="less" scoped>
.chat-room {
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > span:nth-child(2) {
      color: red;
    }
    > span:nth-child(3) {
      color: blue;
    }
  }
  > .ant-card {
    margin: 20px 0;
    &:deep(.ant-card-body) .content {
      height: 200px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
        );
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
      }
    }
  }
}
</style>
