import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'

export default class Inventory extends Component {
  config = {
    navigationBarTitleText: '报表-及时库存',
  }

  componentDidMount = () => { }

  render() {
    return (
      <View className='container'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%;'
        >
          <View className='card-box'>
            <AtCard
              note='2.5% 100ml*50瓶 德国拜耳'
              extra='[杀虫剂]'
              title='百树得'
              thumb='http://cdn.jerryshi.com/picgo/20181125001736.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：9850.00(公斤)</Text>
              </View>
            </AtCard>
          </View>

          <View className='card-box'>
            <AtCard
              note='70% 5g*50袋*8盒 德国拜耳'
              extra='[杀虫剂]'
              title='艾美乐'
              thumb='http://cdn.jerryshi.com/picgo/20181125001736.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：242.00(公斤)</Text>
              </View>
            </AtCard>
          </View>

          <View className='card-box'>
            <AtCard
              note='80% 80ml*100瓶 昆明农药厂'
              extra='[杀虫剂]'
              title='敌敌畏'
              thumb='http://cdn.jerryshi.com/picgo/20181125001736.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：168.00(公斤)</Text>
              </View>
            </AtCard>
          </View>

          <View className='card-box'>
            <AtCard
              note='80% 200g*35代 山东赛普'
              extra='[杀菌剂]'
              title='代森锌'
              thumb='http://cdn.jerryshi.com/picgo/20181125002150.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：2478.00(公斤)</Text>
              </View>
            </AtCard>
          </View>

          <View className='card-box'>
            <AtCard
              note='45% 350g*20包  丹东'
              extra='[杀菌剂]'
              title='敌克松'
              thumb='http://cdn.jerryshi.com/picgo/20181125002150.png'
            >
              <View className='card-body'>
                <Text>仓库：跑马山1库</Text>
                <Text>数量：28805.00(公斤)</Text>
              </View>
            </AtCard>
          </View>

          <View className='card-box'>
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
          </View>

        </ScrollView>
      </View>
    )
  }
}