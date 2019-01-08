import Taro from '@tarojs/taro';
import * as login from './service';

export default {
  namespace: 'login',
  state: {
    // --------- mops数据
    mobile: '',
    userName: '',
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
      const { openid, easid, nickName, mobile, userName, avatar, city, province } = yield select(state => state.login)
      const res = yield call(login.login, { openid, easid, nickName, mobile, userName, avatar, city, province })

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            userInfo: res.data,
            token: res.token
          }
        })
        Taro.showToast({title: '登录成功', icon: 'success'})
        Taro.setStorage({ key: 'token', data: res.token })
        Taro.setStorage({ key: 'userInfo', data: res.data })
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/home/index',
          })
        }, 2000)
      }
    }
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
          userName: '施振宇',
          easid: '205'
        }
      }
      return { ...state, ...initData }
    }
  },

};
