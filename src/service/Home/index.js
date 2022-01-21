import { get } from '../index'

const ret = {
  async getVideoList (resolve) {
    resolve(await get('/api/video/getList'))
  }
}
export default ret
