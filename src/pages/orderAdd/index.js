import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from "taro-ui"
import './index.scss'

@connect(({ order }) => ({
  ...order,
}))
export default class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {}
  }

  config = {
    navigationBarTitleText: '开单',
  }

  componentWillMount = () => {
  }

  render() {
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <AtList>
            <AtListItem
              className='custom-listItem'
              title='日期'
              extraText='2018-11-05'
              arrow='right'
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'clock',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title='客户'
              extraText='呈贡农药一店'
              arrow='right'
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'user',
              }}
            />
          </AtList>
        </View>
        <View className='order-content'>
          <View>
            <Button style='background-color: rgba(241, 181, 85, 1);' className='custom-button' size='mini'>调用模板</Button>
            <Button style='background-color: #1fb7a6;'  className='custom-button' size='mini'>存为模板</Button>
          </View>
          <View>
            <Text>选择货品(5.00)</Text>
            <Text>合计金额：￥2080.00</Text>
          </View>
          <View>
            商品明细
          </View>
          <View>
            添加&&扫描
          </View>
        </View>
        <View className='order-wrapper'>
          2
        </View>
        <View className='order-wrapper'>
          3
        </View>
        <View className='order-wrapper'>
          4
        </View>
      </View>
    )
  }
}
