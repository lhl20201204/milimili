<template >
  <div v-show="show"
       class="game_center_tip">
    <Triangle class="tri"> </Triangle>
    <ul class="list_parent">
      <li v-for="(item,index) of list"
          :key="index"
          class="list_li">
        <game-item :item="item"> </game-item>
      </li>
    </ul>
  </div>
</template>

<script>
import Triangle from '@/components/shape/Triangle'
import GameItem from './GameItem'
import { ref } from 'vue'
import config from '@/config'
export default {
  components: { Triangle, GameItem },
  setup () {
    const show = ref(false)
    return {
      show,
      list: config.hoverGameSubRoute
    }
  }

}
</script>

<style>
.game_center_tip {
  z-index: 1000;
  position: absolute;
  line-height: 14px;
  color: black;
  padding: 0px;
  width: 416px;
  height: 239px;
  background: yellow;
  top: 50px;
  left: -60px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer !important;
}
.tri {
  position: absolute;
  top: -13px;
  left: 80px;
}
.list_parent {
  height: 100%;
  list-style: none;
}
.list_li {
  padding: 10px;
}
</style>
