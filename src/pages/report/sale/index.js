import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtButton } from 'taro-ui'
import './index.scss'

export default class ReportSale extends Component {
  config = {
    navigationBarTitleText: '销售统计',
  };

  componentDidMount = () => { }

  render() {
    return (
      <View className='page-container'>
        <View className='title'>
          <Text style='padding-right: 10rpx;'>销售统计</Text>
          <AtIcon value='chevron-down' size='26' color='#2bb2a7'></AtIcon>
        </View>
        <View className='header'>
          <View>
            <Text className='datetime-label'>时间维度</Text>
            <View className='datetime-btns'>
              <AtButton circle type='secondary' size='small'>本月</AtButton>
              <AtButton circle type='secondary' size='small'>上月</AtButton>
              <AtButton circle type='secondary' size='small'>半年</AtButton>
              <AtButton circle type='secondary' size='small'>去年</AtButton>
            </View>
          </View>
          <View style='padding-top: 4rpx;'>
            <Text className='datetime-label'>日期范文</Text>
            <View className='datetime-picker'>
              
            </View>
          </View>
        </View>
        <View className='body'>
          Body
        </View>
      </View>
    )
  }
}
