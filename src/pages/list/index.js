import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, Picker, AtIcon } from 'taro-ui'
import './index.scss';

@connect(({ list }) => ({
  ...list,
}))
export default class List extends Component {
  config = {
    navigationBarTitleText: '明细',
  };

  componentDidMount = () => {

  };

  handleClick = (index) => {
    this.props.dispatch({ type: 'list/save', payload: { current: index } })
  }

  onDateStartChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateStart: e.detail.value } })
  }

  onDateEndChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
  }

  render() {
    return (
      <View className='page-container'>
        <View className='tabs-container'>
          <AtTabs
            current={this.state.current}
            height='100%'
            tabDirection='vertical'
            tabList={[
              { title: '销 售' },
              { title: '采 购' },
              { title: '应 收' },
              { title: '应 付' }
            ]}
            onClick={this.handleClick}
          >
            <AtTabsPane style='background-color: #fff;' tabDirection='vertical' current={this.props.current} index={0}>
              <View className='tab-box'>
                <Picker mode='date' onChange={this.onDateStartChange}>
                  <Text className='picker'>{this.props.dateStart}</Text>
                </Picker>
                <AtIcon value='chevron-down' color='#aaa'></AtIcon>
                <Text style='padding: 0 18rpx;'>到</Text>
                <Picker mode='date' onChange={this.onDateEndChange}>
                  <Text className='picker'>{this.props.dateEnd}</Text>
                </Picker>
                <AtIcon value='chevron-down' color='#aaa'></AtIcon>
                <AtIcon className='selectedDate' value='calendar'></AtIcon>
              </View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.props.current} index={1}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页二的内容</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.props.current} index={2}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页三的内容</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.props.current} index={3}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>标签页四的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}
