import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import TaroCanvasDrawer from '../../components/taro-plugin-canvas'; // 拷贝文件到component的引入方式
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


export default class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

  constructor(props) {
    super(props);
    this.state = {
      // 绘图配置文件
      config: null,
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false,
      rssConfig: {
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
          {
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
          { // 订单号
            x: 345,
            y: 400,
            text: 'SO201903181644123',
            fontSize: 26,
            color: '#666',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
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

          {
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
        ],
        images: [
          {
            url: 'http://cdn.ynagtech.com/oders/ynamp.png',
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
            url: 'http://cdn.jerryshi.com/picgo/order_banner.jpg',
            width: 710,
            height: 320,
            y: 40,
            x: 20,
            borderRadius: 28,
            zIndex: 10,
          },
          {
            url: 'http://cdn.ynagtech.com/oders/%E7%AB%A0_%E4%BB%93%E5%BA%93%E7%BB%8F%E8%90%A5%E9%83%A83.gif',
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
      },
    }
  }

  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = () => {
    // -----------------
    const products = [
      {
        DefaultPrice: 1300,
        MaterialModel: "50% 500g*10瓶 日本",
        MaterialName: "青劲保1",
        defaultAmount: 78000,
        qty: 60,
      },
      {
        DefaultPrice: 1400.05,
        MaterialModel: "50%50g*100瓶",
        MaterialName: "青劲保2",
        defaultAmount: 42000,
        qty: 30,
      },
      {
        DefaultPrice: 1100.2,
        MaterialModel: "40% 200g * 20瓶",
        MaterialName: "青劲保3",
        defaultAmount: 62000,
        qty: 60,
      },
    ]
    const data = genCanvasText(products);

    const { rssConfig } = this.state;
    data.forEach(item => rssConfig.texts.push(item));

    // -----------------
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
            <Button onClick={this.canvasDrawFunc}>绘制</Button>
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