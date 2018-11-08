// import * as homeApi from './service';

export default {
  namespace: 'productSelect',
  state: {
    searchType: {
      key: '商品名',
      value: 'productName'
    },
    searchTypes: [
      {
        key: '商品名',
        value: 'productName'
      },
      {
        key: '类别',
        value: 'customerType'
      },
      {
        key: '备注',
        value: 'customerRemark'
      }
    ],
    productList: [
      {
        fid: 'v11',
        name: '敌杀死',
        model: '100g 水剂',
        price: 28.00,
      },
      {
        fid: 'v12',
        name: '敌杀死',
        model: '100g 水剂',
        price: 28.00,
      },
      {
        fid: 'v13',
        name: '敌杀死',
        model: '100g 水剂',
        price: 28.00,
      },
      {
        fid: 'v14',
        name: '敌杀死',
        model: '100g 水剂',
        price: 258.00,
      },
      {
        fid: 'v15',
        name: '敌杀死',
        model: '100g 水剂',
        price: 238.00,
      },
      {
        fid: 'v16',
        name: '敌杀死',
        model: '101g 水剂',
        price: 228.00,
      }
    ]
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    init() { }
  },
}
