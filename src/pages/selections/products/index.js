import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtInput, AtForm, AtButton, AtList, AtIcon, AtBadge, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import SearchHeader from '../../../components/SearchHeader'
import './index.scss';

@connect(({ common, order, productSelect, orderEdit }) => ({
  ...productSelect,
  ...common,
  ...order,
  orderEdit
}))
export default class ProductSelect extends Component {
  config = {
    navigationBarTitleText: '选择商品',
  }

  backPage = ''

  constructor() {
    super(...arguments)
    this.state = {
      isShowModal: false,
      qty: '',
      giftQty: 0,
      amount: 0,
      defaultAmount: 0,
      currentItem: {
        MaterialName: '商品名称',
        MaterialPrice: 0,
        DefaultPrice: 0,
      }
    }
  }

  componentDidMount() {
    const { backPage = '', prevModel } = this.$router.params
    this.backPage = backPage
    this.props.dispatch({
      type: 'productSelect/save',
      payload: { prevModel }
    })
  }

  handleSelected(product) {
    this.setState({
      currentItem: { ...product, DefaultPrice: product.MaterialPrice },
      isShowModal: true
    })
  }

  handleSearch = (type, keyword = '') => {
    const { dispatch } = this.props
    switch (keyword.length) {
      case 0:
        dispatch({
          type: 'productSelect/save',
          payload: { productList: [] }
        })
        break
      case 1:
        Taro.showToast({ title: '关键字最少两个字', icon: 'none' })
        break
      default:
        this.props.dispatch({
          type: 'productSelect/fetchProducts',
          payload: { keyword, hasPrice: true }
        })
        break
    }
  }

  handleConfirm() {
    const { products, dispatch, orderEdit, prevModel } = this.props
    if (prevModel) {
      dispatch({
        type: `${[prevModel]}/save`,
        payload: { products: orderEdit.products.concat(products) }
      })
      Taro.navigateBack()
    } else {
      dispatch({
        type: 'customerSelect/save',
        payload: { products }
      })
      Taro.switchTab({ url: '/pages/order/index' })
    }
    // if (this.backPage === 'orderEdit') {

    //   dispatch({
    //     type: 'order/save',
    //     payload: { products: [] }
    //   })
    //   dispatch({
    //     type: 'orderEdit/save',
    //     payload: { products: orderEdit.products.concat(products) }
    //   })
    // }
    // Taro.navigateBack()
  }

  handleModalCancel() {
    this.setState({ isShowModal: false })
  }

  handleModalConfirm() {
    let product = Object.assign(this.state.currentItem, {
      MaterialPrice: Number(this.state.currentItem.MaterialPrice),
      qty: Number(this.state.qty),
      giftQty: Number(this.state.giftQty),
      amount: Number(this.state.amount),
      defaultAmount: Number(this.state.defaultAmount),
    })
    let products = Array.from(new Set([...this.props.products, product]))
    this.props.dispatch({
      type: 'order/save',
      payload: {
        products
      }
    })
    this.setState({
      isShowModal: false,
      qty: '',
      giftQty: 0,
    })
  }


  handleModalChange(key, val) {
    // setState 是异步操作
    const calcAmount = () => {
      this.setState({
        amount: (Number(this.state.qty) * Number(this.state.currentItem.MaterialPrice || 0)).toFixed(4),
        defaultAmount: (Number(this.state.qty) * Number(this.state.currentItem.DefaultPrice || 0)).toFixed(4),
      })
    }
    let currentItem;
    switch (key) {
      case 'qty':
        this.setState({ qty: val }, calcAmount)
        break;
      case 'giftQty':
        this.setState({ giftQty: val })
        break;
      case 'price':
        currentItem = Object.assign(this.state.currentItem, { MaterialPrice: val })
        this.setState({ currentItem }, calcAmount)
        break;
      case 'DefaultPrice':
        currentItem = Object.assign(this.state.currentItem, { DefaultPrice: val })
        this.setState({ currentItem }, calcAmount)
        break;
    }
  }

  render() {
    const { currentItem, isShowModal, qty, giftQty } = this.state;
    const { productList, products, searchTypes } = this.props
    return (
      <View className='sel-product-page'>
        <AtModal isOpened={isShowModal}>
          <AtModalHeader>【{currentItem.MaterialName}】</AtModalHeader>
          <AtModalContent>
            <View className='modal-content'>
              <AtForm>
                <AtInput
                  editable={false}
                  name='MaterialModel'
                  title='规格：'
                  type='string'
                  value={currentItem.MaterialModel}
                />
                <AtInput
                  name='qty'
                  title='数量：'
                  type='digit'
                  value={qty}
                  onChange={this.handleModalChange.bind(this, 'qty')}
                >
                  <Text>公斤</Text>
                </AtInput>
                <AtInput
                  name='DefaultPrice'
                  title='开单价：'
                  type='digit'
                  value={currentItem.DefaultPrice}
                  onChange={this.handleModalChange.bind(this, 'DefaultPrice')}
                >
                  <Text>元</Text>
                </AtInput>
                <AtInput
                  name='price'
                  title='结算价：'
                  type='digit'
                  value={currentItem.MaterialPrice}
                  onChange={this.handleModalChange.bind(this, 'price')}
                >
                  <Text>元</Text>
                </AtInput>
                <AtInput
                  editable={false}
                  name='defaultAmount'
                  title='开单金额'
                  type='digit'
                  value={Number(this.state.defaultAmount).toFixed(4)}
                >
                  <Text>元</Text>
                </AtInput>
                <AtInput
                  editable={false}
                  name='amount'
                  title='结算金额'
                  type='digit'
                  value={Number(this.state.amount).toFixed(4)}
                >
                  <Text>元</Text>
                </AtInput>
                <AtInput
                  name='qty'
                  title='赠品数量：'
                  type='number'
                  value={giftQty}
                  onChange={this.handleModalChange.bind(this, 'giftQty')}
                >
                  <Text>公斤</Text>
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
        <SearchHeader searchTypes={searchTypes} onHandleSearch={this.handleSearch}></SearchHeader>
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
                  {/* <Image className='product-img' src={item.url ? item.url : 'http://cdn.jerryshi.com/picgo/20181104150040.png'}></Image> */}
                  <View>
                    <Text>{item.MaterialName}</Text>
                    <View className='order-cell'>
                      <Text>开单价：￥{Number(item.MaterialPrice).toFixed(4)}</Text>
                    </View>
                    <View className='order-cell'>
                      <Text>规格：{item.MaterialModel}</Text>
                    </View>
                    {item.Inventory && item.Inventory.map((invt, index) => (
                      <View key={invt.FBaseQty} className='order-cell' style='font-size: 13px;'>
                        <Text>库存{index + 1}：{`${invt.FBaseQty}${invt.FUnit} (${invt.FWarehouse}_${invt.FLocation})`}</Text>
                      </View>
                    ))}
                  </View>
                  <AtIcon style='padding: 16rpx 20rpx;' onClick={this.handleSelected.bind(this, item)} value='add' size='38' color='#2bb2a7'></AtIcon>
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
            <Text style='margin-left: 44rpx;color:#666;'>结算金额：</Text>
            <Text style='color:#2bb2a7;'>￥{products.reduce((sum, val) => sum += val.amount, 0)}</Text>
          </View>
          <View className='select-btn' >
            <AtButton onClick={this.handleConfirm} type='secondary' size='small'>选好了</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
