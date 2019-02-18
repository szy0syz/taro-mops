import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button } from '@tarojs/components'
import { AtDrawer, AtTabs, AtTabsPane, AtCheckbox, AtModal, AtModalContent, AtModalAction } from 'taro-ui'
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

  componentDidShow = () => {
    // 如果tabIndex=n没数据就加载
    this.props.dispatch({
      type: 'list/fetchBills'
    })
  }

  showToast(text, icon = 'none', duration = 2000) {
    Taro.showToast({
      title: text,
      icon,
      duration
    })
  }

  handleTabClick = (tabIndex) => {
    this.props.dispatch({ type: 'list/save', payload: { tabIndex } })
    if (this.props.tabData[tabIndex].bills.length === 0) {
      this.props.dispatch({ type: 'list/fetchBills' })
    }
  }

  handleInputChange = (orderKeyword) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyword } })
  }

  handleKeywordChandge = (kw) => {
    this.props.dispatch({ type: 'list/saveKeyword', payload: kw })
  }

  handleDetail = (_id) => {
    Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}` })
  }

  handleNaviDetail = (basePath, id) => {
    if (/saleOrders/i.test(basePath)) {
      Taro.navigateTo({ url: `/pages/detail/index?_id=${id}&basePath=${basePath}` })
    } else {
      Taro.navigateTo({ url: `/pages/easDetail/index?id=${id}&basePath=${basePath}` })
    }
  }

  onDateStartChange = e => {
    this.props.dispatch({ type: 'list/save', payload: { dateStart: e.detail.value } })
  }

  handleDateChange = (dataType, e) => {
    let { tabData } = this.props
    const { dispatch, tabIndex } = this.props
    if (dataType === 'dateStart') {
      tabData[tabIndex] = Object.assign({}, tabData[tabIndex], { dateStart: e.detail.value })
    } else {
      tabData[tabIndex] = Object.assign({}, tabData[tabIndex], { dateEnd: e.detail.value })
    }

    dispatch({ type: 'list/save', payload: { tabData: [...tabData] } })
    // TODO: 待优化后就不需要 forceUpdate
    this.forceUpdate()
  }

  onDateEndChange = e => {
    const { dispatch } = this.props
    dispatch({ type: 'list/save', payload: { dateEnd: e.detail.value } })
    dispatch({ type: 'list/fetchOrders' })
  }


  onSaleTypeChange = (e) => {
    this.props.dispatch({ type: 'list/save', payload: { orderKeyType: e.detail.value } })
  }

  handleFetch = async (payload) => {
    if (payload && Object.keys(payload).length > 0) {
      // 最好只进行同步操作
      await this.props.dispatch({
        type: 'list/save',
        payload
      })
    }

    this.props.dispatch({
      type: 'list/fetchBills'
    }).then(success => {
      if (success) {
        this.showToast('查询完成', 'success', 1500)
      }
    })
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

  handleShowTagMenu(hide) {
    // 根据不同单据类型设置不同过滤状态
    const { tabIndex, tabData, allTagList } = this.props
    const payload = {
      currentTagList: allTagList[tabIndex],
      showTagSelected: hide ? true : false,
      currentBillTags: tabData[tabIndex].fetchTags
    }

    this.props.dispatch({
      type: 'list/save',
      payload
    })
  }

  handleBillTagChange(value) {
    let { tabData } = this.props
    const { tabIndex, dispatch } = this.props
    tabData[tabIndex] = Object.assign({}, tabData[tabIndex], { fetchTags: value })
    dispatch({
      type: 'list/save',
      payload: { currentBillTags: value, tabData: [...tabData] }
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

  handleRemove = (_id) => {
    this.props.dispatch({
      type: 'list/removeBill',
      payload: { _id }
    }).then(success => {
      let toastBody = {}
      if (success) {
        toastBody = { title: '删除成功' }
      } else {
        toastBody = { title: '删除失败', icon: 'none' }
      }
      Taro.showToast(toastBody)
    })
  }

  handleEdit(id, item) {
    if(item.isSynced) {
      Taro.showToast({ title: '同步单据无法修改，填写物流信息请到PC端', icon: 'none', duration: 4000 })
      return
    }
    Taro.navigateTo({ url: `/pages/orderEdit/index?_id=${id}` })
  }

  render() {
    const { allTagList, tabData, tabIndex, saleStatusAry, arBillStatusAry, showDateSelected, showTagSelected } = this.props
    const [soData, siData, arData] = tabData
    return (
      <View className='page-container'>
        <View className='tabs-container'>
          <AtTabs
            current={tabIndex}
            height='100%'
            tabDirection='vertical'
            tabList={[
              { title: '订 单' },
              { title: '出 库' },
              { title: '应 收' }
            ]}
            onClick={this.handleTabClick}
          >
            <AtTabsPane style='background-color: #fff;' tabDirection='vertical' current={tabIndex} index={0}>
              <ListHeader
                title='销售订单'
                basePath='saleOrders'
                onKeywordChange={this.handleKeywordChandge}
                onHandleFetch={this.handleFetch}
                onDrawerShow={this.handleDrawerShow}
                model={soData}
                onDateChange={this.handleDateChange}
              ></ListHeader>
              <ListContent
                basePath='saleOrders'
                model={soData}
                enmuList={allTagList[0]}
                onNaviDetail={this.handleNaviDetail}
                onShowTagMenu={this.handleShowTagMenu}
                onHandleRemove={this.handleRemove}
                onHandleEdit={this.handleEdit}
              ></ListContent>
              {/* <View className='tab-box'>
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
                        onConfirm={this.handleFetch}
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
              </View> */}
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={tabIndex} index={1}>
              <ListHeader
                title='销售出库单'
                basePath='saleIssues'
                onKeywordChange={this.handleKeywordChandge}
                onHandleFetch={this.handleFetch}
                onDrawerShow={this.handleDrawerShow}
                model={siData}
                onDateChange={this.handleDateChange}
              ></ListHeader>
              <ListContent
                isEas
                basePath='saleIssues'
                model={siData}
                enmuList={saleStatusAry}
                onNaviDetail={this.handleNaviDetail}
                onShowTagMenu={this.handleShowTagMenu}
              ></ListContent>
            </AtTabsPane>
            <AtTabsPane tabDirection='vertical' current={tabIndex} index={2}>
              <ListHeader
                title='应收单'
                basePath='arBills'
                onHandleFetch={this.handleFetch}
                onKeywordChange={this.handleKeywordChandge}
                onDrawerShow={this.handleDrawerShow}
                model={arData}
                onDateChange={this.handleDateChange}
              ></ListHeader>
              <ListContent
                isEas
                basePath='arBills'
                model={arData}
                enmuList={arBillStatusAry}
                onNaviDetail={this.handleNaviDetail}
                onShowTagMenu={this.handleShowTagMenu}
              ></ListContent>
            </AtTabsPane>
          </AtTabs>
        </View>
        <AtModal onClose={this.handleModalClose} isOpened={showTagSelected}>
          <AtModalContent>
            <AtCheckbox
              options={this.props.currentTagList}
              selectedList={this.props.currentBillTags}
              onChange={this.handleBillTagChange}
            />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.handleShowTagSelect.bind(this, false)}>取消</Button> <Button onClick={this.handleFetch.bind(this, { showTagSelected: false })} style='color: #2bb2a7;'>确定</Button> </AtModalAction>
        </AtModal>
        <AtDrawer
          show={showDateSelected}
          mask
          right
          onClose={this.handleDrawerShow.bind(this, false)}
          onItemClick={this.handleDrawerClick}
          items={['今日', '上周', '本周', '上月', '本月', '上季度', '本季度', '去年', '本年']}
        ></AtDrawer>
      </View>
    )
  }
}