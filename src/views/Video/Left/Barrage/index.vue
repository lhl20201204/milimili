<template >
  <span v-show="isShowBarrage&&isVisible"
        class="barrage-content-content"
        :class="{'barrage-content-content-1':item.type===1,'barrage-content-content-2':item.type===2||item.type===3}"
        :style="'left:'+left+'px;margin-left:'+marginLeft+'px;top:'+item.top+'px; font-size: '+item.size+'px;color:'+item.color+''">{{item.content}}</span>
</template>

<script>
import { defineComponent, inject, ref, watch } from 'vue'
export default defineComponent({
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    const left = ref(0)
    const marginLeft = ref(props.item.type === 1 ? 637 : 0)
    const isVisible = ref(false)
    const isShowBarrage = inject('isShowBarrage')
    const currentTime = inject('currentTime')
    let once = false
    function run () {
      const len = props.item.content.length * props.item.size
      if (props.item.type === 1) {
        setTimeout(() => {
          marginLeft.value = -len
        }, 20)
      }
      setTimeout(() => {
        once = false
        if (props.item.type === 1) {
          marginLeft.value = 637
        }
        isVisible.value = false
      }, 6000)
    }

    watch(() => currentTime.value, (val) => {
      if (!once && ((props.item.sendTime > 0 && val >= parseInt(props.item.sendTime)) || (props.item.sendTime === 0 && val > parseInt(props.item.sendTime))) && val < parseInt(props.item.sendTime) + 2) {
        once = true
        isVisible.value = true
        run()
      }
    })

    return {
      left,
      marginLeft,
      isVisible,
      isShowBarrage,
      currentTime
    }
  }
})
</script>

<style lang="less" scoped>
.barrage-content-content {
  position: absolute;
  display: block;
}
.barrage-content-content-1 {
  transition: margin 5s linear;
  white-space: nowrap;
}

.barrage-content-content-2 {
  width: 100%;
  white-space: nowrap;
  text-align: center;
}
</style>
