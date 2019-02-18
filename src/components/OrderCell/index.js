import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.scss';

class OrderCell extends Component {
  static propTypes = {
    item: PropTypes.object,
    handleClick: PropTypes.func
  }

  handleClick = index => {
    const { onHanleClick } = this.props
    onHanleClick(index)
  }

  render() {
    const { item, hasIcon = false, index } = this.props;
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
            <View className='ellipsis'>结算价：￥{Number(item.MaterialPrice).toFixed(4)}</View>
          </View>
          <View className='at-row at-row--wrap'>
            <View className='at-col at-col-12'>其中赠品：{Number(item.giftQty || 0).toFixed(2)}公斤</View>
            <View className='at-col at-col-12'>开单金额：￥{Number(item.defaultAmount || 0).toFixed(4)}</View>
            <View className='at-col at-col-12'>结算金额：￥{Number(item.amount || 0).toFixed(4)}</View>
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
