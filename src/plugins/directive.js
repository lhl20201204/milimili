export function directive (App) {
  App.directive('src', {
    mounted (el, binding) {
      el.src = (binding.value instanceof Blob) ? URL.createObjectURL(binding.value) : binding.value
    }
  })

  App.directive('prefix', {
    mounted (el) {
      const maxwidth = el.parentNode.clientWidth
      const maxheight = el.parentNode.clientHeight
      const image = new Image()
      image.onload = () => {
        const w = el.width
        const h = el.height
        const ratio = w / h
        const parentRatio = maxwidth / maxheight
        el.style.width = ''
        if (ratio > parentRatio) {
          el.width = maxwidth
          el.height = maxwidth / ratio
        } else {
          el.height = maxheight
          el.width = el.height * ratio
        }
      }
      image.src = el.src
    }
  })
}
