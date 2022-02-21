<template>
  <div class="admin-page">
    <AdminNav />
    <router-view> </router-view>
    <a-affix :offset-top="100">
      <a-button type="primary"
                @click="refresh(true)">刷新</a-button>
    </a-affix>
  </div>
</template>

<script>
import { defineComponent, provide, reactive } from 'vue'
import config from '@/config'
import AdminNav from './AdminNav'
import s from '@/service/Admin'
import userService from '@/service/User'
import videoService from '@/service/Video'
import { loadById } from '@/service'
import { fillId } from '@/utils'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    AdminNav
  },
  setup (props) {
    const store = useStore()
    const formStyle = reactive({
      height: ((config.navHeaderHeight.slice(0, -2)) * 1 + (config.layoutContentPadding.slice(0, -2)) * 2 + (config.layoutFooterHeight.slice(0, -2)) * 1) + 'px'
    })
    const video = reactive({
      v: []
    })

    const comment = reactive({
      v: []
    })

    const complaint = reactive({
      v: []
    })

    const refreshTime = reactive({
      v: new Date()
    })

    const refresh = async (loadingProcessNotUpdate = false) => {
      refreshTime.v = new Date()
      loadById(video, s.getAuditingVideoList, {
        videoAuditingStatus: config.videoAuditingStatus
      }, [
        {
          lastResult (data) {
            // 什么都不做相当于预处理
            return data.filter(r => r.userId !== store.state.userId)
          },
          method: async () => ({ data: {} }),
          attrs: []
        },
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              const ret = (Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                avatar: config.avatarLoading,
                account: config.accountLoading,
                tag: [],
                hadHandleItem: false,
                setHandleItem: function (x) {
                  this.hadHandleItem = x
                }
              }))
              video.v.splice(0, video.v.length)
              video.v.splice(0, 0, ...ret)
              return ret
            }
          },
          method: videoService.getUserById,
          attrs: ['userId']
        },
        {
          method: videoService.getTagById,
          attrs: ['videoId'],
          cb: data => ({
            tag: data,
            tagHadLoad: true,
            setHandleItem: function (x) {
              this.hadHandleItem = x
            }
          })
        }
      ])
      loadById(complaint, s.getAuditingComplaintList, {
        complaintAuditingStatus: config.complaintAuditingStatus
      }, [
        {
          lastResult (data) {
            return data.filter(r => r.targetUserId !== store.state.userId)
          },
          method: async () => ({ data: {} }),
          attrs: []
        },
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              const ret = (Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                hadHandleItem: false,
                setHandleItem: function (x) {
                  this.hadHandleItem = x
                },
                complaintTime: r.time,
                complaintContent: r.content,
                videoId: config.nullValue,
                commentId: config.nullValue,
                content: config.nullValue,
                videoTitle: config.nullValue,
                tag: [],
                avatar: config.avatarLoading,
                account: config.accountLoading,
                introduction: config.introductionLoading
              }))
              complaint.v.splice(0, complaint.v.length)
              complaint.v.splice(0, 0, ...ret)
              return ret
            } else {
              const ret = (Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                hadHandleItem: false,
                setHandleItem: function (x) {
                  this.hadHandleItem = x
                },
                complaintTime: r.time,
                complaintContent: r.content
              }))
              complaint.v.splice(0, complaint.v.length)
              complaint.v.splice(0, 0, ...ret)
              return ret
            }
          },
          cache: {
            getEnable (r) {
              return r.type === 'video'
            },
            mapName: 'getVideoDetail',
            key: ['videoId']
          },
          getMethod: (res) => {
            return res.type === 'video' ? s.getVideoDetail : s.getCommentDetail
          },
          getParams: (res) => {
            return res.type === 'video' ? { videoId: res.typeId, auditing: config.videoHadAuditedStatus } : { commentId: res.typeId }
          },
          cb: (data, res) => res.type === 'video' ? ({
            ...(data[0] || config.defaultVideoConfig)
          }) : ({
            ...(data[0] || config.defaultCommentConfig)
          })
        },
        {
          method: videoService.getUserById,
          attrs: ['userId']
        },
        {
          getMethod: (res) => {
            return res.type === 'video' ? videoService.getTagById : async () => ({ data: [{ isComment: 'null' }] })
          },
          attrs: ['videoId'],
          cb: data => ({
            tag: data,
            tagHadLoad: true
          })
        }
      ])

      const commentArr = [
        {
          lastResult: (res) => {
            if (!loadingProcessNotUpdate) {
              comment.v.splice(0, comment.v.length)
              comment.v.splice(0, 0, ...(Array.isArray(res) ? res : [res]).map(r => ({
                ...r,
                notice: [],
                video: {},
                replyComment: {},
                replyUser: {
                  avatar: config.avatarLoading,
                  account: config.accountLoading,
                  introduction: config.introductionLoading
                },
                user: {
                  avatar: config.avatarLoading,
                  account: config.accountLoading,
                  introduction: config.introductionLoading
                },
                hadHandleItem: false,
                setHandleItem: function (x) {
                  this.hadHandleItem = x
                }
              })))
            }
          },
          method: userService.getNoticeById,
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
        },
        {
          method: videoService.getUserById,
          attrs: ['userId'],
          cb (r) {
            return {
              user: r,
              userHadLoad: true
            }
          }
        }
      ]
      commentArr.serial = true
      loadById(comment, s.getAuditingCommentList, {
        auditing: config.commentAuditingStatus
      }, [
        {
          lastResult (data) {
            // 什么都不做相当于预处理
            return data.filter(r => r.userId !== store.state.userId)
          },
          method: async () => ({ data: {} }),
          attrs: []
        },
        [
          commentArr,
          {
            cache: {
              mapName: 'getVideoDetail',
              key: ['videoId']
            },
            method: s.getVideoDetail,
            attrs: ['videoId'],
            cb (res) {
              return {
                video: res[0] || config.defaultVideoConfig,
                videoHadLoad: true
              }
            }
          },
          {
            getMethod (r) {
              if (fillId(r.parentCommentId) === config.rootCommentId) {
                return async () => ({ data: [{ content: '无' }] })
              }
              return s.getCommentDetail
            },
            getParams (r) {
              return {
                commentId: r.parentCommentId
              }
            },
            cb (r) {
              return {
                replyComment: r[0] || config.defaultCommentConfig,
                setHandleItem: function (x) {
                  this.hadHandleItem = x
                }
              }
            }
          }
        ]
      ])
    }
    refresh()
    provide('refresh', refresh)
    provide('refreshTime', refreshTime)
    provide('video', video)
    provide('complaint', complaint)
    provide('comment', comment)
    return {
      formStyle,
      refresh
    }
  }
})
</script>

<style lang="less" scoped>
</style>
