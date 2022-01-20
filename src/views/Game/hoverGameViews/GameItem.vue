<template>
  <div class="game_icon_parent"
       @click="goGame">
   <Loading :promise="promise" :successComp="successComp" :failComp="failComp" />
  <span>&nbsp;&nbsp;{{item.name}}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Loading from '@/components/Loading'
import { getImg } from '@/service'
export default defineComponent({
  components: {
    Loading
  },
  props: ['item'],
  setup (props) {
    function goGame () {
      if (this.$route.path !== '/game/' + props.item.path) {
        this.$router.push('/game/' + props.item.path)
      }
    }
    return {
      promise: getImg({ path: props.item.path }),
      successComp: ({
        props: ['res'],
        render (vue) {
          return <img v-src={vue.$props.res.data} class="game_icon" />
        }
      }),
      failComp: ({
        render () {
          return <img src={require('@/assets/error/error.default.jpeg')} class="game_icon"/>
        }
      }),
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
