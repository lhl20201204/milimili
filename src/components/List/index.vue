<template>
  <a-empty v-if="!list.length&&list.datahadLoadedButResultNull">
    <template #description>
      <span>
        {{nullDescription||'no data'}}
      </span>
    </template>
  </a-empty>
  <div v-else-if="!list.length&&!list.datahadLoadedButResultNull"
       class="a-spin-wrapper">
    <a-spin :tip="loadingTip || 'loading...'" />
  </div>
  <slot v-else
        name="content"></slot>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['list', 'nullDescription', 'loadingTip']

})
</script>

<style lang="less" scoped>
.a-spin-wrapper {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}
</style>
