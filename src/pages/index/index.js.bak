import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ common }) => ({
  common
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = () => {
    const { common, dispatch } = this.props;
    dispatch({
      type: 'common/save',
      payload: { num: common.num + 1 }
    })
  }

  render () {
    const { common } = this.props;
    return (
      <View className='index'>
        <Text onClick={this.handleClick}>Hello world! </Text>
        <Text>{ common.num }</Text>
      </View>
    )
  }
}

