let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    // console.log('我是home主页的设置ctx')
    ctx = x
    ret.ctx = ctx
  },
  async getVideoList (resolve) {
    resolve(await ctx.$axios.get('/api/video/getList'))
  }
}
export default ret
