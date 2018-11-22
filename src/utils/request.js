import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

const request_data = {
  platform: 'wap',
  rent_mode: 2,
};

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res
    console.log(res)
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
      }
      if (data.success && data.msg) {
        Taro.showToast({
          title: `${data.msg}`,
          icon: 'none',
          mask: true,
        })
      }
      return data;
    } else {
      Taro.showToast({
        title: `${data.msg}`,
        icon: 'none',
        mask: true,
      })
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}
