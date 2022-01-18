let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    ctx = x
    ret.ctx = ctx
  },
  async getLoginStatus (params, resolve) {
    resolve(await ctx.$axios.get('/api/user/login', {
      params: {
        account: params.username,
        pwd: params.password
      }
    }))
  }
}
export default ret
