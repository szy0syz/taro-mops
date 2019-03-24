import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import dayjs from 'dayjs';
import { connect } from '@tarojs/redux'

import orderBanner from '~assets/images/order_banner.jpg'
import ynagtech from '~assets/images/ynagtech_zhang.gif'
import img_ynamp from '~assets/images/ynamp.png'
import TaroCanvasDrawer from '../../../components/taro-plugin-canvas'; // 拷贝文件到component的引入方式
// import { TaroCanvasDrawer  } from 'taro-plugin-canvas'; // npm 引入方式
// import './index.scss'

const BASE = {
  y1_productName: 560,
  lineSpace: 40,
  y2_orderContent: 600,
  itemSpace: 90,
}

function genCanvasText(products) {
  let data = [];
  const baseObj = [
    {
      x: 96,
      y: 560,
      text: '',
      fontSize: 28,
      color: '#111',
      opacity: 1,
      baseLine: 'middle',
      textAlign: 'left',
      lineHeight: 36,
      lineNum: 1,
      zIndex: 999,
    },
    {
      x: 116,
      y: 600,
      text: '',
      fontSize: 26,
      color: '#444',
      opacity: 1,
      baseLine: 'middle',
      textAlign: 'left',
      lineHeight: 36,
      lineNum: 1,
      zIndex: 999,
    }
  ]
  products.forEach((item, index) => {
    const text_name = Object.assign({}, baseObj[0]);
    const text_content = Object.assign({}, baseObj[1]);
    text_name.y = BASE.y1_productName + (BASE.itemSpace * index);
    text_name.text = `${item.MaterialName}: ${item.MaterialModel}`;
    text_content.y = BASE.y2_orderContent + (BASE.itemSpace * index);
    text_content.text = `明细：${parseFloat(item.qty)}公斤 * ${parseFloat(item.DefaultPrice)}元 = ${parseFloat(item.defaultAmount)}元`;
    if(item.giftQty) text_content.text += ` (赠品${item.giftQty || 0})`
    data.push(text_name);
    data.push(text_content);
  });

  return data;
}

@connect(({ detail }) => ({
  Model: detail,
}))
export default class OrderPoster extends Component {
  config = {
    navigationBarTitleText: '订单分享'
  }

  constructor(props) {
    super(props);
    let rssConfig = {
      width: 750,
      height: 1050,
      backgroundColor: '#fff',
      debug: false,

      texts: [
        {
          x: 68,
          y: 400,
          text: '「MOPS」销售订单：',
          fontSize: 30,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 48,
          lineNum: 2,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        { // 1. 订单号
          x: 345,
          y: 400,
          text: '',
          fontSize: 26,
          color: '#666',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        },
        { // 2. 客户名称
          x: 80,
          y: 460,
          text: '曲靖市亿农家园农资有限责任公司公司',
          fontSize: 32,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 48,
          lineNum: 1,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        { // 3. 业务日期
          x: 480,
          y: 980,
          text: '2019年03月24日',
          fontSize: 28,
          color: '#111',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 900,
        },
        //-------------------
        {
          x: 34,
          y: 160,
          text: '云农股份',
          fontSize: 28,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 900,
        },
      ],
      images: [
        {
          url: img_ynamp,
          width: 120,
          height: 96,
          y: 50,
          x: 30,
          borderRadius: 28,
          zIndex: 99,
          // borderWidth: 10,
          // borderColor: 'gray',
        },
        {
          url: orderBanner,
          width: 710,
          height: 320,
          y: 40,
          x: 20,
          borderRadius: 28,
          zIndex: 10,
        },
        {
          url: ynagtech,
          width: 180,
          height: 180,
          y: 810,
          x: 500,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
      ],
      lines: [
        {
          startY: 510,
          startX: 80,
          endX: 670,
          endY: 511,
          width: 2,
          color: '#ddd',
          zIndex: 999,
        },
      ],
      blocks: [
        { // 最底层的色块
          x: 0,
          y: 0,
          width: 750,
          height: 1050,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          backgroundColor: '#EFF3F5',
          borderRadius: 0,
        },
        {
          x: 40,
          y: 40,
          width: 670,
          height: 970,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          backgroundColor: '#fff',
          borderRadius: 12,
          zIndex: 2,
        }
      ],
    };
    const { products, customer, billDate, number } = this.props.Model;
    rssConfig.texts[1].text = number;
    rssConfig.texts[2].text = customer.CustomerName;
    rssConfig.texts[3].text = dayjs(billDate).format('YYYY年MM月DD日');
    const productTexts = genCanvasText(products);
    rssConfig.texts = rssConfig.texts.concat(productTexts);

    this.state = {
      // 绘图配置文件
      config: null,
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false,
      rssConfig,
    }

    this.canvasDrawFunc();
  }

  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = () => {
    this.setState({
      canvasStatus: true,
      config: this.state.rssConfig,
    })
    Taro.showLoading({
      title: '绘制中...'
    })
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null,
      })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
    // 预览
    // Taro.previewImage({
    //   current: tempFilePath,
    //   urls: [tempFilePath]
    // })
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
    console.log(error);
  }

  // 保存图片至本地
  saveToAlbum = () => {
    const res = Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage,
    });
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      });
    }
  }

  render() {
    return (
      <View className='index'>
        <View>
          <View className='flex-row'>
            <Button onClick={this.canvasDrawFunc}>重新绘制</Button>
            <Button onClick={this.saveToAlbum}>保存到相册</Button>
          </View>
        </View>
        <View className='shareImage-cont'>
          <Image
            className='shareImage'
            src={this.state.shareImage}
            mode='widthFix'
            lazy-load
          />
          {
            // 由于部分限制，目前组件通过状态的方式来动态加载
            this.state.canvasStatus &&
            (<TaroCanvasDrawer
              config={this.state.config} // 绘制配置
              onCreateSuccess={this.onCreateSuccess} // 绘制成功回调
              onCreateFail={this.onCreateFail} // 绘制失败回调
            />
            )
          }
        </View>
      </View>
    )
  }
}