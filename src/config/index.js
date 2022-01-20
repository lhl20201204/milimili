import { routes } from './routes'
import network from './network'
import subRoute from './subRoute'
import defaultComp from './defaultComp'
export default {
  ...defaultComp,
  ...subRoute,
  ...network,
  title: 'milimili 弹幕网站',
  navHeaderHeight: '64px',
  navHeaderFontSize: '24px',
  layoutFooterHeight: '70px',
  layoutContentPadding: '24px',
  routes
}
