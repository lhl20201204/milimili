<template>
  <a-descriptions size="small"
                  :column="1"
                  bordered>
    <a-descriptions-item label="评论内容"
                         class="tooltip">
      <Tooltip :text="item.content" />
    </a-descriptions-item>
    <a-descriptions-item label="回复视频"
                         class="tooltip">
      <Tooltip :text="'mv'+item.videoId" />
    </a-descriptions-item>
    <a-descriptions-item label="评论用户">
      <DynamicAvatar :item="item" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </a-descriptions-item>
    <a-descriptions-item label="昵称"
                         class="tooltip">
      <Tooltip :text="item.account" />
    </a-descriptions-item>
    <slot name="content"> </slot>
  </a-descriptions>
</template>

<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/Tooltip'
import DynamicAvatar from '@/components/DynamicAvatar'
export default defineComponent({
  props: ['item'],
  components: {
    Tooltip,
    DynamicAvatar
  },
  setup (props) {
  }

})
</script>

<style lang="less" scoped>
.ant-descriptions {
  max-width: 400px;
  min-width: 400px;
  &:deep(.ant-descriptions-item-content) {
    &.tooltip {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
