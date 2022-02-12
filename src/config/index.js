import { routes } from './routes'
import network from './network'
import subRoute from './subRoute'
import defaultComp from './defaultComp'
import method from './method'
import imageSrc from './imageSrc'
const avatarCacheMap = {}
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
  videoIdPrefixZero: 20,
  accountLoading: 'defaultName',
  avatarLoading: 'hadNotLoaded',
  introductionLoading: '签名正在加载中...',
  defaultIntroduction: '此用户没有个性签名啊啊啊',
  videoDefaultIntroduction: '未经原作者允许禁止转载',
  videoAuditingStatus: -1,
  commentAuditingStatus: -1,
  videoNeedEdit: -2,
  commentNeedEdit: -2,
  videoReturned: -3,
  commentReturned: -3,
  videoBeDeleted: -4,
  commentBeDeleted: -4,
  complaintAuditingStatus: -1,
  complaintDoneStatus: 0,
  nullValue: 'null',
  avatarUseCache: true,
  requestFail: -1,
  deleteSuccess: 0,
  insertSuccess: 1,
  avatarCacheMap,
  routes
}
