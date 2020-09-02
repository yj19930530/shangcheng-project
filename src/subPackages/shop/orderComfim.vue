<template>
  <div class="comfirm-container">
    <div style="height:32rpx"></div>
    <!-- 头部地址 -->
    <div class="fl-fc address-edit-box">
      <div class="fl-bt address-top-box" @tap="chooseAddress">
        <image class="address-icon" src="../../static/shop/dizhi.png" />
        <div class="fl-fc" v-if="addressListData.length">
          <div
            class="fz-15 fw-bold address-title text-lang-dian"
          >{{addressListData[0].provinceName}}{{addressListData[0].cityName}}{{addressListData[0].countyName}}{{addressListData[0].detailInfo}}</div>
          <div class="fl-al mr-t-10">
            <text class="fz-15">{{addressListData[0].userName}}</text>
            <text class="fz-15 mr-l-50">{{addressListData[0].telNumber}}</text>
          </div>
        </div>
        <div class="fl-al address-title" v-else>
          <text class="fz-15 fw-bold">宝贝还没有收货地址哦~</text>
        </div>
        <text class="iconfont iconyoujiantou fz-14 fc-999 mr-r-20"></text>
      </div>
      <image class="heng-style" src="../../static/shop/heng.png" />
    </div>
    <!-- 订单内容 -->
    <div class="comfirm-list-box">
      <div class="comfirm-row-title fl-al">
        <image class="row-title-icon" src="../../static/shop/home.png" />
        <text class="fz-15 fw-bold mr-l-10">初印象Firstyinas</text>
      </div>
      <div
        class="comfirm-row-box fl-bt"
        v-for="(item,index) in shopList"
        :key="index"
        @tap="navToDetail"
      >
        <image class="row-left-img mr-l-40" :src="httpImg+item.good.gImg" />
        <div class="row-right-box">
          <text class="fz-15">{{item.good.gName}}</text>
          <div class="fl-bt mr-t-20">
            <text class="fz-14 fc-999">已选 {{item.good.gSpec}}</text>
            <text class="fz-14 fc-999">x{{item.cartQty}}</text>
          </div>
          <div class="mr-t-20">
            <text class="fz-17 fc-f1 fw-bold">¥{{item.good.bPrice}}</text>
            <text class="fz-14 fc-999 mr-l-10">¥{{item.good.price4}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail-box">
      <div class="order-detail-row fl-bt">
        <text class="fz-15 fc-666 mr-l-40">商品数</text>
        <text class="fz-15 fw-bold mr-r-40">{{totalNumber}}</text>
      </div>
      <div class="order-detail-row fl-bt">
        <text class="fz-15 fc-666 mr-l-40">商品金额</text>
        <text class="fz-15 fw-bold mr-r-40 fc-f1">¥{{totalPrice}}</text>
      </div>
      <div class="order-detail-row fl-bt">
        <text class="fz-15 fc-666 mr-l-40">运费</text>
        <text class="fz-15 fw-bold mr-r-40">¥0</text>
      </div>
      <div class="order-detail-row fl-al">
        <text class="fz-15 fc-666 mr-l-40">备注</text>
        <input
          class="fz-15 input-width-style mr-l-20"
          placeholder-class="fl-al"
          v-model="detal"
          placeholder="点击输入备注信息"
        />
      </div>
    </div>
    <!-- 提交 -->
    <div class="fl-bt bottom-btn-box">
      <div class="fl-al mr-l-30">
        <text class="fz-15">合计</text>
        <text class="fz-17 fc-f1 fw-bold mr-l-10">¥{{totalPrice}}</text>
      </div>
      <div class="fl-cen right-btn-submit" @tap="submtPay">
        <text class="fc-fff fz-14">提交订单</text>
      </div>
    </div>
  </div>
</template>
<script>
import { httpImg } from "../../config/develop";
export default {
  data() {
    return {
      detal: "",
      httpImg: httpImg, // 图片路径
      shopList: [], // 商品列表
      totalPrice: 0, // 总价
      totalNumber: 0, // 总数
      addressListData: [], // 收货地址
    };
  },
  onLoad(data) {
    let objData = JSON.parse(data.obj);
    if (objData.type === "car") {
      this.shopList = objData.data;
    } else {
      let buyData = objData.data;
      this.shopList = [
        {
          cartQty: objData.count,
          good: objData.data,
        },
      ];
    }
    this.priceCompute();
  },
  onShow() {
    this.addressList();
  },
  methods: {
    // 获取收货地址
    async addressList() {
      const { data } = await this.$api.getAddressList({
        isdefault: 1,
      });
      this.addressListData = data;
    },
    // 计算价格
    priceCompute() {
      this.shopList.forEach((item) => {
        this.totalPrice += item.good.bPrice * item.cartQty;
        this.totalNumber += item.cartQty;
      });
    },
    // 选择收货地址
    chooseAddress() {
      uni.navigateTo({
        url: "/subPackages/me/goodsArdressList",
      });
    },
    navToDetail() {
      uni.navigateTo({
        url: "/subPackages/home/shopDetail",
      });
    },
    // 跳转付款页面
    submtPay() {
      this.$api
        .addOrder({
          OrderInfo: JSON.stringify({
            smallAddress: this.addressListData[0],
            lsc: this.shopList,
            os: {
              postage: 0,
              reducePrice: 0,
              sumGood: this.totalNumber,
              sumPrice: this.totalPrice,
            },
          }),
        })
        .then((res) => {
          console.log(res);
        });
      // uni.navigateTo({
      //   url: "/subPackages/shop/payment",
      // });
    },
  },
};
</script>
<style >
page {
  background-color: #f8f8f8;
}
</style>
<style scoped>
.comfirm-container {
  padding-bottom: 98rpx;
}
.address-title {
  width: 540rpx;
}
.address-icon {
  margin-left: 24rpx;
  width: 30rpx;
  height: 39rpx;
}
.address-edit-box {
  overflow: hidden;
  margin: auto;
  width: 710rpx;
  height: 160rpx;
  background-color: #fff;
}
.address-top-box {
  height: 152rpx;
}
.heng-style {
  margin-left: -20rpx;
  width: 750rpx;
  height: 8rpx;
}
.comfirm-row-title {
  width: 100%;
  height: 110rpx;
  border-bottom: 1rpx solid #e3e3e3;
}
.comfirm-list-box {
  margin: 32rpx auto 0;
  width: 710rpx;
  border-radius: 20rpx;
  background-color: #fff;
}
.row-title-icon {
  margin-left: 28rpx;
  width: 36rpx;
  height: 38rpx;
}
.comfirm-row-box {
  width: 100%;
  height: 260rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.row-left-img {
  width: 186rpx;
  height: 186rpx;
  border-radius: 10rpx;
}
.row-right-box {
  margin-right: 44rpx;
  width: 380rpx;
}
.order-detail-box {
  margin: 30rpx auto;
  width: 710rpx;
  background-color: #fff;
  border-radius: 20rpx;
}
.order-detail-row {
  width: 100%;
  height: 108rpx;
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
.input-width-style {
  width: 80%;
}
</style>