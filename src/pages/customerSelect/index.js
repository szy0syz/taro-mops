import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, AtListItem, Picker, AtIcon } from 'taro-ui'

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
    console.log(prevModel)
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

    // const { isNaviBack } = this.$router.params
    // console.log(customer)
    // if (isNaviBack && isNaviBack === 'true') {
    //   const pages = Taro.getCurrentPages()
    //   console.log(pages)
    //   const prevPage = pages[pages.length - 2]
    //   prevPage.data.customer = customer.CustomerNumber
    //   console.log(prevPage)
    //   Taro.navigateBack()
    // } else {
    //   Taro.switchTab({ url: '/pages/order/index' })
    // }
  }

  fetchData = (val) => {
    this.props.dispatch({
      type: 'customerSelect/getCustomers',
      payload: {
        keyword: val
      }
    })
  }

  // TODO: _.debounce...
  handleKeyword = (e) => {
    const val = e.target.value
    const { dispatch } = this.props
    if (val.length === 0) {
      dispatch({
        type: 'common/save',
        payload: {
          customerList: []
        }
      })
      return
    }
    if (val.length > 1) {
      // debounce(() => {
      //   this.props.dispatch({
      //     type: 'customerSelect/getCustomers',
      //     payload: {
      //       keyword: val
      //     }
      //   })
      // }, 1200)()
      //_.debounce(this.fetchData(val), 1500)()
      this.props.dispatch({
        type: 'customerSelect/getCustomers',
        payload: {
          keyword: val
        }
      })
    }
  }

  render() {
    const { customerList, keyword } = this.props
    return (
      <View className='page'>
        <View className='header'>
          <Picker mode='selector' range={this.props.searchTypes} rangeKey='key' onChange={this.onChange}>
            <View className='customer-type'>
              {this.props.searchType.key}
              <AtIcon value='chevron-down' size='28' color='rgba(117, 117, 119, 1)'></AtIcon>
            </View>
          </Picker>
          <Input type='string' name='keyword' placeholder='请输入查询关键字' value={keyword} onInput={this.handleKeyword} />
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
      </View>
    )
  }
}
