<template>
  <div class="order-center-container">
    <div class="order-top-detail"></div>
    <!-- 订单列表 -->
    <div class="order-list-coentent">
      <div class="order-detail-coentent">
        <div class="fl-al" v-if="orderData.state===1">
          <image class="fk-success-icon mr-l-20" src="../../static/me/fk.png" />
          <text class="fz-15 fc-fff mr-l-20">等待付款</text>
        </div>
        <div class="fl-al" v-if="orderData.state===2">
          <image class="fk-success-icon mr-l-20" src="../../static/me/dfh2.png" />
          <text class="fz-15 fc-fff mr-l-20">付款成功</text>
        </div>
        <div class="fl-al" v-if="orderData.state===5">
          <image class="fk-success-icon mr-l-20" src="../../static/me/ok.png" />
          <text class="fz-15 fc-fff mr-l-20">交易成功</text>
        </div>
        <div class="fl-al" v-if="orderData.state===3">
          <image class="fk-success-icon mr-l-20" src="../../static/me/dsh2.png" />
          <text class="fz-15 fc-fff mr-l-20">正在运输</text>
        </div>
        <!-- 物流 -->
        <div
          class="wuliu-box-detail fl-bt mr-t-20"
          @tap="navPathTo('wuliu')"
          v-if="orderData.state===3||orderData.state===2"
        >
          <image class="wuliu-icon" src="../../static/me/wuliu.png" />
          <div class="wuliu-title-box fl-fc">
            <text class="fz-14 fw-bold">您的商品需要从供应商采购，我们会尽快处理，请耐心等待</text>
            <text class="fz-12 fc-999 mr-t-10">{{timeTextShow(orderData.sendDate)}}</text>
          </div>
          <text class="iconfont iconyoujiantou fz-15 mr-r-20"></text>
        </div>
        <!-- 地址 -->
        <div class="wuliu-box-detail fl-bt mr-t-20">
          <image class="wuliu-icon" src="../../static/me/dizhi2.png" />
          <div class="wuliu-title-box">
            <div class="fl-al">
              <text class="fz-14 fw-bold">王甜甜</text>
              <text class="fz-14 fw-bold mr-l-60">{{orderData.mobile}}</text>
            </div>
            <text class="fz-12 mr-t-10">{{orderData.address}}</text>
          </div>
          <text class="iconfont iconyoujiantou fz-15 mr-r-20 visi-hiden"></text>
        </div>
      </div>
      <!-- 订单 -->
      <div class="mr-t-20 order-list-detail fl-al">
        <image class="title-home-icon" src="../../static/shop/home.png" />
        <text class="fc-15 fw-bold mr-l-14">初印象Firstyinas</text>
      </div>
      <div class="order-row-box fl-bt" v-for="item in orderData.items" :key="item.gId">
        <div class="order-row-left fl-fc">
          <image class="row-left-img" :src="httpImg+item.pic" />
        </div>
        <div class="order-row-right">
          <div class="fz-15 text-lang-dian2">{{item.name}}</div>
          <div class="fl-bt mr-t-10">
            <text class="fz-14 fc-999">已选{{item.propertiesValue}}</text>
            <text class="fz-14 fc-999 mr-r-24">x{{item.qty}}</text>
          </div>
          <div class="mr-t-10">
            <text class="fz-17">总价：¥{{item.basePrice}}</text>
          </div>
          <div class="border-btn-list" v-if="orderData.state===5">
            <div class="border-btn-list-center fl-bt">
              <div
                @tap.native.stop="navPathTo('show',orderData)"
                class="fl-cen order-comfirm-btn btn-border-f1"
              >
                <text class="fz-14 fc-f1">评价晒单</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 创建时间 -->
      <div class="order-create-time fl-al" v-if="orderData.state===1">
        <text class="fz-15 fc-666 mr-l-60">创建时间</text>
        <text class="fz-15 mr-l-70">{{timeTextShow(orderData.created)}}</text>
      </div>
      <!-- 支付详情 -->
      <div class="pay-content-list mr-t-20" v-if="orderData.state===2||orderData.state===5">
        <div class="pay-row-detail fl-al">
          <text class="fz-15 fc-666 mr-l-40">订单编号</text>
          <text class="fz-15 mr-l-70">{{orderData.soId}}</text>
        </div>
        <div class="pay-row-detail fl-al">
          <text class="fz-15 fc-666 mr-l-40">支付方式</text>
          <text class="fz-15 mr-l-70">微信支付</text>
        </div>
        <div class="pay-row-detail fl-al">
          <text class="fz-15 fc-666 mr-l-40">下单时间</text>
          <text class="fz-15 mr-l-70">{{timeTextShow(orderData.created)}}</text>
        </div>
        <div class="pay-row-detail fl-al">
          <text class="fz-15 fc-666 mr-l-40">支付时间</text>
          <text class="fz-15 mr-l-70">{{timeTextShow(orderData.payDate)}}</text>
        </div>
        <div class="pay-row-detail fl-al">
          <text class="fz-15 fc-666 mr-l-40">发货时间</text>
          <text class="fz-15 mr-l-70">{{timeTextShow(orderData.sendDate)}}</text>
        </div>
      </div>
      <div class="pay-content-list mr-t-20" v-if="orderData.state===2||orderData.state===5">
        <div class="pay-row-detail fl-bt">
          <text class="fz-15 fc-666 mr-l-40">商品总额</text>
          <text class="fz-15 mr-r-30">¥{{totalPrice}}</text>
        </div>
        <div class="pay-row-detail fl-bt">
          <text class="fz-15 fc-666 mr-l-40">运费</text>
          <text class="fz-15 mr-r-30">¥0</text>
        </div>
        <div class="pay-row-detail fl-bt">
          <text class="fz-15 fc-666 mr-l-40 visi-hiden">运费</text>
          <div class="mr-r-30">
            <text class="fz-15">合计</text>
            <text class="fz-17 fc-f1 mr-l-10 fw-bold">¥{{totalPrice}}</text>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="pay-bottom-box">
      <div class="border-btn-list-center2 fl-bt">
        <div
          @tap.native.stop="navPathTo('car',orderData)"
          class="fl-cen order-comfirm-btn btn-border-999"
          v-if="orderData.state===2||orderData.state===5||orderData.state===3"
        >
          <text class="fz-14">加入购物车</text>
        </div>
        <!-- <div
          class="fl-cen order-comfirm-btn btn-border-999"
          v-if="orderData.state===5"
          @tap.native.stop="navPathTo('del',orderData)"
        >
          <text class="fz-14">删除订单</text>
        </div>-->
        <div
          class="fl-cen order-comfirm-btn btn-border-999"
          v-if="orderData.state===1"
          @tap.native.stop="navPathTo('del',orderData)"
        >
          <text class="fz-14">取消订单</text>
        </div>
        <div
          @tap.native.stop="navPathTo('pay',orderData)"
          class="fl-cen order-comfirm-btn btn-border-f1 mr-r-20"
          v-if="orderData.state===1"
        >
          <text class="fz-14 fc-f1">去付款</text>
        </div>
        <div
          @tap.native.stop="navPathTo('confrim',orderData)"
          class="fl-cen order-comfirm-btn btn-border-f1 mr-r-20"
          v-if="orderData.state===2||orderData.state===3"
        >
          <text class="fz-14 fc-f1">确认收货</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
