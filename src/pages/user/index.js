import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"
import { connect } from '@tarojs/redux';
import './index.scss';
import message_img from '../../assets/images/user/message.png';

@connect(({ user, common, login }) => ({
  ...user,
  ...common,
  ...login
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  goPage = (e) => {
    if (e.currentTarget.dataset.url == '/pages/login/index' && this.props.access_token) {
      return;
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }

  goToPage = (url) => {
    if (url === '/pages/userMgmt/index') {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo.roleLevel < 499) {
        Taro.showToast({title: '无权访问', icon: 'none'})
        return
      }
    }
    (/pages/i).test(url) ? Taro.navigateTo({ url }) : null
  }

  render() {
    const { mobile, avatar, userName } = this.props;
    return (
      <View className='user-page'>
        <View className='not-login'>
          <View className='to-login' data-url='/pages/login/index' onClick={this.goPage}>
            <View className='left'>
              <View className={mobile ? 'name black' : 'name '}>{userName || '请登录 >'}</View>
              <View>
                <View className='msg' data-url='/pages/message/index' onClick={this.goToPage}>
                  <Image mode='widthFix' src={message_img} />
                </View>
                <View className='msg' onClick={this.outLogin}>
                  <Image mode='widthFix' src='http://static-r.msparis.com/uploads/9/a/9a00ce9a5953a6813a03ee3324cbad2a.png' />
                </View>
              </View>
            </View>
            <View className='avatar-container'>
              <Image className='avatar' src={avatar} />
            </View>
          </View>
          {/* <View className='list'>
            {list && list.map((item, index) => (
              <View className='item' key={index} data-url={`/pages/order/index?type=${index}`} onClick={this.goToPage}>
                <Image mode='widthFix' src={item.img} />
                <Text>{item.txt}</Text>
                {item.num > 0 && <Icon className='num'>{item.num}</Icon>}
              </View>
            ))}
          </View> */}
        </View>
        <View className='nav-list'>
          <AtList>
            <AtListItem
              title='系统设置'
              arrow='right'
              onClick={this.goToPage.bind(this, '/pages/about/index')}
              iconInfo={{
                size: 28, color: '#2bb2a7', value: 'settings',
              }}
            />
            <AtListItem
              title='用户管理'
              arrow='right'
              data-url='/pages/about/index'
              onClick={this.goToPage.bind(this, '/pages/userMgmt/index')}
              iconInfo={{
                size: 28, color: '#2bb2a7', value: 'user',
              }}
            />
            <AtListItem
              title='关于我们'
              arrow='right'
              data-url='/pages/about/index'
              onClick={this.goToPage.bind(this, '/pages/about/index')}
              iconInfo={{
                size: 28, color: '#2bb2a7', value: 'alert-circle',
              }}
            />
          </AtList>
        </View>
      </View>
    )
  }
}
