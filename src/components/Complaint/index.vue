<template>
  <ButtonModal :noprimary="noprimary"
               :disabled="item.hadHandleItem"
               :btnText="item.hadHandleItem? '已举报':'举报'"
               :handleOk="handleFailOk"
               :show="failVisible"
               :title="'你确定要举报'+type+'吗？'"
               :changeVisible="(x)=>(failVisible=x)">
    <template #content>
      <a-textarea placeholder="原因必填"
                  v-model:value="failReason">
      </a-textarea>
    </template>
  </ButtonModal>
</template>

<script>
import s from '@/service/Video'
import { defineComponent, ref } from 'vue'
import ButtonModal from '@/components/ButtonModal'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import config from '@/config'
export default defineComponent({
  props: ['item', 'type', 'noprimary'],
  components: {
    ButtonModal
  },
  setup (props) {
    if (!props.type || !props.item) {
      return message.error('没有type或者item')
    }
    const failVisible = ref(false)
    const failReason = ref('')
    const store = useStore()
    async function handleFailOk () {
      if (typeof props.item.setHandleItem !== 'function') {
        console.log(props.item)
        return message.error('没有setHandleItem函数')
      }
      await s.insertComplaint({
        time: config.time(),
        content: failReason.value,
        type: props.type,
        originUserId: store.state.userId,
        typeId: props.item[props.type + 'Id'],
        targetUserId: props.item.userId,
        auditing: config.complaintAuditingStatus
      })
      message.success(config.videoControlAttrMeanSubRoute[props.type] + '举报成功')
      failVisible.value = false
      props.item.setHandleItem(true)
    }
    return {
      failVisible,
      handleFailOk,
      failReason
    }
  }
})
</script>
<style lang="less" scoped>
</style>
