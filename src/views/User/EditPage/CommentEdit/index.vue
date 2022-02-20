<template>
  <EditWrapper :list="editComment"
               :comp="CommentHandle" />
</template>

<script>
import { defineComponent, inject } from 'vue'
import CommentHandle from './CommentHandle'
import EditWrapper from '@/components/EditWrapper'
export default defineComponent({
  components: {
    EditWrapper
  },
  setup () {
    const { v: editComment } = inject('editComment')
    return {
      editComment,
      CommentHandle
    }
  }

})
</script>
<style lang="less" scoped>
</style>
