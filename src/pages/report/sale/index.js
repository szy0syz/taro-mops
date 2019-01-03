import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtButton, AtList, AtListItem } from 'taro-ui'
import { fetch } from './service'
import DatePicker from '../../../components/DatePicker'
import * as echarts from '../../../components/ec-canvas/echarts'

import './index.scss'

let chart = null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}元 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['杀菌剂', '杀虫剂', '微量元素肥', '除草剂', '植物生长调节剂', '农药环境卫生']
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 0, name: '杀菌剂' },
          { value: 0, name: '杀虫剂' },
          { value: 0, name: '微量元素肥' },
          { value: 0, name: '除草剂' },
          { value: 0, name: '植物生长调节剂' },
          { value: 0, name: '农药环境卫生' }
        ]
      }
    ]
  }

  chart.setOption(option)
  return chart
}

export default class ReportSale extends Component {
  config = {
    navigationBarTitleText: '销售统计',
    usingComponents: {
      'ec-canvas': '../../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  state = {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    totalAmount: 0
  }

  componentDidMount = async () => {
    this.ecComponent.init(initChart)
    const { data, success } = await fetch()
    if (success && Array.isArray(data)) {
      let sdata =[], ldata = [], totalAmount = 0
      data.forEach(item => {
        sdata.push({
          value: item.FAmount,
          name: item.FMaterialType1
        })
        ldata.push(item.FMaterialType1)
        totalAmount += item.FAmount
      })
      this.setState({ totalAmount })
      chart.setOption({
        series: {
          data: sdata
        },
        legend: {
          data: ldata
        }
      })
    }
  }

  handleNavList = () => {
    Taro.switchTab({
      url: '/pages/report/list/index'
    })
  }

  handleClick = () => {
    
  }

  refEC = node => (this.ecComponent = node)

  render() {
    return (
      <View className="page-container">
        <View onClick={this.handleNavList} className="title">
          <Text style="padding-right: 10rpx;">销售统计</Text>
          <AtIcon value="chevron-down" size="26" color="#2bb2a7" />
        </View>
        <View className="header">
          <View>
            <Text className="datetime-label">时间维度</Text>
            <View className="datetime-btns">
              <AtButton circle type="secondary" size="small">
                本月
              </AtButton>
              <AtButton circle onClick={this.handleClick} type="secondary" size="small">
                上月
              </AtButton>
              <AtButton circle type="secondary" size="small">
                本年
              </AtButton>
              <AtButton circle type="secondary" size="small">
                去年
              </AtButton>
            </View>
          </View>
          <View style="padding-top: 4rpx;">
            <Text className="datetime-label">日期范围</Text>
            <View className="date-picker">
              <DatePicker />
            </View>
          </View>
        </View>
        <View className="body">
          <View className="chart">
            <ec-canvas
              ref={this.refEC}
              id="mychart-dom-area"
              canvas-id="mychart-area"
              ec={ec}
            />
          </View>
          <View className="stats">
            <View>
              <Text>销售额</Text>
              <Text className="stats-num">￥{this.state.totalAmount}</Text>
            </View>
            <View>
              <Text>销售单据</Text>
              <Text className="stats-num">8892张</Text>
            </View>
          </View>
          <View className="list">
            <AtList>
              <AtListItem title="销售额排行榜/客户" arrow="right" />
              <AtListItem title="销售额排行榜/商品" arrow="right" />
              <AtListItem title="销售额排行榜/地区" arrow="right" />
            </AtList>
          </View>
          <View className="more">
            <AtButton size="small">查看详细</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
