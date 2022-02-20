<template>
  <a-card>
    <List :list="video"
          loadingTip="video loading..."
          nullDescription="暂时没有数据">
      <template #content>
        <a-table :dataSource="video.map(v=>({
        ...v,
        key:v.videoId}))"
                 :columns="columns">
        </a-table>
      </template>
    </List>
  </a-card>
</template>

<script>
import { defineComponent, inject } from 'vue'
import List from '@/components/List'
import VideoListItem from '@/components/VideoListItem'
export default defineComponent({
  components: {
    List
  },
  setup () {
    const { v: video } = inject('video')
    const columns = [
      {
        title: '视频',
        customRender: ({ record }) => (<VideoListItem item={record} />)
      },
      {
        title: '视频号',
        customRender: ({ record }) => (<span>mv{record.videoId}</span>)
      },
      {
        title: '播放量',
        customRender: ({ record }) => (<span>{record.play.length}</span>)
      },
      {
        title: '点赞数',
        customRender: ({ record }) => (<span>{record.likes.length}</span>)
      },
      {
        title: '投币数',
        customRender: ({ record }) => (<span>{record.coin.length}</span>)
      },
      {
        title: '收藏量',
        customRender: ({ record }) => (<span>{record.collect.length}</span>)
      },
      {
        title: '投稿时间',
        dataIndex: 'time'
      }
    ]
    return {
      video,
      columns
    }
  }
})
</script>
<style lang="less" scoped>
</style>
