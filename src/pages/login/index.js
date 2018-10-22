import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'

import './index.scss'

class Login extends Component {

  config = {
    navigationBarTitleText: '云农农业科技-MOPS系统'
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
        <View className='bgtopWrap'>
          <View className='loginWrap'>
            <View className='inpuWrapMpblie'>
              <Input type='number' name='mobile' maxLength='11' placeholder='请输入手机号' value={this.props.mobile} onInput={this.onHandleMobile} />
            </View>
            <View className='inpuWrapMpblie'>
              <Input type='string' name='username' maxLength='4' placeholder='请输入员工姓名' value={this.props.username} onInput={this.getUsername} />
            </View>
            <Button className='button' onClick={this.onHandleLogin}>验  证</Button>
            <View className='see-des'>
              无需输入密码<Text>后台验证身份</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Login
