<template>
<div class="video-list-item" @click="goVideoDetail">
  <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
</div>
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import config from '@/config'
import { getImg } from '@/service'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: ['item'],
  components: {
    Loading
  },
  setup (props) {
    const router = useRouter()
    function goVideoDetail () {
      router.push({
        path: '/video',
        query: props.item
      })
    }
    return {
      goVideoDetail,
      promise: getImg({ path: props.item.coverSrc }),
      successComp: ({
        props: ['res'],
        render (vue) {
          return <img v-src={vue.$props.res.data} class="video-list-item-src"/>
        }
      }),
      failComp: config.NotFound('div', 'defaultImgParent')
    }
  }
})
</script>

<style lang="less" scoped>
.video-list-item {
  width: 170px;
  height: 100px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-list-item-src {
  width: 100%;
  height: 100%;
}

.defaultImgParent {
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
