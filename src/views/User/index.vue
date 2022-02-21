<template>
  <div>
    <UserDetail />
    <RouteTabs :subRoute="userNavSubRoute"
               prefixPath="/user/" />
    <router-view v-if="userNavSubRoute.some(item =>  $route.path.indexOf('/user/'+item.path)=== 0)" />
    <NotAccess v-else />
  </div>
</template>

<script>
import { computed, defineComponent, provide, reactive, ref, watch } from 'vue'
import UserDetail from './UserDetail'
import { loadById } from '@/service'
import videoService from '@/service/Video'
import adminService from '@/service/Admin'
import s from '@/service/User'
import { useRouter } from 'vue-router'
import config from '@/config'
import { useStore } from 'vuex'
import NotAccess from '@/components/NotAccess'
import RouteTabs from '@/components/RouteTabs'
import { firstToUpperCase, fillId } from '@/utils'
export default defineComponent({
  components: {
    UserDetail,
    RouteTabs,
    NotAccess
  },
  setup () {
    const router = useRouter()

    // const route = useRoute()
    const store = useStore()
    const getQuery = () => JSON.parse(JSON.stringify(router.currentRoute.value.query))
    const userId = ref(getQuery().userId)
    const userNavSubRoute = computed(() => config.userNavSubRoute.filter(({ onlySelfView }) => !onlySelfView || store.state.userId === userId.value))
    const user = reactive({
      v: [
        {
          avatar: config.avatarLoading,
          account: config.accountLoading,
          introduction: config.introductionLoading,
          fans: [],
          subscribes: []
        }
      ]
    })

    const fans = reactive({
      v: []
    })

    const subscribes = reactive({
      v: []
    })

    const video = reactive({
      v: []
    })

    const dynamic = reactive({
      v: []
    })

    const editVideo = reactive({
      v: []
    })

    const editComment = reactive({
      v: []
    })

    const message = reactive({
      v: []
    })

    const notice = reactive({
      v: []
    })

    const loveComment = reactive({
      v: []
    })
    let unWatch = null

    // const getVideoCanRerender = (firstChange) => firstChange || route.path.startsWith('/user/uploadPage') || route.path.startsWith('/user/homePage')

    // const getDynamicCanRerender = (firstChange) => firstChange || route.path.startsWith('/user/dynamicPage')

    const refresh = async (loadingProcessNotUpdate = false, firstChange) => {
      if (!userId.value) {
        if (unWatch) {
          unWatch() // 取消监听
        }
        return console.log('取消刷新,关掉监听')
      }
      const useComment = [
        {
          method: videoService.getCommentById,
          getParams (r) {
            return {
              userId: r.userId,
              auditing: config.commentHadAuditedStatus
            }
          },
          cb (data) {
            return {
              comment: data,
              commentHadLoad: true
            }
          }
        },
        {
          getProxyAttr () {
            return '0.comment'
          },
          method: videoService.getUserById,
          attrs: ['userId'],
          cb (data, origin) {
            return {
              ...data,
              userHandleType: 'comment',
              userHandleTime: origin.sendTime
            }
          }
        },
        {
          getProxyAttr () {
            return '0.comment'
          },
          method: adminService.getVideoDetail,
          cache: {
            mapName: 'getVideoDetail',
            key: ['videoId']
          },
          attrs: ['videoId'],
          cb (data) {
            return {
              ...data[0]
            }
          }
        }
      ]
      useComment.serial = true
      console.log('本次更新' + userId.value)
      loadById(user, videoService.getUserById, {
        userId: userId.value
      })
      loadById(fans, videoService.getSubscribeById, {
        upId: userId.value
      }, [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              fans.v.splice(0, fans.v.length)
              fans.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                avatar: config.avatarLoading,
                account: config.accountLoading,
                introduction: config.introductionLoading
              })))
            }
          },
          method: videoService.getUserById,
          getParams (r) {
            return {
              userId: r.fansId
            }
          }
        }
      ])
      loadById(subscribes, videoService.getSubscribeById, {
        fansId: userId.value
      }, [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              subscribes.v.splice(0, subscribes.v.length)
              subscribes.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                avatar: config.avatarLoading,
                account: config.accountLoading,
                introduction: config.introductionLoading
              })))
            }
          },
          method: videoService.getUserById,
          getParams (r) {
            return {
              userId: r.upId
            }
          }
        }
      ])
      loadById(video, s.getAuditingVideoListByUserId, {
        userId: userId.value,
        auditing: config.videoHadAuditedStatus
      }, [
        [{
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              video.v.splice(0, video.v.length)
              video.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                play: [],
                collect: [],
                coin: [],
                forwarding: [],
                likes: []
              })))
            }
          },
          method: videoService.getPlayById,
          attrs: ['videoId'],
          cb (data) {
            return {
              play: data,
              playHadLoad: true
            }
          }
        },
        ...config.videoControlSubRoute.map(({ path: v }) => {
          const M = firstToUpperCase(v)
          const arr = [{
            method: videoService['get' + M + 'ById'],
            attrs: ['videoId'],
            cb: data => {
              const obj = {}
              obj[v] = data
              obj[v + 'HadLoad'] = true
              return {
                ...obj
              }
            }
          }, {
            getProxyAttr () {
              return '0.' + v
            },
            method: videoService.getUserById,
            attrs: ['userId']
          }]
          arr.serial = true // 设置数组内子项链式运行
          return arr
        })
        ]
      ])
      loadById(dynamic, videoService.getUserById, {
        userId: userId.value
      }, [
        ...config.videoControlSubRoute.map(({ path: v }) => {
          const M = firstToUpperCase(v)
          const arr = [{
            method: videoService['get' + M + 'ById'],
            attrs: ['userId'],
            cb: data => {
              const obj = {}
              obj[v] = data
              obj[v + 'HadLoad'] = true
              return {
                ...obj
              }
            }
          }, {
            getProxyAttr () {
              return '0.' + v
            },
            cache: {
              mapName: 'getVideoDetail',
              key: ['videoId']
            },
            method: adminService.getVideoDetail,
            attrs: ['videoId'],
            cb (res, origin) {
              return {
                ...res[0],
                userHandleType: v,
                userHandleTime: origin.time
              }
            }
          }]
          arr.serial = true // 设置数组内子项链式运行
          return arr
        }),
        useComment
      ])
      loadById(editVideo, s.getAuditingVideoListByUserId, {
        userId: userId.value,
        auditing: config.videoNeedEdit
      }, [
        [
          {
            lastResult: (res) => {
              if (!loadingProcessNotUpdate) {
                editVideo.v.splice(0, editVideo.v.length)
                editVideo.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                  ...r,
                  notice: [],
                  tag: [],
                  image: '',
                  video: ''
                })))
              }
            },
            method: s.getNoticeById,
            getParams (r) {
              return {
                type: 'video',
                typeId: r.videoId
              }
            },
            cb (res) {
              return {
                notice: res,
                noticeHadLoad: true
              }
            }
          },
          {
            method: videoService.getTagById,
            attrs: ['videoId'],
            cb (r) {
              return {
                tag: r,
                tagHadLoad: true,
                image: '',
                video: ''
              }
            }
          }
        ]
      ])
      const commentArr = [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              editComment.v.splice(0, editComment.v.length)
              editComment.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                notice: [],
                video: {},
                replyComment: {},
                replyUser: {
                  avatar: config.avatarLoading,
                  account: config.accountLoading,
                  introduction: config.introductionLoading
                }
              })))
            }
          },
          method: s.getNoticeById,
          getParams (r) {
            return {
              type: 'comment',
              typeId: r.commentId
            }
          },
          cb (res) {
            return {
              notice: res,
              noticeHadLoad: true
            }
          }
        },
        {
          method: videoService.getUserById,
          getParams (r) {
            return {
              userId: r.replyUserId
            }
          },
          cb (r) {
            return {
              replyUser: r,
              replyUserHadLoad: true
            }
          }
        }
      ]
      commentArr.serial = true
      loadById(editComment, videoService.getCommentById, {
        userId: userId.value,
        auditing: config.commentNeedEdit
      }, [
        [
          commentArr,
          {
            cache: {
              mapName: 'getVideoDetail',
              key: ['videoId']
            },
            method: adminService.getVideoDetail,
            attrs: ['videoId'],
            cb (res) {
              return {
                video: res[0],
                videoHadLoad: true
              }
            }
          },
          {
            getMethod (r) {
              if (fillId(r.parentCommentId) === config.rootCommentId) {
                return async () => ({ data: [{ content: '无' }] })
              }
              return adminService.getCommentDetail
            },
            getParams (r) {
              return {
                commentId: r.parentCommentId
              }
            },
            cb (r) {
              return {
                replyComment: r[0]
              }
            }
          }
        ]
      ])

      loadById(message, videoService.getUserById, {
        userId: userId.value
      })

      loadById(notice, s.getNoticeByNoticedUserId, {
        noticedUserId: userId.value
      }, [
        {
          cache: {
            getEnable (r) {
              return r.type === 'video'
            },
            mapName: 'getVideoDetail',
            key: ['videoId']
          },
          getMethod: (res) => {
            return res.type === 'video' ? adminService.getVideoDetail : adminService.getCommentDetail
          },
          getParams: (res) => {
            return res.type === 'video' ? { videoId: res.typeId } : { commentId: res.typeId }
          },
          cb: (data, res) => res.type === 'video' ? ({
            video: data[0]
          }) : ({
            comment: data[0]
          })
        }
      ], {
        filter (data) {
          return data.sort((a, b) => new Date(b.time) - new Date(a.time))
        }
      })

      const love = [
        {
          method: videoService.getLoveById,
          attrs: ['commentId'],
          cb: (data) => ({
            love: data,
            loveHadLoad: true
          })
        },
        {
          getProxyAttr () {
            return '0.love'
          },
          method: videoService.getUserById,
          getParams (r) {
            return {
              userId: r.lovePerson
            }
          },
          cb (data) {
            return {
              user: data,
              userHadload: true
            }
          }
        }
      ]
      love.serial = true

      loadById(loveComment, videoService.getCommentById, {
        userId: userId.value,
        auditing: config.commentHadAuditedStatus
      }, [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              loveComment.v.splice(0, loveComment.v.length)
              loveComment.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                video: {},
                love: []
              })))
            }
          },
          cache: {
            mapName: 'getVideoDetail',
            key: ['videoId']
          },
          method: adminService.getVideoDetail,
          attrs: ['videoId'],
          cb (res) {
            return {
              video: res[0],
              videoHadLoad: true
            }
          }
        },
        love
      ])
    }
    let oldUserId = userId.value
    unWatch = watch(() => router.currentRoute.value.query, (x) => {
      userId.value = x.userId
      if (userId.value !== oldUserId) {
        oldUserId = userId.value
        console.log('刷新')
        refresh(false, true)
      }
    })
    refresh()
    provide('refresh', refresh)
    provide('getQuery', getQuery)
    provide('user', user)
    provide('fans', fans)
    provide('subscribes', subscribes)
    provide('video', video)
    provide('userId', userId)
    provide('dynamic', dynamic)
    provide('editVideo', editVideo)
    provide('editComment', editComment)
    provide('message', message)
    provide('notice', notice)
    provide('loveComment', loveComment)
    return {
      userNavSubRoute,
      userId
    }
  }

})
</script>
<style lang="less" scoped>
</style>
