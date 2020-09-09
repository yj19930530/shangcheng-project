<template>
  <div class="refund-container">
    <div class="zhan-box"></div>
    <div class="refund-top-timer">
      <text class="fz-12 fc-fff mr-t-30 mr-l-30">等待商家处理</text>
      <text class="fz-12 fc-fff mr-t-20 mr-l-30">还剩1天23小时57分</text>
    </div>
    <div class="refund-text-box fl-al">
      <text class="mr-l-20 fz-14">您已成功发起退款申请，请耐心等待商家处理</text>
    </div>
    <div class="refund-goods-row fl-cen">
      <image class="refund-left-img" src="../../static/me/me-bg.png" />
      <div class="refund-right-box mr-l-60">
        <text class="fz-15">初印象-多效修护精华水（蓝 铜胜肽）</text>
        <div class="fl-bt mr-t-10">
          <text class="fz-14 fc-999">已选02（浮雕版）</text>
          <text class="fz-14 fc-999">x1</text>
        </div>
        <text class="mr-t-10 fz-17">总价：￥289</text>
      </div>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款原因：</text>
      <text class="fz-17">不想要了</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款金额：</text>
      <text class="fz-17">￥289</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款说明：</text>
      <text class="fz-15">不想要了</text>
    </div>
    <div class="upload-pingzheng mr-t-30">
      <text class="fz-15 mr-l-30">上传凭证</text>
      <div class="mr-l-40 mr-t-40 img-list-content">
        <div class="ping-img-box">
          <image class="ping-img-item" src="../../static/me/me-bg.png" />
          <image class="delete-img-style" src="../../static/shop/delete.png" />
        </div>
      </div>
    </div>
    <div class="submit-btn-box fl-cen" @tap="submitBtnHandle">
      <text class="fz-20 fc-fff fw-bold">撤销申请</text>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      index: 0,
      reasonList: [],
      orderId: "",
      orderData: {},
    };
  },
  onLoad(obj) {

  },
  methods: {
    submitBtnHandle() {
      uni.navigateTo({
        url: "/subPackages/me/refundDetail",
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
.zhan-box {
  height: 20rpx;
  background-color: #f8f8f8;
}
.refund-container {
  padding-bottom: 108rpx;
  background-color: #fff;
}
.refund-left-img {
  width: 186rpx;
  height: 186rpx;
  border-radius: 20rpx;
}
.refund-goods-row {
  width: 100%;
  height: 234rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.refund-right-box {
  width: 380rpx;
  display: flex;
  flex-direction: column;
}
.refund-item-box {
  width: 100%;
  height: 108rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.refund-input-style {
  width: 70%;
}
.xiangji-icon {
  width: 80rpx;
  height: 58rpx;
  margin-bottom: 16rpx;
}
.img-choose-box {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  width: 160rpx;
  height: 160rpx;
  border: 1rpx dashed #cccccc;
}
.upload-pingzheng {
  padding-bottom: 18rpx;
}
.ping-img-box {
  position: relative;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}
.ping-img-item {
  width: 160rpx;
  height: 160rpx;
}
.delete-img-style {
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  right: 0;
  top: 0;
}
.img-list-content {
  display: flex;
  flex-wrap: wrap;
}
.submit-btn-box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 108rpx;
  background: linear-gradient(to right, #333333, #666666);
}
.refund-top-timer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 152rpx;
  background: linear-gradient(to right, #333333, #666666);
}
.refund-text-box {
  width: 100%;
  height: 80rpx;
  background-color: #f8f8f8;
}
</style>