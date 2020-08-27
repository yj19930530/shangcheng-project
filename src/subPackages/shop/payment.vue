<template>
  <div class="payment-container">
    <div class="pay-top-box">
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单编号</text>
        <text class="fz-15 mr-r-30">144565164464644645465</text>
      </div>
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单名称</text>
        <text class="fz-15 mr-r-30">初印象-多效修护精华水</text>
      </div>
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单金额</text>
        <text class="fz-15 mr-r-30">￥596</text>
      </div>
    </div>
    <div class="payment-mode fl-al">
      <text class="fz-12 fc-999 mr-l-30 fw-bold">支付方式</text>
    </div>
    <div class="fl-bt payment-mode-list">
      <div class="fl-al mr-l-30">
        <image class="payment-mode-icon" src="../../static/shop/wecat.png" />
        <text class="fz-15 mr-l-30">微信支付</text>
      </div>
      <image class="mr-r-30 icon-check" src="../../static/shop/yse.png" />
    </div>
    <!-- 提交 -->
    <div class="fl-bt bottom-btn-box">
      <div class="fl-al mr-l-30">
        <text class="fz-15">合计</text>
        <text class="fz-17 fc-f1 fw-bold mr-l-10">¥596</text>
      </div>
      <div class="fl-cen right-btn-submit" @tap="submtPay">
        <text class="fc-fff fz-14">付款</text>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    submtPay() {
      uni.navigateTo({
        url: "/subPackages/shop/paymentMsg",
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
.pay-top-box {
  background-color: #fff;
}
.pay-top-row {
  width: 100%;
  height: 108rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.payment-mode {
  width: 100%;
  height: 86rpx;
}
.icon-check {
  width: 30rpx;
  height: 30rpx;
}
.payment-mode-list {
  width: 100%;
  height: 108rpx;
  background-color: #fff;
}
.payment-mode-icon {
  width: 40rpx;
  height: 40rpx;
}
.bottom-btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 98rpx;
  z-index: 99999;
}
.right-btn-submit {
  width: 220rpx;
  height: 98rpx;
  background-color: #f11b20;
}
</style>