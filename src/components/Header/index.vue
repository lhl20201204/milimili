<template>
  <div class="header"
       :style="{
    'height':navHeaderHeight,
    'line-height': navHeaderHeight,
    'font-size': navHeaderFontSize
     }">
    {{title}}
  </div>
</template>

<script>
import config from '@/config'
export default {
  data () {
    return {
      title: config.title,
      navHeaderHeight: config.navHeaderHeight,
      navHeaderFontSize: config.navHeaderFontSize
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background: black;
  color: white;
  padding-left: 50px;
}
</style>
