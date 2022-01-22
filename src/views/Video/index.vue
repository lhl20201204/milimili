<template>
  <div class="videoPage">
    <Left/>
    <Right/>
  </div>
</template>

<script>
import { defineComponent, provide, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Right from './Right'
import Left from './Left'
export default defineComponent({
  components: {
    Right,
    Left
  },
  setup () {
    const router = useRouter()
    provide('video', reactive(JSON.parse(JSON.stringify(router.currentRoute.value.query))))
  }
})
</script>

<style lang="less" scoped>
.videoPage {
  display: flex;
}
</style>
