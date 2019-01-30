import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { code2Session, cryptData, verify } from './service'
import './index.scss'

@connect(({ login }) => ({
  ...login
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: 'MOPS系统-登录'
  }

  handleInputValue = (key, event) => {
    let payload, { value } = event.target
    value = value.toString().trim()

    switch (key) {
      case 'mobile':
        payload = { mobile: value }
        break
      case 'userName':
        payload = { userName: value }
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
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！')
      return false
    }
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
    const { toast, duration, msg } = this.$router.params
    // 判断1：如果是Token鉴权失败时，根据路由参数显示轻提示，但还是
    if (toast === '1') {
      this.showToast(msg, 'none', Number(duration))
    } else {
      Taro.showLoading({ title: '验证中', mask: true })

      const res = await verify()

      if (res && res.success) {
        if (res.data) {
          Taro.hideLoading()
          this.showToast(res.data.userName + '，欢迎回来')
          let payload = Taro.getStorageSync('userInfo')
          payload = Object.assign(payload, res.data)

          await this.props.dispatch({
            type: 'login/save',
            payload
          })
        }
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/home/index' })
        }, 2000)

        // return false
      } else {
        this.props.dispatch({
          type: 'login/init'
        })
        Taro.login()
          .then(data => {
            if (data && data.code) {
              this.props.dispatch({
                type: 'login/save',
                payload: { jsCode: data.code }
              })
              return code2Session({ js_code: data.code })
            }
            return false
          })
          .then(result => {
            if (result) {
              const { openid, session_key: sessionKey } = result.data
              this.props.dispatch({
                type: 'login/save',
                payload: { openid, sessionKey }
              })
            }
          })
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
      console.log(detail.userInfo)
      this.props.dispatch({
        type: 'login/save',
        payload: { avatar, city, nickName, province }
      })
      this.handleLogin()
    }
  }

  onGetPhoneNumber = async data => {
    const { encryptedData, iv } = data.detail
    const { sessionKey } = this.props
    const res = await cryptData({
      session_key: sessionKey,
      encryptedData,
      iv
    })
    const { purePhoneNumber: mobile } = res.data
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
              <Input
                disabled
                type='number'
                name='mobile'
                maxLength='11'
                placeholder='请验证手机号'
                value={this.props.mobile}
              />
              <Button
                size='mini'
                className='numberWrap'
                openType='getPhoneNumber'
                onGetPhoneNumber={this.onGetPhoneNumber}
              >
                验证手机号
              </Button>
            </View>
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
                placeholder='请输入EAS工号'
                value={this.props.password}
                onInput={this.handleInputValue.bind(this, 'password')}
              />
            </View>
            <Button
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
