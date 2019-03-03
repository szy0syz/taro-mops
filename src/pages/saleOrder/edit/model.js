import dayjs from 'dayjs'
import * as Service from './service'

export default {
  namespace: 'orderEdit',
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
    orderTags: [],
    express: {
      name: '',
      trackingNumber: '',
      customerPhone: '',
      staffPhone: '',
      isSend: false,
      sendCount: 0,
      sendTime: ''
    },
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

    * update({ payload }, { call }) {
      const { success } = yield call(Service.patchOrder, payload)

      return Boolean(success)
    },

    * syncOrder({ payload }, { select, call, put }) {
      const { orderTags } = yield select(state => state.detail)
      const { success = false } = yield call(Service.syncOrder, payload)
      if (success) {
        yield put({
          type: 'save',
          payload: {
            isSynced: true,
            orderTags: Array.from(new Set([...orderTags, 'uploaded']))
          }
        })
      }
      return success
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    removeProduct(state, { payload }) {
      const { index } = payload;
      state.products.splice(index, 1);
      return { ...state };
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
        orderTags: []
      }
      return { ...state, ...newBillData }
    }
  },
};
