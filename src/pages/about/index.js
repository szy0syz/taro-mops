import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  render() {
    return (
      <View className='about-page'>
        <View className='title'>云南云农农业科技有限公司</View>
      </View>
    )
  }
}
