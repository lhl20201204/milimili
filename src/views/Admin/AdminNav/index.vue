<template>
  <div class="admin-nav">
    <h1 v-for="item in adminNavSubRoute"
        :class="{
          'selected': $route.path==='/admin/'+item.path
        }"
        @click="goTo(item.path)"
        :key="item.path">{{item.title}}</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import config from '@/config'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const route = useRoute()
    const router = useRouter()
    const goTo = (path) => {
      if (route.path !== '/admin/' + path) {
        router.push('/admin/' + path)
      }
    }
    return {
      goTo,
      adminNavSubRoute: config.adminNavSubRoute
    }
  }
})
</script>

<style lang="less" scoped>
.admin-nav {
  display: flex;
  > h1 {
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
