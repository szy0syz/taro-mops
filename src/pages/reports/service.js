
import Request from '../../utils/request';

export const fetchInventory = data => Request({
  url: '/eas/inventory',
  method: 'GET',
  data
})

export const fetchARdataByCustFID = data => Request({
  url: '/eas/customerAR',
  method: 'GET',
  data
})

