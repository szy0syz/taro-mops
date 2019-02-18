import dayjs from 'dayjs'
import * as Service from './service'

export default {
  namespace: 'eas_detail',
  state: {
    //
    id: '',
    bill: null,
    entries: [],
    basePath: '',
    labelData: {
      saleIssues: {
        customerLabel: '销售客户',
        billTypeLabel: '销售类型',
        AmountLabel: '销售金额',
        remarkLabel: '审批原因'
      },
      arBills: {
        customerLabel: '应收客户',
        billTypeLabel: '应收类型',
        AmountLabel: '应收金额',
        remarkLabel: '摘要'
      }
    },
    // --------
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

    * syncOrder({ payload }, { select, call, put }) {
      const { orderTags } = yield select(state => state.detail)
      const res = yield call(Service.syncOrder, payload)
      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            isSynced: true,
            orderTags: Array.from(new Set([...orderTags, 'uploaded']))
          }
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
        orderTags: []
      }
      return { ...state, ...newBillData }
    }
  },
};
