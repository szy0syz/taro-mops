import Taro from '@tarojs/taro'
import * as Service from './service';

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
    productList: []
  },
  effects: {
    * fetchProducts({ payload }, { put, call }) {
      const res = yield call(Service.getMaterials, payload)
      yield put({
        type: 'save',
        payload
      })
      if (res.data.length > 0) {
        yield put({
          type: 'save',
          payload: {
            productList: res.data
          }
        })
      } else {
        Taro.showToast({
          title: '没有此商品',
          icon: 'none'
        });
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
