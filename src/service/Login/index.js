import { post } from '../index'

const ret = {
  async getLoginStatus (params) {
    return post('/api/user/login', {
      account: params.username,
      pwd: params.password
    })
  }
}
export default ret
