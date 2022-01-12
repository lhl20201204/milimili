export function deepCopy (ob) {
  const copy = {}
  for (const i in ob) {
    if (ob[i] instanceof Object) {
      copy[i] = deepCopy(ob[i])
    } else {
      copy[i] = ob[i]
    }
  }
  return copy
}
function getType (obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[Object.prototype.toString.call(obj)]
}

export function deepClone (data) {
  const type = getType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

export function sin (deg) {
  return parseFloat(parseFloat(Math.sin((Math.PI / 180) * deg)).toFixed(3))
}

export function cos (deg) {
  return parseFloat(parseFloat(Math.cos((Math.PI / 180) * deg)).toFixed(3))
}

export function isTouch (ax, ay, aw, ah, bx, by, bw, bh) {
  return !(ay > by + bh || by > ay + ah || ax > bx + bw || bx > ax + aw)
}
