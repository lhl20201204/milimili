<template>

  <Image v-show="showFirst"
         :click="toggle"
         :staticPath="initStatic || ''"
         :src="init"
         :style="style"
         :classes="classes"
         :directive="{
    'v-hover': change
  }" />
  <Image v-show="!showFirst"
         :click="toggle"
         :staticPath="hoverStatic || ''"
         :src="hover"
         :style="style"
         :classes="classes"
         :directive="{
    'v-hover': change
  }" />
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Image from '@/components/Image'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
export default defineComponent({
  props: ['initStatic', 'hoverStatic', 'hover', 'init', 'fn', 'item', 'style', 'classes', 'click'],
  components: {
    Image
  },
  setup (props) {
    const store = useStore()
    const hovering = ref(false)
    const showFirst = computed(() => props.item && !hovering.value && props.fn(props.item, store.state.userId) === -1)
    const loading = ref(false)

    function change () {
      hovering.value = !hovering.value
    }

    async function toggle () {
      if (loading.value) {
        return message.error('操作中请稍后再试')
      }

      if (typeof props.click === 'function') {
        loading.value = true
        await props.click()
        loading.value = false
      }
    }
    return {
      change,
      toggle,
      showFirst,
      hovering
    }
  }
})
</script>

<style lang="less" scoped>
</style>
