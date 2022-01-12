<template>
  <div id="e_luo_si_fang_kuai">
    <button id="e_luo_si_fang_kuai_button">游戏玩法</button>
    <button id="e_luo_si_fang_kuai_button2">暂停/重开</button>
    <button id="e_luo_si_fang_kuai_button3">当前得分：0</button>
    <div id="e_luo_si_fang_kuai_map"> </div>
  </div>
</template>

<script>
import { eLuoSiFangKuaiIndex } from './eLuoSiFangKuai/eLuoSiFangKuaiIndex'
import { defineComponent, onMounted, onUnmounted } from 'vue'
import bus from './eLuoSiFangKuai/bus'
export default defineComponent({
  setup () {
    onMounted(() => {
      eLuoSiFangKuaiIndex()
    })
    onUnmounted(() => {
      bus.eLuoSiFangKuaiGlbal.setGameOver(true)
      clearInterval(bus.eLuoSiFangKuaiGlbal.timer)
    })
  }
})
</script>

<style>
#e_luo_si_fang_kuai {
  position: relative;
  min-width: 800px;
}
#e_luo_si_fang_kuai_map {
  width: 290px;
  height: 510px;
  margin: 20px auto;
  border: 5px dashed #000000;
  position: relative;
}
#e_luo_si_fang_kuai_button {
  width: 100px;
  height: 20px;
  border-radius: 10px;
  background-color: darkgray;
  text-align: center;
  position: absolute;
  left: 50px;
}
#e_luo_si_fang_kuai_button2 {
  width: 100px;
  height: 20px;
  border-radius: 10px;
  background-color: darkgray;
  text-align: center;
  position: absolute;
  left: 50px;
  top: 50px;
}
#e_luo_si_fang_kuai_button3 {
  width: 150px;
  height: 20px;
  border-radius: 10px;
  background-color: darkgray;
  text-align: center;
  position: absolute;
  left: 50px;
  top: 90px;
}

.e_luo_si_fang_kuai_bound .e_luo_si_fang_kuai_model {
  z-index: 2;
}
.e_luo_si_fang_kuai_line {
  z-index: 1;
}
</style>
