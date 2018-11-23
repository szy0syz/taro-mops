import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtInput, AtForm, AtButton, AtList, Picker, AtIcon, AtBadge, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

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

  constructor() {
    super(...arguments)
    this.state = {
      isShowModal: false,
      qty: 1,
      amount: 0,
      currentItem: {
        MaterialName: '商品名称',
        MaterialPrice: 0
      }
    }
  }

  componentDidMount = () => { }

  handleSelected(product) {
    this.setState({
      currentItem: product,
      isShowModal: true
    })
  }

  handleSearch(e) {
    const val = e.target.value
    if (val.length > 1) {
      this.props.dispatch({
        type: 'productSelect/fetchProducts',
        payload: {
          keyword: val
        }
      })
    }
  }

  handleConfirm() {
    Taro.switchTab({url: '/pages/order/index'})
  }

  handleModalCancel() {
    this.setState({ isShowModal: false })
  }

  handleModalConfirm() {
    let product = Object.assign(this.state.currentItem, {
      qty: Number(this.state.qty),
      amount: Number(this.state.amount),
    })
    let products = Array.from(new Set([...this.props.products, product]))
    this.props.dispatch({
      type: 'order/save',
      payload: {
        products
      }
    })
    this.setState({ isShowModal: false })
  }


  handleModalChange(key, val) {
    // setState 是异步操作
    const calcAmount = () => {
      this.setState({ amount: (Number(this.state.qty) * Number(this.state.currentItem.MaterialPrice)).toFixed(2) })
    }
    switch (key) {
      case 'qty':
        this.setState({ qty: val }, calcAmount)
        break;
      case 'price':
        const currentItem = Object.assign(this.state.currentItem, { MaterialPrice: val })
        this.setState({ currentItem }, calcAmount)
        break;
    }
  }

  render() {
    const { productList, products } = this.props
    return (
      <View className='page'>
        <AtModal isOpened={this.state.isShowModal}>
          <AtModalHeader>【{this.state.currentItem.MaterialName}】</AtModalHeader>
          <AtModalContent>
            <View className='modal-content'>
              <AtForm>
                <AtInput
                  editable={false}
                  name='MaterialModel'
                  title='规格：'
                  type='string'
                  value={this.state.currentItem.MaterialModel}
                />
                <AtInput
                  name='qty'
                  title='数量：'
                  type='number'
                  value={this.state.qty}
                  onChange={this.handleModalChange.bind(this, 'qty')}
                >
                  <Text>公斤</Text>
                </AtInput>
                <AtInput
                  name='price'
                  title='单价：'
                  type='digit'
                  value={Number(this.state.currentItem.MaterialPrice).toFixed(2)}
                  onChange={this.handleModalChange.bind(this, 'price')}
                >
                  <Text>元</Text>
                </AtInput>
                <AtInput
                  editable={false}
                  name='amount'
                  title='金额：'
                  type='digit'
                  value={Number(this.state.amount).toFixed(2)}
                >
                  <Text>元</Text>
                </AtInput>
              </AtForm>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleModalCancel}>取消</Button>
            <Button style='color:#6190E8' onClick={this.handleModalConfirm}>
              确定
            </Button>
          </AtModalAction>
        </AtModal>
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
                  <AtIcon onClick={this.handleSelected.bind(this, item)} value='add' size='34' color='#2bb2a7'></AtIcon>
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
            <Text style='color:#2bb2a7;'>￥{products.reduce((sum, val) => sum += val.amount, 0)}.00</Text>
          </View>
          <View className='select-btn' >
            <AtButton onClick={this.handleConfirm} type='secondary' size='small'>选好了</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
