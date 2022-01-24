import { get } from '../index'

const ret = {
  async getVideoList () {
    return get('/api/video/getList')
  }
}
export default ret
