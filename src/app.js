import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Home from './pages/home'
import dva from './utils/dva'
import models from './models'

import './styles/base.scss'
import './styles/iconfont.scss'
import './styles/iconfont2.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/order/index',
      'pages/productSelect/index',
      'pages/customerSelect/index',
      
      'pages/list/index',
      
      'pages/cart/index',
      'pages/user/index',
      'pages/detail/index',
      'pages/about/index',
      'pages/size/index',
      'pages/login/index',
      'pages/message/index',
      'pages/couponList/index',
      'pages/welcome/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#21b5a9',
      navigationBarTitleText: '云农农业科技',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./images/tab/home.png",
        selectedIconPath: "./images/tab/home-active.png"
      }, {
        pagePath: "pages/list/index",
        text: "明细",
        iconPath: "./images/tab/cart.png",
        selectedIconPath: "./images/tab/cart-active.png"
      }, {
        pagePath: "pages/cart/index",
        text: "",
        iconPath: "./images/icon/plus.png",
        selectedIconPath: "./images/icon/plus.png"
      }, {
        pagePath: "pages/cart/index",
        text: "报表",
        iconPath: "./images/tab/cart.png",
        selectedIconPath: "./images/tab/cart-active.png"
      },{
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "./images/tab/user.png",
        selectedIconPath: "./images/tab/user-active.png"
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: '#ccc'
    }
  }

  componentDidMount() {

  }

  render() {
    return (<Provider store={store}>
      <Home />
    </Provider>);
  }
}

Taro.render(<App />, document.getElementById('app'))
