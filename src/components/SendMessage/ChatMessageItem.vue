<template>
  <div class="item">
    <DynamicAvatar v-if="alignLeft"
                   :size="30"
                   :item="user" />
    <div class="contentBody"
         :class="{
          'right': !alignLeft,
          'left': alignLeft
        }">
      <div><span>{{message.time}}</span></div>
      <div><span>{{message.content}}</span></div>
    </div>
    <DynamicAvatar v-if="!alignLeft"
                   :size="30"
                   :item="user" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
export default defineComponent({
  props: ['user', 'message', 'alignLeft'],
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
      margin: 0 40px 0 10px;
      background: silver;
    }
    &.right {
      text-align: right;
      margin: 0 10px 0 40px;
      background: greenyellow;
    }
  }
}
</style>
