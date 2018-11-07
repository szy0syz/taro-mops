// import * as homeApi from './service';

export default {
  namespace: 'order',
  state: {
    billDate: '',
    customer: '',
    products: [
      {
        id: '111',
        name: '敌杀死',
        model: '200g 水乳剂',
        price: 23.00,
        qty: 12,
        amount: 666.00,
        url: 'http://cdn.jerryshi.com/picgo/20181104150040.png'
      },
      {
        id: '222',
        name: '敌百强',
        model: '200g 水乳剂',
        qty: 22,
        price: 23.00,
        amount: 23232.00,
        url: 'http://cdn.jerryshi.com/picgo/20181104150040.png'
      },
      {
        id: '333',
        name: '敌百万',
        model: '201g 水乳剂',
        qty: 33,
        price: 23.00,
        amount: 1232.00,
        url: 'http://cdn.jerryshi.com/picgo/20181104150040.png'
      },
      {
        id: '333',
        name: '敌百万',
        model: '201g 水乳剂',
        qty: 55,
        price: 23.00,
        amount: 77888.00,
        url: 'http://cdn.jerryshi.com/picgo/20181104150040.png'
      }
    ],
    staff: '',
    amountRec: 0,
    storekeeper: {
      name: '李四四',
      id: 'lss'
    },
    paymentMethod: {
      name: '银行汇款',
      id: 'v1'
    },
    billTags: [],
    tagList: [
      {
        value: 'v1',
        label: '已发货'
      }, {
        value: 'v2',
        label: '已收款'
      }, {
        value: 'v3',
        label: '已同步'
      }, {
        value: 'v4',
        label: '已收货'
      }],
    payTypes: [
      {
        name: '银行汇款',
        id: 'v1'
      },
      {
        name: '现金',
        id: 'v2'
      },
      {
        name: '微信',
        id: 'v3'
      },
      {
        name: '支付宝',
        id: 'v4'
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
      return { ...state, ...initDate }
    },
    empty(state) {
      const newBillData = {
        billDate: new Date().toLocaleDateString().split(' ')[0].replace(/\//g, '-'),
        customer: '',
        products: [],
        staff: null,
        amountRec: 0.00,
        storekeeper: null,
        paymentMethod: null,
        billTags: []
      }
      return { ...state, ...newBillData }
    }
  },
};
