<template>
  <Upload :item="item" />
</template>

<script>
import { defineComponent } from 'vue'
import Upload from '@/views/Upload'
export default defineComponent({
  components: {
    Upload
  },
  props: ['item'],
  setup () {
  }
})
</script>
<style lang="less" scoped>
</style>
