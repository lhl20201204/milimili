<template >
  <a-layout class="layout">
    <a-layout-header >
      <span class="logo" >{{title}}&nbsp;&nbsp;{{$store.state.userName}}</span>
      <a-menu
        v-show="time >= 1 || (time === 0 && $route.path !== '/login')"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight:navHeaderHeight}"
      >
        <a-menu-item class="my-a-menu-item"  v-for="(item,index) in navRouter" :key="item.path" :class="{
          'ant-menu-item-selected': index === state.activateIndex
        }" @click="goRoute(item)"
         :ref="item.path"><component :is="item.icon"></component>&nbsp;&nbsp;{{item.title}}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: layoutContentPadding, minHeight: `calc(100vh - ${(navHeaderHeight.slice(0,-2))*1+(layoutFooterHeight.slice(0,-2))*1}px)` }" ><router-view/></div>
    </a-layout-content>
    <a-layout-footer :style="{'text-align': 'center',
                                'height': layoutFooterHeight }">
     MILIMILI ©{{year}} Created by Linhl
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { defineComponent, reactive, ref, watch, getCurrentInstance, nextTick } from 'vue'

import moment from 'moment'
import config from '@/config'
import { getAuthority } from '@/utils'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const instance = getCurrentInstance()
    const { routes } = config
    const navRouter = reactive([])
    const route = useRoute()
    const pathRouter = navRouter.map(({ path }) => path)
    const state = reactive({
      activateIndex: pathRouter.findIndex(v => route.path.slice(1).startsWith(v))
    })

    const hoverComp = (instance) => {
      navRouter.filter(v => v.type === 'hover').forEach(element => {
        const node = instance.refs[element.path][0].$el.nextElementSibling
        instance.appContext.config.globalProperties.$addHover(node, element.hoverComp)
      })
    }

    const time = ref(0)
    let firstRender = false
    const unWatch = watch(
      () => route.path,
      (path) => { // 初始化路由索引
        if (!firstRender && (time.value === 1 || (time.value === 0 && path !== '/login'))) {
          const userAccess = sessionStorage.getItem('authority') || 'visitor' // 获取渲染权限
          for (const r of routes.filter(v => v.isNav)) {
            if (getAuthority(r.access || 'visitor', userAccess) && !navRouter.includes(r)) {
              navRouter.push(r)
            }
          }
          nextTick(() => {
            const pathRouter = navRouter.map(({ path }) => path)
            state.activateIndex = pathRouter.findIndex(v => path.slice(1).startsWith(v))
            hoverComp(instance)
          })
          firstRender = true
        }
        time.value++
        if (time.value === 2) {
          unWatch()
        }
      }
    )

    function goRoute (item) {
      const targetPath = '/' + item.path
      if (item.type !== 'hover') {
        if (this.$route.path !== targetPath) {
          this.$router.push(targetPath)
        }
      }
      const pathRouter = navRouter.map(({ path }) => path)
      state.activateIndex = pathRouter.findIndex(v => targetPath.slice(1).startsWith(v))
    }

    return {
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
  .logo{
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

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

element.style {
    opacity: 1;
    order: 1;
}
 .ant-menu.ant-menu-dark :deep(.ant-menu-item-selected),
 .ant-menu.ant-menu-dark :deep(.ant-menu-item-selected){
   .anticon{
      color: black;
    }
    background-color: white;
    color: black;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .ant-menu-dark.ant-menu-horizontal :deep(.ant-menu-item):not(.ant-menu-item-selected):hover {
    .anticon{
      color: black;
    }
    background-color:whitesmoke;
    color: black;
    // border-top-left-radius: 30px;
    // border-top-right-radius: 30px;
  }

  .ant-menu-dark.ant-menu-horizontal :deep(.ant-menu-item.ant-menu-item-selected):hover {
    .anticon{
      color: black;
    }
    background-color: white;
    color: black;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

</style>
