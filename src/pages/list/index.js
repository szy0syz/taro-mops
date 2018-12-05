import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, Picker, AtIcon, AtInput, AtTag } from 'taro-ui'
import './index.scss';

@connect(({ list }) => ({
  ...list,
}))
export default class List extends Component {
  config = {
    navigationBarTitleText: '明细',
  }

  // bug
  // componentWillMount = () => {}

  componentDidShow = () => {
    console.log('componentDidShow~~~')
    this.props.dispatch({
      type: 'list/loadSaleOrders'
    })
  }

  // componentDidMount = () => {
  //   this.props.dispatch({
  //     type: 'list/loadSaleOrders'
  //   })
  // }

  handleClick = (index) => {
    this.props.dispatch({ type: 'list/save', payload: { current: index } })
  }

  handleInputChange = (keyword) => {
    this.props.dispatch({ type: 'list/save', payload: { keyword } })
  }

  handleDetail = (_id) => {
    Taro.navigateTo({url: `/pages/detail/index?_id=${_id}`})
  }

  onDateStartChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateStart: e.detail.value } })
  }

  onDateEndChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
  }

  onSaleTypeChange = (e) => {
    this.props.dispatch({ type: 'list/save', payload: { saleSearchType: e.detail.value } })
  }

  render() {
    const { tagList, saleOrders, saleSearchTypes, saleSearchType, keyword } = this.props
    return (
      <View className='page-container'>
        <View className='tabs-container'>
          <AtTabs
            current={this.props.current}
            height='100%'
            tabDirection='vertical'
            tabList={[
              { title: '订 单' },
              { title: '销 售' },
              { title: '应 收' }
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
                  <AtIcon className='selectedDate' color='#777' value='calendar'></AtIcon>
                </View>
                <View className='box-search'>
                  <Text>销售订单</Text>
                  <View>
                    <Picker className='searchType' mode='selector' range={saleSearchTypes} onChange={this.onSaleTypeChange}>
                      <Text>
                        {saleSearchTypes[saleSearchType]}
                      </Text>
                      <AtIcon value='chevron-down' style='margin-left: 5rpx;' color='#aaa'></AtIcon>
                    </Picker>
                    <View className='searchInput'>
                      <AtInput
                        border={false}
                        placeholder='请输入关键字'
                        type='text'
                        value={keyword}
                        onChange={this.handleInputChange.bind(this)}
                      />
                    </View>
                  </View>
                </View>
                <View className='box-body'>
                  <View>
                    <Text>合计：￥{this.props.saleOrderAmount.toFixed(2)}</Text>
                    <View>
                      <AtTag active type='primary' circle>标签</AtTag>
                      {/* <AtTag circle className='bill-opt writing'>开单</AtTag> */}
                    </View>
                  </View>
                  {saleOrders.map(item => (
                    <View key={item._id} className='bill-item' onClick={this.handleDetail.bind(this, item._id)}>
                      <View>
                        <Text>{item.billDate}</Text>
                        {item.billTags && item.billTags.map(tag => (
                          <AtTag key={tag} size='small' className={`bill-tag ${tag}`}>{tagList[tag]}</AtTag>
                        ))}
                      </View>
                      <View className='bill-body'>
                        <Text>{item.customer.CustomerName}</Text>
                        <View>
                          <Text>￥{item.amount.toFixed(2)}</Text>
                          <AtIcon value='chevron-right' color='#aaa'></AtIcon>
                        </View>
                      </View>
                      <Text>
                        {item.number}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.props.current} index={1}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>【EAS销售出库单】</View>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={this.props.current} index={2}>
              <View style='background-color: #fff;font-size:18px;text-align:center;height:200px;'>【EAS应收单】</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}