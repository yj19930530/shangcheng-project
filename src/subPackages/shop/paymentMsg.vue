<template>
  <div class="pay-msg-container">
    <div class="pay-msg-success fl-co" v-if="type==='success'">
      <div class="fl-co">
        <image class="pay-success-img" src="../../static/shop/cg.png" />
        <text class="fz-18 mr-t-10">支付成功</text>
      </div>
      <div class="fl-bt btn-mar-style">
        <div class="fl-cen look-order-btn mr-l-64" @tap="navGetPath('order')">
          <text class="fz-15 fc-fff">查看订单</text>
        </div>
        <div class="fl-cen nav-home-btn mr-r-64" @tap="navGetPath('home')">
          <text class="fz-15">返回首页</text>
        </div>
      </div>
    </div>
    <div class="pay-msg-success fl-co" v-else>
      <div class="fl-co">
        <image class="pay-success-img" src="../../static/shop/sb.png" />
        <text class="fz-18 mr-t-10">支付失败</text>
        <div class="pai-fail-detai">
          <text class="fz-14 fc-999">订单支付失败，原因您的余额 不足或请找其他原因</text>
        </div>
      </div>
      <div class="fl-bt btn-mar-style2">
        <div class="fl-cen nav-home-btn2" @tap="navGetPath('back')">
          <text class="fz-15">返回订单</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "err",
    };
  },
  onLoad(obj) {
    this.type = obj.type;
  },
  methods: {
    navGetPath(name) {
      switch (name) {
        case "home": {
          uni.reLaunch({
            url: "/pages/page/home",
          });
          break;
        }
        case "order": {
          uni.reLaunch({
            url: "/subPackages/me/orderCenter",
          });
          break;
        }
        case "back": {
          uni.navigateBack();
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
<style scoped>
.pay-success-img {
  width: 172rpx;
  height: 172rpx;
}
.look-order-btn {
  width: 260rpx;
  height: 80rpx;
  border-radius: 40rpx 40rpx;
  background-color: #f11b20;
}
.pay-msg-success {
  padding-top: 220rpx;
}
.nav-home-btn {
  margin-left: 86rpx;
  width: 260rpx;
  height: 80rpx;
  border-radius: 40rpx 40rpx;
  background-color: #f2f2f2;
}
.nav-home-btn2 {
  width: 260rpx;
  height: 80rpx;
  border-radius: 40rpx 40rpx;
  background-color: #f2f2f2;
}
.btn-mar-style {
  margin-top: 170rpx;
}
.btn-mar-style2 {
  margin-top: 74rpx;
}
.pai-fail-detai {
  margin-top: 14rpx;
  width: 430rpx;
  text-align: center;
}
</style>