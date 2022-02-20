<template>
  <EditWrapper :list="editVideo"
               :comp="VideoHandle" />
</template>

<script>
import { defineComponent, inject } from 'vue'
import VideoHandle from './VideoHandle'
import EditWrapper from '@/components/EditWrapper'
export default defineComponent({
  components: {
    EditWrapper
  },
  setup () {
    const { v: editVideo } = inject('editVideo')
    return {
      editVideo,
      VideoHandle
    }
  }

})
</script>
<style lang="less" scoped>
</style>
