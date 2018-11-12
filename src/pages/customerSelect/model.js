import * as Service from './service';

export default {
  namespace: 'customerSelect',
  state: {
    searchType: {
      key: '客户名',
      value: 'customerName'
    },
    searchTypes: [
      {
        key: '客户名',
        value: 'customerName'
      },
      {
        key: '电话',
        value: 'customerPhone'
      },
      {
        key: '备注',
        value: 'customerRemark'
      }
    ]
  },
  effects: {
    * getCustomers(_, {put, call}) {
      // select some query parms
      // const res = yield call(Service.getCustomers)
      // console.log(res)
      yield put({
        type: 'common/save',
        payload: {
          customerList: [
            {
              fid: 'v111',
              name: 'vvv1昆明大客户',
              area: '昆明地区',
              amountRec: 0.00
            },
            {
              fid: 'v222',
              name: 'vvv2玉溪小客户222',
              area: '玉溪地区',
              amountRec: 0.00
            },
            {
              fid: 'v333',
              name: 'vvv3大理中客户333',
              area: '大理地区',
              amountRec: 0.00
            },
            {
              fid: 'v444',
              name: 'vvv4楚雄大客户444',
              area: '楚雄地区',
              amountRec: 0.00
            },
            {
              fid: 'v555',
              name: 'vvv5版纳大客户1212',
              area: '版纳地区',
              amountRec: 0.00
            }
          ]
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    init() { }
  },
}
