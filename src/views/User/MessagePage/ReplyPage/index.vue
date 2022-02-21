<template>
<a-card>
    <List :list="reply"
          loadingTip="reply loading..."
          nullDescription="暂时没有数据">
      <template #content>
    <a-list item-layout="vertical"
          size="small"
          :pagination="pagination"
          :data-source="reply">
    <template #renderItem="{ item }">

      <a-list-item :key="item.commentId">
        <template #extra>
          <VideoListItem v-if="item.videoHadLoad"
                         :item="item.video" />
        </template>
        <a-list-item-meta :description="item.sendTime">
          <template #title>
            <a-badge title="new Message"
                     :offset="[10,0]"
                     :dot="new Date(item.sendTime)>=new Date(lastTime)"
                     >
              <a-space><span>【回复通知】</span></a-space>
            </a-badge>
          </template>
        </a-list-item-meta>
        <DynamicAvatar v-if="item.userHadload" :size="30" :item="item.user" />({{item.userHadload ? item.user.account: accountLoading}})回复了你发布在【{{item.videoHadLoad?item.video.videoTitle:'标题正在加载中'}}】的评论： 【{{item.content}}】
      </a-list-item>

    </template>
  </a-list>
      </template>
    </List>
  </a-card>

</template>

<script>
import { defineComponent, inject } from 'vue'
import VideoListItem from '@/components/VideoListItem'
import DynamicAvatar from '@/components/DynamicAvatar'
import List from '@/components/List'
import config from '@/config'
import { updateTime } from '@/service'
export default defineComponent({
  components: {
    List,
    VideoListItem,
    DynamicAvatar
  },
  setup () {
    // {"message":"2022-02-21 13:52:31","reply":"2022-02-11 14:00:34","love":"2022-02-11 14:00:34","notice":"2022-02-21 14:03:09"}
    const { v: reply } = inject('reply')
    const lastTime = updateTime('reply')
    return {
      lastTime,
      reply,
      pagination: {
        pageSize: 4,
        accountLoading: config.accountLoading
      }
    }
  }
})
</script>
<style lang="less" scoped>
</style>
