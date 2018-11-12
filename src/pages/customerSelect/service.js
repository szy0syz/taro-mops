import Request from '../../utils/request';

// 老用户登录
export const postCustomers = data => Request({
  url: '/bd/customers',
  method: 'POST',
  data,
});

// 获取手机验证码
export const getCustomers = data => Request({
  url: '/bd/customers',
  method: 'GET',
  data,
});


