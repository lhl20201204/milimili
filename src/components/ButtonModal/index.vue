<template>
  <a-button v-if="!noprimary"
            type="primary"
            :disabled="disabled"
            @click="changeVisible(true)">{{btnText}}</a-button>
  <a-button v-else
            :disabled="disabled"
            @click="changeVisible(true)">{{btnText}}</a-button>
  <a-modal :visible="show"
           :title="title"
           :bodyStyle="bodyStyle||{}"
           :wrapClassName="wrapClassName||''"
           :okText="okText || 'ok'"
           @cancel="changeVisible(false)"
           @ok="handleOk">
    <slot name="content"> </slot>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['show', 'btnText', 'handleOk', 'disabled', 'title', 'changeVisible', 'noprimary', 'okText', 'bodyStyle', 'wrapClassName']
})
</script>
<style lang="less" scoped>
</style>
