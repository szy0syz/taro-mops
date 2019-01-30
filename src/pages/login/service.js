import Request from '../../utils/request';

export const code2Session = data => Request({
  url: '/public/openidAndSessKey',
  method: 'post',
  data
})

export const cryptData = data => Request({
  url: '/public/cryptData',
  method: 'post',
  data
})

export const login = data => Request({
  url: '/public/login',
  method: 'post',
  data
})

export const login_v2 = data => Request({
  url: '/public/login_v2',
  method: 'post',
  data
})

export const verify = data => Request({
  url: '/public/verify',
  method: 'post',
  data
})
