import Taro, { Component } from '@tarojs/taro'
import dayjs from 'dayjs'
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
      data: ['杀菌剂', '杀虫剂', '微肥', '除草剂', '植调节剂', '环卫']
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
        data: []
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
    dateStart: '2018-01-01',
    dateEnd: '2018-5-31',
    totalAmount: 0,
    totalQty: 0,
    totalBillCount: 0,

  }

  handleShortName = (name) => {
    const list = [
      { long: '植物生长调节剂', short: '调节剂' },
      { long: '农药环境卫生', short: '环卫' },
      { long: '微量元素肥', short: '微肥' }
    ]
    let short = ''
    list.forEach(item => {
      if (item.long === name) short = item.short
    })

    return short === '' ? name : short
  }

  handleFetch = async (queryParams) => {
    const { dateStart, dateEnd } = this.state
    let data = Object.assign({}, { dateStart, dateEnd }, queryParams)
    data = await fetch(data)
    return data
  }

  handleDateChange = (name, value) => {
    this.setState({
      [name]: value
    })
    setTimeout(() => {
      this.handleFetchAndUpdate()
    }, 100)
  }

  handleFormatData = (data) => {
    let sdata = [], ldata = []
    data.forEach(item => {
      sdata.push({
        value: item.FAmount,
        name: this.handleShortName(item.FMaterialType1)
      })
      ldata.push(this.handleShortName(item.FMaterialType1))
    })
    return {
      series: {
        data: sdata
      },
      legend: {
        data: ldata
      }
    }
  }

  handleFetchAndUpdate = async () => {
    const { data, success } = await this.handleFetch()
    if (success && Array.isArray(data)) {
      const totalAmount = data.reduce((sum, item) => {
        return sum += item.FAmount
      }, 0)
      const totalQty = data.reduce((sum, item) => {
        return sum += item.FBaseQty
      }, 0)

      this.setState({
        totalQty,
        totalAmount
      })
      chart.setOption(this.handleFormatData(data))
    }
  }

  componentDidMount = async () => {
    this.ecComponent.init(initChart)
    this.handleFetchAndUpdate()
  }

  handleNavList = () => {
    Taro.switchTab({
      url: '/pages/report/list/index'
    })
  }

  handleClick = (during) => {
    switch (during) {
      case 'curtMonth':
        this.setState({
          dateStart: dayjs().startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('month').format('YYYY-MM-DD')
        })
        break;
      case 'lastMonth':
        this.setState({
          dateStart: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        })
        break;
      case 'curtYear':
        this.setState({
          dateStart: dayjs().startOf('year').format('YYYY-MM-DD'),
          dateEnd: dayjs().endOf('year').format('YYYY-MM-DD')
        })
        break;
      case 'lastYear':
        this.setState({
          dateStart: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
          dateEnd: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
        })
        break;
    }
    setTimeout(() => {
      this.handleFetchAndUpdate()
    }, 100)
  }

  refEC = node => (this.ecComponent = node)

  render() {
    const { dateStart, dateEnd } = this.state
    return (
      <View className='page-container'>
        <View onClick={this.handleNavList} className='title'>
          <Text style='padding-right: 10rpx;'>销售统计</Text>
          <AtIcon value='chevron-down' size='26' color='#2bb2a7' />
        </View>
        <View className='header'>
          <View>
            <Text className='datetime-label'>时间维度</Text>
            <View className='datetime-btns'>
              <AtButton onClick={this.handleClick.bind(this, 'curtMonth')} circle type='secondary' size='small'>
                本月
              </AtButton>
              <AtButton onClick={this.handleClick.bind(this, 'lastMonth')} circle type='secondary' size='small'>
                上月
              </AtButton>
              <AtButton onClick={this.handleClick.bind(this, 'curtYear')} circle type='secondary' size='small'>
                本年
              </AtButton>
              <AtButton onClick={this.handleClick.bind(this, 'lastYear')} circle type='secondary' size='small'>
                去年
              </AtButton>
            </View>
          </View>
          <View style='padding-top: 4rpx;'>
            <Text className='datetime-label'>日期范围</Text>
            <View className='date-picker'>
              <DatePicker
                dateStart={dateStart}
                dateEnd={dateEnd}
                onDateChange={this.handleDateChange}
              />
            </View>
          </View>
        </View>
        <View className='body'>
          <View className='chart'>
            <ec-canvas
              ref={this.refEC}
              id='mychart-dom-area'
              canvas-id='mychart-area'
              ec={this.state.ec}
            />
          </View>
          <View className='stats'>
            <View>
              <Text>销售金额</Text>
              <Text className='stats-num'>￥{Number(this.state.totalAmount).toFixed(2)}</Text>
            </View>
            <View>
              <Text>销售数量</Text>
              <Text className='stats-num'>{Number(this.state.totalQty).toFixed(2)}</Text>
            </View>
          </View>
          <View className='list'>
            <AtList>
              <AtListItem title='销售额排行榜/客户' arrow='right' />
              <AtListItem title='销售额排行榜/商品' arrow='right' />
              <AtListItem title='销售额排行榜/地区' arrow='right' />
            </AtList>
          </View>
          <View className='more'>
            <AtButton size='small'>查看详细</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
