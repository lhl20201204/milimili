<template>
  <div class="user-detail-right">
    <div>
      <div class="tooltip account">
        <Tooltip :text="item.account" />
      </div>
      <div class="tooltip introduction">
        <Tooltip :text="item.introduction|| defaultIntroduction" />
      </div>
    </div>
    <div>
      <a-space>
        <button >编辑个人信息</button>
        <SubscribeList :key="userId"
                       :list="fans"
                       type="fans">
          <template #text>粉丝</template>
        </SubscribeList>
        <SubscribeList :key="userId"
                       :list="subscribes"
                       type="subscribes">
          <template #text>关注</template>
        </SubscribeList>
        <SendMessage v-if="user[0].userId!==$store.state.userId"
                     :key="user[0].userId+$route.path"
                     :targetUser="user[0]" />
      </a-space>
      <br />
      <br />
      <a-space>
        <a-popconfirm
    title="你确定要退出登录?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="logout"
    @cancel="()=>{}"
  >
    <button>退出登录</button>
  </a-popconfirm>
        <button :class="{'had-sub':fans && hadSub(fans,$store.state.userId )>-1}"
                @click="handleSub">{{ (fans && hadSub(fans,$store.state.userId )>-1 ? '取消关注 ': '+ 关注 ') + (fans.length)  }}</button>
        <button @click="refresh(true)">刷新</button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import Tooltip from '@/components/Tooltip'
import config from '@/config'
import SubscribeList from './SubscribeList'
import { useStore } from 'vuex'
import videoService from '@/service/Video'
import { message } from 'ant-design-vue'
import SendMessage from '@/components/SendMessage'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: ['item'],
  components: {
    Tooltip,
    SubscribeList,
    SendMessage
  },
  setup () {
    const router = useRouter()
    const clearNavRouter = inject('clearNavRouter')
    const { v: subscribes } = inject('subscribes')
    const { v: fans } = inject('fans')
    const { v: user } = inject('user')
    const userId = inject('userId')
    const refresh = inject('refresh')
    const hadSub = config.currentUserHadSubscribe
    const store = useStore()
    const means = '关注'
    const alert = function (res) {
      if (res === config.requestFail) {
        message.error(means + 'request fail')
      } else if (res === config.insertSuccess) {
        message.success(means + '成功')
      } else if (res === config.deleteSuccess) {
        message.success('取消' + means + '成功')
      } else {
        message.error('未知错误')
      }
    }
    let loading = false

    async function handleSub () {
      if (!fans.length && !fans.datahadLoadedButResultNull) {
        return message.error('请稍后再试')
      }
      if (loading) {
        return message.error('冷却中')
      }
      if (store.state.userId === userId.value) {
        return message.error('不能关注自己')
      }
      loading = true
      const r = await videoService._subscribeHandle.bind({
        subscribe: fans
      })({
        fansId: store.state.userId,
        upId: userId.value,
        time: config.time()
      }, {
        successAddAttr: () => {
          return {
            userId: store.state.userId,
            account: store.state.userName,
            introduction: store.state.userIntroduction,
            avatar: store.state.userAvatarSrc
          }
        }
      })
      loading = false
      alert(r)
    }

    const logout = () => {
      sessionStorage.setItem('rememberPassword', '')
      sessionStorage.setItem('currentUser', '')
      sessionStorage.setItem('currentUserId', '')
      sessionStorage.setItem('currentUserAvatarSrc', '')
      sessionStorage.setItem('currentUserIntroduction', '')
      sessionStorage.setItem('currentUserTime', '')
      clearNavRouter()
      router.push('/login')
    }

    return {
      logout,
      defaultIntroduction: config.defaultIntroduction,
      subscribes,
      fans,
      hadSub,
      handleSub,
      refresh,
      userId,
      user
    }
  }
})
</script>
<style lang="less" scoped>
.user-detail-right {
  display: flex;
  > div:last-child {
    width: 450px;
    .tooltip {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.number {
        max-width: 20px;
      }
    }
    button {
      width: 145px;
      height: 35px;
      color: white;
      background: #00a1d6;
      border: 1px solid #00a1d6;
      &:not(.had-sub):hover {
        background: #00b5e5;
      }
    }
    .had-sub {
      background: silver;
      border: 1px solid silver;
    }
    .ant-space :deep(.ant-tag) {
      cursor: pointer;
    }
  }
  > div:first-child {
    flex: 1;
    .tooltip {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.account {
        max-width: 150px;
        height: 30px;
        margin-right: 5px;
        font-weight: 700;
        line-height: 18px;
        font-size: 18px;
        vertical-align: middle;
      }
      &.introduction {
        max-width: 450px;
        line-height: 36px;
        height: 36px;
        margin-left: -5px;
        padding: 0 5px;
      }
    }
  }
}
</style>
