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
      try {
        const res = yield call(Service.getCustomers, payload)
        yield put({
          type: 'save',
          payload
        })
        if (res && res.data && res.data.length > 0) {
          yield put({
            type: 'save',
            payload: {
              customerList: res.data
            }
          })
        } else {
          const { error } = res;
          if (!error === 'request:fail') {
            Taro.showToast({
              title: '没有对应客户',
              icon: 'none',
              duration: 2200,
            });
          }
        }
      } catch ({ errMsg = 'error' }) {
        console.log('====================================');
        console.log(errMsg)
        console.log('====================================');
        return;
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
