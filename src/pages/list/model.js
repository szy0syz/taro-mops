import Taro from '@tarojs/taro';

export default {
  namespace: 'list',
  state: {
    current: 0,
    dateStart: '2018-10-28',
    dateEnd: '2018-11-01'
  },

  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    }
  },

};
