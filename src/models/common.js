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
    saleStatusAry: [
      {
        value: 'created',
        label: '新增中'
      }, {
        value: 'saved',
        label: '已保存'
      }, {
        value: 'submitted',
        label: '已提交'
      }, {
        value: 'invalid',
        label: '已作废'
      }, {
        value: 'audited',
        label: '已审核'
      }, {
        value: 'published',
        label: '已发布'
      }],
    arBillStatusAry: [
      {
        value: 'unkonw',
        label: '默认'
      }, {
        value: 'saved',
        label: '保存'
      }, {
        value: 'submitted',
        label: '提交'
      }, {
        value: 'audited',
        label: '已审核'
      }
    ],
    version: '1.0.3'
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
