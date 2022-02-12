// import { message } from 'ant-design-vue'
import { post } from '../index'
import { fillId } from '@/utils'
import store from '@/store'
import config from '@/config'
const ret = {
  async _uploadFormData (content, attr, name, progress, mehtods) {
    const formdata = new FormData()
    formdata.append(attr, new File([content], name))
    return await mehtods(formdata, progress)
  },
  async _uploadVideo (params, { videoProgress, imageProgress }) {
    const { video, image, title, videoIntroduction, tag } = params
    let insertId
    let prefixInsertId
    let videoName
    let coverSrc
    try {
      const { data } = await ret.insertVideo({
        time: config.time(),
        userId: store.state.userId,
        videoTitle: title,
        videoIntroduction,
        auditing: config.videoAuditingStatus
      })
      if (data.affectedRows !== 1) {
        throw new Error()
      }
      insertId = data.insertId
      prefixInsertId = fillId(insertId)
      videoName = `mv${prefixInsertId}.mp4`
      coverSrc = `video_${insertId}.png`
      const { data: data2 } = await ret.updateVideo({ videoId: insertId, coverSrc: 'video_' + insertId })
      if (data2.affectedRows !== 1) {
        throw new Error()
      }
      await Promise.all(tag.map(v => ({ tagName: v, videoId: insertId })).map(w => ret.insertTag(w))).catch(e => { throw new Error(e) })
      await ret._uploadFormData(image, 'image', coverSrc, imageProgress, ret.uploadImage)
      await ret._uploadFormData(video, 'video', videoName, videoProgress, ret.uploadVideo)
    } catch (e) {
      if (insertId) {
        await ret.deleteVideo({ videoId: insertId })
        await ret.deleteTag({ videoId: insertId })
      }
      if (coverSrc) {
        await ret.deleteImageByPath({ path: [coverSrc] })
      }
      if (videoName) {
        await ret.deleteVideoByPath({ path: [videoName] })
      }
      throw new Error('上传失败')
    }
  },
  getLatestVideo () {
    return post('/api/video/getLatestVideo')
  },
  uploadVideo (params, onUploadProgress) {
    return post('/api/video/uploadVideo', params, {
      onUploadProgress
    })
  },
  uploadImage (params, onUploadProgress) {
    return post('/api/image/uploadImage', params, {
      onUploadProgress
    })
  },
  testUploadVideo (params) { // 开发时测试旧接口用的，记得删掉
    return post('/test/uploadVideo', params)
  },
  deleteVideoByPath (params) {
    return post('/api/video/deleteVideoByPath', params)
  },
  deleteImageByPath (params) {
    return post('/api/image/deleteImageByPath', params)
  },
  insertVideo (params) {
    return post('/api/video/insertVideo', params)
  },
  deleteVideo (params) {
    return post('/api/video/deleteVideo', params)
  },
  updateVideo (params) {
    return post('/api/video/updateVideo', params)
  },
  insertTag (params) {
    return post('/api/video/insertTag', params)
  },
  deleteTag (params) {
    return post('/api/video/deleteTag', params)
  }
}
export default ret
