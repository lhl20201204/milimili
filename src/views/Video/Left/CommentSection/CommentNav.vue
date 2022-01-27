<template>
   <h1>{{comment.length}}&nbsp;评论</h1>
  <select-nav :route="commentSortSubRoute" ></select-nav>
</template>

<script>
import { defineComponent, inject } from 'vue'
import config from '@/config'
import SelectNav from '@/components/SelectNav'
export default defineComponent({
  components: {
    SelectNav
  },
  setup () {
    const { v: comment } = inject('comment')
    return {
      commentSortSubRoute: config.commentSortSubRoute,
      comment
    }
  }
})
</script>

<style lang="less" scoped>
</style>
