import { post } from '../index'
const ret = {
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
  }
}
export default ret
