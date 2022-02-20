<template>
  <a-card class="video-wrap">
    <List :list="video"
          loadingTip="loading..."
          nullDescription="暂时没有数据">
      <template #content>
        <div class="video">
          <div>
            <VideoListItem :item="video[current-1]"
                           :isAuto="true" />
          </div>
          <div v-if="video[current-1][attr]">
            <a-table :dataSource="video[current-1][attr].map(v=>({
        ...v,
        key:v[attr+'Id']}))"
                     :columns="columns">
            </a-table>
            <a-pagination v-model:current="current"
                          :pageSize="1"
                          :total="video.length" />
          </div>
        </div>

      </template>
    </List>
  </a-card>
</template>

<script>
import { defineComponent, inject, ref, watch } from 'vue'
import List from '@/components/List'
import VideoListItem from '@/components/VideoListItem'
import DynamicAvatar from '@/components/DynamicAvatar'
import TooltipItem from '@/components/TooltipItem'
import config from '@/config'
export default defineComponent({
  props: ['attr'],
  components: {
    List,
    VideoListItem
  },
  setup (props) {
    const { v: video } = inject('video')
    const current = ref(1)

    watch(() => video.length, () => {
      if (current.value > video.length) {
        current.value = 1
      }
    })
    return {
      video,
      current,
      columns: [
        {
          title: '用户',
          customRender: ({ record }) => (<DynamicAvatar item={record} />)
        },
        {
          title: '昵称',
          customRender: ({ record }) => (<TooltipItem text={record.account} width={10} />)
        },
        {
          title: config.videoControlAttrMeanSubRoute[props.attr] + '时间',
          dataIndex: 'time'
        }
      ]
    }
  }

})
</script>

<style lang="less" scoped>
.video-wrap {
  .video {
    display: flex;
    > div:first-child {
      width: 637px;
      min-width: 637px;
      height: 445px;
      min-height: 445px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: black;
      color: white;
      position: relative;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > div:last-child {
      padding-left: 15px;
      &.tooltip {
        max-width: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
