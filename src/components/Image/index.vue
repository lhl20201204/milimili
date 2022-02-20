<template>
  <Loading :key="src"
           :promise="pWarap.promise"
           :successComp="successComp"
           :failComp="failComp" />
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import Loading from '@/components/Loading'
import { getImg } from '@/service'
import config from '@/config'
export default defineComponent({
  components: {
    Loading
  },
  props: ['src', 'classes', 'p', 'success', 'fail', 'directive', 'staticPath', 'style', 'click'],
  setup (props) {
    const getPromise = () => props.staticPath ? Promise.resolve({ data: require('@/assets' + props.staticPath) }) : (props.p || getImg({ path: props.src }))
    const pWarap = reactive({
      promise: getPromise()
    })
    watch(() => props.src, () => {
      pWarap.promise = getPromise()
    })
    return {
      pWarap,
      successComp: props.success || ({
        props: ['res'],
        render (vue) {
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
