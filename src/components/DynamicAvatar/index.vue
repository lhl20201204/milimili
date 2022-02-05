<template>
  <Avatar v-if="item.avatar!== avatarLoading"
          :size="size"
          :src="item.avatar" />
  <a-spin v-if="item.avatar===avatarLoading"
          tip="Loading..." />
</template>

<script>
import { defineComponent } from 'vue'
import Avatar from '@/components/Avatar'
import config from '@/config'
export default defineComponent({
  props: ['item', 'size'],
  components: {
    Avatar
  },
  setup () {
    return {
      avatarLoading: config.avatarLoading
    }
  }
})
</script>

<style lang="less" scoped>
</style>
