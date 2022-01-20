import axios from 'axios'
export async function getImg (params) {
  return axios.get('/api/getImg', {
    params,
    responseType: 'blob'
  }).then(async res => {
    if (res.data && res.data.type === 'application/json') {
      const text = await res.data.text()
      if (text && parseInt(JSON.parse(text).code) === 404) {
        throw new Error('请求的图片不存在')
      }
    }
    return res
  })
}
