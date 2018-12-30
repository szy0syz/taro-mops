import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtIcon, AtSwipeAction } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class ListContent extends Component {
  static propTypes = {
    tagList: PropTypes.array,
    enmuList: PropTypes.array,
    onItemClick: PropTypes.func,
    onShowTagMenu: PropTypes.func,
    onNaviDetail: PropTypes.func,
    onHandleRemove: PropTypes.func,
    basePath: PropTypes.string,
    model: PropTypes.object,
    isEas: PropTypes.bool
  }

  static defaultProps = {
    enmuList: [],
    isEas: false,
    basePath: 'saleIssues',
    model: {
      bills: []
    }
  }

  handleSwipeClick = (_id, opts, index) => {
    console.log(index === 1)
    index === 1 ? this.props.onHandleRemove(_id) : null
  }

  render() {
    const { onShowTagMenu, model, enmuList, isEas, basePath, onNaviDetail } = this.props
    let totalAmount
    const opts_SwipeAction = [
      {
        text: '取消',
        backgroundColor: '#6190E8'
      }
      ,
      {
        text: '删除',
        style: {
          backgroundColor: '#FF4949'
        }
      }
    ]
    if (isEas) {
      totalAmount = model.bills.length > 0 ? model.bills.reduce((acc, item) => acc += Number(item.FTotalAmount), 0).toFixed(2) : 0
    } else {
      totalAmount = model.bills.length > 0 ? model.bills.reduce((acc, item) => acc += Number(item.totalAmount), 0).toFixed(2) : 0
    }

    return (
      <View className='container'>
        <View className='box-body'>
          <View>
            <Text>合计：￥{totalAmount}</Text>
            <View>
              <AtTag onClick={onShowTagMenu} active type='primary' circle>{isEas ? '状态' : '标签'}</AtTag>
            </View>
          </View>
          {isEas ? (
            model.bills.map(item => (
              <View key={item.FID} className='bill-item' onClick={onNaviDetail.bind(this, basePath, item.FID)}>
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
                <AtSwipeAction autoClose onClick={this.handleSwipeClick.bind(this, item._id)} key={item._id} options={opts_SwipeAction}>
                  <View className='bill-item' onClick={onNaviDetail.bind(this, basePath, item._id)}>
                    <View>
                      <Text>{item.billDate && item.billDate.split('T')[0]}</Text>
                      {item.orderTags && item.orderTags.map(tag => (
                        <View key={tag} className={`bill-tag ${tag}`}>
                          <AtTag key={tag} size='small'>{enmuList.find(i => i.value === tag).label}</AtTag>
                        </View>
                      ))}
                    </View>
                    <View className='bill-body'>
                      <Text>{item.customer.CustomerName}</Text>
                      <View>
                        <Text>￥{item && item.totalAmount && item.totalAmount.toFixed(2)}</Text>
                        <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                      </View>
                    </View>
                    <Text>
                      {item.number}
                    </Text>
                  </View>
                </AtSwipeAction>
              ))
            )}
        </View>
      </View>
    )
  }
}

export default ListContent
