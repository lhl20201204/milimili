<template>
  <EditWrapper :list="comment"
               :comp="AuditCommentItem" />
</template>

<script>
import { defineComponent, inject } from 'vue'
import EditWrapper from '@/components/EditWrapper'
import AuditCommentItem from './AuditCommentItem'
export default defineComponent({
  components: {
    EditWrapper
  },
  setup () {
    const { v: comment } = inject('comment')

    return {
      comment,
      AuditCommentItem
    }
  }

})
</script>

<style lang="less" scoped>
</style>
