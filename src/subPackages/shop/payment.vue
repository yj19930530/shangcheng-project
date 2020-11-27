<template>
  <div class="payment-container">
    <div class="pay-top-box">
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单编号</text>
        <text class="fz-15 mr-r-30">{{ orderDetail.soId }}</text>
      </div>
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单名称</text>
        <text class="fz-15 mr-r-30">{{ orderDetail.items[0].name }}</text>
      </div>
      <div class="pay-top-row fl-bt">
        <text class="fz-15 fc-666 mr-l-30">订单金额</text>
        <text class="fz-15 mr-r-30">￥{{ totalPrice }}</text>
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
    <div class="fl-bt bottom-btn-box" :class="[iPhoneType === -1 ? '' : 'dianzi-style']"
    >
      <div class="fl-al mr-l-30">
        <text class="fz-15">合计</text>
        <text class="fz-17 fc-f1 fw-bold mr-l-10">¥{{ totalPrice }}</text>
      </div>
      <div class="fl-cen right-btn-submit" @tap="submtPay">
        <text class="fc-fff fz-14">付款</text>
      </div>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
export default {
  data() {
    return {
      soId: "",
      state: "",
      orderDetail: {},
      totalPrice: 0,
      iPhoneType: -1,
    };
  },
  computed: {
    phoneModel() {
      return getApp().globalData.model;
    },
  },
  onLoad(obj) {
    let t = common.iPhoneReturn(this.phoneModel);
    this.iPhoneType = t ? -1 : 0;
    this.state = obj.state;
    this.soId = obj.soId;
    this.getOrderList();
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  methods: {
    // 获取订单
    async getOrderList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getOrderList({
        type: "小程序订单",
        state: this.state,
        soId: this.soId,
      });
      this.orderDetail = data[0];
      this.orderDetail.items.forEach((item) => {
        this.totalPrice += item.basePrice * item.qty;
      });
      uni.hideLoading();
    },
    async submtPay() {
      toast.showLoading("支付中");
      this.$api
        .wecatPayHandle({
          orderNo: this.orderDetail.soId,
          payChannel: 1,
        })
        .then(async (res) => {
          common.weCatPay(res.data);
          uni.hideLoading();
        })
        .catch(() => {
          uni.hideLoading();
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
  border-bottom: 1px solid #f8f8f8;
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
  background-color: #A4423F;
}
.dianzi-style {
  padding-bottom: 48rpx;
}
</style>
