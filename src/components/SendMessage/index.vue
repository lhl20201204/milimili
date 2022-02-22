<template>
  <div :key="cache">
    <a-button type="primary"
              @click="showModal">{{text || '发消息'}}</a-button>
    <a-modal :visible="visible"
             title="私信"
             :footer="null"
             @cancel="handleOk"
             @ok="handleOk">
      <ChatRoom :targetUser="targetUser"
                :cache="cache"
                :isOnline="onlinesUsers.v.length > 1"> </ChatRoom>
    </a-modal>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ChatRoom from './ChatRoom'
export default defineComponent({
  components: {
    ChatRoom
  },
  name: 'SendMessage',
  props: ['targetUser', 'cache', 'text'],
  sockets: {
    messageLogin ({ onlineUsers }) {
      this.onlinesUsers.v.splice(0, this.onlinesUsers.v.length)
      this.onlinesUsers.v.splice(0, 0, ...onlineUsers)
    }
  },
  setup (props) {
    const visible = ref(false)
    const store = useStore()
    const route = useRoute()
    const instance = getCurrentInstance()
    const onlinesUsers = reactive({ v: [] })
    const showModal = () => {
      if (props.targetUser.userId === store.state.userId) {
        return message.error('不能给自己发消息')
      }
      visible.value = true
    }
    let unwatchRoute = null
    unwatchRoute = watch(() => route.path, () => {
      visible.value = false
      unwatchRoute()
    })
    const visibleUnwatch = watch(() => visible.value, (x) => {
      if (x) {
        instance.appContext.config.globalProperties.$socket.emit('messageLogin', {
          usersRoomId: props.targetUser.userId < store.state.userId ? props.targetUser.userId + '#' + store.state.userId : store.state.userId + '#' + props.targetUser.userId,
          messageUserId: store.state.userId
        })
        store.commit('changeIsInChatRoom', true)
      } else {
        instance.appContext.config.globalProperties.$socket.emit('messageDisconnect')
        store.commit('changeIsInChatRoom', false)
      }
      if (!unwatchRoute) {
        visibleUnwatch()
      }
    })
    const handleOk = e => {
      visible.value = false
    }

    return {
      visible,
      showModal,
      handleOk,
      onlinesUsers
    }
  }
})
</script>
