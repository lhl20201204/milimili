<template>
  <div class="game_icon_parent"
       @click="goGame">
   <Loading :promiseInstance="promiseInstance" :successComp="successComp" :failComp="failComp" />
  <span>{{item.name}}</span>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import Loading from '@/components/Loading'
import config from '@/config'
export default defineComponent({
  components: {
    Loading
  },
  props: ['item'],
  setup (props) {
    const instance = getCurrentInstance()
    const axios = instance.appContext.config.globalProperties.$axios
    function goGame () {
      if (this.$route.path !== '/' + props.item.path) {
        this.$router.push('/' + props.item.path)
      }
    }
    axios.get('http://localhost:80/api/getInfo').then(({ data }) => {
      console.log(data)
    }).catch(e => {
      console.log(e)
    })
    const url = config.baseUrl + props.item.path
    return {
      promiseInstance: axios.get(url),
      successComp: {
        render () {
          return <img src={url} class="game_icon" />
        }
      },
      failComp: {
        render () {
          return <span>错误</span>
        }
      },
      goGame
    }
  }
})

</script>

<style lang="less" scoped>
.game_icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
}
.game_icon_parent {
  text-align: left;
  > span {
    color: black;
  }
}
.game_icon_parent:hover > span {
  color: red;
}
</style>
