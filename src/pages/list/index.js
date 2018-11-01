import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, Picker, AtIcon, AtInput, AtTag, AtList, AtListItem } from 'taro-ui'
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

  onSaleTypeChange = (e) => {
    console.log(e)
    this.props.dispatch({ type: 'list/save', payload: { saleSearchType: e.detail.value } })
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
                <View className='box-header'>
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
                <View className='box-search'>
                  <Text>销售订单</Text>
                  <View>
                    <Picker className='searchType' mode='selector' range={this.props.saleSearchTypes} onChange={this.onSaleTypeChange}>
                      <Text>
                        {this.props.saleSearchTypes[this.props.saleSearchType]}
                      </Text>
                      <AtIcon value='chevron-down' style='margin-left: 5rpx;' color='#aaa'></AtIcon>
                    </Picker>
                    <View className='searchInput'>
                      <AtInput
                        clear
                        border={false}
                        placeholder='点击清除按钮清空内容'
                        type='text'
                        value={this.state.value4}
                        onChange={this.handleChange.bind(this)}
                      />
                    </View>
                  </View>
                </View>
                <View className='box-body'>
                  <View>
                    <Text>合计：￥{this.props.saleOrders.total}</Text>
                    <View>
                      <AtTag style='height: 20rpx;margin:0 30rpx 0 20rpx;' circle>开单</AtTag>
                      <AtTag active type='primary' circle>标签</AtTag>
                    </View>
                  </View>
                  <View style='width:100%;padding:16rpx 8rpx;'>
                    <View style='padding-right: 10rpx;'>
                      <Text>2018-10-25 15:58</Text>
                      <AtTag size='small' className='bill-tag shipped'>已发货</AtTag>
                      <AtTag size='small' className='bill-tag payment'>已收款</AtTag>
                    </View>
                    <View className='bill-body'>
                      <Text>呈贡农药经营部</Text>
                      <View>
                        <Text>￥8720.00</Text>
                        <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                      </View>
                    </View>
                  </View>
                </View>
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
