import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton, AtList, AtListItem  } from 'taro-ui'

import './index.scss';

export default class CustomerSelect extends Component {
  config = {
    navigationBarTitleText: '选择客户',
  }

  componentDidMount = () => { }

  handleAddCustomer() {
    Taro.showToast({
      icon: 'none',
      title: '请在 [ EAS系统 ] 中添加'
    })
  }

  render() {
    return (
      <View className='page'>
        <View className='header'></View>
        <View className='body'>
          <AtList>
            <AtListItem
              title='昆明大客户1'
              note='应收款：￥0.00'
              arrow='right'
            />
            <AtListItem
              title='大理小客户2'
              note='应收款：￥0.00'
              arrow='right'
            />
            <AtListItem
              title='玉溪中客户3'
              note='应收款：￥0.00'
              arrow='right'
            />
          </AtList>
          
        </View>
        <View className='footer'>
          <AtButton onClick={this.handleAddCustomer} type='secondary' size='small'>添加客户</AtButton>
        </View>
      </View>
    )
  }
}
