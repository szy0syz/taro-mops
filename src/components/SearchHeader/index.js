import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Input, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

class SearchHeader extends Component {
  static propTypes = {
    searchTypes: PropTypes.array,
    onHandleSearch: PropTypes.func
  }

  constructor() {
    super(...arguments)

    this.state = {
      searchKeyword: '',
      selectedType: {
        key: '搜索A',
        value: 'searchA'
      }
    }
  }

  static defaultProps = {
    searchTypes: [
      {
        key: '搜索A',
        value: 'searchA'
      },
      {
        key: '搜索B',
        value: 'searchB'
      },
      {
        key: '搜索C',
        value: 'searchB'
      }
    ]
  }

  componentDidMount() {
    const { searchTypes } = this.props
    if (Array.isArray(searchTypes) && searchTypes.length > 0) {
      this.setState({ selectedType: searchTypes[0] })
    }
  }

  handleInput = ({ detail }) => {
    const { value: searchKeyword } = detail
    this.setState({ searchKeyword })
  }

  handlePickerChange = ({ detail }) => {
    const { value: index } = detail
    this.setState({ selectedType: this.props.searchTypes[index] })
  }

  render() {
    const { selectedType, searchKeyword } = this.state
    const { searchTypes, onHandleSearch } = this.props
    return (
      <View className='header'>
        <View className='search-content'>
          <Picker style='padding-right:4px;' className='search-type' mode='selector' range={searchTypes} rangeKey='key' onChange={this.handlePickerChange}>
            <View className='customer-type'>
              {selectedType.key}
              <AtIcon value='chevron-down' size='24' color='rgba(117, 117, 119, 1)'></AtIcon>
            </View>
          </Picker>
          <Input onInput={this.handleInput} className='input-content' type='string' name='keyword' placeholder='请输入查询关键字' value={searchKeyword} />
        </View>
        <Button className='btn-submit' type='primary' size='small' onClick={onHandleSearch.bind(this, selectedType.value, searchKeyword)}>搜索</Button>
      </View>
    )
  }
}

export default SearchHeader
