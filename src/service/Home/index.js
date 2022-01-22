import { get } from '../index'

const ret = {
  async getVideoList (resolve, reject) {
    try {
      resolve(await get('/api/video/getList'))
    } catch (e) {
      reject(e)
    }
  }
}
export default ret
