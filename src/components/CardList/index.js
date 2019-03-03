import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtCard } from 'taro-ui'
import PropTypes from 'prop-types'

import thumbPNG from '~assets/images/money.png'
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
          // note='马静敏'
          extra={`￥${Number(bill.FAmount).toFixed(2)}`}
          title={bill.FBizDate}
          thumb={thumbPNG}
        >
          <Text>单据编号：{bill.FNumber}</Text>
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
