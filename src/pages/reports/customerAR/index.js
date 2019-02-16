import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'

export default class customerAR extends Component {
  config = {
    navigationBarTitleText: '客户对账',
  }

  state = {
    kw: ''
  }

  handleNav = (url) => {
    Taro.navigateTo({ url })
  }

  render() {
    const { kw } = this.state
    return (
      <View className='container'>
        <AtSearchBar value={kw} />
      </View>
    )
  }
}