<template>
  <div class="user-detail">
    <DynamicAvatar :key="user[0].userId"
                   :item="user[0]"
                   :size="70" />
    <UserDetailRight :item="user[0]" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import DynamicAvatar from '@/components/DynamicAvatar'
import UserDetailRight from './UserDetailRight'
export default defineComponent({
  components: {
    DynamicAvatar,
    UserDetailRight
  },
  setup () {
    const { v: user } = inject('user')
    return {
      user
    }
  }

})
</script>
<style lang="less" scoped>
.user-detail {
  display: flex;
  > div {
    flex: 1;
    margin-left: 10px;
  }
}
</style>
