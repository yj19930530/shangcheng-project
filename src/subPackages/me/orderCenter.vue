<template>
  <div class="order-center-container">
    <!-- 头部tab 切换 -->
    <div class="order-center-top fl-bt">
      <div
        class="mr-l-24"
        :class="curr === 0 ? 'top-tar-check' : 'top-tar-check2'"
        @tap="checkType('all')"
      >
        <text class="fz-15" :class="[curr === 0 ? 'fw-bold' : 'fc-999']"
          >全部</text
        >
      </div>
      <div
        :class="curr === 1 ? 'top-tar-check' : 'top-tar-check2'"
        @tap="checkType('pay')"
      >
        <text class="fz-15" :class="[curr === 1 ? 'fw-bold' : 'fc-999']"
          >待付款</text
        >
      </div>
      <div
        :class="curr === 2 ? 'top-tar-check' : 'top-tar-check2'"
        @tap="checkType('send')"
      >
        <text class="fz-15" :class="[curr === 2 ? 'fw-bold' : 'fc-999']"
          >待发货</text
        >
      </div>
      <div
        :class="curr === 3 ? 'top-tar-check' : 'top-tar-check2'"
        @tap="checkType('shou')"
      >
        <text class="fz-15" :class="[curr === 3 ? 'fw-bold' : 'fc-999']"
          >待收货</text
        >
      </div>
      <div
        class="mr-r-24"
        :class="curr === 4 ? 'top-tar-check' : 'top-tar-check2'"
        @tap="checkType('ping')"
      >
        <text class="fz-15" :class="[curr === 4 ? 'fw-bold' : 'fc-999']"
          >待评价</text
        >
      </div>
    </div>
    <!-- 订单列表 -->
    <div class="order-list-coentent">
      <swiper :current="curr" @change="setCurr" style="height: 100vh">
        <swiper-item v-for="item in 5" :key="item">
          <scroll-view
            scroll-y
            style="height: 100vh"
            :show-scrollbar="false"
            :refresher-enabled="true"
            refresher-default-style="none"
            :refresher-triggered="scorllType"
            @refresherrefresh="scollHandle"
          >
            <div style="padding-top: 160rpx">
              <div v-for="(item, index) in orderListData" :key="index">
                <div class="order-row-box fl-bt">
                  <div class="order-row-left fl-fc">
                    <image
                      class="row-left-img"
                      @tap="navPathTo('goods', item.items[0])"
                      :src="httpImg + item.items[0].pic"
                    />
                    <text class="fz-12 fc-f1 mr-t-30" v-if="item.state === 1"
                      >等待您的付款</text
                    >
                    <text
                      class="fz-12 fc-999 mr-t-30"
                      v-else-if="item.state === 6"
                      >已取消</text
                    >
                    <text
                      class="fz-12 fc-999 mr-t-30"
                      v-else-if="item.state === 8"
                      >已退款</text
                    >
                    <text
                      class="fz-12 fc-f1 mr-t-30"
                      v-else-if="item.state === 2"
                      >待发货</text
                    >
                    <text
                      class="fz-12 fc-f1 mr-t-30"
                      v-else-if="item.state === 3"
                      >已发货</text
                    >
                    <text
                      class="fz-12 fc-f1 mr-t-30"
                      v-else-if="item.state === 4"
                      >待评价</text
                    >
                    <text
                      class="fz-12 fc-f1 mr-t-30"
                      v-else-if="item.state === 7"
                      >退款中</text
                    >
                    <text class="fz-12 fc-fff mr-t-30" v-else>站位</text>
                  </div>
                  <div class="order-row-right" @tap="navPathTo('log', item)">
                    <div class="fz-15 text-lang-dian2">
                      {{ item.items[0].gTitle }}
                    </div>
                    <div class="fl-bt mr-t-10">
                      <text class="fz-14 fc-999"
                        >已选 {{ item.items[0].propertiesValue }}</text
                      >
                      <text class="fz-14 fc-999 mr-r-24"
                        >x{{ item.items[0].qty }}</text
                      >
                    </div>
                    <div class="mr-t-10">
                      <text class="fz-17">总价：¥{{ item.payAmountNew }}</text>
                    </div>
                    <div class="border-btn-list">
                      <div class="border-btn-list-center">
                        <div
                          v-if="item.state === 1"
                          class="fl-cen order-comfirm-btn btn-border-999"
                          @tap.native.stop="navPathTo('del', item)"
                        >
                          <text class="fz-14">取消订单</text>
                        </div>
                        <div
                          v-if="item.state === 6"
                          class="fl-cen order-comfirm-btn visibility-show btn-border-999"
                        >
                          <text class="fz-14">已取消</text>
                        </div>
                        <!-- <div v-if="item.state===8" class="fl-cen order-comfirm-btn btn-border-999">
                          <text class="fz-14">已退款</text>
                        </div> -->
                        <div
                          v-if="item.state === 2"
                          class="fl-cen order-comfirm-btn btn-border-999"
                          @tap.native.stop="navPathTo('tk', item)"
                        >
                          <text class="fz-14">申请退款</text>
                        </div>
                        <div
                          v-if="item.state === 3"
                          class="fl-cen order-comfirm-btn btn-border-999"
                        >
                          <text class="fz-14">查看物流</text>
                        </div>
                        <!-- <div
                          @tap="navPathTo('tk',item)"
                          v-if="item.state===9"
                          class="fl-cen order-comfirm-btn btn-border-999"
                        >
                          <text class="fz-14">重新申请</text>
                        </div> -->
                        <div
                          @tap.native.stop="navPathTo('close', item)"
                          v-if="item.state === 7"
                          class="fl-cen order-comfirm-btn btn-border-f1"
                        >
                          <text class="fz-14 fc-f1">取消退款</text>
                        </div>
                        <!-- <div v-if="item.state===9" class="fl-cen order-comfirm-btn btn-border-f1">
                          <text class="fz-14 fc-f1">退款失败</text>
                        </div> -->
                        <div
                          v-if="item.state === 3"
                          class="fl-cen order-comfirm-btn btn-border-f1"
                          @tap.native.stop="navPathTo('confrim', item)"
                        >
                          <text class="fz-14 fc-f1">确认收货</text>
                        </div>
                        <!-- <div v-if="item.state===7" class="fl-cen order-comfirm-btn btn-border-f1">
                          <text class="fz-14 fc-f1">退款中</text>
                        </div> -->
                        <div
                          v-if="item.state === 1"
                          class="fl-cen order-comfirm-btn btn-border-f1"
                          @tap="navPathTo('pay', item)"
                        >
                          <text class="fz-14 fc-f1">去支付</text>
                        </div>
                        <div
                          v-if="item.state === 4"
                          class="fl-cen order-comfirm-btn btn-border-f1"
                        >
                          <text class="fz-14 fc-f1">评价晒单</text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fl-cen" v-if="!orderListData.length">
              <text class="fz-12 fc-999">没有订单</text>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
