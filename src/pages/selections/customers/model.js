import Taro from '@tarojs/taro'
import * as Service from '../service';

export default {
  namespace: 'customerSelect',
  state: {
    customer: {},
    customerList: [],
    prevModel: '',
    keyword: '',
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
  effects: {
    * getCustomers({ payload }, { put, call }) {
      const res = yield call(Service.getCustomers, payload)
      yield put({
        type: 'save',
        payload
      })
      if (res.data.length > 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data
          }
        })
      } else {
        Taro.showToast({
          title: '没有对应客户',
          icon: 'none',
          duration: 2200,
        });
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