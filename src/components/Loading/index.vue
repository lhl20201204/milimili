<template>
   <keep-alive><component :is="loading===0?loadingComp:loading===1?successComp:failComp" :res="res"/></keep-alive>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  props: {
    promise: {
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
        return LoadingOutlined
      }
    },
    failComp: {
      type: [Object, Function],
      default () {
        return WarningOutlined
      }
    }
  },
  setup (props) {
    const loading = ref(0)
    const res = ref(null)
    if (props.promise instanceof Promise) {
      props.promise.then((res1) => {
        res.value = res1
        loading.value = 1
      }).catch((rej1) => {
        res.value = rej1
        loading.value = 2
      })
    } else if (props.promise instanceof Function) {
      const instance = props.promise()
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
