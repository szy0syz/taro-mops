import Request from '../../utils/request'

export const loadSaleOrders = data => Request({
  url: '/saleOrders',
  method: 'GET',
  data
})

export const fetchBills = ({ payload: data, baseName }) => {
  let url
  if (/saleOrders/i.test(baseName)) {
    url = `/${baseName}`
  } else {
    url = `/eas/${baseName}`
  }
  return Request({
    url,
    method: 'GET',
    data
  })
}

export const removeBill = id => Request({
  url: `/saleOrders/${id}`,
  method: 'DELETE'
})
