import Request from '../../utils/request'


export const fetchUsers = data => Request({
  url: '/mina/users',
  method: 'GET',
  data,
})

export const postUser = data => Request({
  url: '/mina/users',
  method: 'POST',
  data,
})
