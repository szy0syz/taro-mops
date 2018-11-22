import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, Picker, AtIcon, AtBadge } from 'taro-ui'

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
    product.qty = 10
    product.amount = 8888.00
    product = Object.assign(product, {
      qty: 10,
      amount: 8880.00,
      url: 'http://cdn.jerryshi.com/picgo/20181104150040.png'
    })
    let products = Array.from(new Set([...this.props.products, product]))
    this.props.dispatch({
      type: 'order/save',
      payload: {
        products
      }
    })
    Taro.redirectTo({
      url: '/pages/order/index'
    })
  }

  handleSearch(e) {
    const val = e.target.value
    if(val.length > 1) {
      this.props.dispatch({
        type: 'productSelect/fetchProducts',
        payload: {
          keyword: val
        }
      })
    }
  }

  handleConfirm() {
    Taro.redirectTo({
      url: '/pages/order/index'
    })
  }

  render() {
    const { productList, products } = this.props
    return (
      <View className='page'>
        <View className='header'>
          <Picker mode='selector' range={this.props.searchTypes} rangeKey='key' onChange={this.onChange}>
            <View className='customer-type'>
              {this.props.searchType.key}
              <AtIcon value='chevron-down' size='28' color='rgba(117, 117, 119, 1)'></AtIcon>
            </View>
          </Picker>
          <Input type='string' name='keyword' placeholder='请输入查询关键字' value={this.props.keyword} onInput={this.handleSearch} />
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
                  <Image className='product-img' src={item.url ? item.url : 'http://cdn.jerryshi.com/picgo/20181104150040.png'}></Image>
                  <View>
                    <Text>{item.MaterialName}</Text>
                    <View className='order-cell'>
                      <Text>单价：￥{Number(item.MaterialPrice).toFixed(2)}</Text>
                    </View>
                    <View className='order-cell'>
                      <Text>规格：{item.MaterialModel}</Text>
                    </View>
                  </View>
                  <AtIcon onClick={this.handleSelected.bind(this,item)} value='add' size='34' color='#2bb2a7'></AtIcon>
                </View>
              ))}
            </AtList>
          </ScrollView>
        </View>
        <View className='footer'>
          <View>
            <AtBadge value={products.length}>
              <AtIcon value='shopping-bag' size='30' color='#2bb2a7'></AtIcon>
            </AtBadge>
            <Text style='margin-left: 44rpx;color:#666;'>合计金额：</Text>
            <Text style='color:#2bb2a7;'>￥{products.reduce((sum,val) => sum += val.amount, 0)}.00</Text>
          </View>
          <View className='select-btn' >
            <AtButton onClick={this.handleConfirm} type='secondary' size='small'>选好了</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
