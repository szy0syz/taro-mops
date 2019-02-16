import { fetchARdataByCustFID } from '../service'

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
  },
  effects: {
    * fetch(_, { call, select, put }) {
      const { customer, dateStart, dateEnd } = yield select(state => state.cusAR)

      if (customer && customer.FID) {
        const { data = {}, success } = yield call(fetchARdataByCustFID, { customer: customer.FID, dateStart, dateEnd })
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
