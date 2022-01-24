import { get } from '../index'

const ret = {
  async getLoginStatus (params) {
    return get('/api/user/login', {
      params: {
        account: params.username,
        pwd: params.password
      }
    })
  }
}
export default ret
