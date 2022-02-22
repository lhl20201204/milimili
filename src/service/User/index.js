import { post } from '../index'
import store from '@/store'
import uploadService from '@/service/Upload'
import { message } from 'ant-design-vue'
const ret = {
  async _uploadFormData (content, attr, name, progress, mehtods) {
    const formdata = new FormData()
    formdata.append(attr, new File([content], name))
    return await mehtods(formdata, progress)
  },
  async _updateUserMessage (params, { imageProgress }) {
    const { account, introduction, pwd, image } = params
    const coverSrc = `user_${Number(store.state.userId)}_avatar.png`
    try {
      const params = {
        userId: store.state.userId
      }
      if (!account && !introduction && !pwd && !image) {
        return message.error('至少要修改一项')
      }
      image && (params.avatar = coverSrc.slice(0, -4))
      account && (params.account = account)
      introduction && (params.introduction = introduction)
      pwd && (params.pwd = pwd)
      const { data } = await ret.updateUser(params)
      if (data.affectedRows !== 1) {
        throw new Error()
      }
      if (image) {
        await ret._uploadFormData(image, 'image', coverSrc, imageProgress, uploadService.uploadImage)
      }
    } catch (e) {
      console.error(e)
      throw new Error('上传失败')
    }
  },
  getAuditingVideoListByUserId (params) {
    return post('/api/user/getAuditingVideoListByUserId', params)
  },
  getNoticeById (params) {
    return post('/api/notice/getNoticeById', params)
  },
  getNoticeByNoticedUserId (params) {
    return post('/api/notice/getNoticeByNoticedUserId', params)
  },
  updateUser (params) {
    return post('/api/user/updateUser', params)
  },
  getReply (params) {
    return post('/api/comment/getReply', params)
  },
  getPrivateMessage (params) {
    return post('/api/message/getPrivateMessage', params)
  },
  getMessageById (params) {
    return post('/api/message/getMessageById', params)
  },
  insertMessage (params) {
    return post('/api/message/insertMessage', params)
  }
}
export default ret
