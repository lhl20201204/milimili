export function mixin (App) {
  App.mixin({
    inject: ['s'],
    created () {
      if (this.s && (typeof this.s.setCtx === 'function')) {
        this.s.setCtx(this)
      }
    }
  })
}
