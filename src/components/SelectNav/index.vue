<template>
  <ul class="nav-warap">
    <li v-for="(item,index) in  route" :key="index"
    @click="clickRoute(index)"
    :class="{
      'selected': index === activateIndex
    }">{{item}}</li>
  </ul>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: ['route'],
  setup () {
    const activateIndex = ref(0)
    function clickRoute (index) {
      activateIndex.value = index
    }
    return {
      activateIndex,
      clickRoute
    }
  }
})
</script>

<style lang="less" scoped>
.nav-warap{
  display: flex;
  > li {
    list-style: none;
    padding: 10px;
  }
  .selected {
     border-bottom: 1px solid blue;
  }
}
</style>
