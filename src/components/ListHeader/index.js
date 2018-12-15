import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Picker, AtIcon, AtInput } from 'taro-ui'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import './index.scss'

class ListHeader extends Component {
  static propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    title: PropTypes.string,
    searchTypes: PropTypes.array,
    searchTypeIndex: PropTypes.number,
    model: PropTypes.object,
    onDateChange: PropTypes.func,
    onKeywordChange: PropTypes.func,
    onHandleFetch: PropTypes.func,
    onDrawerShow: PropTypes.func
  }

  static defaultProps = {
    model: {
      dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
      dateEnd: dayjs().format('YYYY-MM-DD')
    }
  }

  render() {
    const { model, onKeywordChange, onDateChange, onHandleFetch, title, onDrawerShow } = this.props
    return (
      <View className='container'>
        <View className='box-header'>
          <Picker mode='date' onChange={onDateChange.bind(this, 'dateStart')}>
            <Text className='picker'>{model.dateStart}</Text>
          </Picker>
          <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          <Text style='padding: 0 18rpx;'>到</Text>
          <Picker mode='date' onChange={onDateChange.bind(this, 'dateEnd')}>
            <Text className='picker'>{model.dateEnd}</Text>
          </Picker>
          <AtIcon value='chevron-down' color='#aaa'></AtIcon>
          <View className='selectedCalr'>
            <AtIcon onClick={onDrawerShow.bind(this, true)} color='#777' value='calendar'></AtIcon>
          </View>

        </View>
        <View className='box-search'>
          <Text>{title}</Text>
          <View>
            <Picker className='searchType' mode='selector' range={model.fetchTypes} onChange={this.onSaleTypeChange}>
              <Text>
                {model.fetchTypes[model.fetchType]}
              </Text>
              <AtIcon value='chevron-down' style='margin-left: 5rpx;' color='#aaa'></AtIcon>
            </Picker>
            <View className='searchInput'>
              <AtInput
                border={false}
                placeholder='请输入关键字'
                type='text'
                value={model.fetchKeyword}
                onChange={onKeywordChange}
                onConfirm={onHandleFetch}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ListHeader
