import Request from '../../utils/request'


export const fetchUsers = data => Request({
  url: '/mina/users',
  method: 'GET',
  data,
})


