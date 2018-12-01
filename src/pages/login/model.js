import Taro from '@tarojs/taro';
import * as login from './service';

export default {
  namespace: 'login',
  state: {
    mobile: '',
    username: '',
    easid: '',
    access_token: '',
    sending: 0,
    smsTime: 30,
    erroMessage: '',
    // 微信数据----------
    jsCode: '',
    sessionKey: '',
    openid: '',
    avatar: '',
    nickName: '',
    city: '',
    province: ''
  },

  effects: {
    * login(_, { call, select }) {
      const { openid, easid, nickName, mobile, username: userName, avatar, city, province } = yield select(state => state.login)
      const res = yield call(login.login, { openid, easid, nickName, mobile, userName, avatar, city, province })
      console.log(res)




      // if (res.status == 'ok') {
      //   const userInfo = {
      //     access_token: res.data.access_token,
      //     invitation_code: res.data.invitation_code,
      //     mobile: res.data.mobile,
      //     nickname: res.data.nickname,
      //     new_user: res.data.new_user,
      //     is_has_buy_card: res.data.is_has_buy_card,
      //     erroMessage: '',
      //   };

      //   Taro.setStorageSync('user_info', userInfo);
      //   Taro.setStorageSync('access_token', res.data.access_token);

      //   yield put({ type: 'common/save',
      //     payload: {
      //       access_token: res.data.access_token,
      //       invitation_code: res.data.invitation_code,
      //       mobile: res.data.mobile,
      //       nickname: res.data.nickname,
      //       new_user: res.data.new_user,
      //       is_has_buy_card: res.data.is_has_buy_card,
      //       erroMessage: '',
      //       code:'',
      //     },
      //   });

      //   yield put({ type: 'save',
      //     payload: {
      //       access_token: res.data.access_token,
      //       invitation_code: res.data.invitation_code,
      //       mobile: res.data.mobile,
      //       nickname: res.data.nickname,
      //       new_user: res.data.new_user,
      //       is_has_buy_card: res.data.is_has_buy_card,
      //       erroMessage: '',
      //       code: '',
      //     },
      //   });

      //   Taro.showToast({
      //     title: '登录成功，欢迎回来～～～',
      //     icon: 'none',
      //   });

      //   setTimeout(() => {
      //     Taro.navigateBack();
      //   }, 1000);
      // }
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
  },

};
