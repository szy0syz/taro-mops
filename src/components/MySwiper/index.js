import Taro, { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

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
    stats: ['我是一', '我是二', '我是三'],
    home: false
  };

  render() {
    const { stats, home } = this.props;
    return (
      <Swiper
        className='swiper-container'
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
      >
        { stats.map((item, index) => (
          <SwiperItem key={index}>
            <View className='box'>
              <Text className='item-title'>本月毛利</Text>
              <Text className='item-number'>￥59384.00</Text>
              <Text className='item-title'>本月销售</Text>
              <Text className='item-number'>￥420842.00</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

