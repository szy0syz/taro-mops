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
    searchTypeIndex: PropTypes.number
  }

  static defaultProps = {
    dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
    dateEnd: dayjs().format('YYYY-MM-DD')
  };

  render() {
    const { searchTypeIndex, orderKeyword, title, searchTypes } = this.props
    return (
      <View className='container'>
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
          <View className='selectedCalr'>
            <AtIcon onClick={this.handleDrawerShow.bind(this, true)} color='#777' value='calendar'></AtIcon>
          </View>

        </View>
        <View className='box-search'>
          <Text>{title}</Text>
          <View>
            <Picker className='searchType' mode='selector' range={searchTypes} onChange={this.onSaleTypeChange}>
              <Text>
                {searchTypes[searchTypeIndex]}
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
      </View>
    )
  }
}

export default ListHeader
