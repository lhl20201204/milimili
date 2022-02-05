<template>
  <span>
    <ToggleImages v-if="video[0][attr.path + 'HadLoad']"
                  :initStatic="attr.init"
                  :hoverStatic="attr.hover"
                  :fn="fn"
                  :item="video[0][attr.path]"
                  :click="clickImg" />
    <Image v-else
           :staticPath="attr.init" />
    &nbsp;{{video[0][attr.path + 'HadLoad'] ? video[0][attr.path].length : 0}}
    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</template>

<script>
import { defineComponent, inject } from 'vue'
import ToggleImages from '@/components/ToggleImages'
import Image from '@/components/Image'
import config from '@/config'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import s from '@/service/Video'
import { getCount } from '@/utils'
export default defineComponent({
  components: {
    ToggleImages,
    Image
  },
  props: ['attr'],
  setup (props) {
    const { v: video } = inject('video')
    const store = useStore()
    const fn = config[props.attr.currentUserHad]
    const means = config.videoControlAttrMeanSubRoute[props.attr.path]
    const alert = function (res) {
      if (res === config.requestFail) {
        message.error(means + 'request fail')
      } else if (res === config.insertSuccess) {
        message.success(means + '成功')
      } else if (res === config.deleteSuccess) {
        message.success('取消' + means + '成功')
      } else {
        message.error('未知错误')
      }
    }
    let hasSuccessOnce = false
    async function clickImg () {
      if (!video[0][props.attr.path + 'HadLoad']) {
        return message.error('请稍后再试')
      }
      if (props.attr.onlyTouchOnce && fn(video[0][props.attr.path], store.state.userId) > -1) {
        return message.error('只能' + means + '一次')
      }

      const r = await s[props.attr.requestHandleMethod].bind(video[0])({
        userId: store.state.userId,
        time: config.time(),
        videoId: video[0].videoId
      }, {
        canContinueClick: props.attr.canContinueClick
      })

      if (props.attr.onlyTouchOnce) {
        if (!hasSuccessOnce) {
          if (r === config.insertSuccess) {
            hasSuccessOnce = true
            return alert(r)
          }
          return alert(r)
        } else {
          return message.error('只能' + means + '一次')
        }
      }

      if (props.attr.canContinueClick) {
        if (r === config.insertSuccess) {
          if (getCount(video[0][props.attr.path], 'userId', store.state.userId) === 1) {
            return alert(r)
          }
          return message.success('持续' + means + '成功')
        }
        return alert(r)
      }

      return alert(r)
    }

    return {
      clickImg,
      video,
      fn
    }
  }

})
</script>

<style lang="less" scoped>
</style>
