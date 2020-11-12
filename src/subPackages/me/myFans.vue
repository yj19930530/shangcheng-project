<template>
  <div id="follow-container">
    <div class="follow-has-list">
      <div class="follow-item-content fl-bt" v-for="item in 14" :key="item">
        <div class="mr-l-20 fl-al" @tap="lookUserDetail">
          <image class="follow-left-header" src="../../static/me/me-bg.png" />
          <text class="fz-15 fw-bold">初印象的小助理</text>
        </div>
        <div class="mr-r-20 fl-cen follow-has-btn">
          <image class="fans-icon" src="../../static/me/huxiang.png" />
          <text class="fz-12 fc-999 mr-l-4">互相关注</text>
        </div>
      </div>
    </div>
    <div class="follow-no-more">
      <text class="fc-999 fz-12">— 没有更多啦 —</text>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkType: "left",
    };
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  methods: {
    labelCheck(type) {
      this.checkType = type;
    },
    lookUserDetail() {
      uni.navigateTo({
        url: "/subPackages/me/personDetails",
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
.follow-item-content {
  width: 100%;
  height: 150rpx;
  background-color: #ffffff;
  border-bottom: 1px solid #f8f8f8;
}
.follow-has-list {
  margin-top: 18rpx;
}
.follow-left-header {
  width: 78rpx;
  height: 78rpx;
  border-radius: 50%;
  margin-right: 18rpx;
}
.follow-has-btn {
  width: 166rpx;
  height: 52rpx;
  border-radius: 26rpx 26rpx;
  border: 1px solid #999999;
}
.follow-no-more {
  text-align: center;
  padding: 22rpx 0;
}
.fans-icon {
  width: 24rpx;
  height: 24rpx;
}
</style>