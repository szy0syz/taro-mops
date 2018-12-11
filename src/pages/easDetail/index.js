import Taro, { Component } from '@tarojs/taro'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { View, Text, Image, Input, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtCheckbox, AtButton } from 'taro-ui'
import { fetchById } from './service'
import './index.scss'

@connect(({ eas_detail, common }) => ({
  ...eas_detail,
  ...common
}))
export default class EasDetail extends Component {
  config = {
    navigationBarTitleText: '详情',
  }

  static defaultProps = {
    bill: {
      FBizDate: 'XXXX-XX-XX',
      FCustomerName: '默认客户',
      FNumber: 'XXX-XXXXXXX',
      FStorageOrgUnit: '仓储经营部',
      FTotalAmount: 0,
      FTransactionType: '未知类型',
      FBaseStatus: '未知',
      CFNZChkReason: ''
    },
    entries: []
  }

  componentDidMount = async () => {
    const { basePath = 'saleIssues', fid='2MDB8tduRim3KPek3YHhmMw+kzs=' } = this.$router.params
    let { data: payload } = await fetchById({basePath, fid})
    // 翻译状态
    payload.bill.FBaseStatus = this.props.saleStatusAry[payload.bill.FBaseStatus].label

    payload = Object.assign(payload, { fid })
    this.props.dispatch({
      type: 'eas_detail/save',
      payload
    })
  }

  handleBillTagsChange(orderTags) {
    this.props.dispatch({
      type: 'eas_detail/save',
      payload: {
        orderTags
      }
    })
  }

  handleCommonChange(type, e) {
    let payload, value = e.detail.value
    switch (type) {
      case 'payment':
        payload = {
          paymentMethod: this.props.payTypes[value]
        }
        break;
      case 'storekeeper':
        payload = {
          storekeeper: this.props.storekeeperList[value]
        }
        break;
      case 'remark':
        payload = {
          remark: value
        }
        break;
      default:
        break;
    }
    this.props.dispatch({
      type: 'order/save',
      payload
    })
  }

  handleBillDateChange(value) {
    this.props.dispatch({
      type: 'order/save',
      payload: {
        billDate: value.detail.value
      }
    })
  }

  handleWaiting() {
    Taro.showToast({
      icon: 'none',
      title: '功能开发中'
    })
  }

  handleSave() {
    let { billDate, orderTags, customer, products, remark, staff, storekeeper, paymentMethod } = this.props
    // 奇葩需求和奇葩api
    billDate = dayjs()
      .set('month', billDate.split('-')[1] - 1)
      .set('date', billDate.split('-')[2])
      .valueOf()
    let payload = {
      billDate,
      orderTags,
      customer,
      products,
      remark,
      staff,
      storekeeper,
      paymentMethod
    }
    this.props.dispatch({
      type: 'order/create',
      payload
    }).then(isCreated => {
      if (isCreated) {
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/list/index' })
        }, 1500)
      }
    })
  }

  handleAgain() {
    this.props.dispatch({
      type: 'order/empty'
    })
    Taro.showToast({
      title: '再开一单'
    })
  }

  handleNavigate(path) {
    Taro.navigateTo({
      url: `/pages/${path}/index`
    })
  }

  handleScanCode() {
    Taro.scanCode().then((data) => {
      console.log(data)
      Taro.showToast({
        title: '扫描成功'
      })
    })
  }

  handleSyncOrder() {
    const { _id, isSynced } = this.props
    if (isSynced) {
      Taro.showToast({
        title: '该单据已同步'
      })
    } else {
      this.props.dispatch({
        type: 'detail/syncOrder',
        payload: {
          _id
        }
      })
    }
  }

  render() {
    const { isSynced ,bill, entries } = this.props
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <AtList>
            <AtListItem
              title='日期'
              extraText={bill.FBizDate}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'clock',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title='客户'
              extraText={bill.FCustomerName}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'user',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title='类型'
              extraText={bill.FTransactionType}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'tag',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title='状态'
              extraText={bill.FBaseStatus}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'equalizer',
              }}
            />
          </AtList>
        </View>
        <View className='order-content'>
          <View>
            <Text>商品种类({entries.length || 0})</Text>
            <Text>合计金额：￥{ bill && bill.FTotalAmount.toFixed(2)}</Text>
          </View>
          <View>
            {entries && entries.map(item => (
              <View key={item.FID} className='order-item'>
                <Image className='m-img' src='http://cdn.jerryshi.com/picgo/20181104150040.png'></Image>
                <View>
                  <Text>{item.FMaterialName}</Text>
                  <View className='order-cell'>
                    <Text>单价：￥{Number(item.FPrice).toFixed(2)}</Text>
                    <Text>数量：{Number(item.FBaseQty).toFixed(2)}公斤</Text>
                  </View>
                  <View className='order-cell'>
                    <Text style='max-width:150px;' className='ellipsis'>规格：{item.FMaterialModel}</Text>
                    <Text>金额：￥{Number(item.FAmount).toFixed(2)}</Text>
                  </View>
                </View> 
                <Image style='height:30px;width:30px;' src='http://cdn.jerryshi.com/picgo/20181125001736.png'></Image>
              </View>
            ))}
          </View>
        </View>
        <View className='order-wrapper order-footer'>
          <View>
            <Text>审核人</Text>
            <Text>{bill.FAuditor}</Text>
          </View>
          <View>
            <Text>审核方式</Text>
            <Text>{bill.FAuditTime}</Text>
          </View>
          <View>
            <Text>业务员</Text>
            <Text></Text>
          </View>
          <View>
            <Text>出库员</Text>
            <Picker mode='selector' range={this.props.storekeeperList} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'storekeeper')}>
              <View className='picker'>
                {this.props.storekeeper.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View>
          <View onClick={this.handleNavigate.bind(this, 'delivery')}>
            <Text>物流</Text>
            <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
          </View>
          <View>
            <Text>票据影像</Text>
            <View onClick={this.handleUploadImg} >
              <AtIcon value='camera' size='34' color='#fff'></AtIcon>
            </View>
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Text>{bill.CFNZChkReason}</Text>
          </View>
        </View>
        <View>
          <AtCheckbox
            style='background-color: #aaa;'
            options={this.props.tagList}
            selectedList={this.props.orderTags}
            onChange={this.handleBillTagsChange}
          />
        </View>
        <View className='toolbar'>
          <View onClick={this.handleWaiting} style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='34' color='#fff'></AtIcon>
          </View>
          <AtButton onClick={this.handleAgain} size='normal' type='secondary'>再开一单</AtButton>
          <AtButton onClick={this.handleSave} size='normal' type='primary'>确认保存</AtButton>
          <View onClick={this.handleSyncOrder} style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value={`iconfont ${isSynced ? 'icon-confirm' : 'icon-shangchuan'}`} size='36' color='#fff'></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
