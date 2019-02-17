import Request from '../../utils/request'

export const get = () => Request({
  url: '/saleOrders',
  method: 'GET'
})

export const post = data => Request({
  url: '/saleOrders',
  method: 'POST',
  data
})