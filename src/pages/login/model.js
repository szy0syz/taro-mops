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
    password: '',
    // ---------- 微信数据
    jsCode: '',
    encryptedData: '',
    iv: '',
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
      const { jsCode, encryptedData, iv, easid, nickName, password, avatar, } = yield select(state => state.login)
      const res = yield call(login.login_v2, { jsCode, encryptedData, iv, easid, nickName, password, avatar })

      if (res && res.success) {
        yield put({
          type: 'save',
          payload: {
            userInfo: res.data,
            token: res.token
          }
        })
        Taro.showToast({ title: '登录成功', icon: 'success' })
        Taro.setStorage({ key: 'token', data: res.token })
        Taro.setStorage({ key: 'userInfo', data: res.data })
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/index/index',
          })
        }, 2000)
      } else {
        Taro.showToast({ title: '登录失败', icon: 'none' })
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
          password: 'admin888',
          easid: '205'
        }
      }
      return { ...state, ...initData }
    }
  },
};