import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

let setIntervalTime = null;

@connect(({ login }) => ({
  ...login,
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: '云农农业科技-MOPS系统',
  };

  getMobile = (event) => {
    const mobile = event.target.value;
    this.props.dispatch({
      type: 'login/save',
      payload: { mobile },
    });
  }

  getUsername = (event) => {
    const username = event.target.value;
    this.props.dispatch({
      type: 'login/save',
      payload: { username },
    });
  }


  login = () => {
    if (this.props.mobile == '' || this.props.mobile.length != 11 || this.props.code == '' || this.props.code.length != 4) {
      this.showToast('请输入有效的手机号或输入有效验证码！');
      return false;
    }
    this.props.dispatch({
      type: 'login/login',
      payload: {
        code: this.props.code,
        mobile: this.props.mobile,
      },
    });
  }

  sendSms = () => {
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！');
      return false;
    }

    this.props.dispatch({
      type: 'login/sendSms',
      payload: {
        mobile: this.props.mobile,
      },
    }).then(() => {
      this.setIntervalTime();
      if (this.props.erroMessage && this.props.erroMessage != '') {
        clearInterval(setIntervalTime);
        this.showToast(this.props.erroMessage);
      }
    });
  }

  setIntervalTime = () => {
    clearInterval(setIntervalTime);
    let numConst = 30;
    setIntervalTime = setInterval(() => {
      numConst--;
      this.props.dispatch({
        type: 'login/save',
        payload: { sending: 1, smsTime: numConst },
      });

      if (numConst == 0 || (this.props.erroMessage && this.props.erroMessage != '')) {
        clearInterval(setIntervalTime);
        this.props.dispatch({
          type: 'login/save',
          payload: { sending: 2, erroMessage: '', smsTime: 30 },
        });
      }
    }, 1000);
  }

  // tips
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
    });
  }

  getVoiceCode = () => {
    // 语音验证码
    if (this.props.mobile == '' || this.props.mobile.length != 11) {
      this.showToast('请输入有效的手机号！');
      return false;
    }

    this.props.dispatch({
      type: 'login/sendSmsVoice',
      payload: {
        mobile: this.props.mobile,
      },
    }).then(() => {
      this.setIntervalTime();
      if (this.props.erroMessage && this.props.erroMessage != '') {
        clearInterval(setIntervalTime);
        this.showToast(this.props.erroMessage);
      } else {
        this.showToast('电话拨打中...请留意相关电话');
      }
    });
  }

  render() {
    const { sending, smsTime } = this.props;
    if (typeof window === 'undefined') {
      this.setState({
        sending,
        smsTime
      })
    }
    return (
      <View className='login-page' id='login-page'>
        <View className='title'>您好，请登录</View>
        <View className='title-des'>内部系统，授权访问</View>
        <View className='bgtopWrap'>
          <View className='loginWrap'>
            <View className='inpuWrapMpblie'>
              <Input type='number' name='mobile' maxLength='11' placeholder='请输入手机号' value={this.props.mobile} onInput={this.getMobile} />
            </View>
            <View className='inpuWrapMpblie'>
              <Input type='string' name='username' maxLength='4' placeholder='请输入员工姓名' value={this.props.username} onInput={this.getUsername} />
            </View>
            <Button className='button' onClick={this.login}>验  证</Button>
            <View className='see-des' onClick={this.getVoiceCode}>
              无需输入密码
              <Text>后台验证身份</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
