export const routes = [
  { title: '首页', path: 'home' },
  { title: '游戏中心', path: 'game', type: 'hover' },
  { title: '投稿', path: 'upload' },
  { title: '个人中心', path: 'user' },
  { title: '管理员', path: 'admin', access: 'admin' },
  { path: 'login', noNav: true }
]
