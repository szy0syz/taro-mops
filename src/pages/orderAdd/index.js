import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button, Text, Image, Input, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtCheckbox, AtButton } from 'taro-ui'
import './index.scss'

@connect(({ order }) => ({
  ...order,
}))
export default class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      checkedList: ['list2'],
      checkboxOption: [{
        value: 'list1',
        label: '有欠款'
      }, {
        value: 'list2',
        label: '已发货'
      }, {
        value: 'list3',
        label: '已收款'
      }, {
        value: 'list4',
        label: '已同步'
      }],
      payTypes: [
        {
          key: '银行汇款',
          value: 'v1'
        },
        {
          key: '现金',
          value: 'v2'
        },
        {
          key: '微信',
          value: 'v3'
        },
        {
          key: '支付宝',
          value: 'v4'
        }
      ],
      payTypeChecked: {
        key: '银行汇款',
        value: 'v1'
      },
      storekeeperList: [
        {
          name: '李四四',
          id: 'lss'
        },
        {
          name: '王五五',
          id: 'wmz'
        }
      ],
      storekeeperChecked: {
        name: '李四四',
        id: 'lss'
      }
    }
  }

  config = {
    navigationBarTitleText: '开单',
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'order/init'
    })
  }

  handleChange(value) {
    console.log(value)
    // this.setState({
    //   billData
    // })
  }

  handleBillDateChange(value) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        billDate: value.detail.value
      }
    })
  }

  render() {
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
              className='custom-listItem'
              title='日期'
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'clock',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title='客户'
              extraText='呈贡农药一店'
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
            <Button style='background-color: rgba(241, 181, 85, 1);' className='custom-button' size='mini'>调用模板</Button>
            <Button style='background-color: #1fb7a6;' className='custom-button' size='mini'>存为模板</Button>
          </View>
          <View>
            <Text>选择货品(4)</Text>
            <Text>合计金额：￥2080.00</Text>
          </View>
          <View>
            <View className='order-item'>
              <Image className='m-img' src='http://cdn.jerryshi.com/picgo/20181104150040.png'></Image>
              <View>
                <Text>敌杀死</Text>
                <View className='order-cell'>
                  <Text>单价：￥66.00</Text>
                  <Text>数量：10.00公斤</Text>
                </View>
                <View className='order-cell'>
                  <Text>规格：200g 水乳剂</Text>
                  <Text>金额：￥660.00</Text>
                </View>
              </View>
              <AtIcon value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
            <View className='order-item'>
              <Image className='m-img' src='http://cdn.jerryshi.com/picgo/20181104150040.png'></Image>
              <View>
                <Text>敌百强</Text>
                <View className='order-cell'>
                  <Text>单价：￥66.00</Text>
                  <Text>数量：10.00公斤</Text>
                </View>
                <View className='order-cell'>
                  <Text>规格：200g 水乳剂</Text>
                  <Text>金额：￥660.00</Text>
                </View>
              </View>
              <AtIcon value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
            <View className='order-item'>
              <Image className='m-img' src='http://cdn.jerryshi.com/picgo/20181104150040.png'></Image>
              <View>
                <Text>敌百万</Text>
                <View className='order-cell'>
                  <Text>单价：￥66.00</Text>
                  <Text>数量：10.00公斤</Text>
                </View>
                <View className='order-cell'>
                  <Text>规格：200g 水乳剂</Text>
                  <Text>金额：￥660.00</Text>
                </View>
              </View>
              <AtIcon value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
            <View className='order-item'>
              <Image className='m-img' src='http://cdn.jerryshi.com/picgo/20181104150040.png'></Image>
              <View>
                <Text>敌千万</Text>
                <View className='order-cell'>
                  <Text>单价：￥66.00</Text>
                  <Text>数量：10.00公斤</Text>
                </View>
                <View className='order-cell'>
                  <Text>规格：200g 水乳剂</Text>
                  <Text>金额：￥660.00</Text>
                </View>
              </View>
              <AtIcon value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
          </View>
          <View>
            <Image src='http://cdn.jerryshi.com/picgo/scanAdd.png'></Image>
            <Image src='http://cdn.jerryshi.com/picgo/plusAdd.png'></Image>
          </View>
        </View>
        <View className='order-wrapper order-footer'>
          <View>
            <Text>应收金额</Text>
            <Input type='digit' placeholder='0.00' className='input-amount'></Input>
          </View>
          <View>
            <Text>结算方式</Text>
            <Picker mode='selector' range={this.state.payTypes} rangeKey='key' onChange={this.onChange}>
              <View className='picker'>
                {this.state.payTypeChecked.key}
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
            <Picker mode='selector' range={this.state.storekeeperList} rangeKey='name' onChange={this.onChange}>
              <View className='picker'>
                {this.state.storekeeperChecked.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View>
          <View>
            <Text>票据影像</Text>
            <View>
              <AtIcon value='camera' size='34' color='#fff'></AtIcon>
            </View>
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Input placeholder='备注(最多100字)'></Input>
          </View>
        </View>
        <View>
          <AtCheckbox
            style='background-color: #aaa;'
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <View className='toolbar'>
          <View style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='34' color='#fff'></AtIcon>
          </View>
          <AtButton size='normal' type='secondary'>在开一单</AtButton>
          <AtButton size='normal' type='primary'>确认保存</AtButton>
          <View style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-shangchuan' size='36' color='#fff'></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
