import Request from '../../../utils/request'

export const fetchById = ({basePath, id}) => Request({
  url: `/eas/${basePath}/${id}`,
  method: 'GET'
})

export const syncOrder = data => Request({
  url: '/eas/syncOrder',
  method: 'POST',
  data
})
