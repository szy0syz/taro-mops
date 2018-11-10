import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtButton, AtList, AtListItem } from 'taro-ui'
import DatePicker from '../../../components/DatePicker'
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
            <Text className='datetime-label'>日期范围</Text>
            <View className='date-picker'>
              <DatePicker></DatePicker>
            </View>
          </View>
        </View>
        <View className='body'>
          <View className='chart'>

          </View>
          <View className='stats'>
            <View>
              <Text>销售额</Text>
              <Text className='stats-num'>￥265280.00</Text>
            </View>
            <View>
              <Text>销售笔数</Text>
              <Text className='stats-num'>23.00笔</Text>
            </View>
          </View>
          <View className='list'>
            <AtList>
              <AtListItem title='销售额排行榜/客户' arrow='right' />
              <AtListItem title='销售额排行榜/商品' arrow='right' />
              <AtListItem title='销售额排行榜/地区' arrow='right' />
            </AtList>
          </View>
          <View className='more'>
            <AtButton size='small'>查看详细</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
