<template>
  <div>
    <a-card :style="{
       height: `calc(100vh - ${formStyle.height})`
    }">
      <h1>you have no access to visit this page</h1>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import config from '@/config'
export default defineComponent({
  setup () {
    const formStyle = reactive({
      height: ((config.navHeaderHeight.slice(0, -2)) * 1 + (config.layoutContentPadding.slice(0, -2)) * 2 + (config.layoutFooterHeight.slice(0, -2)) * 1) + 'px'
    })
    return {
      formStyle
    }
  }
})
</script>

<style lang="less" scoped>
.ant-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
