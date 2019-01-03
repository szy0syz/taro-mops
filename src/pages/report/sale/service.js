import Request from '../../../utils/request'

export const loadSaleOrders = data => Request({
  url: '/saleorders',
  method: 'GET',
  data
})

export const fetch = data => Request({
  url: '/eas/saleStatsByCate',
  method: 'GET',
  data
})

export const load = data => Request({
  url: '/product/filter',
  method: 'GET',
  data
})
