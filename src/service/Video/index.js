import { get } from '../index'
const ret = {
  getVideoDetailById (params) {
    return get('/api/video/getVideoDetailById', {
      params
    })
  }
}
export default ret
