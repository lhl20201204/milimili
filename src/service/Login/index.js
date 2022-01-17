let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    ctx = x
    ret.ctx = ctx
  },
  handle () {
    console.log('login', ctx)
  }
}
export default ret
