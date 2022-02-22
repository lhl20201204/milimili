<template>
  <div class="item">
    <DynamicAvatar v-if="alignLeft"
                   :size="30"
                   :item="item.user" />
    <div class="contentBody"
         :class="{
          'right': !alignLeft,
          'left': alignLeft
        }">
      <div>
         <div><span>{{item.time}}</span></div>
        <div><span>{{item.content}}</span></div>
      </div>
    </div>
    <DynamicAvatar v-if="!alignLeft"
                   :size="30"
                   :item="item.user" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
export default defineComponent({
  props: ['item', 'alignLeft'],
  components: {
    DynamicAvatar
  }
})
</script>

<style lang="less" scoped>
.item {
  margin: 10px 0;
  display: flex;
  > .contentBody {
    flex: 1;
    border-radius: 10px;
    padding: 5px;
    &.left {
      text-align: left;
      margin: 0 42px 0 12px;
      background: silver;
      position: relative;
      &::before{
        content: '';
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 8px solid silver;
        border-left: 0;
        position: absolute;
        left: 0;
         top: 10px;
        transform: translate(-100%);
      }
    }
    &.right {
      text-align: right;
      margin: 0 12px 0 42px;
      background: greenyellow;
      position: relative;
      &::after{
        content: '';
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid greenyellow;
        border-right: 0;
        position: absolute;
        left: 100%;
        top: 10px;
      }
    }
  }
}
</style>
