<template>

  <ul class="nav_route">
    <li v-for="item in navRouter"
        :key="item.path"
        @click="goRoute(item)">
      <NavRouterItem :navRouterItem="item" />
    </li>
  </ul>

</template>

<script>
import config from '@/config'
import { getAuthority } from '@/utils'
import NavRouterItem from './NavRouterItem'
export default {
  data () {
    return {
      navRouter: [],
      ishovering: false
    }
  },
  components: {
    NavRouterItem
  },
  created () {
    const userAccess = localStorage.getItem('authority') || 'user'
    const { routes } = config
    for (const r of routes.filter(v => !v.noNav)) {
      if (getAuthority(r.access || 'user', userAccess)) {
        this.navRouter.push(r)
      }
    }
  },
  methods: {
    goRoute (item) {
      if (item.type !== 'hover') {
        const targetPath = '/' + item.path
        if (this.$route.path !== targetPath) {
          this.$router.push(targetPath)
        }
      } else {
        alert()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nav_route {
  display: flex;
  justify-content: space-between;
  li {
    list-style: none;
    flex: 1;
    height: 50px;
    border: 1px solid blue;
    text-align: center;
  }
}
</style>
