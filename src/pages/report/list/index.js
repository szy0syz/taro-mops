import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

export default class ReportList extends Component {
  config = {
    navigationBarTitleText: '报表',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='about-page'>
        <View>ReportList</View>
      </View>
    )
  }
}