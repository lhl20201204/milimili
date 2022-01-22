export default {
  NotFound: (comp, classes) => ({
    props: ['res'],
    render () {
      return comp ? <comp class={classes}><img src={require('@/assets/error/network.error.png')} v-prefix/> </comp> : <img src={require('@/assets/error/network.error.png')} v-prefix/>
    }
  })

}
