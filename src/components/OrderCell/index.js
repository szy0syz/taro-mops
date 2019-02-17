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

  handleClick = item => {
    const { onHandleRemove } = this.props;
    onHandleRemove(item);
    console.log(item);
  }

  render() {
    const { item, hasIcon = false } = this.props;
    return (
      <View className='order-cell'>
        <View className='title'>
          <Text>{item.MaterialName}</Text>
        </View>
        <View className='box'>
          <View className='at-row'>
            <View className='at-col at-col-12'>结算价：￥{Number(item.MaterialPrice).toFixed(4)}</View>
            <View className='at-col at-col-12'>开单价：￥{Number(item.DefaultPrice).toFixed(4)}</View>
            <View style='width: 180px; font-size: 24rpx;' className='ellipsis'>规格：{item.MaterialModel}</View>
          </View>
          <View className='at-row at-row--wrap'>
            <View className='at-col at-col-12'>数量：{Number(item.qty).toFixed(2)}公斤</View>
            <View className='at-col at-col-12'>开单金额：￥{Number(item.defaultAmount || 0).toFixed(4)}</View>
            <View className='at-col at-col-12'>结算金额：￥{Number(item.amount || 0).toFixed(4)}</View>
          </View>
          {hasIcon ? (
            <View className='item-icon'>
              <AtIcon onClick={this.handleClick.bind(this, item)} value='subtract-circle' size='30' color='#F00'></AtIcon>
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}

export default OrderCell
