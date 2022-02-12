import { getImgSrc } from '@/utils'

export function getVideoComponent (props) {
  return {
    props: ['res'],
    data () {
      return {
        isPlaying: false
      }
    },
    methods: {
      getRun () {
        this.getRun.dev = null
        return () => {
          setTimeout(() => {
            if (this.$refs.video && this.isPlaying) {
              props.changeCurrentTime(parseInt(this.$refs.video.currentTime))
              this.getRun.dev = requestAnimationFrame(this.run)
            }
          }, 1000)
        }
      }
    },
    mounted () {
      if (!props.isNotNeedAddeventListener) {
        const video = this.$refs.video
        this.run = this.getRun()
        video.addEventListener('play', () => {
          console.log('播放')
          if (!this.isPlaying) {
            this.run()
          }
          this.isPlaying = true
        })
        video.addEventListener('pause', () => {
          console.log('暂停')
          this.isPlaying = false
        })
      }
    },
    render (vue) {
      return <video controls
        ref="video"
        preload="preload"
        style={{
          width: props.width || '637px',
          height: props.height || '445px'
        }}
        poster={getImgSrc(props.v.coverSrc)}
      >
        <source v-src={vue.$props.res.data}
          type="video/mp4" />
        你的浏览器不支持 HTML 5 video标签。
      </video>
    }
  }
}
