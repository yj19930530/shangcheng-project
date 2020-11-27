<template>
  <div class="comfirm-container">
    <div style="height: 32rpx"></div>
    <!-- 头部地址 -->
    <div class="fl-fc address-edit-box">
      <div class="fl-bt address-top-box" @tap="chooseAddress">
        <image class="address-icon" src="../../static/shop/dizhi.png" />
        <div class="fl-fc" v-if="addressListData.length">
          <div class="fz-15 fw-bold address-title text-lang-dian">
            {{ addressListData[0].provinceName }}{{ addressListData[0].cityName
            }}{{ addressListData[0].countyName
            }}{{ addressListData[0].detailInfo }}
          </div>
          <div class="fl-al mr-t-10">
            <text class="fz-15">{{ addressListData[0].userName }}</text>
            <text class="fz-15 mr-l-50">{{
              addressListData[0].telNumber
            }}</text>
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
        v-for="(item, index) in shopList"
        :key="index"
        @tap="navToDetail(item.good.gid)"
      >
        <image class="row-left-img mr-l-40" :src="httpImg + item.good.gimg" />
        <div class="row-right-box">
          <text class="fz-15">{{ item.good.gtitle }}</text>
          <div class="fl-bt mr-t-20">
            <text class="fz-14 fc-999">已选 {{ item.good.gspec }}</text>
            <text class="fz-14 fc-999">x{{ item.cartQty }}</text>
          </div>
          <div class="mr-t-20">
            <text class="fz-17 fc-f1 fw-bold">¥{{ item.good.bprice }}</text>
            <text v-if="item.good.price4" class="fz-14 fc-999 td-text mr-l-10"
              >¥{{ item.good.price4 }}</text
            >
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail-box">
      <div class="order-detail-row fl-bt">
        <text class="fz-15 fc-666 mr-l-40">商品数</text>
        <text class="fz-15 fw-bold mr-r-40">{{ totalNumber }}</text>
      </div>
      <div class="order-detail-row fl-bt">
        <text class="fz-15 fc-666 mr-l-40">商品金额</text>
        <text class="fz-15 fw-bold mr-r-40 fc-f1">¥{{ totalPrice }}</text>
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
    <div class="buy-know">
      <div class="buy-know-content">
        <div><span class="fz-15 fc-666">购买须知：</span></div>
        <div class="mr-t-30">
          <span class="fz-11 fc-666"
            >1.【服务提示】平台仅向您提供基本的信息存储空间以及相关的技术服务平台服务，您了解平台上的信息系平台第三方入驻用户
          </span>
        </div>
        <div class="mr-t-50">
          <span class="fz-11 fc-666"
            >2.【付费阅读服务不适用于七天无理由退货】请您知悉，平台上提供的付费阅读为在线阅读商品，根据《消费者权益保护法》等规定，不适用七天无理由退货规定（包年付费且与提供者达成退款意向的除外），请您于购买时谨慎考虑。</span
          >
        </div>
        <div class="mr-t-30">
          <span class="fz-12 fc-666">提交订单并表示同意</span>
          <span class="fz-12 fc-77 mr-l-20" @tap="buyGoodsKnow">购买须知</span>
        </div>
      </div>
    </div>
    <!-- 提交 -->
    <div
      class="fl-bt bottom-btn-box"
      :class="[iPhoneType === -1 ? '' : 'dianzi-style']"
    >
      <div class="fl-al mr-l-30">
        <text class="fz-15">合计</text>
        <text class="fz-17 fc-f1 fw-bold mr-l-10">¥{{ totalPrice }}</text>
      </div>
      <div class="fl-cen right-btn-submit" @tap="submtPay">
        <text class="fc-fff fz-14">提交订单</text>
      </div>
    </div>
  </div>
