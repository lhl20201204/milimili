<template>
  <a-descriptions size="small"
                  :column="1"
                  bordered>
    <a-descriptions-item label="封面">
      <Image :src="item.coverSrc+'?'+refreshTime" />
    </a-descriptions-item>
    <a-descriptions-item label="up主">
      <DynamicAvatar :item="item" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </a-descriptions-item>
    <a-descriptions-item label="昵称"
                         class="tooltip">
      <Tooltip :text="item.account" />
    </a-descriptions-item>
    <a-descriptions-item label="标签">
      <a-spin v-if="!item.tagHadLoad"
              tip="tag loading" />
      <span v-else
            class="tag-wrap">
        <a-tag v-for="i in item.tag"
               :key="i.tagId">{{i.tagName}}</a-tag>
      </span>
    </a-descriptions-item>
    <a-descriptions-item label="标题"
                         class="tooltip">
      <Tooltip :text="item.videoTitle" />
    </a-descriptions-item>
    <a-descriptions-item label="简介"
                         class="tooltip">
      <Tooltip :text="item.videoIntroduction" />
    </a-descriptions-item>
    <slot name="content"> </slot>
  </a-descriptions>
</template>

<script>
import { defineComponent, inject } from 'vue'
import Image from '@/components/Image'
import Tooltip from '@/components/Tooltip'
import DynamicAvatar from '@/components/DynamicAvatar'
export default defineComponent({
  props: ['item'],
  components: {
    Image,
    Tooltip,
    DynamicAvatar
  },
  setup (props) {
    const { v: refreshTime } = inject('refreshTime')
    return {
      refreshTime
    }
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
    .tag-wrap {
      > span {
        margin: 5px;
      }
    }

    img {
      width: 170px;
      height: 100px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
