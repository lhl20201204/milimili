<template>
  <div class="hello" v-show="show" >
    我是组件
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const show = ref(false)
    return {
      show
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  width: 200px;
  position: absolute;
  color: red;
  background: yellow;
  z-index: 1;
}
</style>
