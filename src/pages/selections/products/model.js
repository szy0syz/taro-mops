import Taro from '@tarojs/taro'
import * as Service from '../service';

export default {
  namespace: 'productSelect',
  state: {
    searchTypes: [
      {
        key: '商品名',
        value: 'productName'
      },
      {
        key: '类别',
        value: 'customerType'
      },
      {
        key: '备注',
        value: 'customerRemark'
      }
    ],
    prevModel: '',
    keyword: '',
    products: [],
    productList: []
  },
  effects: {
    * fetchProducts({ payload }, { put, call }) {
      const res = yield call(Service.getMaterials, payload)
      yield put({
        type: 'save',
        payload
      })
      if (res && res.data && res.data.length > 0) {
        yield put({
          type: 'save',
          payload: {
            productList: res.data
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
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
