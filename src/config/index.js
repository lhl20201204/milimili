import { routes } from './routes'
import network from './network'
import subRoute from './subRoute'
import defaultComp from './defaultComp'
import method from './method'
import imageSrc from './imageSrc'
const avatarCacheMap = {}
const userMessageCacheMap = {}
export default {
  ...method,
  ...imageSrc,
  ...defaultComp,
  ...subRoute,
  ...network,
  title: 'milimili 弹幕网站',
  navHeaderHeight: '64px',
  navHeaderFontSize: '24px',
  layoutFooterHeight: '70px',
  layoutContentPadding: '24px',
  rootCommentId: '00000000000000000000',
  defaultNewUserAvatar: 'user_default_avatar',
  videoIdPrefixZero: 20,
  accountLoading: 'defaultName',
  avatarLoading: 'hadNotLoaded',
  introductionLoading: '签名正在加载中...',
  defaultIntroduction: '此用户没有个性签名啊啊啊',
  videoDefaultIntroduction: '未经原作者允许禁止转载',
  defaultUserRoutePath: '/user/homePage/likes',
  defaultVideoConfig: {
    videoTitle: '!视频已经不在',
    isNull: true
  },
  defaultCommentConfig: {
    content: '!评论已经不存在',
    isNull: true
  },
  videoHadAuditedStatus: 0,
  commentHadAuditedStatus: 0,
  videoAuditingStatus: -1,
  commentAuditingStatus: -1,
  videoNeedEdit: -2,
  commentNeedEdit: -2,
  videoBeDeleted: -4,
  commentBeDeleted: -4,
  complaintAuditingStatus: -1,
  auditStatusSuccess: 0,
  auditStatusDelete: 1,
  auditStatusBeReturned: 2,
  complaintDoneStatus: 0,
  nullValue: 'null',
  avatarUseCache: true,
  userMessageUseCache: true,
  requestFail: -1,
  deleteSuccess: 0,
  insertSuccess: 1,
  avatarCacheMap,
  userMessageCacheMap,
  routes
}
