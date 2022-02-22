<template>
  <a-card>
    <List :list="message"
          loadingTip="message loading..."
          nullDescription="暂时没有数据">
      <template #content>
    <a-list item-layout="vertical"
          size="small"
          :pagination="pagination"
          :data-source="message">
    <template #renderItem="{ item }">
      <a-list-item :key="item.userId">
        <template #extra>
         <SendMessage  text="查看消息" :cache="getCache(item)" :targetUser="item.user" />
        </template>
        <a-list-item-meta :description="item.user.account">
          <template #title>
            <a-badge title="new Message"
                     :offset="[10,0]"
                     :dot="item.messageGroup.some(v => new Date(v.time)>=new Date(lastTime))"
                     >
              <a-space><span>【私信通知】</span></a-space>
            </a-badge>
          </template>
        </a-list-item-meta>
        <DynamicAvatar :size="30" :item="item.user" /> 给你发了消息,点击右侧按钮查看
     </a-list-item>
    </template>
  </a-list>
      </template>
    </List>
  </a-card>

</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import List from '@/components/List'
import SendMessage from '@/components/SendMessage'
// import config from '@/config'
import { updateTime } from '@/service'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    SendMessage,
    List,
    DynamicAvatar
  },
  setup () {
    const { v: message } = inject('message')
    const lastTime = updateTime('message')
    const store = useStore()

    const getCache = computed(() => (item) => item.messageGroup.map(v => ({
      ...v,
      user: v.userId === store.state.userId ? {
        userId: store.state.userId,
        account: store.state.userName,
        introduction: store.state.userIntroduction,
        avatar: store.state.userAvatarSrc
      } : item.user
    })))
    return {
      getCache,
      lastTime,
      message,
      pagination: {
        pageSize: 4
      }
    }
  }
})
</script>
<style lang="less" scoped>
</style>
