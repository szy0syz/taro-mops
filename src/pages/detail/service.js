import Request from '../../utils/request'

export const fetchById = _id => Request({
  url: `/saleorders/${_id}`,
  method: 'GET'
})

export const post = data => Request({
  url: '/saleorders',
  method: 'POST',
  data
})
