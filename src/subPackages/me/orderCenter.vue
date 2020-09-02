<template>
  <div class="order-center-container">
    <!-- 头部tab 切换 -->
    <div class="order-center-top fl-bt">
      <div
        class="mr-l-24"
        :class="type==='all'?'top-tar-check':'top-tar-check2'"
        @tap="checkType('all')"
      >
        <text class="fz-15" :class="[type==='all'?'fw-bold':'fc-999']">全部</text>
      </div>
      <div :class="type==='pay'?'top-tar-check':'top-tar-check2'" @tap="checkType('pay')">
        <text class="fz-15" :class="[type==='pay'?'fw-bold':'fc-999']">待付款</text>
      </div>
      <div :class="type==='send'?'top-tar-check':'top-tar-check2'" @tap="checkType('send')">
        <text class="fz-15" :class="[type==='send'?'fw-bold':'fc-999']">待发货</text>
      </div>
      <div :class="type==='shou'?'top-tar-check':'top-tar-check2'" @tap="checkType('shou')">
        <text class="fz-15" :class="[type==='shou'?'fw-bold':'fc-999']">待收货</text>
      </div>
      <div
        class="mr-r-24"
        :class="type==='ping'?'top-tar-check':'top-tar-check2'"
        @tap="checkType('ping')"
      >
        <text class="fz-15" :class="[type==='ping'?'fw-bold':'fc-999']">待评价</text>
      </div>
    </div>
    <!-- 订单列表 -->
    <div class="order-list-coentent">
      <div class="order-row-box fl-bt" v-for="(item,index) in orderListData" :key="index">
        <div class="order-row-left fl-fc">
          <image class="row-left-img" src="../../static/me/me-bg.png" />
          <text class="fz-12 fc-f1 mr-t-30">等待您的付款</text>
        </div>
        <div class="order-row-right">
          <text class="fz-15">初印象-多效修护精华水（蓝铜胜肽）</text>
          <div class="fl-bt mr-t-10">
            <text class="fz-14 fc-999">已选02（浮雕版）</text>
            <text class="fz-14 fc-999 mr-r-24">x1</text>
          </div>
          <div class="mr-t-10">
            <text class="fz-17">总价：¥289</text>
          </div>
          <div class="border-btn-list">
            <div class="border-btn-list-center fl-bt">
              <div class="fl-cen order-comfirm-btn btn-border-999" @tap="navPathTo('log')">
                <text class="fz-14">查看物流</text>
              </div>
              <div class="fl-cen order-comfirm-btn btn-border-f1">
                <text class="fz-14 fc-f1">去支付</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fl-cen mr-t-30" v-if="!orderListData.length">
      <text class="fz-15 fc-999">没有订单</text>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      type: "all",
      status: "",
      orderListData: [],
    };
  },
  onLoad(obj) {
    if (obj.type) {
      switch (obj.type) {
        case "待填写": {
          this.type = "pay";
          this.status = obj.type;
          break;
        }
        case "已付款待审核": {
          this.type = "send";
          this.status = obj.type;
          break;
        }
        case "已发货": {
          this.type = "shou";
          this.status = obj.type;
          break;
        }
        case "已审核待打印": {
          this.type = "ping";
          this.status = obj.type;
          break;
        }
        default: {
          this.type = "all";
          this.status = null;
          break;
        }
      }
      this.getList();
    }
  },
  methods: {
    // 获取订单列表]
    async getList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getOrderList({
        type: "小程序订单",
        status: this.status,
      });
      this.orderListData = data;
      uni.hideLoading();
    },
    // tar 切换type
    checkType(type) {
      this.type = type;
      switch (type) {
        case "pay": {
          this.status = "待填写";
          break;
        }
        case "send": {
          this.status = "已付款待审核";
          break;
        }
        case "shou": {
          this.status = "已发货";
          break;
        }
        case "ping": {
          this.status = "已审核待打印";
          break;
        }
        case "all": {
          this.status = null;
          break;
        }
      }
      this.getList();
    }, 
    navPathTo(name) {
      switch (name) {
        case "log": {
          uni.navigateTo({
            url: "/subPackages/me/orderDetail",
          });
          break;
        }
        default: {
          break;
        }
      }
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
.order-center-top {
  width: 100%;
  /* height: 118rpx; */
  padding: 22rpx 0 40rpx;
  background-color: #ffffff;
}
.top-tar-check {
  line-height: 2;
  border-bottom: 4rpx solid #f11b20;
}
.top-tar-check2 {
  line-height: 2;
  border-bottom: 4rpx solid #ffffff;
}
.order-list-coentent {
  margin: 30rpx auto 0;
  width: 710rpx;
}
.order-row-box {
  margin-bottom: 30rpx;
  width: 100%;
  height: 310rpx;
  background-color: #fff;
  border-radius: 20rpx;
}
.row-left-img {
  width: 186rpx;
  height: 186rpx;
  border-radius: 10rpx;
}
.order-row-left {
  margin-left: 36rpx;
}
.order-row-right {
  margin-right: 32rpx;
  width: 398rpx;
}
.order-comfirm-btn {
  width: 160rpx;
  height: 48rpx;
  border-radius: 24rpx 24rpx;
}
.btn-border-999 {
  border: 1rpx solid #999;
}
.btn-border-f1 {
  border: 1rpx solid #f11b20;
}
.border-btn-list {
  display: flex;
  align-items: center;
  margin-top: 22rpx;
  justify-content: flex-end;
}
.border-btn-list-center {
  width: 350rpx;
}
</style>