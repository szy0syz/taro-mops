import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'

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
    
  }

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
        <AtSearchBar
          placeholder='搜索商品名称/规格/助记码/订单号'
          showActionButton
          value={keyword}
          onChange={this.onChange.bind(this)}
        />
        <Image className='logo' src='http://cdn.jerryshi.com/picgo/20181126232346.png'></Image>
        <View>
          <Text className='cname'>云农农业科技 \n</Text>
          <Text className='cname'>MOPS系统 </Text>
        </View>
      </View>
    )
  }
}

