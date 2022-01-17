let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    ctx = x
    ret.ctx = ctx
  },
  handle () {
    console.log('video', ctx)
  }
}
export default ret
