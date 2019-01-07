import Request from '../../utils/request'


export const fetchUsers = data => Request({
  url: '/minaUsers',
  method: 'GET',
  data,
})

export const postUser = data => Request({
  url: '/minaUsers',
  method: 'POST',
  data,
})
