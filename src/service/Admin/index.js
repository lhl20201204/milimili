import { post } from '../index'
const ret = {
  getAuditingVideoList (params) {
    return post('/api/video/getAuditingVideoList', params)
  },
  getVideoDetail (params) {
    return post('/api/video/getVideoDetail', params)
  },
  getAuditingComplaintList (params) {
    return post('/api/complaint/getAuditingComplaintList', params)
  },
  updateComplaint (params) {
    return post('/api/complaint/updateComplaint', params)
  },
  insertNotice (params) {
    return post('/api/notice/insertNotice', params)
  },
  deleteComment (params) {
    return post('/api/comment/deleteComment', params)
  },
  updateComment (params) {
    return post('/api/comment/updateComment', params)
  },
  getCommentDetail (params) {
    return post('/api/comment/getCommentDetail', params)
  }
}
export default ret
