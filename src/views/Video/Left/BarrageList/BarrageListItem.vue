<template>
  <div class="barrage-list-item">
    <div>
      <span>
        <DynamicAvatar v-if="item"
                       :item="item"
                       :size="30" />
        <span v-show="!item">发送人</span>
      </span>
      <span>{{item ? getSendTime: '发送时间'}}</span>
      <span>
        <Tooltip :text="item ? item.content : '弹幕内容'" />
      </span>
      <span>{{item ? item.generateTime : '弹幕生成时间'}}</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import Tooltip from '@/components/Tooltip'
export default defineComponent({
  components: { DynamicAvatar, Tooltip },
  props: ['item'],
  setup (props) {
    function transform (origin, f = 3) {
      if (!f) {
        return ''
      }
      const x = parseInt(origin % 60)
      const str = '' + x
      return transform(Math.floor(origin / 60), f - 1) + ':' + (str.length === 2 ? str : '0' + str)
    }
    const getSendTime = computed(() => transform(props.item.sendTime).slice(1))

    return {
      getSendTime
    }
  }
})
</script>

<style lang="less" scoped>
.barrage-list-item {
  > div {
    display: flex;
    padding: 5px 20px;
    > span {
      flex: 1;
      &:nth-child(3) {
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
