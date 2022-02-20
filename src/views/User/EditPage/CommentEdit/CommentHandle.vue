<template>
  <div>
    <a-descriptions size="small"
                    :column="1"
                    bordered>
      <a-descriptions-item label="评论内容">
        <a-input v-model:value="content"
                 :addon-before="prefix"
                 @change="change" />
      </a-descriptions-item>
      <a-descriptions-item label="评论所在视频">
        <VideoListItem v-if="item.videoHadLoad"
                       :item="item.video" />
        <a-spin v-else> </a-spin>
      </a-descriptions-item>
      <a-descriptions-item label="回复用户">
        <DynamicAvatar :item="item.replyUser" />
      </a-descriptions-item>
      <a-descriptions-item label="回复评论"
                           class="tooltip">
        <Tooltip :text="item.replyComment.content" />
      </a-descriptions-item>
      <a-descriptions-item label="评论时间"
                           class="tooltip">
        <Tooltip :text="item.sendTime" />
      </a-descriptions-item>
      <a-descriptions-item label="操作">
        <a-button type="primary"
                  @click="updateComment"> 更新评论</a-button>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import Tooltip from '@/components/Tooltip'
import VideoListItem from '@/components/VideoListItem'
import config from '@/config'
import adminService from '@/service/Admin'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    Tooltip,
    DynamicAvatar,
    VideoListItem
  },
  props: ['item'],
  setup (props) {
    const content = ref('')
    const prefix = ref('')
    const init = () => {
      const m = props.item.content.match(/@(.*?):/)
      prefix.value = m ? m[0] : ''
      content.value = props.item.content.slice(prefix.value.length)
    }
    init()
    watch(() => props.item, init)
    const change = (x) => {
      content.value = x.target.value
    }
    let loading = false
    const updateComment = async () => {
      if (loading) {
        return message.error('请稍后')
      }
      loading = true
      await adminService.updateComment({
        commentId: props.item.commentId,
        content: prefix.value + content.value,
        auditing: config.commentAuditingStatus
      })
      loading = false
      message.success('更新评论成功')
    }
    return {
      updateComment,
      change,
      content,
      prefix
    }
  }
})
</script>
<style lang="less" scoped>
.ant-descriptions {
  max-width: 660px;
  min-width: 660px;
  &:deep(.ant-descriptions-item-content) {
    &.tooltip {
      max-width: 410px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
