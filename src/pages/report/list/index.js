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
          path: '/pages/report/sale/index'
        },
        {
          name: '销售毛利',
          path: '/pages/report/sale/index'
        },
        {
          name: '客户对账',
          path: '/pages/report/sale/index'
        },
        {
          name: '及时库存',
          path: '/pages/report/sale/index'
        }
      ]
    }
  }

  handleNav = (url) => {
    Taro.switchTab({url})
  }

  render() {
    const { reportList } = this.state
    return (
      <View className='container'>
        {reportList.map(item => (
          <AtButton onClick={this.handleNav.bind(this, item.path)} size='small' type='secondary' key={item.path}>{item.name}</AtButton>
        ))}
      </View>
    )
  }
}