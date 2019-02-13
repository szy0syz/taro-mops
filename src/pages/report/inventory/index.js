import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard, AtNoticebar, AtSearchBar } from 'taro-ui'
import dayjs from 'dayjs'

import getInventory from './service'

import './index.scss'

export default class Inventory extends Component {
  config = {
    navigationBarTitleText: '报表-即时库存',
  }

  CacheInventory = {}

  constructor() {
    super(...arguments)
    this.state = {
      inventory: [],
      keyword: '',
    }
  }

  async fetchInvetory() {
    const res = await getInventory()
    const { data =[], success } = res;
    if (success) {
      this.setState({
        inventory: data.slice(0, 50)
      })
      this.CacheInventory = data;
    } else {
      Taro.showToast({ title: '加载即时库存失败', icon: 'close' })
    }
  }

  componentDidMount = () => {
    this.fetchInvetory()
  }

  handleChange = (keyword) => {
    this.setState({
      keyword,
    })
    console.log('keyword', keyword);
  }

  handleSearch = () => {
    const { keyword } = this.state;
    const isHelpCode = code => /^[A-Za-z0-9]+$/.test(code);
    let filterFunc;
    if (isHelpCode(keyword)) {
      filterFunc = item => item && item.FHelpCode && item.FHelpCode.includes(keyword)
    } else {
      filterFunc = item => item.FMaterialName.includes(keyword)
    }
    this.setState({
      inventory: this.CacheInventory.filter(filterFunc)
    })
  }

  render() {
    const { inventory = [], keyword } = this.state
    return (
      <View className='container'>
        <AtNoticebar style='padding-bottom: 12px;width:100%;' icon='volume-plus'>
          <Text>查询时间：{` ${dayjs().format('YYYY年MM月DD日 HH:mm:ss')}    |    `} 库存种类：{inventory.length} 种</Text>
        </AtNoticebar>
        <AtSearchBar
          showActionButton
          placeholder='请输入商品名或助记码'
          value={keyword}
          onChange={this.handleChange}
          onActionClick={this.handleSearch}
        />
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%; padding: 4px 0 20px 0;'
        >
          {inventory.map(item => (
            <View key={item.FMaterialNumber} className='card-box' style='margin-bottom: 8px;'>
              <AtCard
                note={item.FModel}
                extra={`[${item.FMaterialType1}]`}
                title={item.FMaterialName}
                thumb='http://cdn.jerryshi.com/picgo/20181125001736.png'
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