<template>
  <div class="UPdetail">
    <div>
      <DynamicAvatar :item="subscribe[0]"
                     :size="50" />
    </div>
    <div>
      <div>
        {{subscribe[0].account}} &nbsp;&nbsp;&nbsp;
        <Image :staticPath="videoUpDetailSendMsg" />
        &nbsp;&nbsp;&nbsp;发消息
      </div>
      <div>
        <Tooltip :text="subscribe[0].introduction || defaultIntroduction" />
      </div>
      <div>
        <button :class="{'had-sub':subscribe[0].subscribe && hadSub(subscribe[0].subscribe,$store.state.userId )>-1}"
                @click="handleSub">{{ (subscribe[0].subscribe && hadSub(subscribe[0].subscribe,$store.state.userId )>-1 ? '取消关注 ': '+ 关注 ') + (subscribe[0].subscribe?subscribe[0].subscribe.length:0)  }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import Image from '@/components/Image'
import config from '@/config'
import s from '@/service/Video'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import Tooltip from '@/components/Tooltip'
export default defineComponent({
  components: {
    DynamicAvatar,
    Image,
    Tooltip
  },
  setup () {
    const { v: subscribe } = inject('subscribe')
    const store = useStore()
    const hadSub = config.currentUserHadSubscribe
    const means = config.videoControlAttrMeanSubRoute.subscribe
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
      if (!subscribe[0].subscribeHadLoad) {
        return message.error('请稍后再试')
      }
      if (loading) {
        return message.error('冷却中')
      }
      if (store.state.userId === subscribe[0].userId) {
        return message.error('不能关注自己')
      }
      loading = true
      const r = await s._subscribeHandle.bind(subscribe[0])({
        fansId: store.state.userId,
        upId: subscribe[0].userId,
        time: config.time()
      })
      loading = false
      alert(r)
    }
    return {
      subscribe,
      hadSub,
      handleSub,
      defaultIntroduction: config.defaultIntroduction,
      videoUpDetailSendMsg: config.videoUpDetailSendMsg
    }
  }

})
</script>

<style lang="less" scoped>
.UPdetail {
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  > div:first-child {
    width: 50px;
    display: flex;
    align-items: center;
  }
  > div:last-child {
    padding-left: 10px;
    flex: 1;
    > div:nth-child(2) {
      width: 280px;
      text-align: left;
      vertical-align: middle;
      font-size: 12px;
      color: silver;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    > div:last-child {
      width: 280px;
      height: 35px;
      line-height: 35px;
      > button {
        width: 145px;
        height: 35px;
        color: white;
        background: #00a1d6;
        border: 1px solid #00a1d6;
        &:not(.had-sub):hover {
          background: #00b5e5;
        }
      }
      > .had-sub {
        background: silver;
        border: 1px solid silver;
      }
    }
  }
}
</style>
