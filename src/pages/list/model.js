import Taro from '@tarojs/taro';

export default {
  namespace: 'list',
  state: {
    current: 0,
  },

  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    }
  },

};
