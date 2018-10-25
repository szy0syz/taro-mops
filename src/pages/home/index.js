import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtSearchBar, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';
import MySwiper from '../../components/MySwiper';
import './index.scss';

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading,
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
    this.props.dispatch({
      type: 'home/product',
    });

    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length),
      })
    } else {
      Taro.removeTabBarBadge({
        index: 1,
      })
    }
  };

  //分享
  onShareAppMessage() {
    return {
      title: '云农农业科技-MOPS系统',
      path: '/pages/home/index',
    }
  }

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'home/product',
    });
  }

  render() {
    const { keyword } = this.props;
    return (
      <View className='home-page'>
        <View className='upper-area'>
          <AtSearchBar
            showActionButton
            value={keyword}
            onChange={this.onChange.bind(this)}
          />
          <MySwiper></MySwiper>
          <View className='title-column'>
            <View>
              <Text>￥1688.00</Text>
              <Text>本月销售</Text>
            </View>
            <View className='item-text'>
              <View>
                <AtIcon value='clock' size='30' color='#F00'></AtIcon>
                <Text>资金</Text>
              </View>
              <View>
                <AtIcon value='calendar' size='29' color='#F00'></AtIcon>
                <Text>订单</Text>
              </View>
            </View>
            <View>
              <Text>￥711548.00</Text>
              <Text>库存金额</Text>
            </View>
          </View>
        </View>
        <View>
        </View>
      </View>
    )
  }
}

