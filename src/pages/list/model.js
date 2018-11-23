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
    billTags: [],
    saleSearchTypes: ['客户', '单号', '备注'],
    saleSearchType: 0,
    saleOrderAmount: 842090.00,
    saleOrders: []
  },
  effects: {
    * loadSaleOrders(_, { call, select, put }) {
      const { dateStart, dateEnd, billTags } = yield select(state => state.list)
      let { data } = yield call(Service.loadSaleOrders, { dateStart, dateEnd, billTags })

      let saleOrderAmount = 0
      if(data.length > 0) {
        saleOrderAmount = data.reduce((sum, item) => sum += calcTotal(item.products, 'amount'), 0)
        data = data.map(item => {
          item.billDate = dayjs(item.billDate).format('YYYY-MM-DD HH:mm:ss')
          item.amount = calcTotal(item.products, 'amount')
          return item
        })
      }
      yield put({
        type: 'save',
        payload: {
          saleOrderAmount,
          saleOrders: data
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
