import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class renderItem extends Component {
  render() {
    const { isShow, title, num } = this.props;
    if (!isShow) return (<View></View>)
    return (<View className='ellipsis'>{title}：￥{Number(num).toFixed(4)}</View>)
  }
}

export default renderItem;