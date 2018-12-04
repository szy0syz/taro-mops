import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Text } from '@tarojs/components'
import { AtIcon, AtTextarea, AtButton } from 'taro-ui'
import './index.scss'

export default class Delivery extends Component {
  config = {
    navigationBarTitleText: '物流'
  }

  constructor() {
    super(...arguments)
    this.state = {
      content:'【云农农业科技】呈贡农药批发店，您的订单[SO201812051021888]已经发出，发件人：仓管员姓名，承运物流：大通物流，货运单号：TD20189992，如遇问题请联系[业务员电话]。',
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
      current : null,
      delivery: ''
    }
  }

  // componentDidMount = () => {}

  handleScanCode() {
    Taro.scanCode().then(data => {
      console.log(data)
      Taro.showToast({
        title: '扫描成功'
      })
    })
  }

  handleSave = (isSend) => {
    Taro.showToast({title: `${isSend ? '发送' : '保存' }成功`})
    Taro.navigateBack()
  }

  handlePickerChange = (e) => {
    const index = e.detail.value
    this.setState({
      current: this.state.list[index],
      delivery: this.state.list[index].name
    })
  }

  render() {
    return (
      <View className="delivery-page">
        <View className="content">
          <View className="item">
            <View className="item-title">物流公司</View>
            <View className="item-body">
              <Input value={this.state.delivery} placeholder="请手工输入或选择" />
            </View>
            <View className="item-float">
              <Picker
                style="text-align: center;"
                mode="selector"
                range={this.props.list}
                rangeKey="name"
                onChange={this.handlePickerChange}
              >
                <View>
                  <AtIcon value="chevron-right" size="24" color="#999" />
                </View>
              </Picker>
            </View>
          </View>
          <View className="item">
            <View className="item-title">物流单号</View>
            <View className="item-body">
              <Input placeholder="请手工输入或扫描" />
            </View>
            <View className="item-float" onClick={this.handleScanCode}>
              <AtIcon value="camera" size="24" color="#888" />
            </View>
          </View>
          <View className="item">
            <View className="item-title">客户手机</View>
            <View className="item-body">
              <Input placeholder="请输入客户手机号码" />
            </View>
          </View>
          <View className="item">
            <View className="item-title">业务联系手机</View>
            <View className="item-body">
              <Input placeholder="请输入业务联系手机号码" />
            </View>
          </View>
          <View style="height: 200px;" className="item-sms">
            <View className="sms-title">
              <Text>短信模板</Text>
              <Text>约计费2条短信</Text>
            </View>
            <View className="sms-body">
              <AtTextarea
                style="line-height:20px;"
                disabled
                height="200"
                value={this.state.content}
                maxlength="210"
              />
            </View>
          </View>
        </View>
        <View className="remark">
          <View style="color: #CC0033;">功能说明：</View>
          <View>1、保存，进保存输入的物流信息。</View>
          <View>2、发送短信通知客户，并相应扣减短信条数，请勿重复发送。</View>
        </View>
        <View className="toolbar">
          <AtButton onClick={this.handleSave.bind(this, true)} size="normal" type="primary">
            保存并发送
          </AtButton>
          <AtButton onClick={this.handleSave.bind(this, false)} size="normal" type="secondary">
            保存
          </AtButton>
        </View>
      </View>
    )
  }
}
