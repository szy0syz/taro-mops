import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtAccordion, AtCard, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import querystring from 'querystring'
import dayjs from 'dayjs'
import { baseUrl } from '../../../config'
import ReportHeader from '../../../components/ReportHeader'

import './index.scss'

@connect(({ orderStats }) => ({
  ...orderStats,
}))
class OrderStats extends Component {
  config = {
    navigationBarTitleText: '报表-订单统计',
  }

  state = {
    isOpenAR: false,
  }

  async componentDidShow() {
    const { customer, dispatch } = this.props
    if (customer && customer.FID) {
      dispatch({
        type: 'orderStats/fetch'
      })
    }
  }

  handleDateChange = (key, value) => {
    const { dispatch } = this.props
    dispatch({
      type: 'orderStats/save',
      payload: {
        [key]: value
      }
    })
    dispatch({
      type: 'orderStats/fetch'
    })
  }

  handleNaviCustomer = () => {
    Taro.navigateTo({ url: '/pages/selections/customers/index?prevModel=orderStats' })
  }

  // handleDownReport = async () => {
  //   const token = Taro.getStorageSync('token')
  //   const { dateStart, dateEnd, customer } = this.props

  //   const queryParams = {
  //     customerFID: customer.FID,
  //     dateStart,
  //     dateEnd
  //   }

  //   const downloadTask = await Taro.downloadFile({
  //     url: `${baseUrl}/report/exportSaleOrders?${querystring.stringify(queryParams)}`,
  //     header: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //   if (downloadTask.statusCode === 200) {
  //     await Taro.saveFile({ tempFilePath: downloadTask.tempFilePath, success: (res) => { console.log(res.savedFilePath) } })
  //   }
  // }

  handleGetReport = async () => {
    const token = Taro.getStorageSync('token')
    const { dateStart, dateEnd, customer } = this.props
    const queryParams = {
      customerFID: customer.FID,
      dateStart,
      dateEnd
    }
    const filePath = wx.env.USER_DATA_PATH + '/' + Date.now() + '.xlsx';

    const downloadTask = await Taro.downloadFile({
      url: `${baseUrl}/report/exportSaleOrders?${querystring.stringify(queryParams)}`,
      filePath,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (downloadTask.statusCode === 200) {
      await Taro.openDocument({ filePath, fileType: 'xlsx' })
    }
  }

  handleDateBtnClick = async (btnName) => {
    let payload
    const { dispatch } = this.props
    switch (btnName) {
      case 'curtMonth':
        payload = {
          dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('month').format('YYYY-MM-DD')
        }
        break
      case 'lastMonth':
        payload = {
          dateStart: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        }
        break
      case 'curtYear':
        payload = {
          dateStart: dayjs().startOf('year').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('year').format('YYYY-MM-DD')
        }
        break
      case 'lastYear':
        payload = {
          dateStart: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
        }
        break
    }
    dispatch({
      type: 'orderStats/save',
      payload
    })
    dispatch({
      type: 'orderStats/fetch'
    })
  }

  handleClickAccordion = (type, value) => {
    let payload;
    switch (type) {
      case 'AR':
        payload = { isOpenAR: value }
        break;
      case 'CR':
        payload = { isOpenCR: value }
        break;
    }
    this.setState({ ...payload })
  }

  handleClick = (id) => {
    Taro.navigateTo({ url: `/pages/saleOrder/detail/index?_id=${id}&basePath=saleOrders` })
  }

  render() {
    const { isOpenAR } = this.state;
    const { customer, bills = [], allAmount = 0, allDefAmount = 0 } = this.props
    return (
      <View className='CustomerAR-container'>
        <ReportHeader onBtnDateClick={this.handleDateBtnClick} dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} onDateChange={this.handleDateChange}></ReportHeader>
        <View className='item item-customer'>
          <Text>选择客户</Text>
          <View onClick={this.handleNaviCustomer}>
            <Text>{customer.CustomerName}</Text>
            <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          </View>
        </View>
        <View className='item item-amount'>
          <Text>开单金额合计</Text><Text>￥{allAmount}</Text>
        </View>
        <View className='item item-amount'>
          <Text>结算金额合计</Text><Text>￥{allDefAmount}</Text>
        </View>
        <View className='body'>
          <AtAccordion title='销售订单' open={isOpenAR} onClick={this.handleClickAccordion.bind(this, 'AR')} icon={{ value: 'menu', color: 'red', size: '22' }}>
            <ScrollView
              scrollY
              scrollWithAnimation
              className='bill-container'
              style='height: 400px;'
            >
              {bills.map(bill => (
                <View
                  key={bill._id}
                  style='padding: 4px 0 8px 0;'
                >
                  <AtCard
                    onClick={this.handleClick.bind(this, bill._id)}
                    note={`开单金额：￥${Number(bill.totalDefAmount).toFixed(2)}  |  结算金额：￥${Number(bill.totalAmount).toFixed(2)}`}
                    extra={bill.creator.userName}
                    title={dayjs(bill.billDate).format('YYYY-MM-DD')}
                  >
                    <Text>单据编号：{bill.number}</Text>
                  </AtCard>
                </View>
              ))}
            </ScrollView>
          </AtAccordion>
        </View>
        <View className='open-report'>
          {/* <AtButton onClick={this.handleDownReport} type='primary' size='small' style='margin-right:10px;'>报表下载</AtButton> */}
          <AtButton onClick={this.handleGetReport} type='primary' size='small'>阅读报表</AtButton>
        </View>
      </View>
    )
  }
}

export default OrderStats