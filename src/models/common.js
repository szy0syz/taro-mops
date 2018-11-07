import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    mobile: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').mobile :'',
    nickname: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').nickname :'',
    new_user: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').new_user :'',
    is_has_buy_card: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').is_has_buy_card :'',
    erroMessage: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').erroMessage :'',
    customerList: Taro.getStorageSync('customerList') ? Taro.getStorageSync('customerList') : [
      {
        fid: 'v111',
        name: '昆明大客户111ddddddd',
        area: '昆明地区',
        amountRec: 0.00
      },
      {
        fid: 'v222',
        name: '玉溪小客户222',
        area: '玉溪地区',
        amountRec: 0.00
      },
      {
        fid: 'v333',
        name: '大理中客户333',
        area: '大理地区',
        amountRec: 0.00
      },
      {
        fid: 'v444',
        name: '楚雄大客户444',
        area: '楚雄地区',
        amountRec: 0.00
      },
      {
        fid: 'v555',
        name: '版纳大客户1212',
        area: '版纳地区',
        amountRec: 0.00
      }
    ]
  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
