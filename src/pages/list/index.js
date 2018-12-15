import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Button } from '@tarojs/components'
import { AtDrawer, AtTabs, AtTabsPane, AtCheckbox, Picker, AtIcon, AtInput, AtTag, AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import ListHeader from '../../components/ListHeader'
import ListContent from '../../components/ListContent'

import './index.scss'

@connect(({ common, list }) => ({
  ...common,
  ...list,
}))
export default class List extends Component {
  config = {
    navigationBarTitleText: '明细',
  }

  componentDidShow = async () => {
    await this.props.dispatch({
      type: 'list/fetchOrders'
    })
    // 如果tabIndex=n没数据就加载
  }

  showToast(text, icon = 'none', duration = 2000) {
    Taro.showToast({
      title: text,
      icon,
      duration
    })
  }

  handleTabClick = (tabIndex) => {
    console.log('~~~~~~~~~~~~~invoke handleTabClick()', this.props.tabData[tabIndex].bills.length)
    this.props.dispatch({ type: 'list/save', payload: { tabIndex } })
    if(this.props.tabData[tabIndex].bills.length === 0) {
      this.props.dispatch({ type: 'list/fetchBills' })
    }
  }

  handleInputChange = (orderKeyword) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyword } })
  }

  handleDetail = (_id) => {
    Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}` })
  }

  handleNaviDetail= (basePath, id) => {
    Taro.navigateTo({ url: `/pages/easDetail/index?id=${id}&basePath=${basePath}` })
  }

  onDateStartChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateStart: e.detail.value } })
  }

  onStartDateChange = (basePath, e) => {
    let dateList = this.props.dateList
    dateList[basePath].start = e.detail.value
    this.props.dispatch({ type: 'list/save', payload: { dateList } })
  }

  onDateEndChange = e => {
    const { dispatch } = this.props
    dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
    dispatch({ type: 'list/fetchOrders' })
  }

  onEndDateChange = (basePath, e) => {
    const { dispatch } = this.props
    let dateList = this.props.dateList
    dateList[basePath].end = e.detail.value
    dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
    // dispatch({ type: 'list/fetchOrders' })
  }

  onSaleTypeChange = (e) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyType: e.detail.value } })
  }

  handleSearchConfirm = async (payload) => {
    if (payload && Object.keys(payload).length > 0) {
      // 最好只进行同步操作
      await this.props.dispatch({
        type: 'list/save',
        payload
      })
    }

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

  handleDrawerClick(index) {
    this.props.dispatch({
      type: 'list/fetchByCalendar',
      payload: { index }
    })
  }

  handleDrawerShow(isShow) {
    this.props.dispatch({
      type: 'list/save',
      payload: { showDateSelected: isShow }
    })
  }

  handleModalClose() {
    this.props.dispatch({
      type: 'list/save',
      payload: { showTagSelected: false }
    })
  }

  render() {
    const { tabData , tabIndex ,siBills, arBills, saleStatusAry, arBillStatusAry, showDateSelected, showTagSelected, orderTags, tagList, orderTagList, saleOrders, saleSearchTypes, orderKeyType, orderKeyword } = this.props
    return (
      <View className='page-container'>
        <View className='tabs-container'>
          <AtTabs
            current={tabIndex}
            height='100%'
            tabDirection='vertical'
            tabList={[
              { title: '订 单' },
              { title: '销 售' },
              { title: '应 收' }
            ]}
            onClick={this.handleTabClick}
          >
            <AtTabsPane style='background-color: #fff;' tabDirection='vertical' current={tabIndex} index={0}>
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
                  <AtIcon onClick={this.handleDrawerShow.bind(this, true)} className='selectedDate' color='#777' value='calendar'></AtIcon>
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
                        {item.orderTags && item.orderTags.map(tag => (
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
            <AtTabsPane tabDirection='vertical' current={tabIndex} index={1}>
              <ListHeader
                title='销售出库单'
                basePath='saleIssues'
                onStartDateChange={this.onStartDateChange}
                searchTypes={this.props.siSearchTypes}
                searchTypeIndex={0}
              ></ListHeader>
              <ListContent
                hasStatus
                basePath='saleIssues'
                data={tabData[1].bills}
                enmuList={saleStatusAry}
                onNaviDetail={this.handleNaviDetail}
              ></ListContent>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={tabIndex} index={2}>
              <ListHeader
                title='应收单'
                basePath='arBills'
                searchTypes={this.props.arSearchTypes}
                searchTypeIndex={0}
              ></ListHeader>
              <ListContent
                hasStatus
                basePath='arBills'
                data={tabData[2].bills}
                enmuList={arBillStatusAry}
                onNaviDetail={this.handleNaviDetail}
              ></ListContent>
            </AtTabsPane>
          </AtTabs>
        </View>
        <AtModal onClose={this.handleModalClose} isOpened={showTagSelected}>
          <AtModalContent>
            <AtCheckbox
              options={orderTagList}
              selectedList={orderTags}
              onChange={this.handleOrderTagChange}
            />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleShowTagSelect.bind(this, false)}>取消</Button> <Button onClick={this.handleSearchConfirm.bind(this, { showTagSelected: false })} style='color: #2bb2a7;'>确定</Button> </AtModalAction>
        </AtModal>
        <AtDrawer
          show={showDateSelected}
          mask
          right
          onClose={this.handleDrawerShow.bind(this, false)}
          onItemClick={this.handleDrawerClick.bind(this)}
          items={['今日', '上周', '本周', '上月', '本月', '上季度', '本季度', '去年', '本年']}
        ></AtDrawer>
      </View>
    )
  }
}