import dayjs from 'dayjs'
import dateHelp from '../../utils/date'
import * as Service from './service'

function calcTotal(ary, key) {
  return ary.reduce((sum, item) => { return sum += item[key] }, 0)
}

export default {
  namespace: 'list',
  state: {
    current: 0,
    dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD'),    // TODO: DRY!!!!
    saleSearchTypes: ['客户', '单号', '备注'],
    siSearchTypes: ['客户', '单号'],
    arSearchTypes: ['客户', '单号'],
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
    showTagSelected: false,
    showDateSelected: false,
    ///////
    siBills: [],
    arBills: [],
    dateList: {
      saleIssues: {
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')   // TODO: DRY!!!!
      },
      arBills: {
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD')   // TODO: DRY!!!!
      }
    },
    //---------------//
    tabIndex: 0,
    tabData: [
      {
        baseName: 'saleOrders',
        dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        dateEnd: dayjs().format('YYYY-MM-DD'),
        showDateMenu: false,
        showTagMenu: false,
        fetchTypes: ['客户', '单号', '备注'],
        fetchType: 0,
        fetchKeyword: '',
        fetchTags: [],
        bills: []
      },
      {
        baseName: 'saleIssues',
        dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        dateEnd: dayjs().format('YYYY-MM-DD'),
        showDateMenu: false,
        showTagMenu: false,
        fetchTypes: ['客户', '单号', '审批原因'],
        fetchType: 1,
        fetchKeyword: '',
        fetchTags: [],
        bills: []
      },
      {
        baseName: 'arBills',
        dateStart: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        dateEnd: dayjs().format('YYYY-MM-DD'),
        showDateMenu: false,
        showTagMenu: false,
        fetchTypes: ['客户', '单号', '事由'],
        fetchType: 0,
        fetchKeywords: '',
        fetchTags: [],
        bills: []
      }
    ],
    soBills: [],
    siBills: [],
    arBills: []
  },
  effects: {
    * fetchBills(_, { call, select, put }) {
      let { tabIndex, tabData } = yield select(state => state.list)

      const data = tabData[tabIndex]
      let payload = {
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        keyword: data.fetchKeyword,
        keytype: data.fetchType,
        tags: data.fetchTags
      }
      let { success, data: bills } = yield call(Service.fetchBills, { payload, baseName: data.baseName })

      // -----------------------
      // TODO:  这段代码写的太曲折了，得重构
      if (success) {
        const tt = Object.assign({}, tabData[tabIndex], { bills })
        console.log('&&&%%####~~~', tt === tabData[tabIndex])
        tabData[tabIndex] = tt
        payload = {}
        switch (tabIndex) {
          case 0:
            payload.soBills = bills
            break
          case 1:
            payload.siBills = bills
            break
          case 2:
            payload.arBills = bills
            break
        }
        payload = Object.assign(payload, { tabData: [...tabData] })
        // ---------------------
        yield put({
          type: 'save',
          payload
        })
      } else {
        console.log('error')
      }
    },

    * fetchOrders(_, { call, select, put }) {
      const { orderKeyType, orderKeyword, dateStart, dateEnd, orderTags } = yield select(state => state.list)
      let { success, data: saleOrders } = yield call(Service.loadSaleOrders, { orderKeyType, orderKeyword, dateStart, dateEnd, orderTags })
      let saleOrderAmount = 0

      if (success) {
        // 只有查询的订单有数据时才进行业务计算
        if (Array.isArray(saleOrders) && saleOrders.length > 0) {
          saleOrderAmount = saleOrders.reduce((sum, item) => sum += calcTotal(item.products, 'amount'), 0)
          saleOrders = saleOrders.map(order => {
            order.billDate = dayjs(order.billDate).format('YYYY-MM-DD HH:mm:ss')
            order.amount = calcTotal(order.products, 'amount')
            return order
          })
        }
        // 否者直接更新state
        yield put({
          type: 'save',
          payload: {
            saleOrderAmount,
            saleOrders
          }
        })
      }

      return success
    },
    * fetchByCalendar({ payload }, { put }) {
      const { index } = payload
      let dateStart, dateEnd
      switch (index) {
        case 0: // 本日
          dateStart = dateEnd = dayjs().format('YYYY-MM-DD')
          break;
        case 1: // 上周
          dateStart = dateHelp.getLastWeekStartDate()
          dateEnd = dateHelp.getLastWeekEndDate()
          break;
        case 2: // 本周
          dateStart = dateHelp.getWeekStartDate()
          dateEnd = dateHelp.getWeekEndDate()
          break;
        case 3: // 上月
          dateStart = dateHelp.getLastMonthStartDate()
          dateEnd = dateHelp.getLastMonthStartDate()
          break;
        case 4: // 本月
          dateStart = dateHelp.getMonthStartDate()
          dateEnd = dateHelp.getMonthEndDate()
          break;
        case 5: // 上季度
          dateStart = dateHelp.getLastQuarterStartDate()
          dateEnd = dateHelp.getLastQuarterEndDate()
          break;
        case 6: // 本季度
          dateStart = dateHelp.getQuarterStartDate()
          dateEnd = dateHelp.getQuarterEndDate()
          break;
        case 7: // 去年
          dateStart = dayjs().startOf('year').subtract(1, 'year').format('YYYY-MM-DD')
          dateEnd = dayjs().endOf('year').subtract(1, 'year').format('YYYY-MM-DD')
          break;
        case 8: // 本年
          dateStart = dayjs().startOf('year').format('YYYY-MM-DD')
          dateEnd = dayjs().endOf('year').format('YYYY-MM-DD')
          break;
        default:
          break;
      }
      if (dateStart && dateEnd) {
        yield put({
          type: 'save',
          payload: { dateStart, dateEnd }
        })
        yield put({
          type: 'fetchOrders'
        })
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    saveTabData(state, { payload }) {
      return { ...state, tabData: [...payload] }
    }
  }
}
