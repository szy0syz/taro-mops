import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Text } from '@tarojs/components'
import { AtIcon, AtTextarea, AtButton } from 'taro-ui'
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
      template: '【云农农业科技】{customerName}，您的订单[{number}]已经发出，发件人：仓管员姓名，承运物流：{delivery}，货运单号：{tracking}，如遇问题请联系[{staffMobile}]。',
      list: [
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
      tracking: '',
      customerMobile: '',
      staffMobile: '138'
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
        this.setState({
          tracking: data.result
        })
      }
    })
  }

  handleSave = (isSend) => {
    Taro.showToast({ title: `${isSend ? '发送' : '保存'}成功` })
    Taro.navigateBack()
  }

  handlePickerChange = (e) => {
    const index = e.detail.value
    this.setState({
      delivery: this.state.list[index]
    })
  }

  handleCommonChange(type, event) {
    let payload
    const value = event.detail.value
    switch (type) {
      case 'delivery':
        payload = {
          delivery: value
        }
        break;
      case 'tracking':
        payload = {
          tracking: value
        }
        break;
      case 'customerMobile':
        payload = {
          customerMobile: value
        }
        break;
      case 'staffMobile':
        payload = {
          staffMobile: value
        }
        break;
      default:
        break;
    }
    this.setState(payload)
  }

  render() {
    const { delivery, tracking, customerMobile, staffMobile, template } = this.state
    const { customer, number } = this.props
    const content = supplant(template, {
      customerName: customer.CustomerName,
      number,
      delivery: delivery ? delivery.name : '',
      tracking,
      staffMobile
    })

    return (
      <View className='delivery-page'>
        <View className='content'>
          <View className='item'>
            <View className='item-title'>物流公司</View>
            <View className='item-body'>
              <Input value={delivery.name} onClick={this.handleCommonChange.bind(this, 'delivery')} placeholder='请手工输入或选择' />
            </View>
            <View className='item-float'>
              <Picker
                style='text-align: center;'
                mode='selector'
                range={this.props.list}
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
              <Input value={tracking} onClick={this.handleCommonChange.bind(this, 'tracking')} placeholder='请手工输入或扫描' />
            </View>
            <View className='item-float' onClick={this.handleScanCode}>
              <AtIcon value='camera' size='24' color='#888' />
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>客户手机</View>
            <View className='item-body'>
              <Input value={customerMobile} placeholder='请输入客户手机号码' onClick={this.handleCommonChange.bind(this, 'customerMobile')} />
            </View>
          </View>
          <View className='item'>
            <View className='item-title'>业务联系手机</View>
            <View className='item-body'>
              <Input value={staffMobile} placeholder='请输入业务联系手机号码' onClick={this.handleCommonChange.bind(this, 'staffMobile')} />
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
