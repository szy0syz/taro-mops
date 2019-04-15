import dayjs from 'dayjs'
import { fetchOrdersByCust } from '../service'

export default {
  namespace: 'orderStats',
  state: {
    dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
    dateEnd: dayjs().endOf('month').format('YYYY-MM-DD'),
    customer: { CustomerName: '请选择客户' },
    bills: [],
    allAmount: 0,
    allDefAmount: 0,
    isOnlyMe: true
  },
  effects: {
    * fetch(_, { call, select, put }) {
      const { customer, dateStart, dateEnd } = yield select(state => state.orderStats)

      if (customer && customer.FID) {
        const { data = {}, success } = yield call(fetchOrdersByCust, { customerFID: customer.FID, dateStart, dateEnd })
        if (success) {

          yield put({
            type: 'save',
            payload: { 
              bills: data,
              allAmount: data.reduce((sum,curt) => sum += curt.totalAmount, 0).toFixed(2),
              allDefAmount: data.reduce((sum,curt) => sum += curt.totalDefAmount, 0).toFixed(2),
            }
          })
        }
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
