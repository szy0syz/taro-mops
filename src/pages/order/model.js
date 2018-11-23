import * as Service from './service'

export default {
  namespace: 'order',
  state: {
    billDate: '',
    customer: {},
    products: [],
    staff: '',
    amountRec: 0.00,
    storekeeper: {
      name: '李四四',
      id: 'lss'
    },
    paymentMethod: {
      name: '银行汇款',
      id: 'v1'
    },
    billTags: [],
    remark: '',
    tagList: [
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
  effects: {
    * create({payload}, { call }) {
      const res = yield call(Service.post, payload)
      console.info('创建订单',res.data.number)
    }
  },
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
