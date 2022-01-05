<template>
  <div>
    <Header></Header>
    <div v-if="$store.state.login">
      <NavRouter />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavRouter from '@/components/NavRouter'
import Header from '@/components/Header'
export default {
  components: {
    NavRouter,
    Header
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
