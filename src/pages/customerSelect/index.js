import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, AtListItem } from 'taro-ui'

import './index.scss';

@connect(({ common, order }) => ({
  ...common,
  ...order
}))
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

  handleSelected(customer) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        customer
      }
    })
    Taro.redirectTo({
      url: '/pages/order/index'
    })
  }

  render() {
    const { customerList } = this.props
    return (
      <View className='page'>
        <View className='header'>

        </View>
        <View className='body'>
          <ScrollView
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style='height: 100%;'
          >
            <AtList>
              {customerList.map(item => (
                <AtListItem
                  key={item.fid}
                  onClick={this.handleSelected.bind(this, item)}
                  title={item.name}
                  arrow='right'
                  note={`应收款：￥${item.amountRec}`}
                  extraText={item.area}
                />
              ))}
            </AtList>
          </ScrollView>
        </View>
        <View className='footer'>
          <AtButton onClick={this.handleAddCustomer} type='secondary' size='small'>添加客户</AtButton>
        </View>
      </View>
    )
  }
}
