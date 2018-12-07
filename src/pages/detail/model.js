import dayjs from 'dayjs'
import * as Service from './service'

export default {
  namespace: 'detail',
  state: {
    _id: '',
    billDate: dayjs().format('YYYY-MM-DD'),
    number: '',
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
    isSynced: false,
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
    * create({ payload }, { call }) {
      const { success } = yield call(Service.post, payload)

      return Boolean(success)
    },

    * syncOrder({ payload }, { call, put }) {
      const res = yield call(Service.syncOrder, payload)
      console.log(res)
      if(res.success) {
        yield put({
          type: 'save',
          payload: { isSynced: true }
        })
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
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
