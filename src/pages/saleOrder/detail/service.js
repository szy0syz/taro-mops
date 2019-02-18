import Request from '../../../utils/request'

export const fetchById = _id => Request({
  url: `/saleOrders/${_id}`,
  method: 'GET'
})

export const patchOrder = data => Request({
  url: `/saleOrders`,
  method: 'PUT',
  data
})

export const syncOrder = data => Request({
  url: '/eas/saleIssues',
  method: 'POST',
  data
})
