import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'

import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'

import Login from './login/index'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/list/index',
      'pages/user/index',

      'pages/saleOrder/create/index',
      'pages/saleOrder/detail/index',
      'pages/saleOrder/edit/index',

      'pages/eas/detail/index',
      
      // ---- reports ----
      'pages/reports/index/index',
      'pages/reports/saleStats/index',
      'pages/reports/orderStats/index',
      'pages/reports/inventory/index',
      'pages/reports/customerAR/index',

      // ---- selections ----
      'pages/selections/products/index',
      'pages/selections/customers/index',
      
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#21b5a9',
      navigationBarTitleText: '云农农业科技',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/images/tab/home.png",
        selectedIconPath: "./assets/images/tab/home-active.png"
      }, {
        pagePath: "pages/list/index",
        text: "明细",
        iconPath: "./assets/images/tab/list2.png",
        selectedIconPath: "./assets/images/tab/list2-act.png"
      }, {
        pagePath: "pages/saleOrder/create/index",
        text: "开单",
        iconPath: "./assets/images/icon/plus.png",
        selectedIconPath: "./assets/images/icon/plus.png"
      }, {
        pagePath: "pages/reports/index/index",
        text: "报表",
        iconPath: "./assets/images/tab/report2.png",
        selectedIconPath: "./assets/images/tab/report2-act.png"
      },{
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "./assets/images/tab/user.png",
        selectedIconPath: "./assets/images/tab/user-active.png"
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (<Provider store={store}>
      <Login />
    </Provider>);
  }
}

Taro.render(<App />, document.getElementById('app'))
