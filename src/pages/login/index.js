import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { code2Session, cryptData } from './service'
import './index.scss';


let setIntervalTime = null;

@connect(({ login }) => ({
  ...login,
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: 'MOPS系统-登录',
  }

  handleInputValue = (key, event) => {
    const { value } = event.target
    let payload

    switch (key) {
      case 'mobile':
        payload = { mobile: value }
        break;
      case 'username':
        payload = { username: value }
        break;
      case 'easid':
        payload = { easid: value }
        break;
    }
    this.props.dispatch({
      type: 'login/save',
      payload
    })
  }

  handleLogin = () => {
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！')
      return false
    }
    // const { openid, nickName, mobile, username, avatar, city, province } = this.props
    // let payload = { openid, nickName, mobile, username, avatar, city, province }
    this.props.dispatch({ type: 'login/login' })
  }

  sendSms = () => {
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！');
      return false;
    }

    this.props.dispatch({
      type: 'login/sendSms',
      payload: {
        mobile: this.props.mobile,
      },
    }).then(() => {
      this.setIntervalTime();
      if (this.props.erroMessage && this.props.erroMessage != '') {
        clearInterval(setIntervalTime);
        this.showToast(this.props.erroMessage);
      }
    });
  }

  setIntervalTime = () => {
    clearInterval(setIntervalTime);
    let numConst = 30;
    setIntervalTime = setInterval(() => {
      numConst--;
      this.props.dispatch({
        type: 'login/save',
        payload: { sending: 1, smsTime: numConst },
      });

      if (numConst == 0 || (this.props.erroMessage && this.props.erroMessage != '')) {
        clearInterval(setIntervalTime);
        this.props.dispatch({
          type: 'login/save',
          payload: { sending: 2, erroMessage: '', smsTime: 30 },
        });
      }
    }, 1000);
  }

  // tips
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
    });
  }

  getVoiceCode = () => {
    // 语音验证码
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！');
      return false;
    }

    this.props.dispatch({
      type: 'login/sendSmsVoice',
      payload: {
        mobile: this.props.mobile,
      },
    }).then(() => {
      this.setIntervalTime();
      if (this.props.erroMessage && this.props.erroMessage != '') {
        clearInterval(setIntervalTime);
        this.showToast(this.props.erroMessage);
      } else {
        this.showToast('电话拨打中...请留意相关电话');
      }
    });
  }

  componentDidMount = () => {
    Taro.login()
      .then(data => {
        console.log(data)
        if (data && data.code) {
          this.props.dispatch({
            type: 'login/save',
            payload: { jsCode: data.code },
          })
          return code2Session({ js_code: data.code })
        }
        return false
      })
      .then(res => {
        if (res) {
          const { openid, session_key: sessionKey } = res.data
          this.props.dispatch({
            type: 'login/save',
            payload: { openid, sessionKey },
          })
        }
      })
  }

  onGetUserInfo = async (res) => {
    const { detail } = res
    if (detail.errMsg === "getUserInfo:ok") {
      // 获取用户信息成功
      const { avatarUrl: avatar, city, nickName, province } = detail.userInfo
      console.log(detail.userInfo)
      this.props.dispatch({
        type: 'login/save',
        payload: { avatar, city, nickName, province },
      })
      this.handleLogin()
    }

    // 没必要去解密拿openid，已经拿到
    // const res = await cryptData({
    //   session_key: this.props.sessionKey,
    //   encryptedData: data.detail.encryptedData,
    //   iv: data.detail.iv
    // })
  }

  onGetPhoneNumber = async (data) => {
    const { encryptedData, iv } = data.detail
    const { sessionKey } = this.props
    console.log(sessionKey, encryptedData, iv)
    const res = await cryptData({
      session_key: sessionKey,
      encryptedData,
      iv
    })
    const { purePhoneNumber:mobile } = res.data
    if (mobile) {
      this.props.dispatch({
        type: 'login/save',
        payload: { mobile }
      })
    } else {
      this.showToast('验证手机号失败')
    }
  }

  render() {
    return (
      <View className='login-page' id='login-page'>
        <View className='title'>您好，请登录</View>
        <View className='title-des'>内部系统，授权访问</View>
        <View className='bgtopWrap'>
          <View className='loginWrap'>
            <View className='inpuWrapNumber'>
              <Input disabled={true} type='number' name='mobile' maxLength='11' placeholder='请验证手机号' value={this.props.mobile} />
              <Button size='mini' className='numberWrap' openType='getPhoneNumber' onGetPhoneNumber={this.onGetPhoneNumber} >验证手机号</Button>
            </View>
            <View className='inpuWrapMpblie'>
              <Input type='string' name='username' placeholder='请输入员工姓名' value={this.props.username} onInput={this.handleInputValue.bind(this, 'username')} />
            </View>
            <View className='inpuWrapMpblie'>
              <Input type='number' name='easid' placeholder='请输入EAS工号' value={this.props.easid} onInput={this.handleInputValue.bind(this, 'easid')} />
            </View>
            <Button className='button' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo} >登  录</Button>
            <View className='see-des'>
              <Text>无需输入密码 后台审核登录</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
