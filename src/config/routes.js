import icons from './icons'
import HoverGame from '@/views/Game/hoverViews/HoverGame'
const { HomeOutlined, UserOutlined, UploadOutlined, CrownOutlined, GoogleOutlined } = icons

export const routes = [
  { title: '首页', isNav: true, path: 'home', icon: HomeOutlined },
  { title: '游戏中心', isNav: true, path: 'game', icon: GoogleOutlined, type: 'hover', hoverComp: HoverGame },
  { title: '投稿', isNav: true, path: 'upload', icon: UploadOutlined },
  { title: '个人中心', isNav: true, path: 'user', icon: UserOutlined },
  { title: '管理员', isNav: true, path: 'admin', icon: CrownOutlined, access: 'admin' },
  { path: 'login' }
]
