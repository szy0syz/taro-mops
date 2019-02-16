import Taro from '@tarojs/taro';
import { fetchInventory } from './service';

export default {
  namespace: 'reports',
  state: {
    invt_kw: '',
    inventory: []
  },

  effects: { 
    * getInventory({ payload }, { put, call }) {
      const { invt_kw } = payload
      const res = yield call(fetchInventory, { keyword: invt_kw })
      const { data =[], success } = res;
      if (success) {
        yield put({
          type: 'save',
          payload: {
            invt_kw,
            inventory: data
          }
        })
      } else {
        Taro.showToast({ title: '获取数据失败', icon: 'none' })
      }
    }
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
