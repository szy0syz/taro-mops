import Taro, { Component } from '@tarojs/taro'
import { View, OpenData, Input, Button } from '@tarojs/components'

import './index.scss'

class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props) {
    super(props)
    this.state = {
      mobile: null,
      username: null
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidMount() { }

  onHandleMobile = (event) => {
    const mobile = event.target.value
    this.setState({ mobile })
  }

  getUsername = (event) => {
    const username = event.target.value
    this.setState({ username })
  }

  onHandleLogin = () => {
    console.log(this.state.mobile, this.state.username)
    Taro.showToast({
      title: '登录成功',
      icon: 'none',
    })
  }

  render() {
    return (
      <View className='login-page' id='login-page'>
        <View className='title'>您好，请登录</View>
        <View className='title-des'>内部系统，授权访问</View>
        <OpenData type='userAvatarUrl'  />
        <View className='bgtopWrap'>
          <View className='loginWrap'>
            <View className='inpuWrapMpblie'>
              <Input type='number' name='mobile' maxLength='11' placeholder='请输入手机号' value={this.props.mobile} onInput={this.onHandleMobile} />
            </View>
            <View className='inpuWrapMpblie'>
              <Input type='string' name='username' maxLength='4' placeholder='请输入姓名' value={this.props.username} onInput={this.getUsername} />
            </View>
            <Button className='button' onClick={this.onHandleLogin.bind(this)}>登录</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Login
