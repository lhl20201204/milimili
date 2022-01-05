<template>
  <div>我是登录</div>
</template>

<script>
export default {
  created () {
    console.log(this.$addHover)
    if (sessionStorage.getItem('login')) {
      this.$store.commit('changeLoginStatus', true)
      this.$router.push('/home')
    }
    setTimeout(() => {
      this.$store.commit('changeLoginStatus', true)
      this.$router.push('/home')
    }, 0)
  }
}
</script>

<style lang="less" scoped>
</style>
