<template>
   <a-carousel arrows :autoplay="true">
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <Image v-for="item in carouselSubRoute" :src="item.path" :directive="{
      'v-prefix':''
    }" :key="item.path"/>
  </a-carousel>
</template>

<script>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import Image from '@/components/Image'
import { defineComponent } from 'vue'
import config from '@/config'
export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
    Image
  },
  setup () {
    return {
      successComp: ({
        render (vue) {
          return <img v-src={vue.$attrs.res.data} v-prefix/>
        }
      }),
      failComp: config.NotFound(),
      carouselSubRoute: config.carouselSubRoute
    }
  }
})
</script>

<style lang="less" scoped>
.ant-carousel {
  width: 460px;
  height: 231px;
}
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 231px;
  line-height: 231px;
  background: #1A1A1A;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide > div) {
height: 100%;
width: 100%;
}
</style>
