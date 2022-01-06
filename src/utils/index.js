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
