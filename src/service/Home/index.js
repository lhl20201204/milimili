let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    ctx = x
    ret.ctx = ctx
  },
  handle () {
    console.log('home', ctx)
  }
}
export default ret
