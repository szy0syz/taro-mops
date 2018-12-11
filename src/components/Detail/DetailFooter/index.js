import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Picker, AtIcon, AtInput } from 'taro-ui'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import './index.scss'

class DetailFooter extends Component {
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
    // const { searchTypeIndex, orderKeyword, title, searchTypes } = this.props
    return (
      <View className='container'>

      </View>
    )
  }
}

export default DetailFooter
