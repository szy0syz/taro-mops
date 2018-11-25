import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import getInventory from './service'
import './index.scss'

export default class Inventory extends Component {
  config = {
    navigationBarTitleText: '报表-及时库存',
  }

  constructor() {
    super(...arguments)
    this.state = {
      inventory: []
    }
  }

  async fetchInvetory() {
    const res = await getInventory()
    if (res.success) {
      this.setState({
        inventory: res.data
      })
    } else {
      Taro.showToast({ title: '加载及时库存失败', icon: 'close' })
    }
  }

  componentDidMount = () => {
    this.fetchInvetory()
  }

  render() {
    const { inventory } = this.state
    return (
      <View className='container'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%;'
        >
          {inventory.map(item => (
            <View key={item.FMaterialNumber} className='card-box'>
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

          {/* <View className='card-box'>
            <AtCard
              note='40% 100g*100包 温州鹿城植保'
              extra='[杀菌剂]'
              title='菌核净'
              thumb='http://cdn.jerryshi.com/picgo/20181125002150.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：1452.00(公斤)</Text>
              </View>
            </AtCard>
          </View> */}

        </ScrollView>
      </View>
    )
  }
}