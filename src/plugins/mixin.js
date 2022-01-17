export function mixin (App) {
  App.mixin({
    props: ['service'],
    created () {
      const props = this.$props
      if (props.service && (typeof props.service.setCtx === 'function')) {
        props.service.setCtx(this)
      }
    },
    mounted () {
      const props = this.$props
      if (props.service && (typeof props.service.setCtx === 'function')) {
        props.service.setCtx(this)
      }
    }
  })
}
