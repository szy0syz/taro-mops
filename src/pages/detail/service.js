import Request from '../../utils/request'

export const fetchById = _id => Request({
  url: `/saleorders/${_id}`,
  method: 'GET'
})

export const syncOrder = data => Request({
  url: '/eas/syncOrder',
  method: 'POST',
  data
})
