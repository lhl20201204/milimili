import { post } from '../index'

const ret = {
  async getVideoList () {
    return post('/api/video/getList')
  }
}
export default ret
