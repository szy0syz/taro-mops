import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button, Text, Image, Input, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtCheckbox, AtButton } from 'taro-ui'
import './index.scss'

@connect(({ order }) => ({
  ...order,
}))
export default class Order extends Component {
  config = {
    navigationBarTitleText: '开单',
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'order/init'
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps)
  //   console.log(nextState)
  //   return true
  // }

  handleBillTagsChange(billTags) {
    console.log(billTags)
    this.props.dispatch({
      type: 'order/save',
      payload: {
        billTags
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
    Taro.showToast({
      title: '异步请求'
    })
    console.log(this.props)
  }

  handleAgain() {
    this.props.dispatch({
      type: 'order/empty'
    })
    Taro.showToast({
      title: '再开一单'
    })
  }

  handleRedirect(path) {
    Taro.redirectTo({
      url: `/pages/${path}/index`
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

  render() {
    const { products, customer, remark } = this.props
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
              onClick={this.handleRedirect.bind(this, 'customerSelect')}
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
            <Button onClick={this.handleWaiting} style='background-color: rgba(241, 181, 85, 1);' className='custom-button' size='mini'>调用模板</Button>
            <Button onClick={this.handleWaiting} style='background-color: #1fb7a6;' className='custom-button' size='mini'>存为模板</Button>
          </View>
          <View>
            <Text>选择货品({products.length || 0})</Text>
            <Text>合计金额：￥{products.reduce((sum, item) => sum += item.amount, 0).toFixed(2)}</Text>
          </View>
          <View>
            {products.map(item => (
              <View key={item.fid} className='order-item'>
                <Image className='m-img' src={item.url}></Image>
                <View>
                  <Text>{item.name}</Text>
                  <View className='order-cell'>
                    <Text>单价：￥{item.price}</Text>
                    <Text>数量：{item.qty}公斤</Text>
                  </View>
                  <View className='order-cell'>
                    <Text>规格：{item.model}</Text>
                    <Text>金额：￥{item.amount}</Text>
                  </View>
                </View>
                <AtIcon value='subtract-circle' size='30' color='#F00'></AtIcon>
              </View>
            ))}
          </View>
          <View>
            <Image onClick={this.handleScanCode} src='http://cdn.jerryshi.com/picgo/scanAdd.png' />
            <Image
              onClick={this.handleRedirect.bind(this, 'productSelect')}
              src='http://cdn.jerryshi.com/picgo/plusAdd.png'
            />
          </View>
        </View>
        <View className='order-wrapper order-footer'>
          <View>
            <Text>应收金额</Text>
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
            <Text>张三三</Text>
          </View>
          <View>
            <Text>出库员</Text>
            <Picker mode='selector' range={this.props.storekeeperList} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'storekeeper')}>
              <View className='picker'>
                {this.props.storekeeper.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View>
          <View>
            <Text>票据影像</Text>
            <View onClick={this.handleWaiting} >
              <AtIcon value='camera' size='34' color='#fff'></AtIcon>
            </View>
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Input value={remark} onChange={this.handleCommonChange.bind(this, 'remark')} placeholder='备注(最多100字)'></Input>
          </View>
        </View>
        <View>
          <AtCheckbox
            style='background-color: #aaa;'
            options={this.props.tagList}
            selectedList={this.props.billTags}
            onChange={this.handleBillTagsChange}
          />
        </View>
        <View className='toolbar'>
          <View onClick={this.handleWaiting} style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='34' color='#fff'></AtIcon>
          </View>
          <AtButton onClick={this.handleAgain} size='normal' type='secondary'>再开一单</AtButton>
          <AtButton onClick={this.handleSave} size='normal' type='primary'>确认保存</AtButton>
          <View onClick={this.handleWaiting} style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-shangchuan' size='36' color='#fff'></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
