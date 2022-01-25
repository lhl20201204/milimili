<template>
<span class="checkbox-wrapper"
      :style="{
        width:w,
        height:h,
        lineHeight:lh
      }">
  <input type="checkbox" id="checkbox-input" v-model="check"/>
  <label for="checkbox-input" class="checkbox-inner" >
   </label>
</span>
</template>
<script>
import { defineComponent, inject, ref, watch } from 'vue'
export default defineComponent({
  props: ['width', 'height', 'lineHeight'],
  setup (props) {
    const toggleShowBarrage = inject('toggleShowBarrage')
    const check = ref(true)
    watch(check, v => {
      toggleShowBarrage(v)
    })
    return {
      check,
      w: props.width || '30px',
      h: props.height || '18px',
      lh: props.lineHeight || '14px'
    }
  }
})
</script>
<style lang="less" scoped>
@BorderRadius: 8px;
div > span.checkbox-wrapper {
  display: inline-block;
  padding: 0;
  display: flex;
  align-items: center;
}
#checkbox-input {
  display: none;
}
#checkbox-input:checked ~ .checkbox-inner{
  &::before {
   content: '弹';
   padding-left: calc(100% - 12px);
   margin-right: 0;
   background: rgb(0, 161, 214);
  }
}
.checkbox-inner{
  width: 100%;
  height: calc(100% - 2px);
  border-radius:@BorderRadius;
   background: rgb(117, 117, 117);
  border: 1px solid rgb(117, 117, 117);
  position: relative;
  &::before {
    content: '弹';
    position: absolute;
    text-align: center;
    margin-right: calc(100% - 12px);
    background: white;
    border-radius: @BorderRadius;
    transition: all 1.3s;
  }
}
</style>
