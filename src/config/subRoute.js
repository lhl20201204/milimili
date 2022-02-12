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
    { key: 0, value: 1, text: '滚动' },
    { key: 1, value: 2, text: '顶部' },
    { key: 2, value: 3, text: '底部' }
  ],
  barrageControlColorSubRoute: [
    '#FFFFFF', '#FE0302', '#FF7204', '#FFAA02', '#FFD302', '#FFFF00', '#A0EE00',
    '#019899', '#4266BE', '#89D5FF', '#CC0273', '#222222', '#9B9B9B', '#00CD00'
  ],
  commentSortSubRoute: [
    '按时间升序',
    '按点赞数降序',
    '按时间降序',
    '按点赞数升序'
  ],
  videoControlSubRoute: [ // @/assets/icon/有这个的配套图片，名字不能乱改，拼上.png ，_activate.png有在videoControlItem用到
    { currentUserHad: 'currentUserHadLikes', requestHandleMethod: '_likesHandle', init: '/icon/likes.png', hover: '/icon/likes_activate.png', path: 'likes' },
    { currentUserHad: 'currentUserHadCollect', requestHandleMethod: '_collectHandle', init: '/icon/collect.png', hover: '/icon/collect_activate.png', path: 'collect' },
    { currentUserHad: 'currentUserHadForwarding', requestHandleMethod: '_forwardingHandle', init: '/icon/forwarding.png', hover: '/icon/forwarding_activate.png', path: 'forwarding', canContinueClick: true },
    { currentUserHad: 'currentUserHadCoin', requestHandleMethod: '_coinHandle', init: '/icon/coin.png', hover: '/icon/coin_activate.png', path: 'coin', onlyTouchOnce: true }
  ],
  videoControlAttrMeanSubRoute: {
    subscribe: '关注',
    love: '点赞评论',
    likes: '点赞',
    collect: '收藏',
    forwarding: '转发',
    coin: '投币',
    video: '视频',
    comment: '评论'
  },
  adminNavSubRoute: [
    { path: 'auditVideo', title: '视频审核' },
    { path: 'auditComment', title: '评论审核' },
    { path: 'auditComplaint', title: '举报审核' }
  ]
}
