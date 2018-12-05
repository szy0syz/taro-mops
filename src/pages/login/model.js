import Taro from '@tarojs/taro';
import * as login from './service';

export default {
  namespace: 'login',
  state: {
    // --------- mops数据
    mobile: '',
    username: '',
    easid: '',
    easfid: '',

    // ---------- 微信数据
    jsCode: '',
    sessionKey: '',
    openid: '',
    avatar: '',
    nickName: '',
    city: '',
    province: '',

    // ---------- 缓存数据
    userInfo: null,
    token: ''
  },

  effects: {
    * login(_, { call, put, select }) {
      const { openid, easid, nickName, mobile, username: userName, avatar, city, province } = yield select(state => state.login)
      const res = yield call(login.login, { openid, easid, nickName, mobile, userName, avatar, city, province })

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            userInfo: res.data,
            token: res.token
          }
        })
        Taro.setStorage({ key: 'token', data: res.token })
        Taro.setStorage({ key: 'userInfo', data: res.data })
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/home/index',
          })
        }, 1000)
      }
    },

    * sendSms(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSms, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({ type: 'save', payload: { sending: 2, erroMessage: res.error && res.error.message } });
      }
    },

    * sendSmsVoice(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSmsVoice, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({ type: 'save', payload: { sending: 2, erroMessage: res.error && res.error.message } });
      }
    },
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
    init(state) {
      let initData
      if (process.env.NODE_ENV === 'development') {
        initData = {
          mobile: '13759440044',
          username: '施振宇',
          easid: 205
        }
      }
      return { ...state, ...initData }
    }
  },

};
