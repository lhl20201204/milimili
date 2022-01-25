<template>
  <div class="game_icon_parent"
       @click="goGame">
   <Image :src="item.path" classes="game_icon"/>
  <span>&nbsp;&nbsp;{{item.name}}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Image from '@/components/Image'
export default defineComponent({
  components: {
    Image
  },
  props: ['item'],
  setup (props) {
    function goGame () {
      if (this.$route.path !== '/game/' + props.item.path) {
        this.$router.push('/game/' + props.item.path)
      }
    }
    return {
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
