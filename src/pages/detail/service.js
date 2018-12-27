import Request from '../../utils/request'

export const fetchById = _id => Request({
  url: `/saleorders/${_id}`,
  method: 'GET'
})

export const patchOrder = data => Request({
  url: `/saleorders`,
  method: 'PUT',
  data
})

export const syncOrder = data => Request({
  url: '/eas/syncOrder',
  method: 'POST',
  data
})
