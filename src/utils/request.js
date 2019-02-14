import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

let token = Taro.getStorageSync('token')
const request_data = {}


export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  // TODO: 临时解决
  token = Taro.getStorageSync('token')
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res

    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
      }
      // if (data.success && data.msg) {
      if (data.success && data.msg) {
        Taro.showToast({
          title: `${data.msg}`,
          icon: 'success',
          mask: true,
        })
      }
      return data;
    } else if(statusCode === 401) {
      // 权限错误
      Taro.navigateTo({ url: '/pages/login/index?toast=1&duration=3000&msg=鉴权已失效'})
    } 
    else {
      Taro.showToast({
        title: `${data.error}`,
        icon: 'none',
      })
      // throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}
