export default {
  namespace: 'common',
  state: {
    version: '1.0.8',
    // ---------------------- //
    orderTagList: [
      {
        value: 'shipped',
        label: '已发货'
      }, {
        value: 'paid',
        label: '已收款'
      }, {
        value: 'uploaded',
        label: '已同步'
      }, {
        value: 'received',
        label: '已收货'
      }],
    saleStatusAry: [
      {
        value: 'created',
        label: '新增中'
      }, {
        value: 'saved',
        label: '已保存'
      }, {
        value: 'submitted',
        label: '已提交'
      }, {
        value: 'invalid',
        label: '已作废'
      }, {
        value: 'audited',
        label: '已审核'
      }, {
        value: 'published',
        label: '已发布'
      }],
    arBillStatusAry: [
      {
        value: 'unkonw',
        label: '默认'
      }, {
        value: 'saved',
        label: '保存'
      }, {
        value: 'submitted',
        label: '提交'
      }, {
        value: 'audited',
        label: '已审核'
      }
    ],
    // ----------------------// 
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};