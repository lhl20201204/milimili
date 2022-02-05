<template>
  <div>
    <ToggleShowList :list="isWatching.v"
                    title="在线用户列表"
                    keyAttr="userId"
                    :childComp="onlineUsersListItem" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import ToggleShowList from '@/components/ToggleShowList'
import onlineUsersListItem from './onlineUsersListItem.vue'
export default defineComponent({
  components: {
    ToggleShowList
  },
  setup () {
    const isWatching = inject('isWatching')
    return {
      isWatching,
      onlineUsersListItem
    }
  }
})
</script>

<style lang="less" scoped>
</style>
