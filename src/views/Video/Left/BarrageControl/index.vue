<template>
  <a-form
    v-show="show"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item
      label="字号"
      name="size"
    >
      <a-select
      ref="select"
      v-model:value="formState.size"
      :getPopupContainer="(triggerNode) => triggerNode.parentNode"

    >
      <a-select-option value="12">小</a-select-option>
      <a-select-option value="14">标准</a-select-option>
      <a-select-option value="16">大</a-select-option>
    </a-select>
    </a-form-item>

    <a-form-item
      label="模式"
      name="mode"
    >
     <a-input v-model:value="formState.mode" />
    </a-form-item>

    <a-form-item
      label="颜色"
      name="color"
    >
     <a-input v-model:value="formState.color" />
    </a-form-item>

  </a-form>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
export default defineComponent({
  setup () {
    const show = ref(false)
    const formState = reactive({
      size: '标准',
      mode: null,
      color: null
    })

    watch(show, () => {
      console.log(formState.size, formState.mode, formState.color)
    })

    function onFinish () {

    }
    return {
      show,
      formState,
      onFinish
    }
  }
})
</script>

<style lang="less">
.ant-form {
  position:absolute;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  width: 180px;
  height: 255px;
  top: -255px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  .ant-form-item-label > label {
    color: white;
  }
}
</style>
