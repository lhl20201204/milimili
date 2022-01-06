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
import GameItem from './game/GameItem.vue'
export default {
  components: { Triangle, GameItem },
  watch: {
    show (a, b) {
      console.log(a, b)
    }
  },
  data () {
    return {
      show: false,
      list: [
        { name: '魂斗罗', path: 'hun_dou_luo' },
        { name: '弹一弹', path: 'tan_yi_tan' },
        { name: '俄罗斯方块', path: 'e_luo_s_fang_kuai' }
      ]
    }
  },
  created () {
    console.log(this)
  }

}
</script>

<style>
.game_center_tip {
  z-index: 200;
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
