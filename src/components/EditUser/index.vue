<template>
  <div >
    <a-button type="primary"
              @click="showModal">编辑个人信息</a-button>
    <a-modal :visible="visible"
             title="编辑个人信息"
             :footer="null"
             @cancel="handleOk"
             @ok="handleOk">
             <EditPrivate />
    </a-modal>
  </div>
</template>
<script>

import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EditPrivate from './EditPrivate'
export default defineComponent({
  components: {
    EditPrivate
  },
  props: [],
  setup (props) {
    const visible = ref(false)
    const route = useRoute()
    const showModal = () => {
      visible.value = true
    }
    let unwatchRoute = null
    unwatchRoute = watch(() => route.path, () => {
      visible.value = false
      unwatchRoute()
    })
    const visibleUnwatch = watch(() => visible.value, (x) => {
      if (!unwatchRoute) {
        visibleUnwatch()
      }
    })
    const handleOk = e => {
      visible.value = false
    }
    return {
      visible,
      showModal,
      handleOk
    }
  }
})
</script>
