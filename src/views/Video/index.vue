<template>
  <div class="videoPage">
    <Left/>
    <Right/>
  </div>
</template>

<script>
import { defineComponent, provide, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Right from './Right'
import Left from './Left'
import s from '@/service/Video'
export default defineComponent({
  components: {
    Right,
    Left
  },
  setup () {
    const router = useRouter()

    const video = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    provide('video', reactive(video))

    const play = reactive({
      v: null
    })
    const barrage = reactive({
      v: null
    })
    provide('play', play)
    provide('barrage', barrage)

    const isShowBarrage = ref(true)
    function toggleShowBarrage (x) {
      isShowBarrage.value = x
    }
    provide('toggleShowBarrage', toggleShowBarrage)

    const barrageContent = ref('')
    function changeBarrageContent (x) {
      barrageContent.value = x.target.value
    }
    provide('changeBarrageContent', changeBarrageContent)

    function sendBarrage () {
      console.log(isShowBarrage.value, barrageContent.value)
    }
    provide('sendBarrage', sendBarrage)

    ;(async () => {
      const { data } = await s.getVideoDetailById({
        videoId: video.videoId
      })
      play.v = reactive(data)

      const { data: data2 } = await s.getBarrageById({
        videoId: video.videoId
      })
      barrage.v = reactive(data2)
    })()
  }
})
</script>

<style lang="less" scoped>
.videoPage {
  display: flex;
}
</style>
