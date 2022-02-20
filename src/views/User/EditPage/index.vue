<template>
  <div>
    <RouteTabs :subRoute="subRoute"
               size="small"
               prefixPath="/user/editPage/" />
    <router-view> </router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RouteTabs from '@/components/RouteTabs'
import config from '@/config'
export default defineComponent({
  components: {
    RouteTabs
  },
  setup () {
    return {
      subRoute: config.userNavSubRoute[3].children
    }
  }

})
</script>
<style lang="less" scoped>
.ant-space :deep(.ant-tag) {
  cursor: not-allowed;
}
</style>
