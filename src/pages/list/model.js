import dayjs from 'dayjs'
import * as Service from './service'

function calcTotal(ary, key) {
  return ary.reduce((sum, item) => { return sum += item[key] }, 0)
}

export default {
  namespace: 'list',
  state: {
    current: 0,
    dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD'),
    saleSearchTypes: ['客户', '单号', '备注'],
    tagList: {
      paid: '已收款',
      shipped: '已发货',
      received: '已收货',
      uploaded: '已同步'
    },
    orderTags: [],
    orderKeyword: '',
    orderKeyType: 0,
    saleOrderAmount: 0,
    saleOrders: [],
    showTagSelected: false
  },
  effects: {
    * loadSaleOrders(_, { call, select, put }) {
      const { dateStart, dateEnd, orderTags } = yield select(state => state.list)
      let { data: saleOrders } = yield call(Service.loadSaleOrders, { dateStart, dateEnd, orderTags })

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
          saleOrders
        }
      })
    },
    * fetchOrders(_, { call, select, put }) {
      const { orderKeyType, orderKeyword, dateStart, dateEnd, orderTags } = yield select(state => state.list)
      // console.log(orderKeyType, orderKeyword, dateStart, dateEnd, orderTags)
      let { success, data: saleOrders } = yield call(Service.loadSaleOrders, { orderKeyType, orderKeyword, dateStart, dateEnd, orderTags })
      let saleOrderAmount = 0

      if (success && Array.isArray(saleOrders) && saleOrders.length > 0) {
        saleOrderAmount = saleOrders.reduce((sum, item) => sum += calcTotal(item.products, 'amount'), 0)
        saleOrders = saleOrders.map(order => {
          order.billDate = dayjs(order.billDate).format('YYYY-MM-DD HH:mm:ss')
          order.amount = calcTotal(order.products, 'amount')
          return order
        })

        yield put({
          type: 'save',
          payload: {
            saleOrderAmount,
            saleOrders,
            orders: saleOrders
          }
        })
      }

      return success
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
