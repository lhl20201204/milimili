export function mixin (App) {
  App.mixin({
    beforeCreate () {
      if (!this.sockets) this.sockets = {}
      this.sockets.subscribe = (event, callback) => {
        this.$vueSocketIo.emitter.addListener(event, callback, this)
      }
      this.sockets.unsubscribe = (event) => {
        this.$vueSocketIo.emitter.removeListener(event, this)
      }
    },
    mounted () {
      if (this.$options.sockets) {
        Object.keys(this.$options.sockets).forEach(event => {
          if (event !== 'subscribe' && event !== 'unsubscribe') {
            this.$vueSocketIo.emitter.addListener(event, this.$options.sockets[event], this)
          }
        })
      }
    },
    beforeUnmount () {
      if (this.$options.sockets) {
        Object.keys(this.$options.sockets).forEach(event => {
          this.$vueSocketIo.emitter.removeListener(event, this)
        })
      }
    }
  })
}
