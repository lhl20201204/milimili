import { post } from '../index'
const ret = {
  getVideoDetailById (params) {
    return post('/api/video/getVideoDetailById', params)
  },
  getBarrageById (params) {
    return post('/api/barrage/getBarrageById', params)
  }
}
export default ret