const { httpImg } = require("../../config/develop");
export default {
  data() {
    return {
      type: "all",
      status: "", // 订单状态
      orderListData: [], // 订单处理列表
      httpImg: httpImg, // 图片url
      curr: 0,
      scorllType: false,
    };
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  onLoad(obj) {
    if (obj.type) {
      const orderType = parseInt(obj.type);
      switch (orderType) {
        case 1: {
          this.curr = 1;
          this.status = obj.type;
          break;
        }
        case 2: {
          this.curr = 2;
          this.status = obj.type;
          break;
        }
        case 3: {
          this.curr = 3;
          this.status = obj.type;
          break;
        }
        case 4: {
          this.curr = 4;
          this.status = obj.type;
          break;
        }
        default: {
          this.curr = 0;
          this.status = "";
          break;
        }
      }
      this.getList();
    }
  },
  onShow() {
    this.getList();
  },
  methods: {
    //下拉刷新
    async scollHandle() {
      this.scorllType = true;
      await this.getList();
      this.scorllType = false;
    },
    setCurr(e) {
      this.orderListData = [];
      let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
      this.curr = thisCurr;
      this.status = thisCurr ? thisCurr : "";
      this.getList();
    },
    // 获取订单列表]
    async getList() {
      uni.showLoading({
        title: "加载中",
      });
      const { data } = await this.$api.getOrderList({
        type: "小程序订单",
        state: this.status,
        // soId:'20200907141719883'
      });
      this.orderListData = data;
      this.orderListData.forEach((item) => {
        if (item.discount) {
          item.payAmountNew = parseInt(item.payAmount * item.discount);
        } else {
          item.payAmountNew = item.payAmount * 1;
        }
      });
      uni.hideLoading();
    },
    // tar 切换type
    checkType(type) {
      this.type = type;
      switch (type) {
        case "pay": {
          // this.status = 1;
          this.curr = 1;
          this.status = 1;
          break;
        }
        case "send": {
          this.curr = 2;
          this.status = 2;
          break;
        }
        case "shou": {
          this.curr = 3;
          this.status = 3;
          break;
        }
        case "ping": {
          this.curr = 4;
          this.status = 4;
          break;
        }
        case "all": {
          this.curr = 0;
          this.status = "";
          break;
        }
      }
      this.getList();
    },
    // 状态按钮选择
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
            url: `/subPackages/home/shopDetail?gId=${row.gId}`,
          });
          break;
        }
        case "wuliu": {
          uni.navigateTo({
            url: `/subPackages/me/wuliu?id=${row.lid}&name=${row.logisticsCompany}`,
          });
          break;
        }
        case "tk": {
          uni.navigateTo({
            url: `/subPackages/me/refund?id=${row.oid}`,
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
                _this.getList();
                uni.hideLoading();
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
        case "show": {
          uni.navigateTo({
            url: `/subPackages/me/comment`,
          });
          break;
        }
        case "confrim": {
          let _this = this;
          uni.showModal({
            title: "提示",
            content: "是否确认收货",
            success: async function (res) {
              if (res.confirm) {
                toast.showLoading("确认中");
                await _this.$api.confirmReceipt({
                  orderNo: row.soId,
                });
                toast.showToast("确认成功");
                _this.getList();
                uni.hideLoading();
              }
            },
          });
          break;
        }
        case "close": {
          uni.navigateTo({
            url: `/subPackages/me/refundDetail?id=${row.frontReturnNo}`,
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  /* height: 118rpx; */
  padding: 22rpx 0 40rpx;
  background-color: #ffffff;
}
.top-tar-check {
  line-height: 2;
  border-bottom: 4rpx solid #a4423f;
}
.top-tar-check2 {
  line-height: 2;
  border-bottom: 4rpx solid #ffffff;
}
.order-list-coentent {
  margin: auto;
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
  margin-left: 28rpx;
  width: 160rpx;
  height: 48rpx;
  border-radius: 24rpx 24rpx;
}
.btn-border-999 {
  border: 1px solid #999;
}
.btn-border-f1 {
  border: 1px solid #a4423f;
}
.border-btn-list {
  display: flex;
  align-items: center;
  margin-top: 22rpx;
  justify-content: flex-end;
}
.border-btn-list-center {
  width: 350rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.order-row-style {
  height: 900rpx;
}
.visibility-show {
  visibility: hidden;
}
</style>