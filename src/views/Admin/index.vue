<template>
  <div> admin
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'
export default defineComponent({
  setup (props) {
    onBeforeMount(() => {
      props.service.handle()
    })
  }
})
</script>

<style lang="less" scoped>
</style>
