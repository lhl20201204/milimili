import { post } from '../index'

const ret = {
  async getRegisterStatus (params) {
    return post('/api/user/register', {
      account: params.username,
      pwd: params.password
    })
  }
}
export default ret
