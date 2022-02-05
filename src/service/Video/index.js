import { post } from '../index'
import { reactive } from 'vue'
import config from '@/config'
import { message } from 'ant-design-vue'
import { firstToUpperCase } from '@/utils'
const videoControlMethods = ((arr) => {
  const obj = {}
  for (const r of arr) {
    const attr = r.path
    const M = firstToUpperCase(attr)
    obj['get' + M + 'ById'] = function (params) {
      return post('/api/video/get' + M + 'ById', params)
    }
    obj['delete' + M] = function (params) {
      return post('/api/video/delete' + M, params)
    }
    obj['insert' + M] = function (params) {
      return post('/api/video/insert' + M, params)
    }
    obj[`_${attr}Handle`] = function (params, options) {
      return ret._toggle(params, attr, this, options)
    }
  }
  return obj
})(config.videoControlSubRoute)

const ret = {
  async _toggle (params, attr, ctx, options) {
    const M = firstToUpperCase(attr)
    if (!config[`currentUserHad${M}`] || !ret[`insert${M}`] || !ret[`delete${M}`] || !ctx[attr]) {
      console.log(ctx[attr])
      message.error(`${attr}执行失败`)
      return config.requestFail
    }
    options = options || {}
    const { canContinueClick } = options
    const id = !canContinueClick ? config[`currentUserHad${M}`](ctx[attr], params) : -1
    if (id < 0) {
      const { data } = await ret[`insert${M}`](params)
      if (data.affectedRows !== 1) {
        message.error(config.videoControlAttrMeanSubRoute[attr] + '失败')
        return config.requestFail
      }
      const obj = {}
      obj[attr + 'Id'] = data.insertId
      ctx[attr].push(reactive({ ...params, ...obj }))
      return config.insertSuccess
    } else {
      const attrId = ctx[attr][id][attr + 'Id']
      if (!['number', 'string'].includes(typeof attrId)) {
        message.error('取消' + config.videoControlAttrMeanSubRoute[attr] + '失败')
        return config.requestFail
      }
      const obj = {}
      obj[attr + 'Id'] = attrId
      const { data } = await ret[`delete${M}`]({
        ...obj
      })
      if (data.affectedRows !== 1) {
        message.error('取消' + config.videoControlAttrMeanSubRoute[attr] + '失败')
        return config.requestFail
      }
      ctx[attr].splice(id, 1)
      return config.deleteSuccess
    }
  },
  async _loveHandle (params, options) {
    return ret._toggle(params, 'love', this, options)
  },
  async _subscribeHandle (params, options) {
    return ret._toggle(params, 'subscribe', this, options)
  },
  getPlayById (params) {
    return post('/api/video/getPlayById', params)
  },
  getBarrageById (params) {
    return post('/api/barrage/getBarrageById', params)
  },
  getCommentById (params) {
    return post('/api/comment/getCommentById', params)
  },
  getUserById (params) {
    return post('/api/user/getUserById', params)
  },
  getLoveById (params) {
    return post('/api/comment/getLoveById', params)
  },
  insertLove (params) {
    return post('/api/comment/insertLove', params)
  },
  deleteLove (params) {
    return post('/api/comment/deleteLove', params)
  },
  getSubscribeById (params) {
    return post('/api/user/getSubscribeById', params)
  },
  insertSubscribe (params) {
    return post('/api/user/insertSubscribe', params)
  },
  deleteSubscribe (params) {
    return post('/api/user/deleteSubscribe', params)
  },
  ...videoControlMethods,
  getTagById (params) {
    return post('/api/video/getTagById', params)
  },
  insertComment (params) {
    return post('/api/video/insertComment', params)
  },
  insertBarrage (params) {
    return post('/api/barrage/insertBarrage', params)
  }
}

export default ret
