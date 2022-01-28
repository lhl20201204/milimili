<template>
  <Image v-show="getShowInit"
  :click="toggle"
  :staticPath="initStatic || ''"
   :src="init"
    :style="style"
     :classes="classes"
      :directive="{
    'v-hover': change
  }"/>
  <Image v-show="!getShowInit"
  :click="toggle"
  :staticPath="hoverStatic || ''"
   :src="hover"
    :style="style"
     :classes="classes"
      :directive="{
    'v-hover': change
  }"/>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import Image from '@/components/Image'
export default defineComponent({
  props: ['initStatic', 'hoverStatic', 'hover', 'init', 'initHasClick', 'style', 'classes', 'click'],
  components: {
    Image
  },
  setup (props) {
    const switchShow = ref(!props.initHasClick || false)
    const hasClick = reactive({
      value: props.initHasClick
    })
    const getShowInit = computed(() => switchShow.value && !hasClick.value)
    function change () {
      if (!hasClick.value) {
        switchShow.value = !switchShow.value
      }
    }

    function toggle () {
      hasClick.value = !hasClick.value
      props.click && props.click()
    }
    return {
      change,
      toggle,
      getShowInit
    }
  }
})
</script>

<style lang="less" scoped>

</style>
