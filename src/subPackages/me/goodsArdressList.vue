<template>
  <div class="address-container">
    <div class="fl-fc address-edit-box" v-for="item in 10" :key="item" @tap="editAddress">
      <div class="fl-bt address-top-box">
        <image class="address-icon" src="../../static/shop/dizhi.png" />
        <div class="fl-fc">
          <div class="fz-15 fw-bold address-title text-lang-dian">四川省成都市双流区天府五街地铁口天四川省成都市双流区天府五街地铁口</div>
          <div class="fl-al mr-t-10">
            <text class="fz-15">王甜甜</text>
            <text class="fz-15 mr-l-50">18202841598</text>
          </div>
        </div>
        <text class="iconfont iconziyuan fz-17 fc-999 mr-r-20"></text>
        <div class="default-icon fl-cen">
          <text class="fz-11 fc-fff">默认</text>
        </div>
      </div>
      <image class="heng-style" src="../../static/shop/heng.png" />
    </div>
    <div class="add-address-btn fl-cen" @tap="editAddress">
      <text class="fz-20 fc-fff fw-bold">新增地址</text>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    editAddress() {
      uni.navigateTo({
        url: "/subPackages/me/addGoodsAdress",
      });
    },
  },
};
</script>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
.address-container {
  padding-bottom: 128rpx;
}
.address-edit-box {
  overflow: hidden;
  margin: 20rpx auto 0;
  width: 710rpx;
  height: 160rpx;
  background-color: #fff;
}
.address-title {
  width: 540rpx;
}
.address-icon {
  margin-left: 24rpx;
  width: 30rpx;
  height: 39rpx;
}
.address-top-box {
  position: relative;
  height: 152rpx;
}
.heng-style {
  margin-left: -20rpx;
  width: 750rpx;
  height: 8rpx;
}
.add-address-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 108rpx;
  z-index: 999;
  background: linear-gradient(to right, #333333, #666666);
}
.default-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 82rpx;
  height: 30rpx;
  border-radius: 10rpx 0 20rpx 0;
  background-color: #7e6b5a;
}
</style>