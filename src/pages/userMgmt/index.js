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

  componentDidMount = async () => {
    this.props.dispatch({type: 'userMgmt/fetch'})
  }

  handleChange = (keyword) => {
    this.props.dispatch({
      type: 'userMgmt/save',
      payload: { keyword }
    })
  }

  handleActionSearch = () => {
    this.props.dispatch({type: 'userMgmt/fetch'})
  }

  handleAddUser = () => {
    Taro.showToast({ title: '添加用户' })
  }

  render() {
    const { userList = [] } = this.props
    return (
      <View className='page'>
        <AtSearchBar
          showActionButton
          value={this.state.keyword}
          onChange={this.handleChange}
          onActionClick={this.handleActionSearch}
        />
        <AtList>
          {userList.map(user => (
            <AtListItem
              key={user._id}
              title={`${user.userName} (${user.role})`}
              note={`微信昵名: ${user.nickName || 'nickName'}`}
              arrow='right'
              thumb={user.avatar}
            />
          ))}
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
