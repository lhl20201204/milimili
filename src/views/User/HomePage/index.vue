<template>
  <div>
    <a-space>
      <a-tag v-for="item in totalAttr"
             :key="item.attr">{{item.means + getTotal(video,item.attr)}} </a-tag>
    </a-space>
    <RouteTabs :subRoute="subRoute"
               size="small"
               prefixPath="/user/homePage/" />
    <router-view> </router-view>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import RouteTabs from '@/components/RouteTabs'
import config from '@/config'
export default defineComponent({
  components: {
    RouteTabs
  },
  setup () {
    const { v: video } = inject('video')
    const getTotal = (arr, attr) => {
      return arr.reduce((p, v) => p + v[attr].length, 0)
    }
    return {
      subRoute: config.userNavSubRoute[0].children,
      video,
      getTotal,
      totalAttr: config.userHomeControlAttr
    }
  }

})
</script>
<style lang="less" scoped>
.ant-space :deep(.ant-tag) {
  cursor: not-allowed;
}
</style>
