import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtAccordion } from 'taro-ui'
import { connect } from '@tarojs/redux'
import dayjs from 'dayjs'
import ReportHeader from '../../../components/ReportHeader'
import CardList from '../../../components/CardList'
import './index.scss'

@connect(({ cusAR }) => ({
  ...cusAR,
}))
class CustomerAR extends Component {
  config = {
    navigationBarTitleText: '报表-客户对账',
  }

  componentDidShow() {
    const { customer, dispatch } = this.props
    if (customer && customer.FID) {
      dispatch({
        type: 'cusAR/fetch'
      })
    }
  }

  handleDateChange = (key, value) => {
    const { dispatch } = this.props
    dispatch({
      type: 'cusAR/save',
      payload: {
        [key]: value
      }
    })
    dispatch({
      type: 'cusAR/fetch'
    })
  }

  handleNaviCustomer = () => {
    Taro.navigateTo({ url: '/pages/customerSelect/index?prevModel=cusAR' })
  }

  handleDateBtnClick = (btnName) => {
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
          dateStart: dayjs().subtract(1, 'year').startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'year').endOf('month').format('YYYY-MM-DD')
        }
        break
    }
    dispatch({
      type: 'cusAR/save',
      payload
    })
    dispatch({
      type: 'cusAR/fetch'
    })
  }

  render() {
    const { customer, arBills, crBills, beginingAmount, arCurtAmount, crCurtAmount, endingAmount } = this.props
    return (
      <View className='container'>
        <ReportHeader onBtnDateClick={this.handleDateBtnClick} dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} onDateChange={this.handleDateChange}></ReportHeader>
        <View className='item item-customer'>
          <Text>选择客户</Text>
          <View onClick={this.handleNaviCustomer}>
            <Text>{customer.CustomerName}</Text>
            <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          </View>
        </View>
        <View className='item item-amount'>
          <Text>期初余额</Text><Text>￥{beginingAmount}</Text>
        </View>
        <View className='item item-amount'>
          <Text>本期应收: ￥{arCurtAmount}</Text><Text>本期收款: ￥{crCurtAmount}</Text>
        </View>
        <View className='item item-amount'>
          <Text>期末余额</Text><Text>￥{endingAmount}</Text>
        </View>
        <View className='body'>

          <AtAccordion title='应收单' icon={{ value: 'menu', color: 'red', size: '22' }}>
            <ScrollView
              scrollY
              scrollWithAnimation
              className='bill-container'
              style='height: 320px;'
            >
              <CardList bills={arBills}></CardList>
            </ScrollView>
          </AtAccordion>
          <AtAccordion title='收款单' icon={{ value: 'menu', color: 'green', size: '22' }}>
            <ScrollView
              scrollY
              scrollWithAnimation
              style='height: 320px;'
              className='bill-container'
            >
              <CardList bills={crBills}></CardList>
            </ScrollView>
          </AtAccordion>
        </View>
      </View>
    )
  }
}

export default CustomerAR