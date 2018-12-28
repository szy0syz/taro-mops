import * as Service from './service';

export default {
  namespace: 'customerSelect',
  state: {
    searchType: {
      key: '客户名',
      value: 'customerName'
    },
    prevModel: '',
    keyword: '',
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
  effects: {
    * getCustomers({ payload }, { put, call, select }) {
      const { keyword } = yield select(state => state.customerSelect)
      console.log('~~~~~~~~~~~~~~keyword~~~~~~~~~~~~~~~', keyword)
      const res = yield call(Service.getCustomers, payload)
      yield put({
        type: 'save',
        payload
      })
      if (res.data.length > 0) {
        yield put({
          type: 'common/save',
          payload: {
            customerList: res.data
          }
        })
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    init() { }
  },
}
