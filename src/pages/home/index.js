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
            placeholder='搜索商品名称/规格/条形码/助记码'
            showActionButton
            value={keyword}
            onChange={this.onChange.bind(this)}
          />
          <MySwiper></MySwiper>
          <View className='title-column'>
            <View className='item-stats'>
              <Text style='font-size: 30rpx;'>￥1688.00</Text>
              <Text style='padding-top:6rpx;' className='column-lable'>本月销售</Text>
            </View>
            <View className='item-text'>
              <View>
                <AtIcon value='credit-card' size='26' color='#fff'></AtIcon>
                <Text className='column-lable'>资金</Text>
              </View>
              <View>
                <AtIcon value='calendar' size='25' color='#fff'></AtIcon>
                <Text className='column-lable'>订单</Text>
              </View>
            </View>
            <View className='item-stats'>
              <Text style='font-size: 30rpx;'>￥711548.00</Text>
              <Text style='padding-top:6rpx;' className='column-lable'>库存金额</Text>
            </View>
          </View>
        </View>
        <View>
        </View>
        <View className='grid-menu'>
          <View>
            <View className='menu-icon'>
              <AtIcon value='user' size='26' color='#fff'></AtIcon>
            </View>
            <View className='menu-text'>客户管理</View>
            <View className='menu-text' style='color: #2bb2a7'>￥12150.00</View>
          </View>
          <View>
            <View className='menu-icon'>
              <AtIcon value='bullet-list' size='26' color='#fff'></AtIcon>
            </View>
            <View className='menu-text'>商品查看</View>
          </View>
          <View>
            <View className='menu-icon'>
              <AtIcon value='money' size='26' color='#fff'></AtIcon>
            </View>
            <View className='menu-text'>供应商管理</View>
            <View className='menu-text' style='color: #2bb2a7'>￥29880.00</View>
          </View>
        </View>
      </View>
    )
  }
}

