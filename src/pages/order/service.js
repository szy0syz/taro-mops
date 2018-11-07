import Request from '../../utils/request'

export const init = () => Request({
  url: '/orderInit',
  method: 'GET'
})

export const get = () => Request({
  url: '/order',
  method: 'GET'
})

export const post = data => Request({
  url: '/order',
  method: 'POST',
  data
})
