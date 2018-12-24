// import * as Service from './service'

export default {
  namespace: 'userMgmt',
  state: {
  },
  effects: {
    // * fetch({ payload }, { put, call }) {
    // }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
