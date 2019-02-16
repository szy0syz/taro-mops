
import Request from '../../utils/request';

export const code2Session = data => Request({
  url: '/public/openidAndSessKey',
  method: 'post',
  data
})

export const fetchInventory = data => Request({
  url: '/eas/inventory',
  method: 'GET',
  data
})

