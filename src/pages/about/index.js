import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SearchHeader from '../../components/SearchHeader'
import './index.scss'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View>
        <SearchHeader></SearchHeader>
        {/* <View>云南云农科技有限公司</View>
        <View>公司介绍1</View>
        <View>公司介绍2</View>
        <View>公司介绍3</View> */}
      </View>
    )
  }
}
