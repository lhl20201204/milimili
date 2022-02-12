<template>
  <a-card class="audit-video-wrap">
    <List :list="video"
          loadingTip="video loading..."
          nullDescription="暂时没有需要审核的视频">
      <template #content>
        <div class="audit-video">
          <div>
            <Video :v="video[current-1]"
                   :changeCurrentTime="() => null"
                   :isNotNeedAddeventListener="true" />
          </div>
          <div>
            <AuditVideoDetail :item="video[current-1]" />
            <AuditHandle :item="video[current-1]" />
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
import { defineComponent, inject, ref } from 'vue'
import AuditVideoDetail from './AuditVideoDetail'
import AuditHandle from './AuditHandle'
import List from '@/components/List'
import Video from '@/components/Video'
export default defineComponent({
  components: {
    List,
    AuditVideoDetail,
    AuditHandle,
    Video
  },
  setup () {
    const { v: video } = inject('video')
    const current = ref(1)
    return {
      video,
      current
    }
  }

})
</script>

<style lang="less" scoped>
.audit-video-wrap {
  .audit-video {
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
      > video {
        width: 100%;
        height: 100%;
      }
    }
    > div:last-child {
      padding-left: 15px;
    }
  }
}
</style>
