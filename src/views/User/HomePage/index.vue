<template>
  <div>
    <a-space>
      <a-tag v-for="item in totalAttr"
             :key="item.attr">{{item.means + getTotal(video,item.attr)}} </a-tag>
    </a-space>
    <RouteTabs :subRoute="subRoute"
               size="small"
               prefixPath="/user/homePage/" />
    <router-view :current="current" :changeCurrent="changeCurrent"> </router-view>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import RouteTabs from '@/components/RouteTabs'
import config from '@/config'
export default defineComponent({
  components: {
    RouteTabs
  },
  setup () {
    const { v: video } = inject('video')
    const current = ref(1)
    const changeCurrent = (x) => {
      current.value = x
    }
    const getTotal = (arr, attr) => {
      return arr.reduce((p, v) => p + v[attr].length, 0)
    }
    return {
      changeCurrent,
      current,
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
