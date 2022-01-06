<template>
  <div>
    <div v-if="!$store.state.login&&['/','/login'].includes($route.path)">
      <Header></Header>
      <router-view />
    </div>
    <div v-else>
     <Layout />
    </div>
  </div>
</template>

<script>
import Layout from '@/layout'
import Header from '@/components/Header'
export default {
  components: {
    Header,
    Layout
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
}

</style>
