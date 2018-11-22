import Request from '../../utils/request'

export const postMaterials = data => Request({
  url: '/eas/materials',
  method: 'POST',
  data,
})

export const getMaterials = data => Request({
  url: '/eas/materials',
  method: 'GET',
  data,
})


