import axios from 'axios'
import qs from 'qs'
// 创建 axios 实例

const service = axios.create({
  baseURL: "http://taogezhenshuai.fun:3002",
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  // 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  // 请求数据转换
  transformRequest: [(data) => {
    return qs.stringify(data)
  }]
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 让每个请求携带自定义 token
  const start = document.cookie.indexOf('token')
    config.headers['Authorization'] = document.cookie.slice(start).split(';')[0].split('=')[1]
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = {msg}
    } else {
      response.data.msg = msg
    }
    //拦截异常（通知）
    Notification({
      title: '提示',
      message: msg,
      type: 'error'
    })
  }
  return response
})

const showStatus = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

export default service