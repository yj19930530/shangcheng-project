<template>
  <div class="buy-item-box mr-t-20">
    <div class="fl-al">
      <image class="buy-header-img" src="../../static/me/me-bg.png" />
      <text class="fz-14">包***铺</text>
    </div>
    <div class="buy-text-box">
      <text class="fz-14">太好看了吧！颜色太爱了！</text>
    </div>
    <div class="buy-show-img">
      <image class="show-img-item" src="../../static/me/me-bg.png" v-for="item in 5" :key="item" />
    </div>
  </div>
</template>
<style scoped>
.buy-header-img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 14rpx;
}
.buy-text-box {
  margin-top: 16rpx;
}
.buy-show-img {
  display: flex;
  flex-wrap: wrap;
  margin-top: 14rpx;
}
.show-img-item {
  margin-right: 20rpx;
  margin-top: 20rpx;
  width: 156rpx;
  height: 156rpx;
  border-radius: 20rpx;
}
</style>