<template>
  <view :style="[{height:navHeight+'px'}]" class="nav-content">
    <image class="nav-img" src="../../static/title.png" />
  </view>
</template>
<script>
export default {
  computed: {
    navHeight() {
      return getApp().globalData.navHeight;
    },
  },
};
</script>
<style scoped>
.nav-content {
  position: relative;
  width: 100%;
  background: linear-gradient(to right, #333333, #444444);
  background-color: #ffffff;
  z-index: 9999990;
}
.nav-img {
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -156rpx;
  margin-bottom: 10px;
  width: 294rpx;
  height: 31rpx;
}
</style>