<template>
  <div class="videoPage">
    <Left />
    <Right />
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, provide, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Right from './Right'
import Left from './Left'
import s from '@/service/Video'
import { useStore } from 'vuex'
import { loadById } from '@/service'
import config from '@/config'
import { firstToUpperCase } from '@/utils'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'Video',
  components: {
    Right,
    Left
  },
  sockets: {
    insertBarrage (data) {
      this.barrage.v.push(reactive(data))
      if (data.userId === this.$store.state.userId) {
        message.success('发送弹幕成功')
      }
    },
    insertComment (data) {
      data.setHandleItem = function (x) { // socket 没办法传方法
        this.hadHandleItem = x
      }
      this.comment.v.push(reactive(data))
      if (data.userId === this.$store.state.userId) {
        message.success('发送评论成功')
      }
    },
    videoLogin (data) {
      this.isWatching.v.splice(0, this.isWatching.v.length)
      this.isWatching.v.splice(0, 0, ...data.onlineUsers)
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    let video = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    video = {
      ...video
    }
    const instance = getCurrentInstance()
    instance.appContext.config.globalProperties.$socket.emit('videoLogin', {
      videoId: video.videoId,
      userId: store.state.userId,
      avatar: store.state.userAvatarSrc,
      account: store.state.userName
    })
    const videoWrap = reactive({
      v: [video]
    })

    const play = reactive({
      v: []
    })

    const isWatching = reactive({
      v: []
    })

    const barrage = reactive({
      v: []
    })

    const comment = reactive({
      v: []
    })

    const subscribe = reactive({
      v: [video]
    })

    const isShowBarrage = ref(true)

    const currentTime = ref(0)
    const barrageContent = ref('')
    function changeCurrentTime (x) {
      currentTime.value = x
    }

    function toggleShowBarrage (x) {
      isShowBarrage.value = x
    }

    function changeBarrageContent (x) {
      barrageContent.value = x.target.value
    }

    async function sendBarrage () {
      const params = {
        videoId: video.videoId,
        sendTime: currentTime.value,
        content: barrageContent.value,
        generateTime: config.time(),
        ...store.state.controlBarrage,
        userId: store.state.userId
      }
      const { data } = await s.insertBarrage(params)
      if (data.affectedRows !== 1) {
        return false
      }
      instance.appContext.config.globalProperties.$socket.emit('insertBarrage', {
        ...params,
        top: data.top,
        barrageId: data.insertId,
        userId: store.state.userId,
        avatar: store.state.userAvatarSrc,
        account: store.state.userName
      })
      return true
    }

    function sortComment (type) {
      if (type === 0) {
        comment.v.sort((a, b) => (new Date(a.sendTime) - new Date(b.sendTime)))
      } else if (type === 1) {
        comment.v.sort((a, b) => (b.love.length - a.love.length) || (new Date(b.sendTime) - new Date(a.sendTime)))
      } else if (type === 2) {
        comment.v.sort((a, b) => (new Date(b.sendTime) - new Date(a.sendTime)))
      } else if (type === 3) { // 待扩展不写成else
        comment.v.sort((a, b) => (a.love.length - b.love.length) || (new Date(a.sendTime) - new Date(b.sendTime)))
      }
    }

    async function getVideo () {
      return {
        data: video
      }
    }

    const refresh = async (loadingProcessNotUpdate = false) => {
      const params = {
        videoId: video.videoId
      }

      const videoControl = config.videoControlSubRoute.map(({ path: v }) => {
        const M = firstToUpperCase(v)
        return {
          method: s['get' + M + 'ById'],
          attrs: ['videoId'],
          cb: data => {
            const obj = {}
            obj[v] = data
            obj[v + 'HadLoad'] = true
            return {
              ...obj
            }
          }
        }
      })

      loadById(subscribe, getVideo, null, [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              subscribe.v.splice(0, subscribe.v.length)
              subscribe.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                subscribe: [],
                avatar: config.avatarLoading,
                account: config.accountLoading,
                introduction: config.introductionLoading
              })))
            }
          },
          method: s.getSubscribeById,
          attrs: ['userId'],
          cb: (data) => ({
            subscribe: data,
            subscribeHadLoad: true
          })
        },
        {
          method: s.getUserById,
          attrs: ['userId']
        }
      ])

      loadById(videoWrap, getVideo, null, [
        [
          {
            lastResult: (res) => {
              if (!loadingProcessNotUpdate) {
                videoWrap.v.splice(0, videoWrap.v.length)
                videoWrap.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                  ...r,
                  avatar: config.avatarLoading,
                  account: config.accountLoading,
                  introduction: config.introductionLoading,
                  tag: [],
                  ...(() => {
                    const obj = {}
                    config.videoControlSubRoute.forEach(({ path: v }) => {
                      obj[v] = []
                    })
                    return obj
                  })()
                })))
              }
            },
            method: s.getTagById,
            attrs: ['videoId'],
            cb: data => ({
              tag: data,
              tagHadLoad: true
            })
          },
          ...videoControl,
          {
            method: s.getUserById,
            attrs: ['userId'],
            cb: data => ({
              ...data,
              hadHandleItem: false,
              setHandleItem: function (x) {
                this.hadHandleItem = x
              }
            })
          }
        ]
      ]
      )
      loadById(play, s.getPlayById, params)
      loadById(barrage, s.getBarrageById, params,
        [{
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              barrage.v.splice(0, barrage.v.length)
              barrage.v.splice(0, 0, ...res.map(v => ({
                ...v,
                avatar: config.avatarLoading,
                account: config.accountLoading
              })))
            }
          },
          method: s.getUserById,
          attrs: ['userId']
        }])
      loadById(
        comment,
        s.getCommentById,
        {
          videoId: video.videoId,
          auditing: 0
        },
        [
          {
            lastResult: (res) => {
              if (!loadingProcessNotUpdate) {
                comment.v.splice(0, comment.v.length)
                comment.v.splice(0, 0, ...res.map(v => ({
                  ...v,
                  avatar: config.avatarLoading,
                  account: config.accountLoading,
                  love: []
                })))
              }
            },
            method: s.getUserById,
            attrs: ['userId']
          },
          {
            method: s.getLoveById,
            attrs: ['commentId'],
            cb: (data) => ({
              love: data,
              loveHadLoad: true,
              hadHandleItem: false,
              setHandleItem: function (x) {
                this.hadHandleItem = x
              }
            })
          }
        ]
      )
    }

    refresh()
    provide('subscribe', subscribe)
    provide('refresh', refresh)
    provide('isWatching', isWatching)
    provide('sortComment', sortComment)
    provide('isShowBarrage', isShowBarrage)
    provide('video', videoWrap)
    provide('play', play)
    provide('barrage', barrage)
    provide('comment', comment)
    provide('toggleShowBarrage', toggleShowBarrage)
    provide('changeBarrageContent', changeBarrageContent)
    provide('sendBarrage', sendBarrage)
    provide('currentTime', currentTime)
    provide('changeCurrentTime', changeCurrentTime)

    return {
      isWatching,
      comment,
      barrage
    }
  }
})
</script>

<style lang="less" scoped>
.videoPage {
  display: flex;
}
</style>
