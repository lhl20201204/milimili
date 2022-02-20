<template>
  <a-list item-layout="vertical"
          size="small"
          :pagination="pagination"
          :data-source="listData">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #extra>
          <VideoListItem :item="item" />
        </template>
        <a-list-item-meta :description="item.userHandleTime">
          <template #title>
            <span>{{ videoControlAttrMeanSubRoute[item.userHandleType] }}了视频mv{{item.videoId}}</span>
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script>

import { computed, defineComponent, inject } from 'vue'
import config from '@/config'
import VideoListItem from '@/components/VideoListItem'

export default defineComponent({
  components: {
    VideoListItem
  },
  setup () {
    const pagination = {
      pageSize: 3
    }
    const { v: dynamic } = inject('dynamic')
    const listData = computed(() => {
      const a = dynamic[0]
      return a ? [...a.likes, ...a.coin, ...a.forwarding, ...a.collect, ...a.comment].sort((a, b) => new Date(b.userHandleTime) - new Date(a.userHandleTime)) : []
    })
    return {
      listData,
      pagination,
      videoControlAttrMeanSubRoute: config.videoControlAttrMeanSubRoute
    }
  }

})
</script>
