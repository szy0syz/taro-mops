import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtModal } from "taro-ui"
import { connect } from '@tarojs/redux'

// import { getVersion } from './service'

import './index.scss'

@connect(({ home, cart, loading, common }) => ({
  ...home,
  ...cart,
  ...loading,
  version: common.version
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    window: {
      navigationStyle: "custom"
    }
  };

  state = {
    showModal: false
  }

  componentDidMount = async () => {
    // const updateManager = Taro.getUpdateManager()
    // const { data } = await getVersion()
    // let remoteVersion = parseInt(data.weapp.version.replace(/\./g, '')) || 0
    // let localVersion = parseInt(this.props.version.replace(/\./g, ''))
    // if (remoteVersion > localVersion) {
    //   this.setState({showModal: true})
    // }
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

  handleUpdate() {
    this.setState({showModal: false})
    const updateManager = Taro.getUpdateManager()
    updateManager.applyUpdate()
  }

  render() {
    return (
      <View className='home-page'>
        <Image className='logo' src='http://cdn.jerryshi.com/picgo/20181126232346.png'></Image>
        <View>
          <Text className='cname'>云农农业科技 \n</Text>
          <Text className='cname'>MOPS系统 </Text>
        </View>
        <AtModal
          isOpened={this.state.showModal}
          title='更新提示'
          cancelText='取消'
          confirmText='更新'
          onCancel={this.handleCancel}
          onConfirm={this.handleUpdate}
          content='远程发现新版本，请更新后再使用。'
        />
      </View>
    )
  }
}

