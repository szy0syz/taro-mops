// import * as homeApi from './service';

export default {
  namespace: 'customerSelect',
  state: {
    searchType: {
      key: '客户名',
      value: 'customerName'
    },
    searchTypes: [
      {
        key: '客户名',
        value: 'customerName'
      },
      {
        key: '电话',
        value: 'customerPhone'
      },
      {
        key: '备注',
        value: 'customerRemark'
      }
    ]
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    init() { }
  },
}
