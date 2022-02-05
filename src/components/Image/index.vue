<template>
  <Loading :promise="promise"
           :successComp="successComp"
           :failComp="failComp" />
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import { getImg } from '@/service'
import config from '@/config'
export default defineComponent({
  components: {
    Loading
  },
  props: ['src', 'classes', 'p', 'success', 'fail', 'directive', 'staticPath', 'style', 'click'],
  setup (props) {
    return {
      promise: props.staticPath ? Promise.resolve({ data: require('@/assets' + props.staticPath) }) : (props.p || (!config.avatarUseCache || !config.avatarHadCache(config.avatarCacheMap, props.src) ? getImg({ path: props.src }) : config.avatarCacheMap[props.src])),
      successComp: props.success || ({
        props: ['res'],
        render (vue) {
          if (props.src && config.avatarUseCache && !config.avatarHadCache(config.avatarCacheMap, props.src)) {
            config.avatarCacheMap[props.src] = Promise.resolve({ data: vue.$props.res.data })
          }
          return <img v-src={vue.$props.res.data} onClick={props.click} class={props.classes || ''} style={(props.style || {})} v-object={(props.directive || {})} />
        }
      }),
      failComp: props.fail || config.NotFound(null, null, props.style)
    }
  }
})
</script>

<style lang="less" scoped>
</style>
