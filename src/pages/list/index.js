import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss';

export default class List extends Component {
  config = {
    navigationBarTitleText: '明细',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='page-container'>
        <View className='tabs-container'>
          <AtTabs
            current={this.state.current}
            scroll
            height='1060rpx'
            tabDirection='vertical'
            tabList={[
              { title: '销 售' },
              { title: '采 购' },
              { title: '应 收' },
              { title: '应 付' }
            ]}
            onClick={this.handleClick.bind(this)}
          >
            <AtTabsPane style='background-color: #fff;' tabDirection='vertical' current={this.state.current} index={0}>
              <View style='font-size:18px;text-align:center;height:200px;'>标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页二的内容</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.state.current} index={2}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页三的内容</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.state.current} index={3}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页四的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}
