<template>
  <div :class="[dataType?'shop-car-container':'shop-car-container2']">
    <div class="fl-fca bg-fff" v-if="!dataType">
      <text class="fc-7e fz-15 no-shop-title">购物袋空荡荡的~赶紧去装满~</text>
      <image class="no-shop-car" src="../../static/shop/guang.png" @tap="buyGoodsNext" />
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
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(item,index) in shopList"
          :key="index"
          :options="goodsOption"
          @click="swipeClick(item)"
        >
          <div class="shop-car-row fl-al">
            <image
              v-if="item.pick===1"
              class="check-img mr-l-30"
              src="../../static/shop/yse.png"
              @tap.native.stop="checkChoose(index,0)"
            />
            <image
              v-if="item.pick===0"
              class="check-img mr-l-30"
              src="../../static/shop/no.png"
              @tap.native.stop="checkChoose(index,1)"
            />
            <image
              mode="aspectFill"
              class="row-shop-img"
              :src="httpImg+item.good.gimg"
              @tap="navPathToGoods(item.gid)"
            />
            <div class="row-right-content" @tap.native.stop="navPathToGoods(item.gid)">
              <div class="fz-15 text-width-row">{{item.good.gname}}</div>
              <text class="fz-14 fc-999 mr-t-20">已选 {{item.good.gspec}}</text>
              <div class="fl-al mr-t-20">
                <text class="fz-17 fw-bold fc-f1">¥{{item.good.bprice}}</text>
                <text class="fz-14 fc-999 td-text mr-l-10">¥{{item.good.price4}}</text>
                <div class="count-box fl-bt">
                  <div
                    class="count-row fl-cen fz-14 fc-999"
                    @tap.native.stop="declineHandle(index)"
                  >-</div>
                  <div class="count-row2 fl-cen fz-14 fc-999">{{item.cartQty}}</div>
                  <div
                    class="count-row fl-cen fz-14 fc-999"
                    @tap.native.stop="inclineHandle(index)"
                  >+</div>
                </div>
              </div>
            </div>
          </div>
        </uni-swipe-action-item>
      </uni-swipe-action>
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
          <div v-if="allTotal" class="jiesuan-btn fl-cen" @tap="navPathTo">
            <text class="fz-14 fc-fff">结算</text>
          </div>
          <div v-else class="jiesuan-btn2 fl-cen">
            <text class="fz-14 fc-fff">结算</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from "../../utils/index";
import { httpImg } from "../../config/develop";
export default {
  data() {
    return {
      dataType: true,
      shopList: [],
      allCheckType: false,
      allTotal: 0,
      httpImg: httpImg,
      checkList: [], // 选中的列表
      goodsOption: [
        {
          text: "删除",
          style: {
            backgroundColor: "#F11B20",
          },
        },
      ],
    };
  },
  computed: {
    windowHeight() {
      return getApp().globalData.windowHeight;
    },
  },
  async onShow() {
    await this.getTableList();
    this.getAllCheckType();
    this.allPrice();
  },
  methods: {
    buyGoodsNext() {
      uni.switchTab({
        url: "/pages/page/class",
      });
    },
    // 删除
    async swipeClick(row) {
      await this.$api.deleteCarGoods({
        id: row.id,
      });
      this.getTableList();
    },
    // 获取购物车列表
    async getTableList() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getShopCarList();
      this.shopList = data;
      this.shopList.length ? (this.dataType = true) : (this.dataType = false);
      uni.hideLoading();
    },
    // 旋转切换
    checkChoose(i, t) {
      this.shopList[i].pick = t;
      this.$api.shopCheckType({
        id: this.shopList[i].id,
        pick: t,
      });
      this.getAllCheckType();
      this.allPrice();
    },
    // 递增
    inclineHandle(i) {
      this.shopList[i].cartQty += 1;
      this.$api.shopCheckType({
        id: this.shopList[i].id,
        cartQty: this.shopList[i].cartQty,
      });
      this.allPrice();
    },
    // 递减
    declineHandle(i) {
      if (this.shopList[i].cartQty === 1) return;
      this.shopList[i].cartQty -= 1;
      this.$api.shopCheckType({
        id: this.shopList[i].id,
        cartQty: this.shopList[i].cartQty,
      });
      this.allPrice();
    },
    // 获取全选状态
    getAllCheckType() {
      let arrCheck = [];
      this.allTotal = 0;
      this.shopList.forEach((item) => {
        // 按钮type 判断
        arrCheck.push(item.pick);
      });
      let t = arrCheck.indexOf(0);
      if (t === -1) {
        this.allCheckType = true;
      } else {
        this.allCheckType = false;
      }
    },
    // 计算总价格
    allPrice() {
      this.allTotal = 0;
      this.checkList = [];
      this.shopList.forEach((item) => {
        // 计算总价格
        if (item.pick === 1) {
          this.allTotal += item.good.bprice * item.cartQty;
          this.checkList.push(item);
        }
      });
    },
    // 全选
    allCheckTypeHandle(type) {
      this.allCheckType = !type;
      this.shopList.forEach((item) => {
        if (!type) {
          item.pick = 1;
          this.$api.shopCheckType({
            id: item.id,
            pick: 1,
          });
        } else {
          item.pick = 0;
          this.$api.shopCheckType({
            id: item.id,
            pick: 0,
          });
        }
      });
      this.allPrice();
    },
    // 跳转结算页面
    navPathTo() {
      const objDetail = {
        data: this.checkList,
        type: "car",
      };
      uni.navigateTo({
        url: `/subPackages/shop/orderComfim?obj=${JSON.stringify(objDetail)}`,
      });
    },
    navPathToGoods(gId) {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${gId}`,
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
.shop-car-container {
  padding-bottom: 108rpx;
}
.shop-car-container2 {
  height: 100%;
  background-color: #fff;
}
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
.jiesuan-btn2 {
  width: 220rpx;
  height: 98rpx;
  background-color: #999;
}
</style>