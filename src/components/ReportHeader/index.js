import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import DatePicker from '../../components/DatePicker'

import './index.scss'

class ReportHeader extends Component {
  static propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    model: PropTypes.object,
    onDateChange: PropTypes.func,
    onBtnDateClick: PropTypes.func
  }

  static defaultProps = {
    model: {
      dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
      dateEnd: dayjs().format('YYYY-MM-DD')
    }
  }

  handleBtnDateClick = (btnName) => {
    this.props.onBtnDateClick(btnName)
  }

  render() {
    const { dateStart, dateEnd, onDateChange } = this.props
    return (
      <View className='ReportHeader-container'>
        <View className='item'>
          <Text>事件维度</Text>
          <View className='item-btns'>
            <AtButton onClick={this.handleBtnDateClick.bind(this, 'curtMonth')} circle type='secondary' size='small'>本月</AtButton>
            <AtButton onClick={this.handleBtnDateClick.bind(this, 'lastMonth')} circle type='secondary' size='small'>上月</AtButton>
            <AtButton onClick={this.handleBtnDateClick.bind(this, 'curtYear')} circle type='secondary' size='small'>本年</AtButton>
            <AtButton onClick={this.handleBtnDateClick.bind(this, 'lastYear')} circle type='secondary' size='small'>去年</AtButton>
          </View>
        </View>
        <View className='item item-picker'>
          <Text>日期范围</Text>
          <DatePicker dateStart={dateStart} dateEnd={dateEnd} onDateChange={onDateChange}></DatePicker>
        </View>
      </View>
    )
  }
}

export default ReportHeader
