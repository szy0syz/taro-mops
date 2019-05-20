import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import * as Service from '../service'


export default {
  namespace: 'order',
  state: {
    billDate: dayjs().format('YYYY-MM-DD'),
    customer: {},
    products: [],
    staff: '',
    amountRec: 0.00,
    paymentMethod: {
      name: '银行汇款',
      id: 'v1'
    },
    billTags: [],
    orderTags: [],
    remark: '',
    isSynced: false,
    isRemovedInEAS: false,
    saleIssueBill: null,
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
    ]
  },
  effects: {
    * create({ payload }, { call }) {
      const resp = yield call(Service.post, payload)
      console.log('~~resp~~', resp)
      return resp && resp.success === true
    },
    * init(_, { select, put }) {
      const { userId, userName, easid, easfid } = yield select(state => state.login)
      yield put({
        type: 'save',
        payload: {
          staff: { userId, userName, easid, easfid }
        }
      })
    },
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
        billDate: dayjs().format('YYYY-MM-DD'),
        orderTags: [],
        customer: '',
        products: [],
        remark: '',
        amountRec: 0.00
      }
      return { ...state, ...newBillData }
    }
  },
};
