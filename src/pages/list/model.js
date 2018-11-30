import dayjs from 'dayjs'
import * as Service from './service'

function calcTotal(ary, key) {
  return ary.reduce((sum, item) => { return sum += item[key] }, 0)
}

export default {
  namespace: 'list',
  state: {
    current: 0,
    keyword: 'ppp',
    dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD'),
    billTags: [],
    saleSearchTypes: ['客户', '单号', '备注'],
    tagList: {
      paid: '已收款',
      shipped: '已发货',
      received: '已收货',
      uploaded: '已同步'
    },
    saleSearchType: 0,
    saleOrderAmount: 0,
    saleOrders: [{
      _id: '111',
      amount: 999,
      billDate: '2018-11-24',
      customer: { CustomerName: '张三' },
      number: 'SO2018112432893829'
    }],
    orders: [
      {
        _id: '111',
        amount: 999,
        billDate: '2018-11-24',
        customer: { CustomerName: '张三' },
        number: 'SO2018112432893829'
      }
    ]
  },
  effects: {
    * loadSaleOrders(_, { call, select, put }) {
      const { dateStart, dateEnd, billTags } = yield select(state => state.list)
      let { data: saleOrders } = yield call(Service.loadSaleOrders, { dateStart, dateEnd, billTags })

      let saleOrderAmount = 0
      // console.log('Array.isArray(saleOrders) && saleOrders.length > 0', Array.isArray(saleOrders) && saleOrders.length > 0)
      if (Array.isArray(saleOrders) && saleOrders.length > 0) {
        saleOrderAmount = saleOrders.reduce((sum, item) => sum += calcTotal(item.products, 'amount'), 0)
        saleOrders = saleOrders.map(order => {
          order.billDate = dayjs(order.billDate).format('YYYY-MM-DD HH:mm:ss')
          order.amount = calcTotal(order.products, 'amount')
          return order
        })
      }

      yield put({
        type: 'save',
        payload: {
          saleOrderAmount,
          saleOrders,
          orders: saleOrders
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
