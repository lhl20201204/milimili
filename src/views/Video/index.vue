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
import { multipleRequestMerge } from '@/service'
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

    const comment = reactive({
      v: []
    })

    const isShowBarrage = ref(true)

    const currentTime = ref(0)
    const barrageContent = ref('')
    function changeCurrentTime (x) {
      console.log(x)
      currentTime.value = x
    }

    function toggleShowBarrage (x) {
      isShowBarrage.value = x
    }

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
    provide('comment', comment)
    provide('toggleShowBarrage', toggleShowBarrage)
    provide('changeBarrageContent', changeBarrageContent)
    provide('sendBarrage', sendBarrage)
    provide('currentTime', currentTime)
    provide('changeCurrentTime', changeCurrentTime)

    async function loadById (res, method, params, arr) {
      const data = await multipleRequestMerge(method, params, arr)
      if (Array.isArray(res.v)) {
        for (const b of data) {
          res.v.push(reactive(b))
        }
      } else {
        if (!data) {
          return console.error('返回的结果为空')
        }
        res.v = reactive(data)
      }
    }

    ;(async () => {
      const params = {
        videoId: video.videoId
      }
      loadById(play, s.getPlayById, params)
      loadById(barrage, s.getBarrageById, params)
      loadById(
        comment,
        s.getCommentById,
        params,
        [
          {
            method: s.getUserById,
            attrs: ['userId']
          },
          {
            method: s.getLoveById,
            attrs: ['commentId'],
            cb: data => ({ love: data })
          }
        ]
      )
    })()
  }
})
</script>

<style lang="less" scoped>
.videoPage {
  display: flex;
}
</style>
