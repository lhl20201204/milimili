<template >
  <div v-if="item.parentCommentId === parentCommentId">
  <Avatar />{{item.content}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Avatar from '@/components/Avatar'
export default defineComponent({
  props: ['item', 'parentCommentId'],
  components: {
    Avatar
  },
  setup (props) {
    console.log(props.item.parentCommentId === props.parentCommentId)
    return {
    }
  }
})
</script>

<style lang="less" scoped>
</style>
