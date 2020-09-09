<template>
  <view class="big">
    <swiper
      class="swiper-block"
      previous-margin="90rpx"
      next-margin="90rpx"
      current="0"
      @change="swiperChange"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item class="swiper-item">
          <div class="slide-image" :class="[swiperIndex === index ? 'active' : '']"></div>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>
<script>
export default {
  data() {
    return {
      imgUrls: [
        "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      swiperIndex:0
    };
  },
  methods: {
    swiperChange(e) {
      this.swiperIndex = e.detail.current;
      console.log(this.swiperIndex)
    },
  },
};
</script>
<style>
.swiper-block {
  height: 480rpx;
  width: 100%;
}
.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: unset;
}
.slide-image {
  height: 320rpx;
  width: 520rpx;
  border-radius: 9rpx;
  box-shadow: 0px 0px 30rpx rgba(0, 0, 0, 0.2);
  margin: 0rpx 30rpx;
  z-index: 1;
}
.active {
  transform: scale(1.15);
  transition: all 0.2s ease-in 0s;
  z-index: 20;
}
.swiper-block {
  height: 480rpx;
  width: 100%;
}
</style>