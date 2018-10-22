import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='about-page'>
        <View>云南云农农业科技有限公司</View>
        <View>公司简介1</View>
        <View>公司简介2</View>
      </View>
    )
  }
}
