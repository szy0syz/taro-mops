import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'
import Item from './Item'
import './index.scss';

class OrderCell extends Component {
  static propTypes = {
    item: PropTypes.object,
    handleClick: PropTypes.func
  }

  static defaultProps = {
    item: {
      qty: 0,
      giftQty: 0,
      MaterialPrice: 0,
      DefaultPrice: 0,
      amount: 0,
      defaultAmount: 0,
    }
  }

  handleClick = index => {
    const { onHanleClick } = this.props
    onHanleClick(index)
  }

  render() {
    const { item, hasIcon = false, index, isShared = false } = this.props;
    
    return (
      <View className='order-cell'>
        <View className='title'>
          <Text>{item.MaterialName + '　'}</Text>
          <Text style='font-size: 28rpx;'>{item.MaterialModel}</Text>
        </View>
        <View className='box'>
          <View className='at-row'>
            <View className='at-col at-col-12'>数　量：{Number(item.qty).toFixed(2)}公斤</View>
            <View className='at-col at-col-12'>开单价：￥{Number(item.DefaultPrice).toFixed(4)}</View>
            {/* <View className='at-col at-col-12'>结算价：￥{Number(item.MaterialPrice).toFixed(4)}</View> */}
            <Item isShow={!isShared} title='结算价' num={item.MaterialPrice}></Item>
          </View>
          <View className='at-row at-row--wrap'>
            <View className='at-col at-col-12'>其中赠品：{Number(item.giftQty).toFixed(2)}公斤</View>
            <View className='at-col at-col-12'>开单金额：￥{Number(item.defaultAmount).toFixed(4)}</View>
            {/* <View className='at-col at-col-12'>结算金额{Number(item.amount).toFixed(4)}</View> */}
            <Item isShow={!isShared} title='结算金额' num={item.amount}></Item>
          </View>
          {hasIcon ? (
            <View className='item-icon'>
              <AtIcon onClick={this.handleClick.bind(this, index)} value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}

export default OrderCell
