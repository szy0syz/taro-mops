import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class ReportList extends Component {
  config = {
    navigationBarTitleText: '所有报表',
  }

  constructor() {
    super(...arguments)
    this.state = {
      reportList: [
        {
          name: '销售统计',
          path: '/pages/reports/sale/index'
        },
        {
          name: '客户对账',
          path: '/pages/reports/customerAR/index'
        },
        {
          name: '即时库存',
          path: '/pages/reports/inventory/index'
        }
      ]
    }
  }

  handleNav = (url) => {
    Taro.navigateTo({url})
  }

  render() {
    const { reportList } = this.state
    return (
      <View className='container'>
        {reportList.map(item => (
          <AtButton onClick={this.handleNav.bind(this, item.path)} size='normal' type='secondary' key={item.path}>{item.name}</AtButton>
        ))}
      </View>
    )
  }
}