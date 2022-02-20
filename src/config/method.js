import moment from 'moment'
import _ from 'lodash'
import subRoute from './subRoute'
const videoControlMethods = ((arr) => {
  const obj = {}
  for (const r of arr) {
    const { currentUserHad } = r
    obj[currentUserHad] = function (list, params) {
      const userId = params.userId || params
      return _.findIndex(list, l => l.userId === userId)
    }
  }
  return obj
})(subRoute.videoControlSubRoute)

export default {
  hasAccessNotLogin () {
    return sessionStorage.getItem('rememberPassword') && sessionStorage.getItem('currentUser') && sessionStorage.getItem('currentUserId') && sessionStorage.getItem('currentUserAvatarSrc') && sessionStorage.getItem('currentUserIntroduction') && sessionStorage.getItem('currentUserTime')
  },
  time (t) {
    return (t ? moment(t) : moment()).format('YYYY-MM-DD HH:mm:ss')
  },
  currentUserHadLove (arr, params) {
    const lovePerson = params.lovePerson || params
    return _.findIndex(arr, l => l.lovePerson === lovePerson)
  },
  currentUserHadSubscribe (arr, params) {
    const fansId = params.fansId || params
    return _.findIndex(arr, l => l.fansId === fansId)
  },
  ...videoControlMethods,
  avatarHadCache (obj, key) {
    return obj && obj[key] instanceof Promise
  },
  userHadCache (obj, key) { // 分开写方便以后该逻辑
    return obj && obj[key] instanceof Promise
  }
}
