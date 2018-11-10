import Taro from '@tarojs/taro';

export default {
  namespace: 'list',
  state: {
    current: 0,
    dateStart: '2018-10-28',
    dateEnd: '2018-11-01',
    saleSearchTypes: ['客户', '单号', '备注'],
    saleSearchType: 0,
    saleOrders: {
      total: 842090.00,
      data: [
        {
          datetime: '2018-10-21 14:34',
          customer: '版纳勐海李1',
          total: 16030.00,
          number: '2018102916340001',
          tags: [ 
            {
              value: 'shipped',
              key: '已发货'
            }, {
              value: 'paid',
              key: '已收款'
            }, {
              value: 'uploaded',
              key: '已同步'
            }, {
              value: 'received',
              key: '已收货'
            }]
        },
        {
          datetime: '2018-10-22 16:34',
          customer: '版纳勐海李2',
          total: 1258.00,
          number: '2018102916340055',
          tags: [
            {
              value: 'shipped',
              key: '已发货'
            }, {
              value: 'paid',
              key: '已收款'
            }
          ]
        },
        {
          datetime: '2018-10-23 17:34',
          customer: '版纳勐海李3',
          total: 44440.00,
          number: '2018102916340023',
          tags: [
            {
              value: 'paid',
              key: '已收款'
            }
          ]
        },
        {
          datetime: '2018-10-24 18:34',
          customer: '版纳勐海李4',
          total: 9999.00,
          number: '2018102916340001',
          tags: []
        }
      ]
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
