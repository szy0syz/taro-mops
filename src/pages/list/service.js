import Request from '../../utils/request';

export const loadSaleOrders = data => Request({
  url: '/saleorder',
  method: 'GET',
  data,
})

export const load = data => Request({
  url: '/product/filter',
  method: 'GET',
  data,
})
