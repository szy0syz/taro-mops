import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import TaroCanvasDrawer from '../../components/taro-plugin-canvas'; // 拷贝文件到component的引入方式
// import { TaroCanvasDrawer  } from 'taro-plugin-canvas'; // npm 引入方式
// import './index.scss'

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

  index = 0;

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
        height: 1120,
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
            text: '曲靖市亿农家园农资有限责任公司',
            fontSize: 36,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 48,
            lineNum: 2,
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
            x: 96,
            y: 560,
            text: '「艾美乐」：5L*2瓶 德国拜耳',
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
            text: '明细：8公斤 * 98元 = ￥784元',
            fontSize: 26,
            color: '#444',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
          },

          {
            x: 96,
            y: 650,
            text: '「艾美乐」：5L*2瓶 德国拜耳',
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
            y: 690,
            text: '明细：8公斤 * 98元 = ￥784元',
            fontSize: 26,
            color: '#444',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
          },
          {
            x: 96,
            y: 730,
            text: '「艾美乐」：5L*2瓶 德国拜耳',
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
            y: 770,
            text: '明细：8公斤 * 98元 = ￥784元',
            fontSize: 26,
            color: '#444',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
          },
          {
            x: 96,
            y: 820,
            text: '「艾美乐」：5L*2瓶 德国拜耳',
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
            y: 860,
            text: '明细：8公斤 * 98元 = ￥784元',
            fontSize: 26,
            color: '#444',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
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
            y: 880,
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
            height: 1120,
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
            height: 1040,
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
  canvasDrawFunc = (config = this.state.rssConfig) => {
    this.setState({
      canvasStatus: true,
      config,
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
    const { rssConfig } = this.state;
    return (
      <View className='index'>
        <View>
          <View className='flex-row'>
            <Button onClick={this.canvasDrawFunc.bind(this, rssConfig)}>绘制</Button>
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