import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { verify_v2, cryptData, code2Session } from './service'
import './index.scss'

@connect(({ login }) => ({
  ...login
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: ''
  }

  verifyStatus = false;

  handleInputValue = (key, event) => {
    let payload, { value } = event.target
    value = value.toString().trim()

    switch (key) {
      case 'mobile':
        payload = { mobile: value }
        break
      case 'password':
        payload = { password: value }
        break
      case 'easid':
        payload = { easid: value }
        break
    }
    this.props.dispatch({
      type: 'login/save',
      payload
    })
  }

  handleLogin = () => {
    const { easid, password } = this.props;
    if (!easid || !password) this.showToast('账号和密码不能为空');
    else this.props.dispatch({ type: 'login/login' })
  }

  showToast(text, icon = 'none', duration = 2000) {
    Taro.showToast({
      title: text,
      icon,
      duration
    })
  }

  handleVerify = async () => {
    this.verifyStatus = true;
    Taro.showLoading({ title: '验证中', mask: false })
    const res = await verify_v2()
    if (res && res.success) {
      if (res.data) {

        this.showToast(res.data.userName + '，欢迎回来')
        let payload = Taro.getStorageSync('userInfo')
        payload = Object.assign(payload, res.data)

        await this.props.dispatch({
          type: 'login/save',
          payload
        })
      }
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/index/index' })
      }, 2000)
    }
    Taro.hideLoading()
  }

  componentDidShow() {
    const { toast, duration = 2500, msg } = this.$router.params
    // 判断 === 1：如果是Token鉴权失败时，根据路由参数显示轻提示，但还是
    if (toast === '1') {
      this.showToast(msg, 'none', Number(duration))
    } else {
      this.handleVerify();
    }
  }

  componentDidMount = async () => {
    const res = await Taro.login();
    if (res.errMsg === 'login:ok') {
      const { code } = res;
      // 保存js_code 用于后台换取openid
      this.props.dispatch({
        type: 'login/save',
        payload: { jsCode: code }
      })
    }
  }

  onGetUserInfo = async res => {
    const { detail } = res
    if (detail.errMsg === 'getUserInfo:ok') {
      const { encryptedData, iv } = detail;
      // 获取用户信息成功
      const { avatarUrl: avatar, city, nickName, province } = detail.userInfo
      this.props.dispatch({
        type: 'login/save',
        payload: { avatar, city, nickName, province, encryptedData, iv }
      })
      this.handleLogin()
    }
  }

  render() {
    return (
      <View className='login-page' id='login-page'>
        <View className='title'>您好，请登录</View>
        <View className='title-des'>内部系统，授权访问</View>
        <View className='bgtopWrap'>
          <View className='loginWrap'>
            <View className='inpuWrapMpblie'>
              <Input
                type='string'
                name='easid'
                placeholder='请输入EAS工号'
                value={this.props.easid}
                onInput={this.handleInputValue.bind(this, 'easid')}
              />
            </View>
            <View className='inpuWrapMpblie'>
              <Input
                type='password'
                name='password'
                placeholder='请输入密码'
                value={this.props.password}
                onInput={this.handleInputValue.bind(this, 'password')}
              />
            </View>
            <Button
              style='margin-top:40px;'
              className='button'
              openType='getUserInfo'
              onGetUserInfo={this.onGetUserInfo}
            >
              登 录
            </Button>
            <View className='see-des'>
              <Text>请输入账号密码</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}