import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, AtListItem } from 'taro-ui'
import SearchHeader from '../../components/SearchHeader'
import './index.scss';

@connect(({ common, order, customerSelect }) => ({
  ...customerSelect,
  ...common,
  ...order
}))
export default class CustomerSelect extends Component {
  config = {
    navigationBarTitleText: '选择客户',
  }

  componentDidMount = () => {
    const { prevModel } = this.$router.params
    this.props.dispatch({
      type: 'customerSelect/save',
      payload: { prevModel }
    })
  }

  handleAddCustomer() {
    Taro.showToast({
      icon: 'none',
      title: '请在 [ EAS系统 ] 中添加'
    })
  }

  handleSelected(customer) {
    const { prevModel } = this.props
    if (prevModel) {
      this.props.dispatch({
        type: `${[prevModel]}/save`,
        payload: {
          customer
        }
      })
      Taro.navigateBack()
    } else {
      this.props.dispatch({
        type: 'order/save',
        payload: {
          customer
        }
      })
      Taro.switchTab({ url: '/pages/order/index' })
    }
  }

  handleSearch = (type, keyword = '') => {
    const { dispatch } = this.props
    switch (keyword.length) {
      case 0:
        dispatch({
          type: 'common/save',
          payload: { customerList: [] }
        })
        break
      case 1:
        // Taro.atMessage({
        //   'message': '消息通知',
        //   'type': 'wa',
        // })
        break
      default:
        this.props.dispatch({
          type: 'customerSelect/getCustomers',
          payload: { keyword }
        })
        break
    }
  }

  render() {
    const { customerList, searchTypes } = this.props
    return (
      <View className='page'>
        <SearchHeader searchTypes={searchTypes} onHandleSearch={this.handleSearch}></SearchHeader>
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
                  key={item.FID}
                  onClick={this.handleSelected.bind(this, item)}
                  title={item.CustomerName}
                  arrow='right'
                  note={`应收款：￥${item.amountRec || 0}`}
                  extraText={item.CustomerArea}
                />
              ))}
            </AtList>
          </ScrollView>
        </View>
        <View className='footer'>
          <AtButton onClick={this.handleAddCustomer} type='secondary' size='small'>添加客户</AtButton>
        </View>
        {/* <AtMessage /> */}
      </View>
    )
  }
}
