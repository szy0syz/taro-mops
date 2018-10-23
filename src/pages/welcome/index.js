import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';


export default class Login extends Component {
  config = {
    navigationBarTitleText: '云农农业科技-MOPS系统',
  };

  componentDidMount = () => {
    Taro.login().then(data => {
      console.log(data)
    })
  }

  onGetUserInfo = (data) => {
    console.log(data)
  }

  render() {
    return (
      <View>
        <Text>云农农业科技内部系统</Text>
        <Button openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>微信登录</Button>
      </View>
    );
  }
}
