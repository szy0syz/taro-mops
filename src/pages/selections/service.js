import Request from '../../utils/request'


export const getCustomers = data => Request({
  url: '/eas/customers',
  method: 'GET',
  data,
})

export const getMaterials = data => Request({
  url: '/eas/materials',
  method: 'GET',
  data,
})
