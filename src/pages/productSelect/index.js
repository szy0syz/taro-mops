import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, Picker, AtIcon } from 'taro-ui'

import './index.scss';

@connect(({ common, order, productSelect }) => ({
  ...productSelect,
  ...common,
  ...order
}))
export default class ProductSelect extends Component {
  config = {
    navigationBarTitleText: '选择商品',
  }

  componentDidMount = () => { }

  handleAddCustomer() {
    Taro.showToast({
      icon: 'none',
      title: '请在 [ EAS系统 ] 中添加'
    })
  }

  handleSelected(product) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        product
      }
    })
    Taro.redirectTo({
      url: '/pages/order/index'
    })
  }

  render() {
    const { productList } = this.props
    return (
      <View className='page'>
        <View className='header'>
          <Picker mode='selector' range={this.props.searchTypes} rangeKey='key' onChange={this.onChange}>
            <View className='customer-type'>
              {this.props.searchType.key}
              <AtIcon value='chevron-down' size='28' color='rgba(117, 117, 119, 1)'></AtIcon>
            </View>
          </Picker>

          <Input></Input>
        </View>
        <View className='body'>
          <ScrollView
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style='height: 100%;'
          >
            <AtList>
              {productList.map(item => (
                <View key={item.fid} className='order-item'>
                  <Image className='m-img' src={item.url ? item.url : 'http://cdn.jerryshi.com/picgo/20181104150040.png'}></Image>
                  <View>
                    <Text>{item.name}</Text>
                    <View className='order-cell'>
                      <Text>单价：￥{item.price.toFixed(2)}</Text>
                    </View>
                    <View className='order-cell'>
                      <Text>规格：{item.model}</Text>
                    </View>
                  </View>
                  <AtIcon value='add' size='30' color='#2bb2a7'></AtIcon>
                </View>
              ))}
            </AtList>
          </ScrollView>
        </View>
        <View className='footer'>
          <AtButton onClick={this.handleAddCustomer} type='secondary' size='small'>添加客户</AtButton>
        </View>
      </View>
    )
  }
}
