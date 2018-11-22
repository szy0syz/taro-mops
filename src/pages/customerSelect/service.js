import Request from '../../utils/request'

export const postCustomers = data => Request({
  url: '/eas/customers',
  method: 'POST',
  data,
})

export const getCustomers = data => Request({
  url: '/eas/customers',
  method: 'GET',
  data,
})


