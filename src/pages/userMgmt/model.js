import { fetchUsers, postUser } from './service'

export default {
  namespace: 'userMgmt',
  state: {
    keyword: '',
    userList: [],
    editingUser: {}
  },
  effects: {
    * fetch(_, { put, call, select }) {
      const { keyword } = yield select(state => state.userMgmt)
      const res = yield call(fetchUsers, { keyword })
      const { data, success } = res

      success ? (yield put({ type: 'save', payload: { userList: data } })) : null
    },
    * createUser(_, { call, select }) {
      const { editingUser } = yield select(state => state.userMgmt)
      yield call(postUser, editingUser)
      
      return true
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
