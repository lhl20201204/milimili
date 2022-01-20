<template>
<div>
  <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
</div>
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import config from '@/config'
import { getImg } from '@/service'
export default defineComponent({
  props: ['item'],
  components: {
    Loading
  },
  setup (props) {
    return {
      promise: getImg({ path: props.item.coverSrc }),
      successComp: ({
        props: ['res'],
        render (vue) {
          return <img v-src={vue.$props.res.data} class="video-list-item" />
        }
      }),
      failComp: config.NotFound
    }
  }
})
</script>

<style lang="less" scoped>
.video-list-item {
  width: 170px;
  height: 100px;
  padding: 5px;
}

</style>
