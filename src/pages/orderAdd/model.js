// import * as homeApi from './service';

export default {
  namespace: 'order',
  state: {
    billDate: '',
    customer: '',
    products: [],
    staff: '',
    storekeeper: {
      name: '李四四',
      id: 'lss'
    },
    amountRec: 0,
    paymentMethod: {
      key: '银行汇款',
      value: 'v1'
    },
    billTags: [],
    payTypes: [
      {
        key: '银行汇款',
        value: 'v1'
      },
      {
        key: '现金',
        value: 'v2'
      },
      {
        key: '微信',
        value: 'v3'
      },
      {
        key: '支付宝',
        value: 'v4'
      }
    ],
    storekeeperList: [
      {
        name: '李四四',
        id: 'lss'
      },
      {
        name: '王五五',
        id: 'wmz'
      }
    ]
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    init(state) {
      const billDate = new Date().toLocaleDateString().split(' ')[0].replace(/\//g, '-')
      let initDate = {
        billDate
      }
      return {...state, ...initDate}
    }
  },
};
