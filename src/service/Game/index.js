let ctx = null
const ret = {
  ctx: null,
  setCtx (x) {
    console.log('我是game游戏的设置ctx')
    ctx = x
    ret.ctx = ctx
  }
}
export default ret
