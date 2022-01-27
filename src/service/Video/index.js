import { post } from '../index'
const ret = {
  getPlayById (params) {
    return post('/api/video/getPlayById', params)
  },
  getBarrageById (params) {
    return post('/api/barrage/getBarrageById', params)
  },
  getCommentById (params) {
    return post('/api/comment/getCommentById', params)
  },
  getUserById (params) {
    return post('/api/user/getUserById', params)
  },
  getLoveById (params) {
    return post('/api/comment/getLoveById', params)
  }
}
export default ret
