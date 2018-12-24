import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { AtButton, AtList, AtListItem, Picker, AtIcon } from 'taro-ui'
import './index.scss';

@connect(({ userMgmt }) => ({
  ...userMgmt
}))
export default class UserMgmt extends Component {
  config = {
    navigationBarTitleText: '用户管理',
  }

  // componentDidMount = () => {
  // }


  render() {
    return (
      <View className='page'>
      
      </View>
    )
  }
}
