<template>
  <a-list item-layout="vertical"
          size="small"
          :pagination="pagination"
          :data-source="notice">
    <template #renderItem="{ item }">

      <a-list-item key="item.title">
        <template #extra>
          <VideoListItem v-if="item.video"
                         :item="item.video" />
        </template>
        <a-list-item-meta :description="means[item.status]">
          <template #title>
            <a-badge title="new Message"
                     :offset="[10,0]"
                     :dot="new Date(item.time)>=new Date(message)">
              <a-space><span>【系统通知】</span> <span>{{ item.time }}</span></a-space>
            </a-badge>
          </template>
        </a-list-item-meta>
        <span v-if="item.video">您投稿的视频【{{item.video.videoTitle}}】{{handles[item.status]}}<span v-if="item.status">{{item.content}} </span></span>
        <span v-else-if="item.comment">您发布在视频【mv{{item.comment.videoId}}】的评论【{{item.comment.content}}】{{handles[item.status]}} <span v-if="item.status">{{item.content}} </span></span>
        <span v-else-if="item.type==='comment'||item.type==='video'">您{{item.type==='video'?'投稿的视频':'发布的评论'}}【id:{{item.typeId}}】因为：{{item.content}}被移除了 </span>
      </a-list-item>

    </template>
  </a-list>
</template>

<script>
import { defineComponent, inject } from 'vue'
import VideoListItem from '@/components/VideoListItem'
import config from '@/config'
import { useStore } from 'vuex'
import s from '@/service/User'
export default defineComponent({
  components: {
    VideoListItem
  },
  setup () {
    const { v: notice } = inject('notice')
    const store = useStore()
    const time = JSON.parse(store.state.userTime)

    const updateTime = async () => {
      const timeStr = JSON.stringify({
        ...time,
        message: config.time()
      })
      const { data } = await s.updateUser({
        userId: store.state.userId,
        time: timeStr
      })
      if (data.affectedRows !== 1) {
        throw new Error()
      }
      store.commit('changeUserTime', timeStr)
      sessionStorage.setItem('currentUserTime', timeStr)
    }
    updateTime()
    const pagination = {
      pageSize: 4
    }
    const {
      auditStatusSuccess,
      auditStatusDelete,
      auditStatusBeReturned,
      auditStatusMeans
    } = config
    const proxyMeans = (arr, means) => {
      const obj = {}
      let i = 0
      for (const x of arr) {
        obj[x] = means[i++]
      }
      return obj
    }
    const means = {
      ...proxyMeans([auditStatusSuccess,
        auditStatusDelete,
        auditStatusBeReturned], auditStatusMeans[0])
    }
    const handles = {
      ...proxyMeans([auditStatusSuccess,
        auditStatusDelete,
        auditStatusBeReturned], auditStatusMeans[1])
    }
    return {
      means,
      notice,
      pagination,
      handles,
      auditStatusSuccess,
      message: time.message
    }
  }
})
</script>
<style lang="less" scoped>
</style>
