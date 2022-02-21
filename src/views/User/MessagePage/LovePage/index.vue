<template>
<a-card>
    <List :list="love"
          loadingTip="love loading..."
          nullDescription="暂时没有数据">
      <template #content>
    <a-list item-layout="vertical"
          size="small"
          :pagination="pagination"
          :data-source="love">
    <template #renderItem="{ item }">

      <a-list-item key="item.title">
        <template #extra>
          <VideoListItem v-if="item.videoHadLoad"
                         :item="item.video" />
        </template>
        <a-list-item-meta :description="item.love.time">
          <template #title>
            <a-badge title="new Message"
                     :offset="[10,0]"
                     :dot="new Date(item.love.time)>=new Date(lastTime)"
                     >
              <a-space><span>【点赞通知】</span></a-space>
            </a-badge>
          </template>
        </a-list-item-meta>
        <DynamicAvatar v-if="item.love.userHadload" :size="30" :item="item.love.user" />({{item.love.userHadload ? item.love.user.account: accountLoading}})点赞了你发布在【{{item.videoHadLoad?item.video.videoTitle:'标题正在加载中'}}】的评论【{{item.content}}】
      </a-list-item>

    </template>
  </a-list>
      </template>
    </List>
  </a-card>

</template>

<script>
import { computed, defineComponent, inject } from 'vue'
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
    const { v: loveComment } = inject('loveComment')
    const lastTime = updateTime('love')
    const love = computed(() => {
      const arr = loveComment.map(r => (r.love.map(l => ({ ...r, love: l })))).reduce((p, v) => [...p, ...v], []).sort((a, b) => new Date(b.love.time) - new Date(a.love.time))
      if (loveComment.hadLoad) {
        arr.datahadLoadedButResultNull = !arr.length
      }
      return arr
    })
    return {
      lastTime,
      love,
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
