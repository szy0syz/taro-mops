import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtSearchBar, AtIcon } from "taro-ui"
import './index.scss';

@connect(({ userMgmt }) => ({
  ...userMgmt
}))
export default class UserMgmt extends Component {
  config = {
    navigationBarTitleText: '用户管理',
  }

  constructor() {
    super(...arguments)

    this.state = {
      keyword: '请输入关键字'
    }
  }

  // componentDidMount = () => {
  // }

  handleChange = (keyword) => {
    this.setState({
      keyword
    })
  }

  handleActionSearch = () => {
    Taro.showToast({ title: '搜索用户' })
  }

  handleAddUser = () => {
    Taro.showToast({ title: '添加用户' })
  }

  render() {
    return (
      <View className='page'>
        <AtSearchBar
          showActionButton
          value={this.state.keyword}
          onChange={this.handleChange}
          onActionClick={this.handleActionSearch}
        />
        <AtList>
          <AtListItem
            title='李金斗 (总经理)'
            note='微信昵名: nickName1'
            arrow='right'
            thumb='https://wx.qlogo.cn/mmopen/vi_32/OMiaZFZFibibEk1yWk1TQ8D4OBra2GEsuVppWLBYj8ibhwoXoVF3g0VDRLILxS8ibBGEM2Uibk6tOGh8YlgYHiaOaq0Ow/132'
          />
          <AtListItem
            title='张三丰 (业务经理)'
            note='微信昵名: nickName2'
            arrow='right'
            thumb='https://wx.qlogo.cn/mmopen/vi_32/OMiaZFZFibibEk1yWk1TQ8D4OBra2GEsuVppWLBYj8ibhwoXoVF3g0VDRLILxS8ibBGEM2Uibk6tOGh8YlgYHiaOaq0Ow/132'
          />
        </AtList>
        <AtIcon
          className='float-tooltip'
          value='add-circle'
          size='40'
          color='#2bb2a7'
          onClick={this.handleAddUser}
        >
        </AtIcon>
      </View>
    )
  }
}
