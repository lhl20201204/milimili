<template>
  <div class="send_barrage">
    <span> {{isWathcing.v.length}}人正在看，已装填{{barrage.v? barrage.v.length: 0}}条弹幕</span>
    <CheckBox> </CheckBox>
    &nbsp;&nbsp;
    <Image :staticPath="src" />
    &nbsp;&nbsp;
    <div ref="control">
      <Image :staticPath="src2" />
    </div>
    <a-input v-model:value="barrageContent"
             placeholder="发个友善的弹幕见证当下"
             allowClear
             @change="changeBarrageContent" />
    <a-button type="primary"
              @click="sendBarrages"
              :disabled="barrageContent===''">发送</a-button>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, inject, nextTick, ref } from 'vue'
import CheckBox from '@/components/CheckBox'
import BarrageControl from './BarrageControl'
import Image from '@/components/Image'
import config from '@/config'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    CheckBox,
    Image
  },
  setup () {
    const isWathcing = inject('isWatching')
    const barrage = inject('barrage')
    const barrageContent = ref('')
    const changeBarrageContent = inject('changeBarrageContent')
    const sendBarrage = inject('sendBarrage')
    const instance = getCurrentInstance()
    nextTick(() => {
      instance.appContext.config.globalProperties.$addHover(instance.ctx.$refs.control, BarrageControl)
    })

    const sendBarrages = async () => {
      const result = await sendBarrage()
      if (result) {
        barrageContent.value = ''
      } else {
        message.error('发送失败')
      }
    }

    return {
      changeBarrageContent,
      sendBarrages,
      isWathcing,
      barrage,
      barrageContent,
      src: config.videoBarrageSetting,
      src2: config.videoBarrageControl
    }
  }
})
</script>

<style lang="less" scoped>
.send_barrage {
  height: 46px;
  border-radius: 5px;
  box-shadow: 0 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  position: relative;

  > span {
    padding: 0 10px 0 20px;
    font-size: 12px;
    line-height: 46px;
    vertical-align: middle;
  }

  &:deep(.ant-input-affix-wrapper) {
    width: 250px;
    height: 26px;
  }

  &:deep(.ant-btn-primary) {
    height: 26px;
    display: flex;
    align-items: center;
    > span {
      line-height: 26px;
    }
  }
}
</style>
