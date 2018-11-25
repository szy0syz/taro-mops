import Request from '../../../utils/request'

// 获取商品详情
export default (params) => Request({
  url: '/eas/inventory',
  method: 'GET',
  data: params,
})
