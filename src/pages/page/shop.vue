<template>
  <div class="shop-car-container">
    <div class="fl-fca bg-fff" v-if="!dataType" :style="[{height:windowHeight+'px'}]">
      <text class="fc-7e fz-15 no-shop-title">购物袋空荡荡的~赶紧去装满~</text>
      <image class="no-shop-car" src="../../static/shop/guang.png" />
    </div>
    <div style="height:30rpx" v-if="dataType"></div>
    <div class="car-content-style" v-if="dataType">
      <div class="car-style-title fl-bt">
        <div class="fl-al">
          <image class="car-title-icon" src="../../static/shop/home.png" />
          <text class="fz-15 fw-bold mr-l-10">初印象Firstyinas</text>
        </div>
        <text class="fz-14 fc-999 mr-r-40">管理</text>
      </div>
      <!-- 购物车 row -->
      <div class="shop-car-row fl-al" v-for="(item,index) in shopList" :key="index">
        <image
          v-if="item.check===1"
          class="check-img mr-l-30"
          src="../../static/shop/yse.png"
          @tap.native.stop="checkChoose(index,0)"
        />
        <image
          v-if="item.check===0"
          class="check-img mr-l-30"
          src="../../static/shop/no.png"
          @tap.native.stop="checkChoose(index,1)"
        />
        <image class="row-shop-img" src="../../static/home/9.png" @tap="navPathToGoods" />
        <div class="row-right-content" @tap.native.stop="navPathToGoods">
          <div class="fz-15 text-width-row">初印象-多效修护精华水蓝铜胜肽</div>
          <text class="fz-14 fc-999 mr-t-20">已选02（浮雕版）</text>
          <div class="fl-al mr-t-20">
            <text class="fz-17 fw-bold fc-f1">¥{{item.pri}}</text>
            <text class="fz-14 fc-999 td-text mr-l-10">¥369</text>
            <div class="count-box fl-bt">
              <div class="count-row fl-cen fz-14 fc-999" @tap.native.stop="declineHandle(index)">-</div>
              <div class="count-row2 fl-cen fz-14 fc-999">{{item.count}}</div>
              <div class="count-row fl-cen fz-14 fc-999" @tap.native.stop="inclineHandle(index)">+</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部结算 -->
      <div class="car-bottom-content fl-bt">
        <div class="fl-al mr-l-30" @tap="allCheckTypeHandle(allCheckType)">
          <image v-if="allCheckType" class="check-img" src="../../static/shop/yse.png" />
          <image v-else class="check-img" src="../../static/shop/no.png" />
          <text class="fl-14 mr-l-10">全选</text>
        </div>
        <div class="fl-al">
          <div class="fl-al mr-r-60">
            <text class="fz-15">合计</text>
            <text class="fz-17 fw-bold fc-f1 mr-l-10">¥{{allTotal}}</text>
          </div>
          <div class="jiesuan-btn fl-cen" @tap="navPathTo">
            <text class="fz-14 fc-fff">结算</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataType: true,
      shopList: [
        {
          check: 1,
          count: 1,
          pri: 289,
        },
        {
          check: 1,
          count: 1,
          pri: 289,
        },
      ],
      allCheckType: false,
      allTotal: 0,
    };
  },
  computed: {
    windowHeight() {
      return getApp().globalData.windowHeight;
    },
  },
  onLoad() {
    this.getAllCheckType();
    this.allPrice();
  },
  methods: {
    // 旋转切换
    checkChoose(i, t) {
      this.shopList[i].check = t;
      this.getAllCheckType();
      this.allPrice();
    },
    // 递增
    inclineHandle(i) {
      this.shopList[i].count += 1;
      this.allPrice();
    },
    // 递减
    declineHandle(i) {
      if (this.shopList[i].count === 1) return;
      this.shopList[i].count -= 1;
      this.allPrice();
    },
    // 获取全选状态
    getAllCheckType() {
      let arrCheck = [];
      this.shopList.forEach((item) => {
        // 按钮type 判断
        arrCheck.push(item.check);
        let t = arrCheck.indexOf(0);
        if (t === -1) {
          this.allCheckType = true;
        } else {
          this.allCheckType = false;
        }
        // 计算总价格
        if (item.check === 1) {
          this.allTotal += item.pri;
        }
      });
    },
    // 计算总价格
    allPrice() {
      this.allTotal = 0;
      this.shopList.forEach((item) => {
        // 计算总价格
        if (item.check === 1) {
          this.allTotal += item.pri * item.count;
        }
      });
    },
    // 全选
    allCheckTypeHandle(type) {
      this.allCheckType = !type;
      this.shopList.forEach((item) => {
        if (!type) {
          item.check = 1;
        } else {
          item.check = 0;
        }
      });
      this.allPrice();
    },
    // 跳转结算页面
    navPathTo() {
      uni.navigateTo({
        url: "/subPackages/shop/orderComfim",
      });
    },
    navPathToGoods() {
      uni.navigateTo({
        url: "/subPackages/home/shopDetail",
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
.no-shop-car {
  margin-top: 172rpx;
  width: 340rpx;
  height: 362rpx;
}
.no-shop-title {
  margin-top: 114rpx;
}
.car-content-style {
  margin: auto;
  width: 710rpx;
  border-radius: 20rpx 20rpx 0 0;
  background-color: #fff;
}
.car-style-title {
  width: 100%;
  height: 110rpx;
  border-bottom: 1rpx solid #e3e3e3;
}
.car-title-icon {
  margin-left: 28rpx;
  width: 37rpx;
  height: 39rpx;
}
.shop-car-row {
  width: 100%;
  height: 260rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.count-box {
  margin-left: 54rpx;
  width: 166rpx;
  height: 50rpx;
  border-radius: 10rpx;
  border: 1rpx solid #cccccc;
}
.count-row {
  width: 55rpx;
  height: 50rpx;
}
.count-row2 {
  width: 55rpx;
  height: 50rpx;
  border-left: 1rpx solid #cccccc;
  border-right: 1rpx solid #cccccc;
}
.row-right-content {
  margin-left: 26rpx;
  display: flex;
  flex-direction: column;
}
.check-img {
  width: 30rpx;
  height: 30rpx;
}
.row-shop-img {
  margin-left: 14rpx;
  width: 186rpx;
  height: 186rpx;
  border-radius: 10rpx;
}
.text-width-row {
  width: 320rpx;
}
.car-bottom-content {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999;
  width: 100%;
  height: 98rpx;
  background-color: #fff;
}
.jiesuan-btn {
  width: 220rpx;
  height: 98rpx;
  background-color: #f11b20;
}
</style>