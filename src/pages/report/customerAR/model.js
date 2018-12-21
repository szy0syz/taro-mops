import dayjs from 'dayjs'
import dateHelp from '../../utils/date'
import { fetchByCustomerFID } from './service'

export default {
  namespace: 'cusAR',
  state: {
    dateStart: '2018-11-24',
    dateEnd: '2018-12-22',
    customerFID: '',
    customer: { CustomerName: '请选择客户' },
    arBills: [],
    crBills: [],
    beginingAmount: 0,
    arCurtAmount: 0,
    crCurtAmount: 0,
    endingAmount: 0
  },
  effects: {
    * fetch(_, { call, select, put }) {
      const customerFID = yield select(state => state.cusAR)
      console.log(customerFID)

      const data = yield call(Service.fetchByCustomerFID, { customerFID })
      console.log(data)
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
