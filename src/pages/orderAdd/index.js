import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux';
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
      }]
    }

  }

  config = {
    navigationBarTitleText: '开单',
  }

  componentWillMount = () => {
  }

  handleChange(value) {
    this.setState({
      checkedList: value
    })
  }

  render() {
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <AtList>
            <AtListItem
              className='custom-listItem'
              title='日期'
              extraText='2018-11-05'
              arrow='right'
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
            <Text>选择货品(5.00)</Text>
            <Text>合计金额：￥2080.00</Text>
          </View>
          <View>
            <View className='order-item'>
              <AtIcon value='add-circle' size='46' color='#00F'></AtIcon>
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
              <AtIcon value='add-circle' size='46' color='#00F'></AtIcon>
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
              <AtIcon value='add-circle' size='46' color='#00F'></AtIcon>
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
          </View>
          <View>
            <Image src='http://cdn.jerryshi.com/picgo/scanAdd.png'></Image>
            <Image src='http://cdn.jerryshi.com/picgo/plusAdd.png'></Image>
          </View>
          <View>
            票据影像
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
