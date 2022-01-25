<template>
<div class="video-list-item" @click="goVideoDetail">
  <Image :src="item.coverSrc" classes="video-list-item-src" :fail="failComp"/>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import Image from '@/components/Image'
import config from '@/config'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: ['item'],
  components: {
    Image
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
