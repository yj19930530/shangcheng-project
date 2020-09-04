<template>
  <!--pages/range/range.wxml-->
  <view :style="[{marginTop:navHeight+'px'}]">
    <!-- 头部导航 -->
    <Nav class="nav-position" />
    <!-- 搜索 -->
    <view class="top-search-opt">
      <view class="fl-bt">
        <image class="left-img-btn mr-l-20" src="../../static/home/liwu.png" />
        <view class="fl-al search-content" @tap="navToPathSearch">
          <image class="search-style mr-l-30" src="../../static/home/ss.png" />
          <text class="fz-12 fc-89 mr-l-10">请输入商品名称</text>
        </view>
        <div class="message-content fl-al" @tap="navToPathMsg">
          <view class="message-number fl-cen fz-10" v-if="msgNumber>0">{{msgNumber}}</view>
          <image class="right-message-btn mr-r-20" src="../../static/home/xinxi.png" />
        </div>
      </view>
    </view>
    <!-- 轮播图 -->
    <swiper
      class="swiper swiper-container"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <swiper-item>
        <image @tap="navToDetail" class="swiper-item-img" src="../../static/home/9.png" />
      </swiper-item>
    </swiper>
    <!-- 商品内容 -->
    <div class="best-container">
      <div class="fl-co best-title-box">
        <text class="fz-14">BEST SELLERS</text>
        <text class="fz-9 mr-t-10">Endless Exploration Long-lasting Beauty</text>
      </div>
      <div class="shops-list-content fl-btw">
        <image @tap="navToDetail" class="shops-item-img" src="../../static/home/9.png" />
        <image @tap="navToDetail" class="shops-item-img" src="../../static/home/9.png" />
        <image @tap="navToDetail" class="shops-item-img" src="../../static/home/9.png" />
        <image @tap="navToDetail" class="shops-item-img" src="../../static/home/9.png" />
      </div>
      <!-- 新品上线 -->
      <div class="fl-cen new-shop-tile">
        <image src="../../static/home/laba.png" />
        <text class="mr-l-10 fz-11 fc-fff">新品上线 惊喜大派送</text>
      </div>
      <div class="new-shop-list fl-co">
        <image
          @tap="navToDetail"
          v-for="item in 3"
          :key="item"
          class="new-shop-img"
          src="../../static/home/9.png"
        />
      </div>
    </div>
  </view>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      homePageData: {}, // 首页数据
      msgNumber: 0,
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: "自定义分享标题",
      path: "/pages/page/home",
    };
  },
  onLoad() {
    this.getHomePageData();
  },
  onShow() {
    this.getMsgNumber();
  },
  computed: {
    navHeight() {
      return getApp().globalData.navHeight;
    },
  },
  methods: {
    // 获取消息数量
    async getMsgNumber() {
      const { data } = await this.$api.getMessageCount();
      this.msgNumber = data;
    },
    // 获取首页数据
    async getHomePageData() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getHomePage();
      this.homePageData = data;
      uni.hideLoading();
    },
    navToDetail() {
      uni.navigateTo({
        url: "/subPackages/home/shopDetail",
      });
    },
    navToPathSearch() {
      uni.navigateTo({
        url: "/subPackages/class/search",
      });
    },
    navToPathMsg() {
      uni.navigateTo({
        url: "/subPackages/me/msgCenter",
      });
    },
  },
};
</script>
<style scoped>
.top-search-opt {
  padding-top: 50rpx;
  width: 100%;
  height: 220rpx;
  background: linear-gradient(to right, #333333, #444444);
  border-radius: 0 0 50rpx 50rpx;
}
.left-img-btn {
  width: 66rpx;
  height: 66rpx;
}
.right-message-btn {
  width: 56rpx;
  height: 56rpx;
}
.search-content {
  width: 530rpx;
  height: 60rpx;
  background-color: #eeeeee;
  border-radius: 20rpx;
}
.search-style {
  width: 26rpx;
  height: 26rpx;
}
.message-content {
  position: relative;
}
.message-number {
  position: absolute;
  right: 20rpx;
  top: 0;
  width: 22rpx;
  height: 22rpx;
  background-color: #ffffff;
  border-radius: 50%;
}
.swiper-container {
  position: relative;
  top: -100rpx;
  margin: auto;
  width: 710rpx;
  height: 416rpx;
}
.swiper-item-img {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}
.best-container {
  position: relative;
  top: -100rpx;
}
.best-title-box {
  width: 100%;
  height: 134rpx;
}
.shops-list-content {
  margin: auto;
  width: 710rpx;
}
.shops-item-img {
  width: 340rpx;
  height: 440rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}
.new-shop-tile {
  margin: 10rpx auto 20rpx;
  width: 710rpx;
  height: 32rpx;
  border-radius: 16rpx 16rpx;
  background-color: #333333;
}
.new-shop-tile image {
  width: 25rpx;
  height: 26rpx;
}
.new-shop-list {
  margin: auto;
  width: 710rpx;
}
.new-shop-img {
  margin-top: 20rpx;
  width: 100%;
  height: 416rpx;
  border-radius: 20rpx;
}
</style>