import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    banner: [],
    brands: [],
    products_list: [],
    page: 1,
    keyword: '',
    swiperData: [
      [
        {
          label: '本月毛利',
          value: 53000.00
        },
        {
          label: '本月销售',
          value: 155000.00
        }
      ],
      [
        {
          label: '本季毛利',
          value: 93000.00
        },
        {
          label: '本季销售',
          value: 355000.00
        }
      ],
      [
        {
          label: '本年毛利',
          value: 9199000.00
        },
        {
          label: '本年销售',
          value: 194876000.00
        }
      ]
    ]
  },
  effects: {
    * load(_, {call, put}) {
      const { status, data } = yield call(homeApi.homepage, {});
      if (status === 'ok') {
        yield put({ type: 'save',payload: {
          banner: data.banner,
          brands: data.brands
        } });
      }
    },
    * product(_, {call, put, select}) {
      const { page, products_list } = yield select(state => state.home);
      const { status, data } = yield call(homeApi.product, {
        page,
        mode: 1,
        type: 0,
        filter: 'sort:recomm|c:330602',
      });
      if (status === 'ok') {
        yield put({ type: 'save',payload: {
          products_list: page > 1 ? [...products_list,...data.rows] : data.rows,
        } });
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    },
  },
};
