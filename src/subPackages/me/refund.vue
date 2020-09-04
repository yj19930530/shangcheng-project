<template>
  <div class="refund-container">
    <div class="zhan-box"></div>
    <div class="refund-goods-row fl-cen">
      <image class="refund-left-img" src="../../static/me/me-bg.png" />
      <div class="refund-right-box mr-l-60">
        <text class="fz-15">初印象-多效修护精华水（蓝 铜胜肽）</text>
        <div class="fl-bt mr-t-10">
          <text class="fz-14 fc-999">已选02（浮雕版）</text>
          <text class="fz-14 fc-999">x1</text>
        </div>
        <text class="mr-t-10 fz-17">总价：¥289</text>
      </div>
    </div>
    <picker @change="bindPickerChange" :value="index" :range="reasonList">
      <div class="refund-item-box fl-bt">
        <text class="fz-15 mr-l-30">退款原因</text>
        <div class="uni-input fl-al mr-r-20">
          <text class="fz-15 fc-999">{{reasonList[index]}}</text>
          <text class="iconfont iconyoujiantou fz-15 fc-999"></text>
        </div>
      </div>
    </picker>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款金额：</text>
      <text class="fz-17 fc-f1">¥289</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款说明：</text>
      <input class="refund-input-style fz-15" placeholder="选填" />
    </div>
    <div class="upload-pingzheng mr-t-30">
      <text class="fz-15 mr-l-30">上传凭证</text>
      <div class="mr-l-40 mr-t-40 img-list-content">
        <div class="ping-img-box">
          <image class="ping-img-item" src="../../static/me/me-bg.png" />
          <image class="delete-img-style" src="../../static/shop/delete.png" />
        </div>
        <div class="fl-co img-choose-box">
          <image class="xiangji-icon" src="../../static/me/xiangji.png" />
          <text class="fz-12 fc-999">上传凭证</text>
        </div>
      </div>
    </div>
    <div class="submit-btn-box fl-cen" @tap="submitBtnHandle">
      <text class="fz-20 fc-fff fw-bold">提交</text>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      reasonList: [],
    };
  },
  methods: {
    bindPickerChange() {
      this.index = e.target.value;
    },
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
  padding-top: 20rpx;
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
</style>