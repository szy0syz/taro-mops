import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtList, AtListItem, AtSearchBar, AtIcon, AtFloatLayout, AtInput, AtForm } from "taro-ui"

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
      isEditing: false,
      isOpened: false
    }
  }

  componentDidMount = async () => {
    this.props.dispatch({ type: 'userMgmt/fetch' })
  }

  handleChange = (keyword) => {
    this.props.dispatch({
      type: 'userMgmt/save',
      payload: { keyword }
    })
  }

  handleActionSearch = () => {
    this.props.dispatch({ type: 'userMgmt/fetch' })
  }

  handleAddUser = () => {
    this.setState({
      isOpened: true
    })
  }

  handleInputChange = (key, val) => {
    const { editingUser, dispatch } = this.props
    dispatch({
      type: 'userMgmt/save',
      payload: { editingUser: { ...editingUser, [key]: val } }
    })
  }

  handleSave = () => {
    this.props.dispatch({
      type: 'userMgmt/createUser'
    }).then(success => {
      if (success) {
        this.setState({ isOpened: false })
        this.props.dispatch({ type: 'userMgmt/fetch' })
      }
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    })
  }

  render() {
    const { editingUser, userList = [] } = this.props
    const { isEditing, isOpened } = this.state

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
        <AtFloatLayout isOpened={isOpened} title={isEditing ? '编辑用户' : '新增用户'} onClose={this.handleClose}>
          <AtForm>
            <AtInput
              name='userName'
              title='姓名'
              type='text'
              placeholder='请输入用户姓名'
              value={editingUser.userName}
              onChange={this.handleInputChange.bind(this, 'userName')}
            />
            <AtInput
              name='easid'
              title='EAS工号'
              type='number'
              placeholder='请输入EAS工号'
              value={editingUser.easid}
              onChange={this.handleInputChange.bind(this, 'easid')}
            />
            <AtInput
              name='mobile'
              title='手机号码'
              type='phone'
              placeholder='请输入手机号码'
              value={editingUser.mobile}
              onChange={this.handleInputChange.bind(this, 'mobile')}
            />
            <View style='margin-top:24px;'>
              <AtButton onClick={this.handleSave} type='primary'>{this.state.isEditing ? '保 存' : '新 增'}</AtButton>
            </View>
          </AtForm>
        </AtFloatLayout>
        <AtIcon
          className='float-tooltip'
          value='add-circle'
          size='40'
          color='#2bb2a7'
          onClick={this.handleAddUser}
        >
        </AtIcon>
      </View >
    )
  }
}
