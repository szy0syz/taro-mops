import Request from '../../utils/request';


// 获取手机验证码
export const getSms = data => Request({
  url: '/common/sms',
  method: 'GET',
  data,
});

// 获取语音验证码
export const getSmsVoice = data => Request({
  url: '/common/voice',
  method: 'GET',
  data,
});

// 发券
export const getReceive = data => Request({
  url: '/coupon/receive-v2',
  method: 'POST',
  data,
});

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
