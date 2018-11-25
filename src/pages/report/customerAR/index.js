import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import './index.scss'

export default class CustomerAR extends Component {
  config = {
    navigationBarTitleText: '报表-客户对账',
  }

  handleNav = (url) => {
    Taro.navigateTo({url})
  }

  render() {
    return (
      <View className='container'>
        <Text>客户对账</Text>
      </View>
    )
  }
}