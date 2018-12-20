import dayjs from 'dayjs'
import dateHelp from '../../utils/date'
import * as Service from './service'

export default {
  namespace: 'cusAR',
  state: {
    dateStart: '2018-11-24',
    dateEnd: '2018-12-22'
  },
  effects: {
    * fetch(_, { call, select, put }) {

    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
