<template>
  <div class="shop-goods-contianer">
    <!-- 头部商品展示图 -->
    <div class="goods-top-box">
      <swiper
        class="swiper swiper-goods-box"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :duration="duration"
      >
        <swiper-item>
          <image class="swiper-row-img" src="../../static/me/me-bg.png" />
        </swiper-item>
        <swiper-item>
          <image class="swiper-row-img" src="../../static/me/me-bg.png" />
        </swiper-item>
      </swiper>
    </div>
    <!-- 商品标题 -->
    <div class="goods-title-box">
      <div class="fl-bt">
        <div class="fl-al">
          <text class="fz-15 fc-f1">¥</text>
          <text class="fz-20 fc-f1 fw-bold">298</text>
          <text class="fz-15 fc-999 td-text mr-l-20">¥399</text>
        </div>
        <text class="iconfont iconfenxiang fz-18 fc-333"></text>
      </div>
      <div class="goods-title-text mr-t-20">
        <text class="fz-16 fw-bold">我是商品标题，我是商品标题，我是商品标题，我是商品标题，我是商品标题，</text>
      </div>
    </div>
    <!-- 买家秀 -->
    <div class="buy-box mr-t-20">
      <div class="buy-title-top fl-bt">
        <text class="fz-15 fw-bold">精选买家秀</text>
        <div class="fl-al">
          <text class="fz-12 fc-999 mr-r-10">查看全部</text>
          <text class="iconfont iconyoujiantou fz-12 fc-999"></text>
        </div>
      </div>
      <Buy v-for="item in 2" :key="item" />
    </div>
    <!-- 相关文章 -->
    <div class="about-arc-content">
      <div class="about-arc-box">
        <div class="about-arc-title fl-bt">
          <text class="fz-15 fw-bold">相关文章</text>
          <div class="fl-al">
            <text class="fz-12 fc-999 mr-r-10">查看全部</text>
            <text class="iconfont iconyoujiantou fz-12 fc-999"></text>
          </div>
        </div>
        <div class="fl-btw" style="padding-bottom:10rpx">
          <Atc v-for="item in 2" :key="item" />
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="goods-detail-imgs">
      <div class="detail-imgs-center">
        <div class="imgs-title-box fl-al">
          <text class="fz-15 fw-bold">商品详情</text>
        </div>
        <image
          class="goods-details-img-show"
          v-for="item in 5"
          :key="item"
          src="../../static/me/me-bg.png"
        />
      </div>
    </div>
    <!-- 底部操作栏 -->
    <div class="bottom-click-box fl-bt">
      <div class="fl-co mr-l-20">
        <image class="home-icon" src="../../static/tabar/home2.png" />
        <text class="mr-t-4 fz-11">首页</text>
      </div>
      <div class="fl-co">
        <image class="car-icon" src="../../static/tabar/shop2.png" />
        <text class="mr-t-4 fz-11">购物袋</text>
      </div>
      <view open-type="contact" class="fl-co" style="position: relative;">
        <image class="ck-icon" src="../../static/me/kefu.png" />
        <text class="mr-t-4 fz-11">客服</text>
        <button class='contact-btn' open-type='contact'>a</button>
      </view>
      <div class="fl-al">
        <div class="add-car-style fl-cen">
          <text class="fc-fff fz-14">加入购物袋</text>
        </div>
        <div class="buy-style fl-cen">
          <text class="fc-fff fz-14">立即购买</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indicatorDots: false,
      autoplay: false,
      duration: 500,
    };
  },
};
</script>
<style>
page {
  background-color: #f4f4f4;
}
</style>
<style scoped>
.shop-goods-contianer {
  padding-bottom: 98rpx;
}
.goods-top-box {
  width: 100%;
  height: 762rpx;
}
.swiper-goods-box {
  width: 100%;
  height: 100%;
}
.swiper-row-img {
  width: 100%;
  height: 100%;
}
.goods-title-box {
  background-color: #fff;
  padding: 40rpx 20rpx 24rpx;
}
.goods-title-text {
  width: 688rpx;
}
.buy-box {
  padding: 36rpx 20rpx 30rpx;
  background-color: #fff;
}
.about-arc-content {
  width: 100%;
  background-color: #fff;
}
.about-arc-box {
  margin: 20rpx auto;
  width: 710rpx;
}
.about-arc-title {
  width: 100%;
  height: 102rpx;
}
.goods-detail-imgs {
  width: 100%;
  background-color: #fff;
}
.detail-imgs-center {
  margin: auto;
  width: 710rpx;
}
.imgs-title-box {
  width: 100%;
  height: 100rpx;
}
.goods-details-img-show {
  width: 100%;
  margin-bottom: 2rpx;
}
.home-icon {
  width: 39rpx;
  height: 39rpx;
}
.car-icon {
  width: 40rpx;
  height: 39rpx;
}
.ck-icon {
  width: 39rpx;
  height: 39rpx;
}

.bottom-click-box {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  width: 100%;
  height: 98rpx;
}
.add-car-style {
  width: 220rpx;
  height: 98rpx;
  background-color: #7E6B5A;
}
.buy-style {
  width: 220rpx;
  height: 98rpx;
  background-color: #F11B20;
}
.ke-btn-style {
  background-color: #fff;
  border: none;
}
.contact-btn {
  display: inline-block;
  position: absolute;
  width: 100%;
  background: salmon;
    opacity: 0;
}
</style>