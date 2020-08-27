<template>
  <div class="me-container">
    <!-- 头部展示栏 -->
    <div class="me-detail-content">
      <image class="me-detail-bg" src="../../static/me/me-bg.png" />
      <div class="me-detail-center">
        <div class="fl-bt de-center-box">
          <div class="fl-al">
            <image class="me-detail-header" src="../../static/home/9.png" />
            <text class="fz-15 fc-fff mr-l-30">微信名称</text>
            <text class="iconfont iconziyuan fz-17 fc-fff mr-l-20"></text>
          </div>
          <text class="iconfont iconyoujiantou fc-fff fz-14 mr-r-60"></text>
        </div>
      </div>
    </div>
    <!-- 订单 icon  -->
    <div class="oder-content">
      <div class="oder-top-box fl-bt">
        <text class="fz-12 mr-l-40">我的订单</text>
        <div class="mr-r-40">
          <text class="fz-12 fc-666">查看全部订单</text>
          <text class="iconfont iconyoujiantou fc-999 fz-10 mr-l-10"></text>
        </div>
      </div>
      <div class="icon-box-check fl-bt">
        <div class="fl-co">
          <image class="icon-img-style" src="../../static/me/dfk.png" />
          <text class="fz-12 fc-666 mr-t-20">待付款</text>
        </div>
        <div class="fl-co">
          <image class="icon-img-style" src="../../static/me/dfh.png" />
          <text class="fz-12 fc-666 mr-t-20">待发货</text>
        </div>
        <div class="fl-co">
          <image class="icon-img-style" src="../../static/me/dsh.png" />
          <text class="fz-12 fc-666 mr-t-20">待收货</text>
        </div>
        <div class="fl-co">
          <image class="icon-img-style" src="../../static/me/dpj.png" />
          <text class="fz-12 fc-666 mr-t-20">待评价</text>
        </div>
      </div>
    </div>
    <!-- 其他功能 -->
    <div class="other-content">
      <div class="fl-bt other-item-box">
        <div class="fl-al mr-l-20">
          <image class="icon-left-style" src="../../static/me/dizhi.png" />
          <text class="fz-15 mr-l-10">收货地址</text>
        </div>
        <text class="iconfont iconyoujiantou fz-15 fc-999 mr-r-20"></text>
      </div>
      <button open-type="contact" class="fl-bt other-item-box2">
        <div class="fl-al mr-l-20">
          <image class="icon-left-style" src="../../static/me/kefu.png" />
          <text class="fz-15 mr-l-10">联系客服</text>
        </div>
        <text class="iconfont iconyoujiantou fz-15 fc-999 mr-r-20"></text>
      </button>
    </div>
  </div>
</template>
<style>
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
.me-detail-content {
  position: relative;
  width: 100%;
  height: 488rpx;
}
.me-detail-bg {
  width: 100%;
  height: 100%;
}
.me-detail-center {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.me-detail-header {
  margin-left: 34rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
}
.de-center-box {
  margin-top: 144rpx;
}
.oder-content {
  position: relative;
  top: -140rpx;
  width: 100%;
  height: 274rpx;
  border-radius: 44rpx 44rpx 0 0;
  background-color: #fff;
}
.oder-top-box {
  margin: auto;
  width: 710rpx;
  height: 82rpx;
  border-bottom: 1rpx solid #eeeeee;
}
.icon-box-check {
  margin:32rpx auto 0;
  width: 634rpx;
}
.icon-img-style {
  width: 52rpx;
  height: 48rpx;
}
.other-content {
  position: relative;
  top: -116rpx;
  background-color: #fff;
}
.icon-left-style {
  width: 36rpx;
  height: 36rpx;
}
.other-item-box {
  width: 100%;
  height: 120rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.other-item-box2 {
  padding: 0 !important;
  width: 100%;
  height: 120rpx;
  border-bottom: 1rpx solid #f8f8f8;
  background-color: #fff;
}
</style>