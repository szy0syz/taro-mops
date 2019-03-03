import Taro, { Component } from '@tarojs/taro'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { View, Button, Text, Input, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtButton } from 'taro-ui'
import { OrderCell } from '../../../components/OrderCell'
import { fetchById } from './service'
import './index.scss'

@connect(({ orderEdit }) => ({
  ...orderEdit,
}))
export default class OrderEdit extends Component {
  config = {
    navigationBarTitleText: '订单',
  }

  componentDidMount = async () => {
    const { _id } = this.$router.params
    const { userName, easid, easfid = null } = Taro.getStorageSync('userInfo')
    let { data: payload } = await fetchById(_id)
    payload.billDate = dayjs(payload.billDate).format('YYYY-MM-DD')
    payload.staff = {
      userName,
      easid,
      easfid
    }
    this.props.dispatch({
      type: 'orderEdit/save',
      payload
    })
  }

  handleBillTagsChange(orderTags) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        orderTags
      }
    })
  }

  handleCommonChange(type, e) {
    let payload, value = e.detail.value
    switch (type) {
      case 'payment':
        payload = {
          paymentMethod: this.props.payTypes[value]
        }
        break;
      case 'storekeeper':
        payload = {
          storekeeper: this.props.storekeeperList[value]
        }
        break;
      case 'remark':
        payload = {
          remark: value
        }
        break;
      default:
        break;
    }
    this.props.dispatch({
      type: 'orderEdit/save',
      payload
    })
  }

  handleBillDateChange(value) {
    this.props.dispatch({
      type: 'orderEdit/save',
      payload: {
        billDate: value.detail.value
      }
    })
  }

  handleWaiting() {
    Taro.showToast({
      icon: 'none',
      title: '功能开发中'
    })
  }

  handleSave() {
    let { id, billDate, orderTags, customer, products, remark, staff, storekeeper, paymentMethod } = this.props
    let data = {
      billDate,
      orderTags,
      customer,
      products,
      remark,
      staff,
      storekeeper,
      paymentMethod
    }

    this.props.dispatch({
      type: 'orderEdit/update',
      payload: { data, id }
    }).then(isCreated => {
      if (isCreated) {
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/list/index' })
        }, 1500)
      }
    })
  }

  handleAgain() {
    this.props.dispatch({
      type: 'order/empty'
    })
    Taro.showToast({
      title: '再开一单'
    })
  }

  handleNavigate(path) {
    let url = `/pages/${path}/index`;
    if (path === 'productSelect') url += '?backPage=orderEdit'
    Taro.navigateTo({
      url
    })
  }

  handleNavProdSel() {
    Taro.navigateTo({ url: '/pages/selections/products/index?prevModel=orderEdit' })
  }

  handleNavCustSel() {
    Taro.navigateTo({ url: '/pages/selections/customers/index?prevModel=orderEdit' })
  }

  handleUploadImg() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(data => {
      console.log(data)
    })
  }

  handleScanCode() {
    Taro.scanCode().then((data) => {
      console.log(data)
      Taro.showToast({
        title: '扫描成功'
      })
    })
  }

  handleRemoveItem(index) {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderEdit/removeProduct',
      payload: { index },
    })
    this.forceUpdate()
  }

  handleSyncOrder() {
    const { _id, isSynced } = this.props
    if (isSynced) {
      Taro.showToast({
        title: '该单据已同步'
      })
    } else {
      this.props.dispatch({
        type: 'detail/syncOrder',
        payload: {
          _id
        }
      }).then(success => {
        if (success) {
          Taro.showToast({
            title: '同步成功',
            icon: 'success'
          })
          setTimeout(() => {
            Taro.navigateBack()
          }, 2000);
        }
      })
    }
  }

  render() {
    const { products = [], billDate, customer, remark, isSynced, creator } = this.props
    const amountRRR = products.reduce((sum, item) => sum += item.amount, 0).toFixed(2)
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <Picker className='date-selector' mode='date' onChange={this.handleBillDateChange}>
            <View className='picker'>
              {billDate}
              <AtIcon value='chevron-right' size='26' color='#c7c7cc'></AtIcon>
            </View>
          </Picker>
          <AtList>
            <AtListItem
              title='日期'
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'clock',
              }}
            />
            <AtListItem
              onClick={this.handleNavCustSel}
              className='custom-listItem'
              title='客户'
              extraText={customer.CustomerName}
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
          </View>
          <View>
            <Text>选择货品({products.length || 0})</Text>
            <Text>开单金额：￥{products.reduce((sum, item) => sum += item.defaultAmount, 0).toFixed(2)}</Text>
          </View>
          <View>
            {products.map((item, index) => (<OrderCell item={item} key={item.FID} index={index} hasIcon={Boolean(true)} onHanleClick={this.handleRemoveItem.bind(this, index)} />) )}

          </View>
          <View>
            <Button onClick={this.handleNavProdSel} style='background-color: #1fb7a6;' className='custom-button' size='large'>添加商品</Button>
          </View>
        </View>
        <View className='order-wrapper order-footer'>
          <View>
            <Text>结算金额</Text>
            <Input value={amountRRR} disabled type='digit' placeholder='0.00' className='input-amount'></Input>
          </View>
          <View>
            <Text>结算方式</Text>
            <Picker mode='selector' range={this.props.payTypes} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'payment')}>
              <View className='picker'>
                {this.props.paymentMethod.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View>
          <View>
            <Text>业务员</Text>
            <Text>{creator.userName}</Text>
          </View>
          <View>
          </View>
          {/* <View onClick={this.handleNavigate.bind(this, 'delivery')}>
            <Text>物流</Text>
            <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
          </View> */}
          <View>
            {/* <Text>票据影像</Text>
            <View onClick={this.handleUploadImg} >
              <AtIcon value='camera' size='34' color='#fff'></AtIcon>
            </View> */}
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Input value={remark} onChange={this.handleCommonChange.bind(this, 'remark')} placeholder='备注(最多100字)'></Input>
          </View>
        </View>
        <View>
          {/* <AtCheckbox
            style='background-color: #aaa;'
            options={this.props.tagList}
            selectedList={this.props.orderTags}
            onChange={this.handleBillTagsChange}
          /> */}
        </View>
        <View className='toolbar'>
          {/* <View onClick={this.handleWaiting} style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='32' color='#fff'></AtIcon>
          </View> */}
          <AtButton onClick={this.handleAgain} size='normal' type='secondary'>再开一单</AtButton>
          <AtButton onClick={this.handleSave} size='normal' type='primary'>确认修改</AtButton>
          <View onClick={this.handleSyncOrder} style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value={`iconfont ${isSynced ? 'icon-confirm' : 'icon-shangchuan'}`} size='34' color='#fff'></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
