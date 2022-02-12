<template>
  <a-space>
    <ButtonModal :disabled="item.hadHandleItem"
                 :btnText="item.hadHandleItem? '已经处理':'通过审核'"
                 :handleOk="handleOk"
                 :show="successVisible"
                 title="审核通过"
                 :changeVisible="(x)=>(successVisible=x)">
      <template #content>
        <span>你确定要通过这个视频的审核吗？</span>
      </template>
    </ButtonModal>
    <ButtonModal :disabled="item.hadHandleItem"
                 :btnText="item.hadHandleItem? '已经处理':'退回稿件'"
                 :handleOk="handleFailOk"
                 :show="failVisible"
                 title="审核失败"
                 :changeVisible="(x)=>(failVisible=x)">
      <template #content>
        <a-textarea placeholder="原因必填"
                    v-model:value="failReason">
        </a-textarea>
      </template>
    </ButtonModal>
  </a-space>
</template>

<script>
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import config from '@/config'
import { useStore } from 'vuex'
import s from '@/service/Admin'
import uploadService from '@/service/Upload'
import ButtonModal from '@/components/ButtonModal'
export default defineComponent({
  components: {
    ButtonModal
  },
  props: ['item'],
  setup (props) {
    const store = useStore()
    const successVisible = ref(false)
    const successReason = ref('')
    async function handleOk () {
      if (typeof props.item.setHandleItem !== 'function') {
        console.log(props.item)
        return message.error('没有setHandleItem函数')
      }
      await uploadService.updateVideo({
        videoId: props.item.videoId,
        auditing: 0
      })
      await s.insertNotice({
        time: config.time(),
        userId: store.state.userId,
        noticedUserId: props.item.userId,
        content: successReason.value || '您的稿件【【' + props.item.videoTitle + '】】(mv' + props.item.videoId + ')通过了审核'
      })
      props.item.setHandleItem(true)
      successVisible.value = false
      successReason.value = ''
      message.success('审核成功')
    }

    const failVisible = ref(false)
    const failReason = ref('')
    async function handleFailOk () {
      if (typeof props.item.setHandleItem !== 'function') {
        console.log(props.item)
        return message.error('没有setHandleItem函数')
      }
      if (failReason.value === '') {
        return message.error('原因不能为空')
      }
      await uploadService.updateVideo({
        videoId: props.item.videoId,
        auditing: config.videoNeedEdit
      })
      await s.insertNotice({
        time: config.time(),
        userId: store.state.userId,
        noticedUserId: props.item.userId,
        content: '您的稿件【【' + props.item.videoTitle + '】】(mv' + props.item.videoId + ')未能通过审核，原因：' + failReason.value
      })

      failVisible.value = false
      failReason.value = ''
      props.item.setHandleItem(true)
      message.success('操作成功')
    }

    return {
      failReason,
      failVisible,
      successReason,
      successVisible,
      handleOk,
      handleFailOk
    }
  }

})
</script>

<style lang="less" scoped>
.ant-space {
  margin: 20px;
}
</style>
