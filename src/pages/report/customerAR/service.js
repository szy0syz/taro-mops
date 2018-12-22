import Request from '../../../utils/request'

export const fetchByCustomerFID = data => Request({
  url: '/eas/customerAR',
  method: 'GET',
  data
})
