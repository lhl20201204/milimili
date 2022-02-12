import HoverGame from '@/views/Game/hoverGameViews'
import { markRaw } from 'vue'
import { HomeOutlined, UserOutlined, UploadOutlined, CrownOutlined, GoogleOutlined } from '@ant-design/icons-vue'
import subRoute from './subRoute'
// redirect：如果children里的所有孩子的redirect 不为 true 时 ，默认重定向到第一个孩子
// isNav： 默认为false，是否是顶部导航栏
// icon：顶部导航栏图标
// type：是否是hover即有弹窗，与 hoverComp：弹窗设置组件
// title：导航栏标题
// nested: 默认true，其孩子在当前组件的router-view中，false，其孩子与其在同一层router-view，只是路径多了一个/
// access：展示该导航栏所需要的权限
// children：子路由
// path: 路由

export const routes = [
  { path: 'login' },
  { path: 'register' },
  { path: 'video' },
  {
    title: '首页',
    isNav: true,
    path: 'home',
    icon: HomeOutlined
  },
  {
    title: '游戏中心',
    isNav: true,
    path: 'game',
    icon: GoogleOutlined,
    type: 'hover',
    hoverComp: markRaw(HoverGame),
    nested: false,
    unSelectable: true,
    children: [
      { path: 'hunDouLuo' },
      { path: 'tanYiTan' },
      { path: 'eLuoSiFangKuai' }
    ]
  },
  { title: '投稿', isNav: true, path: 'upload', icon: UploadOutlined },
  {
    title: '个人中心',
    isNav: true,
    path: 'user',
    icon: UserOutlined,
    nested: false,
    children: [
      {
        path: 'test1',
        children: [
          { path: 'demo1' },
          { path: 'demo2', redirect: true }
        ]
      },
      { path: 'test2' }
    ]
  },
  {
    title: '管理员',
    isNav: true,
    path: 'admin',
    icon: CrownOutlined,
    access: 'admin',
    children: subRoute.adminNavSubRoute
  }
]
