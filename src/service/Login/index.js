import { get } from '../index'

const ret = {
  async getLoginStatus (params, resolve) {
    resolve(await get('/api/user/login', {
      params: {
        account: params.username,
        pwd: params.password
      }
    }))
  }
}
export default ret
