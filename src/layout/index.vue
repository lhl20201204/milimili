<template >
  <a-layout class="layout">
    <a-layout-header>
      <span class="logo">{{title}}&nbsp;&nbsp;&nbsp;
        <Avatar v-if="$store.state.userAvatarSrc"
                :src="$store.state.userAvatarSrc" />&nbsp;&nbsp;&nbsp;{{$store.state.userName}}
      </span>
      <a-menu theme="dark"
              mode="horizontal"
              disabled>
        <a-menu-item class="other-menu-item"
                     :class="{
          'other-menu-item-selected': state.activateIndex === -1,
          'unique-menu-item-selected':  state.activateIndex === -1
        }">其他页面</a-menu-item>
      </a-menu>
      <!-- 处理导航栏折叠问题 -->
      <a-menu :key="menu"
              v-show="time >= 1 || (time === 0 && $route.path !== '/login')"
              :inlineCollapsed="false"
              v-model:selectedKeys="selectedKeys"
              theme="dark"
              mode="horizontal"
              :style="{ lineHeight:navHeaderHeight}">
        <a-menu-item class="my-a-menu-item"
                     v-for="(item,index) in navRouter"
                     :key="item.path"
                     :class="{
           'white-font': item.unSelectable,
           'other-menu-item': item.unSelectable,
          'ant-menu-item-selected': index === state.activateIndex && !item.unSelectable,
          'other-menu-item-selected': index === state.activateIndex && item.unSelectable,
          'unique-menu-item-selected': index === state.activateIndex
          }"
                     @click="goRoute(item)"
                     :disabled="item.unSelectable"
                     :ref="item.path">
          <component :is="item.icon"></component>&nbsp;&nbsp;{{item.title}}
        </a-menu-item>

      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: layoutContentPadding, minHeight: `calc(100vh - ${(navHeaderHeight.slice(0,-2))*1+(layoutFooterHeight.slice(0,-2))*1}px)` }">
        <a-spin v-if="!$store.state.hadRenderRoute"
                tip="loading access ..."></a-spin>
        <NotAccess v-else-if="$store.state.cannotVisitPage.some(v=>$route.path.startsWith('/' + v))" />
        <router-view v-else />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{'text-align': 'center',
                                'height': layoutFooterHeight }">
      MILIMILI ©{{year}} Created by Linhl
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { defineComponent, reactive, ref, watch, getCurrentInstance, nextTick, provide } from 'vue'

