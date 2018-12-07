import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    mobile: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').mobile : '',
    nickname: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').nickname : '',
    new_user: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').new_user : '',
    is_has_buy_card: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').is_has_buy_card : '',
    erroMessage: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').erroMessage : '',
    customerList: Taro.getStorageSync('customerList') ? Taro.getStorageSync('customerList') : [],
    orderTagList: [
      {
        value: 'shipped',
        label: '已发货'
      }, {
        value: 'paid',
        label: '已收款'
      }, {
        value: 'uploaded',
        label: '已同步'
      }, {
        value: 'received',
        label: '已收货'
      }],
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
