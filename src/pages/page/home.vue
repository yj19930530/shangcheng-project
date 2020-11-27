<template>
  <!--pages/range/range.wxml-->
  <view :style="[{ marginTop: navHeight + 'px' }]">
    <!-- 头部导航 -->
    <Nav class="nav-position" />
    <!-- 搜索 -->
    <view class="top-search-opt">
      <view class="fl-bt">
        <image
          class="left-img-btn mr-l-20"
          @tap="toHufuPath"
          src="../../static/home/liwu.png"
        />
        <view class="fl-al search-content" @tap="navToPathSearch">
          <image class="search-style mr-l-30" src="../../static/home/ss.png" />
          <text class="fz-12 fc-89 mr-l-10">请输入商品名称</text>
        </view>
        <div class="message-content fl-al">
          <view class="message-number fl-cen fz-10" v-if="msgNumber > 0">{{
            msgNumber
          }}</view>
          <image
            class="right-message-btn mr-r-20"
            src="../../static/home/xinxi.png"
          />
        </div>
      </view>
    </view>
    <!-- 轮播图 -->
    <div style="margin-top: -100rpx; padding-bottom: 20rpx">
      <swiper
        class="swiper swiper-container"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item
          v-for="(item, index) in homePageData[2].emsModalGoodVo"
          :key="index"
        >
          <image
            mode="aspectFill"
            @tap="navToDetail(item)"
            class="swiper-item-img"
            :src="httpImg + item.indexDisplayPic"
          />
        </swiper-item>
      </swiper>
      <!-- 商品内容 -->
      <div class="best-container">
        <div class="fl-co best-title-box">
          <text class="fz-14">BEST SELLERS</text>
          <text class="fz-9 mr-t-10"
            >Endless Exploration Long-lasting Beauty</text
          >
        </div>
        <div class="shops-list-content fl-btw">
          <image
            @tap="navToDetail(item)"
            v-for="item in homePageData[1].emsModalGoodVo"
            :key="item.id"
            class="shops-item-img"
            :src="httpImg + item.indexDisplayPic"
          />
        </div>
        <!-- 新品上线 -->
        <div class="fl-cen new-shop-tile">
          <image src="../../static/home/laba.png" />
          <text class="mr-l-10 fz-11 fc-fff">新品上线 惊喜大派送</text>
        </div>
        <div class="new-shop-list fl-co">
          <image
            mode="aspectFill"
            @tap="navToDetail(item)"
            v-for="item in homePageData[0].emsModalGoodVo"
            :key="item.id"
            class="new-shop-img"
            :src="httpImg + item.indexDisplayPic"
          />
        </div>
      </div>
    </div>
    <div class="fl-co" style="margin-top: -20rpx; padding-bottom: 20rpx">
      <image
        class="goods-shuai-xuan"
        @tap="toGoodsPage(2)"
        src="../../static/home/qudou.png"
      ></image>
      <image
        @tap="toGoodsPage(3)"
        class="goods-shuai-xuan"
        src="../../static/home/meibai.png"
      ></image>
      <image
        @tap="toGoodsPage(1)"
        class="goods-shuai-xuan"
        src="../../static/home/bushui.png"
      ></image>
    </div>
  </view>
</template>
<script>
const { toast } = require("../../utils/index");
const { httpImg } = require("../../config/develop");
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      homePageData: {}, // 首页数据
      msgNumber: 0,
      httpImg: httpImg,
    };
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  onLoad(obj) {
    if (obj.channelId) {
      uni.setStorageSync("channelId", obj.channelId);
      this.$api.accessCount({
        channelId: obj.channelId,
      });
    }
    this.userno = uni.getStorageSync("userno");
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
    toHufuPath() {
      uni.navigateToMiniProgram({
        appId: "wx75b592d44ba30eaf",
      });
    },
    // 获取首页数据
    async getHomePageData() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getHomePage();
      this.homePageData = data;
      uni.hideLoading();
    },
    navToDetail(row) {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${row.goodId}`,
      });
    },
    navToPathSearch() {
      uni.navigateTo({
        url: "/subPackages/class/search",
      });
    },
    navToPathMsg() {
      this.$api.readAll({
        currentUserNo: this.userno,
      });
      uni.navigateTo({
        url: "/subPackages/me/msgDetail",
      });
    },
    toGoodsPage(id) {
      uni.navigateTo({
        url: `/subPackages/home/water?id=${id}`,
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
  /* top: -100rpx; */
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
  /* top: -100rpx; */
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
.goods-shuai-xuan {
  margin-top: 20rpx;
  width: 710rpx;
  height: 106rpx;
  border-radius: 10rpx;
}
</style>