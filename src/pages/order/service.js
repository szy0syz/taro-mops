import Request from '../../utils/request'

export const get = () => Request({
  url: '/saleorders',
  method: 'GET'
})

export const post = data => Request({
  url: '/saleorders',
  method: 'POST',
  data
})
