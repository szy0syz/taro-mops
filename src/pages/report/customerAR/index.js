import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtCard, AtAccordion, AtListItem, AtList } from 'taro-ui'
import { connect } from '@tarojs/redux'
import dayjs from 'dayjs'
import ReportHeader from '../../../components/ReportHeader'
import './index.scss'

@connect(({ cusAR }) => ({
  ...cusAR,
}))
class CustomerAR extends Component {
  config = {
    navigationBarTitleText: '报表-客户对账',
  }

  handleDateChange = (key, value) => {
    this.props.dispatch({
      type: 'cusAR/save',
      payload: {
        [key]: value
      }
    })
  }

  handleDateBtnClick = (btnName) => {
    switch (btnName) {
      case 'curtMonth':
        this.setState({
          dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('month').format('YYYY-MM-DD')
        })
        break
      case 'lastMonth':
        this.setState({
          dateStart: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        })
        break
      case 'curtYear':
        this.setState({
          dateStart: dayjs().startOf('year').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('year').format('YYYY-MM-DD')
        })
        break
      case 'lastYear':
        this.setState({
          dateStart: dayjs().subtract(1, 'year').startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'year').endOf('month').format('YYYY-MM-DD')
        })
        break
    }
  }

  render() {
    return (
      <View className='container'>
        <ReportHeader onBtnDateClick={this.handleDateBtnClick} dateStart={this.props.dateStart} dateEnd={this.props.dateEnd} onDateChange={this.handleDateChange}></ReportHeader>
        <View className='item item-customer'>
          <Text>选择客户</Text>
          <View>
            <Text>昆明市农药经营部</Text>
            <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          </View>
        </View>
        <View className='item item-amount'>
          <Text>期初余额</Text><Text>￥28320.00</Text>
        </View>
        <View className='item item-amount'>
          <Text>本期余额</Text><Text>￥98398.00</Text>
        </View>
        <View className='item item-amount'>
          <Text>期末余额</Text><Text>￥983220.00</Text>
        </View>
        <View className='body'>
          <AtAccordion title='应收单' icon={{ value: 'tags', color: 'red', size: '22' }}>
            <View className='bill-container'>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
            </View>
          </AtAccordion>
          <AtAccordion title='收款单' icon={{ value: 'menu', color: 'blue', size: '22' }}>
            <View className='bill-container'>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
              <View className='bill-card'>
                <AtCard
                  note='马静敏'
                  extra='￥9040.00'
                  title='2018-12-04 10:43'
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                >
                  SI-00330827
                </AtCard>
              </View>
            </View>
          </AtAccordion>
        </View>
      </View>
    )
  }
}

export default CustomerAR