export default {
  hoverGameSubRoute: [
    { name: '魂斗罗', path: 'hunDouLuo' },
    { name: '弹一弹', path: 'tanYiTan' },
    { name: '俄罗斯方块', path: 'eLuoSiFangKuai' } // 这里的path即是路由，也是后端图片路径相关
  ],
  carouselSubRoute: [
    { path: 'swipper_1' },
    { path: 'swipper_2' },
    { path: 'swipper_3' },
    { path: 'swipper_4' },
    { path: 'swipper_5' }
  ],
  barrageControlSizeSubRoute: [
    { key: 0, value: 12, text: '小' },
    { key: 1, value: 14, text: '标准' },
    { key: 2, value: 16, text: '大' }
  ],
  barrageControlModeSubRoute: [
    { key: 0, value: 0, text: '滚动' },
    { key: 1, value: 1, text: '顶部' },
    { key: 2, value: 2, text: '底部' }
  ],
  barrageControlColorSubRoute: [
    '#FFFFFF', '#FE0302', '#FF7204', '#FFAA02', '#FFD302', '#FFFF00', '#A0EE00',
    '#019899', '#4266BE', '#89D5FF', '#CC0273', '#222222', '#9B9B9B', '#00CD00'
  ],
  commentSortSubRoute: [
    '按时间排序',
    '按热度排序'
  ]
}
