import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class ListContent extends Component {
  static propTypes = {
    // totalAmount: PropTypes.number,
    tagList: PropTypes.array,
    hasStatus: PropTypes.bool,
    enmuList: PropTypes.array,
    onItemClick: PropTypes.func,
    onStatusClick: PropTypes.func,
    basePath: PropTypes.string,
    model: PropTypes.object
  }

  static defaultProps = {
    enmuList: [],
    hasStatus: false,
    basePath: 'saleIssues',
    model: {
      bills: []
    }
  }

  render() {
    const { model, enmuList, hasStatus, basePath } = this.props
    let totalAmount
    if (hasStatus) {
      totalAmount = model.bills.length > 0 ? model.bills.reduce((acc, item) => acc += parseFloat(item.FTotalAmount), 0).toFixed(2) : parseFloat(0).toFixed(2)
    } else {
      totalAmount = 0
    }
    // TODO: 待修复~~~~
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
            model.bills.map(item => (
              <View key={item.FID} className='bill-item' onClick={this.props.onNaviDetail.bind(this, basePath, item.FID)}>
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
              model.bills.map(item => (
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
