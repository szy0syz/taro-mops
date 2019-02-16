import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtModal } from "taro-ui"
import { connect } from '@tarojs/redux'

import './index.scss'

@connect(({ home, cart, loading, common }) => ({
  ...home,
  ...cart,
  ...loading,
  version: common.version
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  state = {
    showModal: false
  }

  componentDidMount() {
    const that = this
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) that.setState({ showModal: true })
    })
    updateManager.onUpdateFailed(function () {
      Taro.showToast({
        title: '下载新版本失败',
        icon: 'none',
      })
    })
  }

  //分享
  onShareAppMessage() {
    return {
      title: '云农农业科技-MOPS系统',
      path: '/pages/index/index',
    }
  }

  // 小程序上拉加载
  onReachBottom() {
    console.log('~~小程序上拉加载~~')
  }

  handleUpdate() {
    this.setState({ showModal: false })
    const updateManager = Taro.getUpdateManager()
    try {
      updateManager.applyUpdate()
    } catch (error) {
      console.error(error)
      Taro.showToast({
        title: '更新失败',
        icon: 'none'
      })
    }
  }

  handleCancel() {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal } = this.state;
    return (
      <View className='home-page'>
        <Image className='logo' src='http://cdn.jerryshi.com/picgo/20181126232346.png'></Image>
        <View>
          <Text className='cname'>云农农业科技 \n</Text>
          <Text className='cname'>MOPS系统 </Text>
        </View>
        <AtModal
          isOpened={showModal}
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

