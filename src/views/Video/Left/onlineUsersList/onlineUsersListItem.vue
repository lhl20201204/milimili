<template>
  <div class="onlineUser-list-item">
    <div>
      <span>
        <Avatar v-if="item"
                :src="item ? item.avatar: ''"
                :size="30" />
        <span v-show="!item">用户头像</span>
      </span>
      <span>{{item ? item.userId: '用户Id'}}</span>
      <span>{{item ? item.account : '用户名称'}} </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Avatar from '@/components/Avatar'
export default defineComponent({
  components: { Avatar },
  props: ['item']

})
</script>

<style lang="less" scoped>
.onlineUser-list-item {
  > div {
    display: flex;
    padding: 5px 20px;
    > span {
      flex: 1;
    }
  }
}
</style>
