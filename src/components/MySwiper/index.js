import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.scss'

@connect(({ home }) => ({
  ...home
}))
export default class MySwiper extends Component {
  constructor() {
    super(...arguments);
    // this.state = { isH5: typeof window !== 'undefined' }
  }

  static propTypes = {
    stats: PropTypes.array,
    home: PropTypes.bool,
  };

  static defaultProps = {
    stats: [],
    home: false
  };

  render() {
    const { swiperData } = this.props;
    return (
      <Swiper
        className='swiper-container'
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
      >
        {swiperData.map((item, index) => (
          <SwiperItem key={index}>
            <View className='box'>
              <View>
                <Text className='item-title'>{item[0].label}</Text>
                <Text className='item-number'>￥{item[0].value.toFixed(2)}</Text>
              </View>
              <View>
                <Text className='item-title'>{item[1].label}</Text>
                <Text className='item-number'>￥{item[1].value.toFixed(2)}</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

