<template>
  <div class="route-nav"
       v-if="size==='small'">
    <h4 v-for="item in subRoute"
        :class="{
          'selected': $route.path.indexOf(prefixPath + item.path) === 0
        }"
        @click="goTo(item)"
        :key="item.path">{{item.title}}</h4>
  </div>
  <div class="route-nav"
       v-else>
    <h1 v-for="item in subRoute"
        :class="{
          'selected': $route.path.indexOf(prefixPath + item.path) === 0
        }"
        @click="goTo(item)"
        :key="item.path">{{item.title}}</h1>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  props: ['subRoute', 'prefixPath', 'size'],
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const getQuery = inject('getQuery')
    const goTo = (item) => {
      if (route.path.indexOf(props.prefixPath + item.path) !== 0) {
        router.push({
          path: props.prefixPath + (item.redirectPath || item.path),
          query: getQuery()
        })
      }
    }

    return {
      goTo
    }
  }
})
</script>

<style lang="less" scoped>
.route-nav {
  display: flex;
  > h1,
  > h4 {
    cursor: pointer;
    padding: 5px 20px;
    &.selected {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 3px;
        transform-origin: 50% 100%;
        transform: scaleX(0.3);
        background: black;
      }
    }
  }
}
</style>
