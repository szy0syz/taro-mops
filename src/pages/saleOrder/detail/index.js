import Taro, { Component } from '@tarojs/taro'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { AtList, AtListItem, } from 'taro-ui'
import { fetchById, fetchById_shared } from './service'
import { OrderCell } from '../../../components/OrderCell'
import './index.scss'

@connect(({ detail }) => ({
  ...detail,
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '订单',
  }

  state = {
    billID: '',
    isShared: false,
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    // Notice: 修复因MongoDB，对undefined数据不传输，导致缓存遗留显示的问题；
    await dispatch({ type: 'detail/empty' });
    const { _id, isShared } = this.$router.params;
    this.setState({ billID: _id, isShared });
    const { userName, easid, easfid = null } = Taro.getStorageSync('userInfo')
    let data;
    let res;
    if (isShared === 'true') {
      res = await fetchById_shared(_id);
    } else {
      res = await fetchById(_id);

    }
    data = res.data;
    

    data.billDate = dayjs(data.billDate).format('YYYY-MM-DD')
    data.staff = {
      userName,
      easid,
      easfid
    }
    dispatch({
      type: 'detail/save',
      payload: data,
    })
  }

  onShareAppMessage() {
    const { billID } = this.state;
    return {
      title: '云农农业科技-MOPS系统',
      path: `/pages/saleOrder/detail/index?_id=${billID}&basePath=saleOrders&isShared=true`,
    }
  }

  handleBillTagsChange(orderTags) {
    this.props.dispatch({
      type: 'order/save',
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

  handleUploadImg() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(data => {
      console.log(data)
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

  handleRemoveItem(item) {
    console.log(item)

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
      }).then(success => {
        if (success) {
          Taro.showToast({
            title: '同步成功',
            icon: 'success'
          })
          setTimeout(() => {
            Taro.navigateBack()
          }, 2000);
        }
      })
    }
  }

  handlePreviewImage(current) {
    // const { express } = this.props;
    // let { fileList = [] } = express;
    // fileList = fileList.map(item =>)
    // console.log('handlePreviewImage~~~', current)
    Taro.previewImage({
      current,
      urls: [current]
    })
  }

  render() {
    const { products, customer, remark, express, creator } = this.props
    const { fileList } = express;
    const { isShared } = this.state;
    const amountRRR = this.props.products.reduce((sum, item) => sum += item.amount, 0).toFixed(2)
    const hasImgs = express && express.fileList && express.fileList.length > 0;

    return (
      <View className='order-page'>
        <View className='order-wrapper'>
          <AtList>
            <AtListItem
              title='日期'
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'clock',
              }}
              extraText={this.props.billDate}
            />
            <AtListItem
              // onClick={this.handleNavigate.bind(this, 'customerSelect')}
              className='custom-listItem'
              title='客户'
              extraText={customer.CustomerName}
              iconInfo={{
                size: 28,
                color: '#999',
                value: 'user',
              }}
            />
          </AtList>
        </View>
        <View className='order-content'>
          <View>
            {/* <Button onClick={this.handleWaiting} style='background-color: rgba(241, 181, 85, 1);' className='custom-button' size='mini'>调用模板</Button>
            <Button onClick={this.handleWaiting} style='background-color: #1fb7a6;' className='custom-button' size='mini'>存为模板</Button> */}
          </View>
          <View>
            <Text>选择货品({products.length || 0})</Text>
            <Text>开单金额：￥{products.reduce((sum, item) => sum += item.defaultAmount, 0).toFixed(2)}</Text>
          </View>
          <View>
            {products.map(item => (<OrderCell isShared={isShared} item={item} key={item.FID} />) )}
          </View>
          <View>
            {/* <Button onClick={this.handleNavigate.bind(this, 'productSelect')} style='background-color: #1fb7a6;' className='custom-button' size='large'>选择商品</Button> */}
            {/* <Image onClick={this.handleScanCode} src='http://cdn.jerryshi.com/picgo/scanAdd.png' />
            <Image
              onClick={this.handleNavigate.bind(this, 'productSelect')}
              src='http://cdn.jerryshi.com/picgo/plusAdd.png'
            /> */}
          </View>
        </View>
        <View className='order-wrapper order-footer'>
          <View>
            <Text>结算金额</Text>
            <Input value={amountRRR} disabled type='digit' placeholder='0.00' className='input-amount'></Input>
          </View>
          <View>
            {/* <Text>结算方式</Text>
            <Text>{this.props.paymentMethod.name}</Text> */}
            {/* <Picker mode='selector' range={this.props.payTypes} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'payment')}>
              <View className='picker'>
                {this.props.paymentMethod.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker> */}
          </View>
          <View>
            <Text>业务员</Text>
            <Text>{creator.userName}</Text>
          </View>
          <View></View>
          {/* <View>
            <Text>出库员</Text>
            <Picker mode='selector' range={this.props.storekeeperList} rangeKey='name' onChange={this.handleCommonChange.bind(this, 'storekeeper')}>
              <View className='picker'>
                {this.props.storekeeper.name}
                <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
              </View>
            </Picker>
          </View> */}
          {/* <View onClick={this.handleNavigate.bind(this, 'delivery')}>
            <Text>物流</Text>
            <AtIcon value='chevron-right' size='22' color='#999'></AtIcon>
          </View> */}
          <View>
            <Text>物流单据</Text>
            {/* <View onClick={this.handleUploadImg} > */}
            <View className='img-list' style={{display: hasImgs ? 'block' : 'none'}}>
              { hasImgs ? 
                fileList.map(item => {
                  return <Image onClick={this.handlePreviewImage.bind(this, item.url)} style='max-height:240rpx;max-width:240rpx;display:block;' key={item.uid} src={item.url}></Image>
                })
                : null }
            </View>
          </View>
        </View>
        <View style='background-color: transparent;' className='remark'>
          <View>
            <Input value={remark} onChange={this.handleCommonChange.bind(this, 'remark')} placeholder='备注(最多100字)'></Input>
          </View>
        </View>
        <Button onClick={this.handleNavigate.bind(this, 'saleOrder/poster')} style='margin-top: 20px;' >绘制分享图</Button>
        {/* <View>
          <AtCheckbox
            style='background-color: #aaa;'
            options={this.props.tagList}
            selectedList={this.props.orderTags}
            onChange={this.handleBillTagsChange}
          />
        </View> */}
        {/* <View className='toolbar'>
          <View onClick={this.handleWaiting} style='padding:8rpx;background-color: rgba(114, 192, 116, 1); border-radius: 14rpx;'>
            <AtIcon value='iconfont icon-sharem1' size='32' color='#fff'></AtIcon>
          </View>
          <AtButton onClick={this.handleAgain} size='normal' type='secondary'>再开一单</AtButton>
          <AtButton onClick={this.handleSave} size='normal' type='primary'>确认保存</AtButton>
          <View onClick={this.handleSyncOrder} style='padding:6rpx;background-color: rgba(112, 159, 239, 1); border-radius: 14rpx;'>
            <AtIcon value={`iconfont ${isSynced ? 'icon-confirm' : 'icon-shangchuan'}`} size='34' color='#fff'></AtIcon>
          </View>
        </View> */}
      </View>
    )
  }
}
