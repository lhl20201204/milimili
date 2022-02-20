<template>
  <Avatar v-if="item.avatar!== avatarLoading"
          :click="goToSpace"
          :size="size"
          :src="item.avatar" />
  <a-spin v-if="item.avatar===avatarLoading"
          tip="Loading..." />
</template>

<script>
import { defineComponent } from 'vue'
import Avatar from '@/components/Avatar'
import config from '@/config'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
export default defineComponent({
  props: ['item', 'size'],
  components: {
    Avatar
  },
  setup (props) {
    const router = useRouter()
    function goToSpace () {
      if (props.item.userId) {
        router.push({
          path: config.defaultUserRoutePath,
          query: { userId: props.item.userId }
        })
      } else {
        message.error('跳转失败')
      }
    }
    return {
      avatarLoading: config.avatarLoading,
      goToSpace
    }
  }
})
</script>

<style lang="less" scoped>
</style>
