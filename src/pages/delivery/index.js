import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { AtIcon, AtTextarea, AtButton, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'
import supplant from '../../utils/helper'

@connect(({ detail }) => ({ ...detail }))
export default class Delivery extends Component {
  config = {
    navigationBarTitleText: '物流'
  }

  constructor() {
    super(...arguments)
    this.state = {
      template: '【云农农业科技】{customerName}，您的订单[{number}]已经发出，发件人：{staffName}，承运物流：{delivery}，货运单号：{tracking}，如遇问题请联系[{staffPhone}]。',
      expressList: [
        {
          name: '大通物流',
          value: 'v001'
        },
        {
          name: '中神通物流',
          value: 'v002'
        },
        {
          name: '顺丰快递',
          value: 'v003'
        }
      ],
      delivery: null,
      tracking: ''
    }
  }

  // componentDidMount = () => {}

  handleScanCode() {
    Taro.scanCode().then(data => {
      if (data.errMsg === 'scanCode:ok') {
        console.log(data)
        Taro.showToast({
          title: '扫描成功'
        })

      }
    })
  }

  handleSave = () => {
    const { _id, express, dispatch } = this.props
    if (express.isSend) {
      return Taro.showToast({ title: '已经发送，请勿重复发送。' })
    }

    dispatch({
      type: 'detail/update',
      payload: { _id, express }
    })
    
    Taro.navigateBack()
  }

  handlePickerChange = (e) => {
    const { express, dispatch } = this.props
    const { expressList } = this.state
    const index = e.detail.value

    dispatch({
      type: 'detail/save',
      payload: { express: { ...express, name: expressList[index].name } }
    })
  }

  handleCommonChange(type, value) {
    const { express } = this.props
    let payload

    switch (type) {
      case 'trackingNumber':
        payload = {
          express: { ...express, trackingNumber: value }
        }
        break;
      case 'customerPhone':
        payload = {
          express: { ...express, customerPhone: value }
        }
        break;
      case 'staffPhone':
        payload = {
          express: { ...express, staffPhone: value }
        }
        break;
      default:
        break;
    }

    this.props.dispatch({
      type: 'detail/save',
      payload
    })
  }

  render() {
    const { template, expressList } = this.state
    const { customer, number, express } = this.props
    const userInfo = Taro.getStorageSync('userInfo')

    const content = supplant(template, {
      customerName: customer.CustomerName,
      number,
      delivery: express.name || '',
      tracking: express.trackingNumber,
      staffName: userInfo.userName,
      staffPhone: userInfo.mobile
    })

    return (
      <View className='delivery-page'>
        <View className='content'>
          <View className='item'>
            <View className='item-title'>物流公司</View>
            <View className='item-body'>
              <AtInput disabled value={express.name} placeholder='请手工输入或选择' />
            </View>
            <View className='item-float'>
              <Picker
                style='text-align: center;'
                mode='selector'
                range={expressList}
                rangeKey='name'
                onChange={this.handlePickerChange}
              >
                <View>
                  <AtIcon value='chevron-right' size='24' color='#999' />
                </View>
              </Picker>
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>物流单号</View>
            <View className='item-body'>
              <AtInput value={express.trackingNumber} onChange={this.handleCommonChange.bind(this, 'trackingNumber')} placeholder='请手工输入或扫描' />
            </View>
            <View className='item-float' onClick={this.handleScanCode}>
              <AtIcon value='camera' size='24' color='#888' />
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>客户手机</View>
            <View className='item-body'>
              <AtInput value={express.customerPhone} placeholder='请输入客户手机号码' onChange={this.handleCommonChange.bind(this, 'customerPhone')} />
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>业务联系手机</View>
            <View className='item-body'>
              <AtInput value={express.staffPhone} placeholder='请输入业务联系手机号码' onChange={this.handleCommonChange.bind(this, 'staffPhone')} />
            </View>
          </View>
          <View style='height: 200px;' className='item-sms'>
            <View className='sms-title'>
              <Text>短信模板</Text>
              <Text>约计费2条短信</Text>
            </View>
            <View className='sms-body'>
              <AtTextarea
                style='line-height:20px;'
                disabled
                height='200'
                value={content}
                maxlength='210'
              />
            </View>
          </View>
        </View>
        <View className='remark'>
          <View style='color: #CC0033;'>功能说明：</View>
          <View>1、保存，仅保存输入的物流信息。</View>
          <View>2、发送短信通知客户，并相应扣减短信条数，请勿重复发送。</View>
        </View>
        <View className='toolbar'>
          <AtButton onClick={this.handleSave.bind(this, true)} size='normal' type='primary'>
            保存并发送
          </AtButton>
          <AtButton onClick={this.handleSave.bind(this, false)} size='normal' type='secondary'>
            保存
          </AtButton>
        </View>
      </View>
    )
  }
}
