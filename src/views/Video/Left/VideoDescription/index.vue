<template>
  <div class="video-description">
    <p>
      <WarningOutlined /> {{video[0].videoIntroduction || videoDefaultIntroduction}}
    </p>
    <div v-if="video[0].tagHadLoad">
      <span v-for="item in video[0].tag"
            :key="item.tagId">{{item.tagName}}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { WarningOutlined } from '@ant-design/icons-vue'
import config from '@/config'
export default defineComponent({
  components: {
    WarningOutlined
  },
  setup () {
    const { v: video } = inject('video')
    return {
      video,
      videoDefaultIntroduction: config.videoDefaultIntroduction
    }
  }
})
</script>
<style lang="less" scoped>
.video-description {
  padding: 10px;
  > div {
    padding: 20px 0;
    width: 637px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 1px rgba(0, 0, 0, 0.3);

    > span {
      height: 25px;
      line-height: 25px;
      padding: 0 14px;
      display: inline-block;
      margin-right: 20px;
      margin-top: 8px;
      background: #f4f4f4;
      border: 1px solid #f4f4f4;
      border-radius: 12px;
      &:hover {
        border: 1px solid #03a2d6;
        color: #03a2d6;
      }
    }
  }
}
</style>
