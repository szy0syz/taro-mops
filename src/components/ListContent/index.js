import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class ListContent extends Component {
  static propTypes = {
    totalAmount: PropTypes.number,
    data: PropTypes.array,
    tagList: PropTypes.array,
    hasStatus: PropTypes.bool,
    enmuList: PropTypes.array
  }

  static defaultProps = {
    totalAmount: parseInt(0).toFixed(2),
    data: [],
    enmuList: [],
    hasStatus: false
  }

  render() {
    const { data, enmuList, totalAmount, hasStatus } = this.props
    return (
      <View className='container'>
        <View className='box-body'>
          <View>
            <Text>合计：￥{totalAmount}</Text>
            <View>
              <AtTag onClick={this.handleShowTagSelect} active type='primary' circle>{hasStatus ? '状态' : '标签'}</AtTag>
            </View>
          </View>
          {hasStatus ? (
            data.map(item => (
              <View key={item._id} className='bill-item' onClick={this.handleDetail.bind(this, item._id)}>
                <View>
                  <Text>{item.billDate}</Text>
                  <AtTag size='small' className='bill-tag shipped'>{enmuList[item.FStatus]}</AtTag>
                </View>
                <View className='bill-body'>
                  <Text>{item.customer.CustomerName}</Text>
                  <View>
                    <Text>￥{item.amount.toFixed(2)}</Text>
                    <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                  </View>
                </View>
                <Text>
                  {item.number}
                </Text>
              </View>
            ))
          ) : (
              data.map(item => (
                <View key={item._id} className='bill-item' onClick={this.handleDetail.bind(this, item._id)}>
                  <View>
                    <Text>{item.billDate}</Text>
                    {item.orderTags && item.orderTags.map(tag => (
                      <View key={tag} className={`bill-tag ${tag}`}>
                        <AtTag size='small'>{enmuList[tag]}</AtTag>
                      </View>
                    ))}
                  </View>
                  <View className='bill-body'>
                    <Text>{item.customer.CustomerName}</Text>
                    <View>
                      <Text>￥{item.amount.toFixed(2)}</Text>
                      <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                    </View>
                  </View>
                  <Text>
                    {item.number}
                  </Text>
                </View>
              ))
            )}
        </View>
      </View>
    )
  }
}

export default ListContent
