import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Picker, AtIcon } from 'taro-ui'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import './index.scss';

class DatePicker extends Component {
  static propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string
  }

  static defaultProps = {
    dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD')
  };

  render() {
    const { dateStart, dateEnd } = this.props
    return (
      <View className='picker-container'>
        <Picker mode='date' value={dateStart}>
          <View className='picker'>
            <Text>{dateStart}</Text>
            <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          </View>
        </Picker>
        <Text style='padding: 0 28rpx;'> 至 </Text>
        <Picker mode='date' value={dateEnd}>
          <View className='picker'>
            <Text>{dateEnd}</Text>
            <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          </View>
        </Picker>
      </View>
    )
  }
}

export default DatePicker
