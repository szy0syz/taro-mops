import { fetchUsers } from './service'

export default {
  namespace: 'userMgmt',
  state: {
    keyword: '',
    userList: []
  },
  effects: {
    * fetch(_, { put, call, select }) {
      const { keyword } = yield select(state => state.userMgmt)
      const res = yield call(fetchUsers, { keyword })
      const { data, success } = res

      success ? (yield put({ type: 'save', payload: { userList: data } })) : null
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
