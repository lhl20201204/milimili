import Image from '@/components/Image'
export default {
  NotFound: (comp, classes, selfStyle) => ({
    props: ['res'],
    render () {
      return comp ? <comp class={classes}>
        <Image
          staticPath="/error/network.error.png"
          directive={{
            'v-prefix': ''
          }}
          style={selfStyle}
        />
      </comp> : <Image
        staticPath="/error/network.error.png"
        directive={{
          'v-prefix': ''
        }}
        style={selfStyle}
      />
    }
  })

}
