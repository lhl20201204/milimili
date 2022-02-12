<template>
  <a-tooltip>
    <template v-slot:title>
      {{tip||text}}
    </template>
    {{text}}
  </a-tooltip>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['text', 'tip']
})
</script>
<style lang="less" scoped>
</style>
