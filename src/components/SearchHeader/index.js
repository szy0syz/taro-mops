import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Input, Button } from '@tarojs/components'
import { AtIcon, AtButton } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class SearchHeader extends Component {
  static propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    model: PropTypes.object,
    onDateChange: PropTypes.func,
    onBtnDateClick: PropTypes.func
  }

  static defaultProps = {
    searchTypes: [
      {
        key: '客户名',
        value: 'customerName'
      },
      {
        key: '电话',
        value: 'customerPhone'
      },
      {
        key: '备注',
        value: 'customerRemark'
      }
    ],
    searchType: {
      key: '客户名',
      value: 'customerName'
    }
  }

  handleBtnDateClick = (btnName) => {
    this.props.onBtnDateClick(btnName)
  }

  render() {
    const { searchTypes, searchType, keyword } = this.props
    return (
      <View className='header'>
        <View className='search-content'>
          <Picker style='padding-right:10px;'  className='search-type' mode='selector' range={searchTypes} rangeKey='key' onChange={this.onTypeChange}>
            <View className='customer-type'>
              {searchType.key}
              <AtIcon value='chevron-down' size='24' color='rgba(117, 117, 119, 1)'></AtIcon>
            </View>
          </Picker>
          <Input className='input-content' type='string' name='keyword' placeholder='请输入查询关键字' value={keyword} onInput={this.handleKeyword} />
        </View>
        <Button className='btn-submit' type='primary' size='small'>搜索</Button>
      </View>
    )
  }
}

export default SearchHeader
