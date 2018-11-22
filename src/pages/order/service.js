import Request from '../../utils/request'

export const get = () => Request({
  url: '/saleorder',
  method: 'GET'
})

export const post = data => Request({
  url: '/saleorder',
  method: 'POST',
  data
})
