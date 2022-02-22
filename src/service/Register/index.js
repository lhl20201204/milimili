import { post } from '../index'

const ret = {
  async getRegisterStatus (params) {
    return post('/api/user/register', {
      ...params,
      account: params.username,
      pwd: params.password
    })
  }
}
export default ret
