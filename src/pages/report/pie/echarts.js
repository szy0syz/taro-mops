import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { fetch } from './service'

import * as echarts from '../../../components/ec-canvas/echarts'
import './echarts.scss'

let chart = null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['金额', '毛利']
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
          color: '#666',
          formatter: function(val) {
            return (Number(val)/10000).toFixed(0) + '万'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: true },
        data: [
          '农药产品A',
          '农药产品B',
          '农药产品C'
        ],
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
        name: '金额',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [0, 0, 0],
        itemStyle: {
          emphasis: {
            color: '#37a2da'
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
            position: 'right'
          }
        },
        data: [0, 0, 0],
        itemStyle: {
          emphasis: {
            color: '#67e0e3'
          }
        }
      }
    ]
  }

  chart.setOption(option)
  return chart
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
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    yAxisList: [],
    qtyList: [],
    amountList: [],
    grossProfitList: []
  }

  componentDidMount = async () => {
    this.ecComponent.init(initChart)
    const { data, success } = await fetch()
    if (success) {
      let yAxisList = [], qtyList = [], amountList = [], grossProfitList = []
      data.forEach((item) => {
        yAxisList.unshift(item.FMaterialName)
        qtyList.unshift(item.FBaseQty)
        amountList.unshift((item.FAmount).toFixed(0))
        grossProfitList.unshift((item.FGrossProfit).toFixed(0))
      })
      await this.setState({
        yAxisList,
        qtyList,
        amountList,
        grossProfitList
      })
      setTimeout(() => {
        chart.setOption({
          yAxis: [
            {
              type: 'category',
              axisTick: { show: true },
              data: this.state.yAxisList,
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
              name: '金额',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: this.state.amountList,
              itemStyle: {
                emphasis: {
                  color: '#37a2da'
                }
              }
            },
            {
              name: '毛利',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true
                  // position: 'left'
                }
              },
              data: this.state.grossProfitList,
              itemStyle: {
                emphasis: {
                  color: '#67e0e3'
                }
              }
            }
          ]
        })
      }, 100)
    }
  }

  handleClick = () => {}

  refEC = node => (this.ecComponent = node)

  render() {
    console.log('执行render~~~~')

    const { ec } = this.state
    return (
      <View className="echarts">
        <Text className='report-title' onClick={this.handleClick}>2018年农药产品销售Top10</Text>
        <ec-canvas
          ref={this.refEC}
          id="mychart-dom-area"
          canvas-id="mychart-area"
          ec={ec}
        />
      </View>
    )
  }
}
