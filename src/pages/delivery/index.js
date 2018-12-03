import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Delivery extends Component {
  config = {
    navigationBarTitleText: '物流',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='delivery-page'>
        <View className='content'>
          <View className='item'>
            <View className='item-title'>物流公司</View>
            <View className='item-body'>
              <Input placeholder='请手工输入或选择'></Input>
            </View>
            <View className='item-float'>
              <Picker style='text-align: center;' mode='selector' range={this.props.payTypes} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'payment')}>
                <View>
                  <AtIcon value='chevron-right' size='24' color='#999'></AtIcon>
                </View>
              </Picker>
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>物流单号</View>
            <View className='item-body'>
              <Input placeholder='请手工输入或扫描'></Input>
            </View>
            <View className='item-float'>
              <AtIcon value='camera' size='24' color='#888'></AtIcon>
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>客户手机</View>
            <View className='item-body'>
              <Input placeholder='请输入客户手机号码'></Input>
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>业务联系手机</View>
            <View className='item-body'>
              <Input placeholder='请输入业务联系手机号码'></Input>
            </View>
          </View>
          <View style='height: 240px;' className='item-sms'>
            <View className='title'>
              <Text>短信模板</Text>
              <Text>约计费1条短信</Text>
            </View>
            <View className='sms-body'>body</View>
          </View>
        </View>
      </View>
    )
  }
}
