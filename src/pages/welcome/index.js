import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, OpenData } from '@tarojs/components';
import './index.scss';

export default class Login extends Component {
  config = {
    navigationBarTitleText: '',
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
      <View className='container'>
        <Text className='title'>云农农业科技内部系统</Text>
        <View className='user-avatar'><OpenData type='userAvatarUrl' /></View>
        <View className='user-username'><OpenData type='userNickName' /></View>
        <Button className='btn-login' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>微信身份登录</Button>
      </View>
    );
  }
}
