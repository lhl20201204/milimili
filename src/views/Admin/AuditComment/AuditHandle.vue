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
                 :btnText="item.hadHandleItem? '已经处理':'退回评论'"
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
      await s.updateComment({
        commentId: props.item.commentId,
        auditing: config.commentHadAuditedStatus
      })
      await s.insertNotice({
        time: config.time(),
        userId: store.state.userId,
        noticedUserId: props.item.userId,
        type: 'comment',
        typeId: props.item.commentId,
        content: '评论通过了审核',
        status: config.auditStatusSuccess
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
      await s.updateComment({
        commentId: props.item.commentId,
        auditing: config.commentNeedEdit
      })
      await s.insertNotice({
        time: config.time(),
        userId: store.state.userId,
        noticedUserId: props.item.userId,
        type: 'comment',
        typeId: props.item.commentId,
        content: failReason.value,
        status: config.auditStatusBeReturned
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
