import dayjs from 'dayjs'
import dateHelp from '../../utils/date'
import { fetchByCustomerFID } from './service'

export default {
  namespace: 'cusAR',
  state: {
    dateStart: '2018-12-01',
    dateEnd: '2018-12-31',
    customer: { CustomerName: '请选择客户' },
    arBills: [],
    crBills: [],
    beginingAmount: 0,
    arCurtAmount: 0,
    crCurtAmount: 0,
    endingAmount: 0,
    arr1: []
  },
  effects: {
    * fetch(_, { call, select, put }) {
      const { customer, dateStart, dateEnd } = yield select(state => state.cusAR)

      if (customer && customer.FID) {
        const { data = {}, success } = yield call(fetchByCustomerFID, { customer: customer.FID, dateStart, dateEnd })
        console.log('model fetch', data)
        if (success) {
          yield put({
            type: 'save',
            payload: {
              arBills: data.arBills,
              crBills: data.crBills,
              beginingAmount: data.beginingAmount,
              arCurtAmount: data.arCurtAmount,
              crCurtAmount: data.crCurtAmount,
              endingAmount: data.endingAmount,
              arr1: ['dog', 'cat', 'bird']
            }
          })
        }
        // const hasChanged = Object.keys(payload).some(item => item === 'dateEnd')
      }

    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
