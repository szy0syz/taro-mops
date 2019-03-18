import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { verify_v2 } from './service'
import './index.scss'

@connect(({ login }) => ({
  ...login
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: ''
  }

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
    // TODO: 检查easid 和 password
    this.props.dispatch({ type: 'login/login' })
  }

  showToast(text, icon = 'none', duration = 2000) {
    Taro.showToast({
      title: text,
      icon,
      duration
    })
  }

  componentDidMount = async () => {
    //-----------------------------------//
    // 。
    const { toast, duration = 2500, msg } = this.$router.params
    // 判断1：如果是Token鉴权失败时，根据路由参数显示轻提示，但还是
    if (toast === '1') {
      this.showToast(msg, 'none', Number(duration))
    } else {
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

        return false
      }

      Taro.hideLoading()
    }
    //-----------------------------------//
  }

  onGetUserInfo = async res => {
    const { detail } = res
    if (detail.errMsg === 'getUserInfo:ok') {
      // 获取用户信息成功
      const { avatarUrl: avatar, city, nickName, province } = detail.userInfo

      this.props.dispatch({
        type: 'login/save',
        payload: { avatar, city, nickName, province }
      })
      this.handleLogin()
    }
  }

  // onGetPhoneNumber = async data => {
  //   const { encryptedData, iv } = data.detail
  //   const { sessionKey } = this.props
  //   const res = await cryptData({
  //     session_key: sessionKey,
  //     encryptedData,
  //     iv
  //   })
  //   const { purePhoneNumber: mobile } = res.data
  //   if (mobile) {
  //     this.props.dispatch({
  //       type: 'login/save',
  //       payload: { mobile }
  //     })
  //   } else {
  //     this.showToast('验证手机号失败')
  //   }
  // }

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
              <Text>无需输入密码 后台审核登录</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}