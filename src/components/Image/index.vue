<template>
  <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
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
  props: ['src', 'classes', 'p', 'success', 'fail', 'directive', 'staticPath'],
  setup (props) {
    return {
      promise: props.staticPath ? Promise.resolve({ data: require('@/assets' + props.staticPath) }) : (props.p || getImg({ path: props.src })),
      successComp: props.success || ({
        props: ['res'],
        render (vue) {
          return <img v-src={vue.$props.res.data} class={props.classes || ''} {...(props.directive || {})}/>
        }
      }),
      failComp: props.fail || config.NotFound()
    }
  }
})
</script>

<style lang="less" scoped>

</style>
