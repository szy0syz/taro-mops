import Taro, { Component } from '@tarojs/taro'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { View, Button, Text, Input, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtButton } from 'taro-ui'
import { OrderCell } from '../../../components/OrderCell'
import './index.scss'

@connect(({ order }) => ({
  ...order,
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '销售订单',
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'order/init'
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
      type: 'order/save',
      payload
    })
  }

  handleBillDateChange(value) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        billDate: dayjs(value.detail.value).format('YYYY-MM-DD')
      }
    })
  }

  handleSave() {
    let { dispatch, billDate, orderTags, customer, products, remark, staff, paymentMethod } = this.props
    
    if (!customer.FID) {
      Taro.showToast({title: '请选择客户', icon: 'none'})
      return
    }

    if (products.length <= 0) {
      Taro.showToast({title: '请选择商品', icon: 'none'})
      return
    }
    
    // 奇葩需求和奇葩api
    billDate = dayjs()
      .set('month', billDate.split('-')[1] - 1)
      .set('date', billDate.split('-')[2])
      .valueOf()
    let payload = {
      billDate: dayjs(billDate).format('YYYY-MM-DD'),
      orderTags,
      customer,
      products,
      remark,
      creator: staff.userId,
      paymentMethod
    }
    dispatch({
      type: 'order/create',
      payload
    }).then(isCreated => {
      if (isCreated) {
        dispatch({
          type: 'order/empty'
        })
        Taro.showToast({ title: '创建成功' })
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/list/index' })
        }, 2000)
      } else {
        Taro.showToast({ title: '创建失败' })
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
    Taro.navigateTo({
      url: path
    })
  }

  handleNavProdSel() {
    Taro.navigateTo({ url: '/pages/selections/products/index?prevModel=order' })
  }

  handleNavCustSel() {
    Taro.navigateTo({ url: '/pages/selections/customers/index?prevModel=order' })
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
      type: 'order/removeProduct',
      payload: { index },
    })
    this.forceUpdate()
  }

  handleSyncOrder = () => {
    Taro.showToast({
      icon: 'none',
      title: '请先保存再同步'
    })
  }

  render() {
    const { products, customer, remark, staff } = this.props
    const amountRRR = this.props.products.reduce((sum, item) => sum += item.amount, 0).toFixed(2)
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <Picker className='date-selector' mode='date' onChange={this.handleBillDateChange}>
            <View className='picker'>
              {this.props.billDate}
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
          {/* <View>
            <Button onClick={this.handleWaiting} style='background-color: rgba(241, 181, 85, 1);' className='custom-button' size='mini'>调用模板</Button>
            <Button onClick={this.handleWaiting} style='background-color: #1fb7a6;' className='custom-button' size='mini'>存为模板</Button>
          </View> */}
          <View></View>
          <View>
            <Text>选择货品({products.length || 0})</Text>
            <Text>开单金额：￥{products.reduce((sum, item) => sum += item.defaultAmount, 0).toFixed(2)}</Text>
          </View>
          <View>
          {products.map((item, index) => (<OrderCell item={item} key={item.FID} index={index} hasIcon={Boolean(true)} onHanleClick={this.handleRemoveItem.bind(this, index)} />) )}
            {/* {products.map((item, index) => (
              <View key={item.FID} className='order-item'>
                <Image className='m-img' src={item.MaterialUrl}></Image>
                <View>
                  <Text>{item.MaterialName}</Text>
                  <View className='order-cell'>
                    <Text>单价：￥{Number(item.MaterialPrice).toFixed(2)}</Text>
                    <Text>数量：{Number(item.qty).toFixed(2)}公斤</Text>
                  </View>
                  <View className='order-cell'>
                    <Text>规格：{item.MaterialModel}</Text>
                    <Text>金额：￥{Number(item.amount).toFixed(2)}</Text>
                  </View>
                </View>
                <AtIcon onClick={this.handleRemoveItem.bind(this, index)} value='subtract-circle' size='30' color='#F00'></AtIcon>
              </View>
            ))} */}
          </View>
          <View>
            <Button onClick={this.handleNavProdSel} style='background-color: #1fb7a6;' className='custom-button' size='large'>添加商品</Button>
            {/* <Image onClick={this.handleScanCode} src='http://cdn.jerryshi.com/picgo/scanAdd.png' />
            <Image
              onClick={this.handleNavigate.bind(this, 'productSelect')}
              src='http://cdn.jerryshi.com/picgo/plusAdd.png'
            /> */}
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
            <Text>{staff.userName}</Text>
          </View>
          {/* <View>
            <Text>出库员</Text>
            <Picker mode='selector' range={this.props.storekeeperList} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'storekeeper')}>
              <View className='picker'>
                {this.props.storekeeper.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View> */}
          <View>
            {/* <Text>票据影像</Text>
            <View onClick={this.handleWaiting} >
              <AtIcon value='camera' size='34' color='#fff'></AtIcon>
            </View> */}
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Input value={remark} onChange={this.handleCommonChange.bind(this, 'remark')} placeholder='备注(最多100字)'></Input>
          </View>
        </View>
        {/* <View>
          <AtCheckbox
            style='background-color: #aaa;'
            options={this.props.tagList}
            selectedList={this.props.orderTags}
            onChange={this.handleBillTagsChange}
          />
        </View> */}
        <View className='toolbar'>
          {/* <View onClick={this.handleWaiting.bind(this, '请先保存')} style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='34' color='#fff'></AtIcon>
          </View> */}
          <AtButton onClick={this.handleAgain} size='normal' type='secondary'>再开一单</AtButton>
          <AtButton onClick={this.handleSave} size='normal' type='primary'>确认保存</AtButton>
          {/* <View onClick={this.handleSyncOrder} style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-shangchuan' size='36' color='#fff'></AtIcon>
          </View> */}
        </View>
      </View>
    )
  }
}
