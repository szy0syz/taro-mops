import Request from '../../utils/request'

export const fetchById = ({basePath, fid}) => Request({
  url: `/eas/${basePath}/${fid}`,
  method: 'GET'
})

export const syncOrder = data => Request({
  url: '/eas/syncOrder',
  method: 'POST',
  data
})
