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
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    Right,
    Left
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const video = JSON.parse(JSON.stringify(router.currentRoute.value.query))

    const play = reactive({
      v: null
    })

    const barrage = reactive({
      v: []
    })

    const isShowBarrage = ref(true)

    const currentTime = ref(0)

    function changeCurrentTime (x) {
      console.log(x)
      currentTime.value = x
    }

    function toggleShowBarrage (x) {
      isShowBarrage.value = x
    }
    const barrageContent = ref('')

    function changeBarrageContent (x) {
      barrageContent.value = x.target.value
    }

    function sendBarrage () {
      console.log(isShowBarrage.value, barrageContent.value, store.state.controlBarrage, store.state.userId)
    }

    provide('isShowBarrage', isShowBarrage)
    provide('video', reactive(video))
    provide('play', play)
    provide('barrage', barrage)
    provide('toggleShowBarrage', toggleShowBarrage)
    provide('changeBarrageContent', changeBarrageContent)
    provide('sendBarrage', sendBarrage)
    provide('currentTime', currentTime)
    provide('changeCurrentTime', changeCurrentTime)

    ;(async () => {
      const { data } = await s.getVideoDetailById({
        videoId: video.videoId
      })
      play.v = reactive(data)

      const { data: data2 } = await s.getBarrageById({
        videoId: video.videoId
      })
      for (const b of data2) {
        barrage.v.push(reactive(b))
      }
    })()
  }
})
</script>

<style lang="less" scoped>
.videoPage {
  display: flex;
}
</style>
