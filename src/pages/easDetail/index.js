import Taro, { Component } from '@tarojs/taro'
// import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtTextarea } from 'taro-ui'
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
      FBizType: '未知类型',
      FBaseStatus: '未知',
      CFNZChkReason: ''
    },
    entries: []
  }

  componentDidMount = async () => {
    const { saleStatusAry, arBillStatusAry } = this.props
    let { basePath, id } = this.$router.params

    id = encodeURIComponent(id)
    
    let { data: payload } = await fetchById({ basePath, id })

    // 翻译状态
    if (payload && payload.bill) {
      if (basePath === 'saleIssues') {
        payload.bill.FBaseStatus = saleStatusAry[payload.bill.FBaseStatus].label
      }
      if (basePath === 'arBills') {
        payload.bill.FBaseStatus = arBillStatusAry[payload.bill.FBaseStatus].label
      }
    }
    
    payload = Object.assign(payload, { id, basePath })
    this.props.dispatch({
      type: 'eas_detail/save',
      payload
    })
  }

  handleWaiting() {
    Taro.showToast({
      icon: 'none',
      title: '功能开发中'
    })
  }


  handleNavigate(path) {
    Taro.navigateTo({
      url: `/pages/${path}/index`
    })
  }

  render() {
    const { bill, entries, labelData, basePath } = this.props
    const labels = labelData[basePath]
    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <AtList>
            <AtListItem
              className='custom-listItem'
              title='单号'
              extraText={bill.FNumber}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'numbered-list',
              }}
            />
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
              title={labels.customerLabel}
              extraText={bill.FCustomerName}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'user',
              }}
            />
            <AtListItem
              className='custom-listItem'
              title={labels.billTypeLabel}
              extraText={bill.FBizType}
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
            <Text>{labels.AmountLabel}：￥{bill && bill.FTotalAmount.toFixed(2)}</Text>
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
            <Text>审核时间</Text>
            <Text>{bill.FAuditTime}</Text>
          </View>

        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <AtTextarea
              value={bill.CFNZChkReason}
              height='100'
              disabled
              count={false}
              placeholder={labels.remarkLabel}
            />
          </View>
        </View>
      </View>
    )
  }
}
