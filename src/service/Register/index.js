let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    ctx = x
    ret.ctx = ctx
  },
  async getRegisterStatus (params, resolve) {
    resolve(await ctx.$post('/api/user/register', {
      account: params.username,
      pwd: params.password
    }))
  }
}
export default ret
