import { post } from '../index'

const ret = {
  async getRegisterStatus (params, resolve) {
    resolve(await post('/api/user/register', {
      account: params.username,
      pwd: params.password
    }))
  }
}
export default ret
