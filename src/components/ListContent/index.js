import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class ListContent extends Component {
  static propTypes = {
    // totalAmount: PropTypes.number,
    data: PropTypes.array,
    tagList: PropTypes.array,
    hasStatus: PropTypes.bool,
    enmuList: PropTypes.array,
    onItemClick: PropTypes.func,
    onStatusClick: PropTypes.func
  }

  static defaultProps = {
    // totalAmount: parseInt(0).toFixed(2),
    data: [],
    enmuList: [],
    hasStatus: false
  }

  render() {
    const { data, enmuList, hasStatus } = this.props
    let totalAmount
    if (hasStatus) {
      totalAmount = data.length > 0 ? data.reduce((acc, item) => acc += parseFloat(item.FTotalAmount), 0).toFixed(2) : parseFloat(0).toFixed(2)
    } else {
      totalAmount = 0
    }
    return (
      <View className='container'>
        <View className='box-body'>
          <View>
            <Text>合计：￥{totalAmount}</Text>
            <View>
              <AtTag onClick={this.onStatusClick} active type='primary' circle>{hasStatus ? '状态' : '标签'}</AtTag>
            </View>
          </View>
          {hasStatus ? (
            data.map(item => (
              <View key={item.FID} className='bill-item' onClick={this.onItemClick.bind(this, item.FID)}>
                <View>
                  <Text>{item.FBizDate}</Text>
                  <View className={`bill-tag ${enmuList[item.FBaseStatus].value}`}>
                    <AtTag size='small' >{enmuList[item.FBaseStatus].label}</AtTag>
                  </View>
                </View>
                <View className='bill-body'>
                  <Text>{item.FCustomerName}</Text>
                  <View>
                    <Text>￥{item.FTotalAmount.toFixed(2)}</Text>
                    <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                  </View>
                </View>
                <Text>
                  {item.FNumber}
                </Text>
              </View>
            ))
          ) : (
              data.map(item => (
                <View key={item._id} className='bill-item' onClick={this.onItemClick.bind(this, item._id)}>
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
                      <Text>￥{Number(item.amount).toFixed(2)}</Text>
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
