export default {
  namespace: 'common',
  state: {
    num: 0,
    version: '1.0.8'
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};