import config from '@/config'
export function getAuthority (compAccess, userAccess) {
  if (!Array.isArray(compAccess)) {
    compAccess = compAccess.split(',')
  }
  if (!Array.isArray(userAccess)) {
    userAccess = userAccess.split(',')
  }
  for (const c of compAccess) {
    for (const u of userAccess) {
      if (c === u) {
        return true
      }
    }
  }
  return false
}

export function getImgSrc (path) {
  return config.baseUrl + 'getImg?path=' + path
}

export function fillId (id) {
  if (!id) {
    throw new Error('id不能为空')
  }
  id = id + ''
  while (id.length < config.videoIdPrefixZero) {
    id = '0' + id
  }
  return id
}
