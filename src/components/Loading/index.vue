<template>
   <keep-alive><component :is="loading===0?loadingComp:loading===1?successComp:failComp" :res="res"/></keep-alive>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'
import config from '@/config'
export default defineComponent({
  props: {
    promiseInstance: {
      required: true,
      type: [Promise, Function],
      default: Promise.resolve(new Error('没有传promise实例'))
    },
    successComp: {
      required: true,
      type: [Object, Function],
      default () {
        return {}
      }
    },
    loadingComp: {
      type: [Object, Function],
      default () {
        return config.LoadingOutlined
      }
    },
    failComp: {
      type: [Object, Function],
      default () {
        return config.WarningOutlined
      }
    }
  },
  setup (props) {
    const loading = ref(0)
    const res = ref(null)
    if (props.promiseInstance instanceof Promise) {
      props.promiseInstance.then((res1) => {
        res.value = res1
        loading.value = 1
      }).catch((rej1) => {
        res.value = rej1
        loading.value = 2
      })
    } else if (props.promiseInstance instanceof Function) {
      const instance = props.promiseInstance()
      if (!(instance instanceof Promise)) {
        message.error('Loading组件内，返回的不是promise')
      } else {
        instance.then((res1) => {
          res.value = res1
          loading.value = 1
        }).catch((rej1) => {
          res.value = rej1
          loading.value = 2
        })
      }
    }
    return {
      loading,
      res
    }
  }
})
</script>

<style lang="less" scoped>

</style>
