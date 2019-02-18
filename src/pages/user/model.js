export default {
  namespace: 'user',
  state: {
    list: [],
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
