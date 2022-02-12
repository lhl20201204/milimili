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
import videoService from '@/service/Video'
import { loadById } from '@/service'
export default defineComponent({
  components: {
    AdminNav
  },
  setup (props) {
    const formStyle = reactive({
      height: ((config.navHeaderHeight.slice(0, -2)) * 1 + (config.layoutContentPadding.slice(0, -2)) * 2 + (config.layoutFooterHeight.slice(0, -2)) * 1) + 'px'
    })
    const video = reactive({
      v: []
    })

    const complaint = reactive({
      v: []
    })

    const refresh = async (loadingProcessNotUpdate = false) => {
      loadById(video, s.getAuditingVideoList, {
        videoAuditingStatus: config.videoAuditingStatus
      }, [
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
          getMethod: (res) => {
            return res.type === 'video' ? s.getVideoDetail : s.getCommentDetail
          },
          getParams: (res) => {
            return res.type === 'video' ? { videoId: res.typeId } : { commentId: res.typeId }
          },
          cb: (data, res) => res.type === 'video' ? ({
            ...data[0]
          }) : ({
            ...data[0]
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
    }
    refresh()
    provide('refresh', refresh)
    provide('video', video)
    provide('complaint', complaint)
    return {
      formStyle,
      refresh
    }
  }
})
</script>

<style lang="less" scoped>
</style>