</template>
<script>
const { httpImg } = require("../../config/develop");
const { toast, common } = require("../../utils/index");
export default {
  data() {
    return {
      detal: "",
      httpImg: httpImg, // 图片路径
      shopList: [], // 商品列表
      totalPrice: 0, // 总价
      totalNumber: 0, // 总数
      addressListData: [], // 收货地址
      cpCode: "",
      iPhoneType: -1,
    };
  },
  async onLoad(data) {
    let t = common.iPhoneReturn(this.phoneModel);
    this.iPhoneType = t ? -1 : 0;
    this.userno = uni.getStorageSync("userno");
    if (!this.userno) {
      uni.reLaunch({
        url: `/pages/page/login?shopId=${data.shopId}&url=subPackages/shop/orderComfim`,
      });
      return;
    }
    if (data.shopId) {
      const getObj = await this.$api.findShareCartList({
        shareNo: data.shopId,
      });
      this.shopList = getObj.data;
    } else {
      let objData = JSON.parse(data.obj);
      if (objData.type === "car") {
        this.shopList = objData.data;
      } else {
        const buyData = objData.data;
        this.shopList = [
          {
            cartQty: objData.count,
            good: buyData,
            spec: buyData.gspec,
            gid: buyData.gid,
          },
        ];
      }
    }
    this.priceCompute();
    // let smallCartIds = [];
    // this.shopList.forEach((item) => {
    //   smallCartIds.push(item.id);
    // });
    // if (this.userno) {
    //   this.$api
    //     .shareCartHandle({
    //       userno: this.userno,
    //       smallCartIds: smallCartIds,
    //     })
    //     .then((res) => {
    //       if (res.state === 200) {
    //         this.cpCode = res.data;
    //       }
    //     });
    // }
  },
  // onShareAppMessage() {
  //   return {
  //     path: `subPackages/shop/orderComfim?shopId=${this.cpCode}`,
  //   };
  // },
  onShow() {
    this.addressList();
  },
  computed: {
    phoneModel() {
      return getApp().globalData.model;
    },
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
        this.totalPrice += item.good.bprice * item.cartQty;
        this.totalNumber += item.cartQty;
      });
    },
    // 选择收货地址
    chooseAddress() {
      uni.navigateTo({
        url: "/subPackages/me/goodsArdressList",
      });
    },
    navToDetail(id) {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${id}`,
      });
    },
    // 跳转购买须知
    buyGoodsKnow() {
      uni.navigateTo({
        url: "/subPackages/me/userBuyKnow",
      });
    },
    // 跳转付款页面
    submtPay() {
      if (!this.addressListData.length)
        return toast.showToast("请添加收货地址");
      let goodsArr = [];
      this.shopList.forEach((item) => {
        if (item.uid) {
          this.recommendId = item.uid;
        } else {
          this.recommendId = "";
        }
        goodsArr.push({
          gId: item.gid,
          cId: item.id ? item.id : "",
          gQty: item.cartQty,
          gSpec: item.spec,
        });
      });
      if (this.recommendId !== "") {
        goodsArr.forEach((item) => {
          delete item.cId;
        });
      }
      toast.showLoading("提交中");
      this.$api
        .addOrder({
          channel: 2,
          postage: 0,
          sumPrice: this.totalPrice,
          remark: this.detal,
          payPrice: this.totalPrice,
          listOrderGoodInfo: JSON.stringify(goodsArr),
          addressId: this.addressListData[0].id,
          recommendId: this.recommendId,
        })
        .then((res) => {
          uni.hideLoading();
          uni.navigateTo({
            url: `/subPackages/shop/payment?soId=${res.data.code}&state=1`,
          });
        })
        .catch(() => {
          uni.hideLoading();
        });
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
  padding-bottom: 118rpx;
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
  border-bottom: 1px solid #e3e3e3;
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
  border-bottom: 1px solid #f8f8f8;
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
  background-color: #a4423f;
}
.input-width-style {
  width: 80%;
}
.dianzi-style {
  padding-bottom: 48rpx;
}
.buy-know {
  margin: auto;
  width: 710rpx;
  background-color: #fff;
  border-radius: 10rpx;
}
.buy-know-content {
  padding: 20rpx 30rpx;
}
</style>