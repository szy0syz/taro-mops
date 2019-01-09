import Request from '../../utils/request';

export const homepage = data => Request({
  url: '/homepage-v3',
  method: 'GET',
  data,
})


export const getVersion = () => Request({
  url: '/public/version',
  method: 'GET'
})
export const product = data => Request({
  url: '/product/filter',
  method: 'GET',
  data,
})
