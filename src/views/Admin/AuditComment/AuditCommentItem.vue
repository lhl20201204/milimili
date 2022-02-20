<template>
  <div>
    <a-descriptions size="small"
                    :column="1"
                    bordered>
      <a-descriptions-item label="评论内容"
                           class="tooltip">
        <Tooltip :text="item.content" />
      </a-descriptions-item>
      <a-descriptions-item label="评论所在视频">
        <VideoListItem v-if="item.videoHadLoad"
                       :item="item.video" />
        <a-spin v-else> </a-spin>
      </a-descriptions-item>
      <a-descriptions-item label="发表用户">
        <DynamicAvatar :item="item.user" />
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
        <AuditHandle :item="item" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import Tooltip from '@/components/Tooltip'
import VideoListItem from '@/components/VideoListItem'
import AuditHandle from './AuditHandle'
export default defineComponent({
  components: {
    Tooltip,
    DynamicAvatar,
    VideoListItem,
    AuditHandle
  },
  props: ['item'],
  setup (props) {

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