const { httpImg } = require("../../config/develop");
export default {
  data() {
    return {
      orderData: {},
      totalPrice: 0,
      httpImg: httpImg, // 图片url
    };
  },
  onLoad(obj) {
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#333333",
    });
    this.orderId = obj.id;
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getOrderInfo({
        id: this.orderId,
      });
      data.items.forEach((item) => {
        this.totalPrice += item.qty * item.basePrice;
      });
      this.orderData = data;
      uni.hideLoading();
    },
    // 时间转换
    timeTextShow(time) {
      return common.dateTime(time);
    },
    // tar 切换type
    checkType(type) {
      this.type = type;
    },
    async navPathTo(name, row) {
      switch (name) {
        case "log": {
          uni.navigateTo({
            url: `/subPackages/me/orderDetail?id=${row.oid}`,
          });
          break;
        }
        case "goods": {
          uni.navigateTo({
            url: `/subPackages/home/shopDetail?gId=${row.gid}`,
          });
          break;
        }
        case "show": {
          uni.navigateTo({
            url: `/subPackages/me/comment?id=${row.gid}`,
          });
          break;
        }
        case "tk": {
          uni.navigateTo({
            url: `/subPackages/me/refund`,
          });
          break;
        }
        case "del": {
          let _this = this;
          uni.showModal({
            title: "提示",
            content: "是否要取消订单",
            success: async function (res) {
              if (res.confirm) {
                toast.showLoading("取消中");
                await _this.$api.deleteOrder({
                  oid: row.oid,
                  state: 6,
                  soId: row.soId,
                });
                toast.showToast("取消成功");
                uni.navigateBack();
                uni.hideLoading();
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });

          break;
        }
        case "pay": {
          uni.navigateTo({
            url: `/subPackages/shop/payment?soId=${row.soId}&state=${row.state}`,
          });
          break;
        }
        case "car": {
          // 添加购物车
          break;
        }
        case "confrim": {
          console.log("确认收货");
          break;
        }
        case "close": {
          console.log("取消退款");
          break;
        }
        case "payFinish": {
          console.log("申请售后");
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
.order-center-container {
  padding-bottom: 110rpx;
}
.order-list-coentent {
  margin: -128rpx auto 0;
  width: 710rpx;
}
.order-row-box {
  width: 100%;
  height: 310rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f8f8f8;
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
.border-btn-list-center2 {
  width: 370rpx;
}
.wuliu-box-detail {
  width: 100%;
  height: 174rpx;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
}
.order-top-detail {
  width: 100%;
  height: 190rpx;
  background-color: #333333;
}
.fk-success-icon {
  width: 52rpx;
  height: 48rpx;
}
.wuliu-title-box {
  width: 556rpx;
}
.wuliu-icon {
  margin-left: 8rpx;
  width: 69rpx;
  height: 69rpx;
}
.order-list-detail {
  width: 100%;
  height: 110rpx;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
  border-bottom: 1rpx solid #f8f8f8;
}
.title-home-icon {
  margin-left: 28rpx;
  width: 36rpx;
  height: 38rpx;
}
.visi-hiden {
  visibility: hidden;
}
.pay-content-list {
  background-color: #fff;
  border-radius: 20rpx;
}
.pay-row-detail {
  width: 100%;
  height: 98rpx;
}
.pay-bottom-box {
  width: 100%;
  height: 108rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
}
.order-create-time {
  width: 100%;
  height: 104rpx;
}
</style>