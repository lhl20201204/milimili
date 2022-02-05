<template>
  <a-form v-show="show"
          :model="controlBarrage"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish">
    <a-form-item label="字号"
                 name="size">
      <a-select ref="select"
                v-model:value="controlBarrage.size"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode">
        <a-select-option v-for="item in barrageControlSizeSubRoute"
                         :key="item.key"
                         :value="item.value">{{item.text}}</a-select-option>
      </a-select>

    </a-form-item>

    <a-form-item label="模式"
                 name="mode">
      <a-select ref="select"
                v-model:value="controlBarrage.type"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode">
        <a-select-option v-for="item in barrageControlModeSubRoute"
                         :key="item.key"
                         :value="item.value">{{item.text}}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="颜色"
                 name="color">
      <a-select ref="select"
                v-model:value="controlBarrage.color"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode">
        <a-select-option v-for="(item,index) in barrageControlColorSubRoute"
                         :key="index"
                         :value="item">
          <div :style="{
        background: item
      }">
            {{item}}
          </div>
        </a-select-option>
      </a-select>
    </a-form-item>

  </a-form>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import config from '@/config'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const show = ref(false)
    const store = useStore()
    const controlBarrage = reactive(store.state.controlBarrage)

    watch(show, () => {
      store.commit('controlBarrageSetting', { size: controlBarrage.size, type: controlBarrage.type, color: controlBarrage.color })
    })
    function onFinish () {

    }
    return {
      show,
      controlBarrage,
      onFinish,
      barrageControlSizeSubRoute: config.barrageControlSizeSubRoute,
      barrageControlModeSubRoute: config.barrageControlModeSubRoute,
      barrageControlColorSubRoute: config.barrageControlColorSubRoute
    }
  }
})
</script>

<style lang="less">
.ant-form {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  width: 200px;
  height: 185px;
  top: -185px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  .ant-form-item-label > label {
    color: white;
  }
}
</style>
