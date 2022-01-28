export function directive (App) {
  const hoverMap = new Map()
  const src = function (el, binding) {
    el.src = (binding.value instanceof Blob) ? URL.createObjectURL(binding.value) : binding.value
  }
  const hover = function (el, binding) {
    if (!hoverMap.has(el)) {
      el.addEventListener('mouseenter', function () {
        binding.value()
      })
      el.addEventListener('mouseleave', function () {
        binding.value()
      })
      hoverMap.set(el)
    }
  }
  const prefix = function (el) {
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

  App.directive('src', {
    mounted: src
  })

  App.directive('hover', {
    mounted: hover
  })

  App.directive('prefix', {
    mounted: prefix
  })

  App.directive('object', {
    mounted (el, binding, ctx) {
      if (!(binding.value instanceof Object)) {
        return console.error('v-object传的值应为对象')
      }

      for (const attr in binding.value) {
        const originV = binding.value[attr]
        if (attr === 'v-src') {
          src(el, { ...binding, value: originV })
        } else if (attr === 'v-hover') {
          hover(el, { ...binding, value: originV })
        } else if (attr === 'v-prefix') {
          prefix(el, { ...binding, value: originV })
        }
      }
    }
  })
}
