import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtCard } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class CardList extends Component {
  static propTypes = {
    bills: PropTypes.array
  }

  static defaultProps = {
    bills: []
  }

  render() {
    const { bills } = this.props

    const emptyBox = (
      <View className='empyt-box'>
        <AtIcon value='message' size='50' color='#fff'></AtIcon>
        <Text>没有数据</Text>
      </View>
    )

    const cardBox = bills.map(bill => (
      <View key={bill.FNumber} className='bill-card'>
        <AtCard
          note='马静敏'
          extra={`￥${bill.FAmount}`}
          title={bill.FBizDate}
          thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        >
          {bill.FNumber}
        </AtCard>
      </View>
    ))

    return (
      <View className='container'>
        {bills.length > 0 ? cardBox : emptyBox}
      </View>
    )
  }
}

export default CardList
