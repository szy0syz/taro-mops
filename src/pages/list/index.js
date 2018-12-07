import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtCheckbox, Picker, AtIcon, AtInput, AtTag, AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss';

@connect(({ common, list }) => ({
  ...common,
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
      type: 'list/fetchOrders'
    })
  }

  showToast(text, icon = 'none', duration = 2000) {
    Taro.showToast({
      title: text,
      icon,
      duration
    })
  }

  handleClick = (index) => {
    this.props.dispatch({ type: 'list/save', payload: { current: index } })
  }

  handleInputChange = (orderKeyword) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyword } })
  }

  handleDetail = (_id) => {
    Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}` })
  }

  onDateStartChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateStart: e.detail.value } })
  }

  onDateEndChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
  }

  onSaleTypeChange = (e) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyType: e.detail.value } })
  }

  handleSearchConfirm() {
    this.props.dispatch({
      type: 'list/save',
      payload: { showTagSelected: false }
    })
    this.props.dispatch({
      type: 'list/fetchOrders'
    }).then(success => {
      if (success) {
        this.showToast('查询完成', 'success', 1500)
      }
    })
  }

  handleShowTagSelect(hide) {
    this.props.dispatch({
      type: 'list/save',
      payload: { showTagSelected: hide ? true : false }
    })
  }

  handleOrderTagChange(orderTags) {
    this.props.dispatch({
      type: 'list/save',
      payload: { orderTags }
    })
  }

  render() {
    const { showTagSelected, orderTags, tagList,orderTagList, saleOrders, saleSearchTypes, orderKeyType, orderKeyword } = this.props
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
                        {saleSearchTypes[orderKeyType]}
                      </Text>
                      <AtIcon value='chevron-down' style='margin-left: 5rpx;' color='#aaa'></AtIcon>
                    </Picker>
                    <View className='searchInput'>
                      <AtInput
                        border={false}
                        placeholder='请输入关键字'
                        type='text'
                        value={orderKeyword}
                        onChange={this.handleInputChange}
                        onConfirm={this.handleSearchConfirm}
                      />
                    </View>
                  </View>
                </View>
                <View className='box-body'>
                  <View>
                    <Text>合计：￥{this.props.saleOrderAmount.toFixed(2)}</Text>
                    <View>
                      <AtTag onClick={this.handleShowTagSelect} active type='primary' circle>标签</AtTag>
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
        <AtModal isOpened={showTagSelected}>
          <AtModalContent>
            <AtCheckbox
              options={orderTagList}
              selectedList={orderTags}
              onChange={this.handleOrderTagChange}
            />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleShowTagSelect.bind(this, false)}>取消</Button> <Button onClick={this.handleSearchConfirm} style='color: #2bb2a7;'>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}