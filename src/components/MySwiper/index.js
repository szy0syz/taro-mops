import Taro, { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, View } from '@tarojs/components';
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
        className={!home ? 'swiper-container' : 'swiper'}
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
      >
        { stats.map((item, index) => (
          <SwiperItem key={index}>
            <View>{item}</View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

