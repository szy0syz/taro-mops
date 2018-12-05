import Request from '../../utils/request';

///////////

export const code2Session = data => Request({
  url: '/public/mina/openidAndSessionKey',
  method: 'get',
  data
})

export const cryptData = data => Request({
  url: '/public/mina/cryptData',
  method: 'post',
  data
})

export const login = data => Request({
  url: '/public/mina/login',
  method: 'post',
  data
})

export const vaild = data => Request({
  url: '/public/mina/vaild',
  method: 'post',
  data
})
