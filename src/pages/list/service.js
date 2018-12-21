import Request from '../../utils/request'

export const loadSaleOrders = data => Request({
  url: '/saleorders',
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

export const load = data => Request({
  url: '/product/filter',
  method: 'GET',
  data
})