import moment from 'moment'
import config from '@/config'
import { getAuthority } from '@/utils'
import { useRoute } from 'vue-router'
import Avatar from '@/components/Avatar'
import { useStore } from 'vuex'
import NotAccess from '@/components/NotAccess'
export default defineComponent({
  components: {
    Avatar,
    NotAccess
  },
  setup () {
    const instance = getCurrentInstance()
    const { routes } = config
    const navRouter = reactive([])
    const time = ref(0)
    const menu = ref(1)
    let firstRender = false
    const clearNavRouter = () => {
      navRouter.splice(0, navRouter.length)
      time.value = -1
      firstRender = false
      menu.value = menu.value + 1
    }
    provide('clearNavRouter', clearNavRouter)
    const route = useRoute()
    const store = useStore()
    const pathRouter = navRouter.map(({ path }) => path)
    const state = reactive({
      activateIndex: pathRouter.findIndex(v => route.path.slice(1).startsWith(v))
    })
    store.commit('setCannotVisitPage', [])
    const hoverComp = (instance) => {
      navRouter.filter(v => v.type === 'hover').forEach(element => {
        const node = instance.refs[element.path][0].$el.nextElementSibling
        instance.appContext.config.globalProperties.$addHover(node, element.hoverComp)
      })
    }

    const setUnVisitPage = () => {
      const userAccess = sessionStorage.getItem('authority') || 'visitor'
      const cannotVisitor = []
      for (const r of routes) {
        if (!(getAuthority(r.access || 'visitor', userAccess))) {
          cannotVisitor.push(r)
        }
      }
      store.commit('setCannotVisitPage', cannotVisitor.map(({ path }) => path))
    }
    setUnVisitPage()

    watch(
      () => route.path,
      (path) => { // 初始化路由索引
        if (!firstRender && (time.value === 1 || (time.value === 0 && path !== '/login'))) {
          const userAccess = sessionStorage.getItem('authority') || 'visitor'
          for (const r of routes.filter(v => v.isNav)) {
            if (getAuthority(r.access || 'visitor', userAccess) && !navRouter.includes(r)) {
              navRouter.push(r)
            }
          }
          nextTick(() => {
            setUnVisitPage() // 共调用俩次，保证任何时候刷新进入都不会出问题
            const pathRouter = navRouter.map(({ path }) => path)
            state.activateIndex = pathRouter.findIndex(v => path.slice(1).startsWith(v))
            hoverComp(instance)
          })
          firstRender = true
        }

        time.value++
        const pathRouter = navRouter.map(({ path }) => path)
        state.activateIndex = pathRouter.findIndex(v => path.slice(1).startsWith(v))
      }
    )

    function goRoute (item) {
      const targetPath = '/' + item.path
      if (item.type !== 'hover') {
        if (this.$route.path !== targetPath) {
          if (item.path === 'user') {
            return this.$router.push({
              path: config.defaultUserRoutePath,
              query: { userId: store.state.userId }
            })
          }
          this.$router.push(targetPath)
        }
      }
    }

    return {
      menu,
      time,
      state,
      goRoute,
      navRouter,
      selectedKeys: ref(['2']),
      year: moment().format('YYYY'),
      title: config.title,
      navHeaderHeight: config.navHeaderHeight,
      layoutFooterHeight: config.layoutFooterHeight,
      layoutContentPadding: config.layoutContentPadding
    }
  }
})
</script>
<style lang="less" scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.ant-layout .ant-layout-header {
  .logo {
    font-size: 24px;
    color: white;
  }
  .ant-menu {
    float: right;
  }
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  display: inline-block;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}

element.style {
  opacity: 1;
  order: 1;
}
.ant-menu.ant-menu-dark :deep(.white-font) {
  color: rgba(255, 255, 255, 0.65) !important;
}
.ant-menu.ant-menu-dark :deep(.ant-menu-item) {
  background-color: #001529;
}
.ant-menu.ant-menu-dark
  :deep(.ant-menu-item-selected:not(.unique-menu-item-selected)) {
  color: rgba(255, 255, 255, 0.65);
  > .ant-menu-title-content > span {
    color: rgba(255, 255, 255, 0.65);
  }
}
.ant-menu.ant-menu-dark
  :deep(.ant-menu-item-selected.unique-menu-item-selected),
.ant-menu.ant-menu-dark
  :deep(.ant-menu-item-selected.unique-menu-item-selected) {
  .anticon {
    color: black;
  }
  background-color: white;
  color: black !important;
  // border-top-left-radius: 30px;
  // border-top-right-radius: 30px;
}

.ant-menu-dark.ant-menu-horizontal
  :deep(.ant-menu-item):not(.ant-menu-item-selected):not(.ant-menu-item-disabled):hover {
  .anticon {
    color: rgb(0, 21, 41);
  }
  background-color: whitesmoke;
  color: rgb(0, 21, 41);
  // border-top-left-radius: 30px;
  // border-top-right-radius: 30px;
}

.ant-menu-dark.ant-menu-horizontal
  :deep(.ant-menu-item.other-menu-item.ant-menu-item-disabled):not(.other-menu-item-selected):hover {
  background-color: rgb(0, 21, 41);
}
.ant-menu-dark.ant-menu-horizontal :deep(.other-menu-item-selected):hover,
.ant-menu-dark.ant-menu-horizontal :deep(.other-menu-item-selected) {
  .anticon {
    color: rgb(0, 21, 41);
  }
  background-color: white;
  color: rgb(0, 21, 41) !important;
}

.ant-menu-dark.ant-menu-horizontal
  :deep(.ant-menu-item.ant-menu-item-selected):not(.ant-menu-item-disabled):hover {
  .anticon {
    color: rgb(0, 21, 41);
  }
  background-color: white;
  color: rgb(0, 21, 41);
  // border-top-left-radius: 30px;
  // border-top-right-radius: 30px;
}
</style>
