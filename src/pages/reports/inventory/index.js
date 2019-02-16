import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard, AtNoticebar, AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import dayjs from 'dayjs'
import './index.scss'

@connect(({ reports }) => ({
  reports
}))
export default class Inventory extends Component {
  config = {
    navigationBarTitleText: '报表-即时库存',
  }

  handleFetch = () => {
    const { dispatch, reports } = this.props
    const { invt_kw } = reports
    if (invt_kw.length >= 2) {
      dispatch({
        type: 'reports/getInventory',
        payload: { invt_kw }
      })
    } else {
      Taro.showToast({ title: '关键字限制至少两个字符' })
    }
  }

  handleChange = (value) => {
    const { dispatch } = this.props
    dispatch({
      type: 'reports/save',
      payload: { invt_kw: value }
    })
  }

  componentDidMount() { }

  render() {
    const { inventory = [], invt_kw } = this.props.reports

    return (
      <View className='inventory-page'>
        <AtNoticebar style='padding-bottom: 12px;width:100%; text-align: center;' icon='volume-plus'>
          <Text>查询时间：{` ${dayjs().format('YYYY年MM月DD日 HH:mm:ss')}    |    `} 库存种类：{inventory.length} 种</Text>
        </AtNoticebar>
        <AtSearchBar
          value={invt_kw}
          showActionButton
          placeholder='请输入查询关键字检索'
          onChange={this.handleChange}
          onActionClick={this.handleFetch}
        />
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%; padding: 4px 0 20px 0;'
        >
          <renderCards data={inventory}></renderCards>
          {inventory.map(item => (
            <View key={item.FMaterialNumber} className='card-box' style='margin-bottom: 8px;'>
              <AtCard
                note={item.FModel}
                extra={`[${item.FMaterialType1}]`}
                title={item.FMaterialName}
              >
                <View className='card-body'>
                  <Text>仓库：{item.FWAREHOUSE}</Text>
                  <Text>数量：{item.FBaseQty.toFixed(2)}({item.FUnit})</Text>
                </View>
              </AtCard>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}