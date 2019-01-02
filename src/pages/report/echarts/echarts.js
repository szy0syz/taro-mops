import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import * as echarts from '../../../components/ec-canvas/echarts'
import './echarts.scss'

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['数量', '金额', '毛利'] // ['数量', '金额', '毛利']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: true },
        data: ['农药产品A', '农药产品B', '农药产品C', '农药产品D', '农药产品E', '农药产品F', '农药产品G', '农药产品H', '农药产品I', '农药产品J'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '数量',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310, 300, 320, 310],
        itemStyle: {
          emphasis: {
            color: '#37a2da'
          }
        }
      },
      {
        name: '金额',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220, 141, 174, 190],
        itemStyle: {
          emphasis: {
            color: '#32c5e9'
          }
        }
      },
      {
        name: '毛利',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110, -32, -21, -34],
        itemStyle: {
          emphasis: {
            color: '#67e0e3'
          }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

export default class Echarts extends Component {
  config = {
    navigationBarTitleText: 'echarts-for-weixin',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: ' 报表-销售毛利分析',
    backgroundColor: '#eeeeee',
    backgroundTextStyle: 'light',
    usingComponents: {
      'ec-canvas': '../../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  state = {
    ec: { onInit: initChart }
  }

  handleClick = () => {
    // this.setState({
    //   ec: { onInit: initChart }
    // })
    console.log(this.ecComponent)
  }

  refEC = (node) => this.ecComponent = node

  render() {
    console.log('执行render~~~~')
    console.log('this.state.ec == null', this.state.ec == null)

    return (
      <View className='echarts'>
        <Text onClick={this.handleClick}>2018年农药销售Top10</Text>
        <ec-canvas ref={this.refEC} id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
      </View>
    )
  }
}

