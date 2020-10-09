<template>
  <div class="shop-goods-contianer">
    <!-- 头部商品展示图 -->
    <div class="goods-top-box">
      <swiper
        class="swiper swiper-goods-box"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :duration="duration"
      >
        <swiper-item v-for="(item,index) in swiperImg" :key="index">
          <image class="swiper-row-img" @tap="prewImgFunc(index,swiperImg)" :src="item" />
        </swiper-item>
      </swiper>
    </div>
    <!-- 商品标题 -->
    <div class="goods-title-box">
      <div class="fl-bt">
        <div class="fl-al">
          <text class="fz-15 fc-f1">¥</text>
          <text class="fz-20 fc-f1 fw-bold">{{detailObj.bprice}}</text>
          <text v-if="detailObj.price4" class="fz-15 fc-999 td-text mr-l-20">¥{{detailObj.price4}}</text>
        </div>
        <div class="share-box">
          <text class="iconfont iconfenxiang fz-18 fc-333"></text>
          <button class="contact-btn2" open-type="share">a</button>
        </div>
      </div>
      <div class="goods-title-text mr-t-20">
        <text class="fz-16 fw-bold">{{detailObj.gtitle}}</text>
      </div>
    </div>
    <!-- 买家秀 -->
    <div class="buy-box mr-t-20" v-if="showList.length">
      <div class="buy-title-top fl-bt">
        <text class="fz-15 fw-bold">精选买家秀</text>
        <div class="fl-al" @tap="navPathTo('show')">
          <text class="fz-12 fc-999 mr-r-10">查看全部</text>
          <text class="iconfont iconyoujiantou fz-12 fc-999"></text>
        </div>
      </div>
      <Buy v-for="(item,index) in showList" :key="index" :showObj="item" />
    </div>
    <!-- 相关文章 -->
    <!-- <div class="about-arc-content" v-if="atcList.length">
      <div class="about-arc-box">
        <div class="about-arc-title fl-bt">
          <text class="fz-15 fw-bold">相关文章</text>
          <div class="fl-al" @tap="navPathTo('atc')">
            <text class="fz-12 fc-999 mr-r-10">查看全部</text>
            <text class="iconfont iconyoujiantou fz-12 fc-999"></text>
          </div>
        </div>
        <div class="fl-btw" style="padding-bottom:10rpx">
          <Atc v-for="(item,index) in atcList" :key="index" :objDetail="item" />
        </div>
      </div>
    </div>-->
    <!-- 商品详情 -->
    <div class="goods-detail-imgs" v-if="goodsImgs.length">
      <div class="detail-imgs-center">
        <div class="imgs-title-box fl-al">
          <text class="fz-15 fw-bold">商品详情</text>
        </div>
        <image
          class="goods-details-img-show"
          mode="widthFix"
          v-for="(item,index) in goodsImgs"
          :key="index"
          :src="item"
          @tap="prewImgFunc(index,goodsImgs)"
        />
      </div>
    </div>
    <!-- 底部操作栏 -->
    <div class="bottom-click-box fl-bt">
      <div class="fl-co mr-l-20" @tap="navPathTo('home')">
        <image class="home-icon" src="../../static/tabar/home2.png" />
        <text class="mr-t-4 fz-11">首页</text>
      </div>
      <div class="fl-co" @tap="navPathTo('car')">
        <image class="car-icon" src="../../static/tabar/shop2.png" />
        <text class="mr-t-4 fz-11">购物袋</text>
      </div>
      <view open-type="contact" class="fl-co" style="position: relative;">
        <image class="ck-icon" src="../../static/me/kefu.png" />
        <text class="mr-t-4 fz-11">客服</text>
        <button class="contact-btn" open-type="contact">a</button>
      </view>
      <div class="fl-al">
        <div class="add-car-style fl-cen" @tap="navPathTo('dai')">
          <text class="fc-fff fz-14">加入购物袋</text>
        </div>
        <div class="buy-style fl-cen" @tap="navPathTo('buy')">
          <text class="fc-fff fz-14">立即购买</text>
        </div>
      </div>
    </div>
    <div class="zhezhao-bg" v-if="buyType" @tap="closeType"></div>
    <div class="by-box-handle" v-if="buyType" :style="[{bottom:buyType?'0':'-864rpx'}]">
      <div class="by-top-goods-style fl-al">
        <image class="mr-l-20 by-top-goods-img" :src="httpImg+detailObj.gimg" />
        <div class="by-top-goods-title">
          <text class="fz-15">{{detailObj.gtitle}}</text>
          <text class="fz-20 fw-bold fc-f1 mr-t-10">¥{{detailObj.bprice}}</text>
        </div>
        <image class="close-by-box" @tap="closeType" src="../../static/shop/close.png" />
      </div>
      <div class="mr-t-30 box-botoom-border">
        <text class="fz-15 mr-l-20">颜色规格</text>
        <div class="mr-t-20 grid-list-box">
          <div
            class="grid-list-style fl-cen"
            :class="[goodsCheckType?'box-bg-f1':'box-bg-border']"
            @tap="checkTypeFunc"
          >
            <text class="fz-14" :class="[goodsCheckType?'fc-fff':'']">{{detailObj.gspec}}</text>
          </div>
        </div>
      </div>
      <div class="fl-bt mr-t-20">
        <text class="fz-15 mr-l-20">购买数量</text>
        <div class="count-box fl-bt mr-r-20">
          <div class="count-row fl-cen fz-14 fc-999" @tap.native.stop="declineHandle()">-</div>
          <div class="count-row2 fl-cen fz-14 fc-999">{{goodsCount}}</div>
          <div class="count-row fl-cen fz-14 fc-999" @tap.native.stop="inclineHandle()">+</div>
        </div>
      </div>
      <div class="fl-cen box-bg-f1 buy-comfirm-btn" @tap="buyHandleClick">
        <text class="fz-20 fc-fff fw-bold">{{btnName}}</text>
      </div>
    </div>
  </div>
</template>
<script>
import { httpDetailImg, httpImg } from "../../config/develop";
import { toast } from "../../utils/index";
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: false,
      duration: 500,
      buyType: false,
      goodsId: "",
      httpImg: httpImg, // 图片路径
      httpDetailImg: httpDetailImg, // 图片路径
      detailObj: {}, // 商品详情
      swiperImg: [], // 轮播图列表
      goodsImgs: [], // 商品详情图列表
      goodsCount: 1, // 商品数量
      btnName: "立即购买",
      goodsCheckType: false,
      atcList: [], // 文章列表
      showList: [], // 买家秀列表
      userno: "",
    };
  },
  onShareAppMessage(res) {
    return {
      title: this.detailObj.gtitle,
      path: `/subPackages/home/shopDetail?gId=${this.detailObj.gid}`,
    };
  },
  onLoad(data) {
    this.userno = uni.getStorageSync("userno");
    this.goodsId = data.gId;
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      const { data } = await this.$api.getGoodsDetail({
        gId: this.goodsId,
      });
      // this.aboutAtc(data.gbrand);
      this.detailObj = data;
      this.getCommentPage(this.detailObj);
      this.swiperImg = data.gimg.split(",");
      this.swiperImg = this.swiperImg.map((item) => {
        return this.httpImg + item;
      });
      if (data.detailimg) {
        this.goodsImgs = data.detailimg.split(",");
        this.goodsImgs = this.goodsImgs.map((item) => {
          return this.httpDetailImg + item;
        });
      }
    },
    // 获取买家秀
    async getCommentPage(row) {
      const { data } = await this.$api.findGoodCommentPage({
        pageNo: 1,
        pageSize: 3,
        oiId: row.gid,
      });
      this.showList = data.list;
    },
    // 获取相关文章
    // async aboutAtc(text) {
    //   const { data } = await this.$api.getAboutAtc({
    //     pageNo: 1,
    //     pageSize: 2,
    //     brand: text,
    //   });
    //   this.atcList = data.list;
    // },
    closeType() {
      this.buyType = false;
      this.goodsCheckType = false;
      this.goodsCount = 1;
    },
    checkTypeFunc() {
      this.goodsCheckType = !this.goodsCheckType;
    },
    // 查看大图
    prewImgFunc(index, list) {
      uni.previewImage({
        current: index,
        urls: list,
        longPressActions: {},
      });
    },
    navPathTo(name) {
      switch (name) {
        case "show": {
          uni.navigateTo({
            url: `/subPackages/me/buyShow?id=${this.detailObj.gid}`,
          });
          break;
        }
        case "atc": {
          uni.navigateTo({
            url: `/subPackages/me/atcList?brand=${this.detailObj.gbrand}`,
          });
          break;
        }
        case "car": {
          uni.switchTab({
            url: "/pages/page/shop",
          });
          break;
        }
        case "home": {
          uni.switchTab({
            url: "/pages/page/home",
          });
          break;
        }
        case "dai": {
          if (!this.userno) {
            uni.reLaunch({
              url: "/pages/page/login",
            });
            return;
          }
          this.btnName = "加入购物车";
          this.buyType = true;
          break;
        }
        case "buy": {
          if (!this.userno) {
            uni.reLaunch({
              url: "/pages/page/login",
            });
            return;
          }
          this.btnName = "立即购买";
          this.buyType = true;
          break;
        }
        default: {
          break;
        }
      }
    },
    // 购买 或者 加入购物车 按钮
    async buyHandleClick() {
      if (!this.goodsCheckType) return toast.showToast("请选择规格");
      if (this.btnName === "立即购买") {
        const objDetail = {
          count: this.goodsCount,
          data: this.detailObj,
          type: "buy",
        };
        uni.navigateTo({
          url: `/subPackages/shop/orderComfim?obj=${JSON.stringify(objDetail)}`,
        });
      } else {
        toast.showLoading("添加中");
        await this.$api.addShopCar({
          gid: this.detailObj.gid,
          spec: this.detailObj.gspec,
          cartQty: this.goodsCount,
        });
        toast.showToast("添加成功");
        uni.hideLoading();
        this.closeType();
      }
    },
    declineHandle() {
      if (this.goodsCount === 1) return;
      this.goodsCount--;
    },
    inclineHandle() {
      this.goodsCount++;
    },
  },
};
</script>
<style>
page {
  background-color: #f4f4f4;
}
</style>
<style scoped>
.shop-goods-contianer {
  padding-bottom: 98rpx;
}
.goods-top-box {
  width: 100%;
  height: 762rpx;
}
.swiper-goods-box {
  width: 100%;
  height: 100%;
}
.swiper-row-img {
  width: 100%;
  height: 100%;
}
.goods-title-box {
  background-color: #fff;
  padding: 40rpx 20rpx 24rpx;
}
.goods-title-text {
  width: 688rpx;
}
.buy-box {
  padding: 36rpx 20rpx 30rpx;
  background-color: #fff;
}
.about-arc-content {
  width: 100%;
  background-color: #fff;
}
.about-arc-box {
  margin: 20rpx auto;
  width: 710rpx;
}
.about-arc-title {
  width: 100%;
  height: 102rpx;
}
.goods-detail-imgs {
  width: 100%;
  background-color: #fff;
}
.detail-imgs-center {
  margin: auto;
  width: 710rpx;
}
.imgs-title-box {
  width: 100%;
  height: 100rpx;
}
.goods-details-img-show {
  width: 100%;
  margin-bottom: 2rpx;
}
.home-icon {
  width: 39rpx;
  height: 39rpx;
}
.car-icon {
  width: 40rpx;
  height: 39rpx;
}
.ck-icon {
  width: 39rpx;
  height: 39rpx;
}

.bottom-click-box {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  width: 100%;
  height: 98rpx;
}
.add-car-style {
  width: 220rpx;
  height: 98rpx;
  background-color: #7e6b5a;
}
.buy-style {
  width: 220rpx;
  height: 98rpx;
  background-color: #f11b20;
}
.ke-btn-style {
  background-color: #fff;
  border: none;
}
.contact-btn {
  display: inline-block;
  position: absolute;
  width: 100%;
  background: salmon;
  opacity: 0;
}
.contact-btn2 {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: salmon;
  opacity: 0;
}
.share-box {
  position: relative;
}
.zhezhao-bg {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0.6;
  z-index: 9999;
}
.by-box-handle {
  position: fixed;
  left: 0;
  bottom: -500rpx;
  width: 100%;
  height: 700rpx;
  background-color: #fff;
  z-index: 99999;
  transition: all 0.5s;
}
.by-top-goods-style {
  position: relative;
  width: 100%;
  height: 264rpx;
  border-bottom: 1px solid #999999;
}
.by-top-goods-title {
  display: flex;
  flex-direction: column;
  margin-left: 48rpx;
  width: 290rpx;
}
.by-top-goods-img {
  width: 240rpx;
  height: 240rpx;
}
.close-by-box {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  width: 40rpx;
  height: 40rpx;
}
.grid-list-box {
  display: flex;
  flex-wrap: wrap;
}
.grid-list-style {
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  padding: 10rpx 20rpx;
  border: 1px solid #ffffff;
}
.box-bg-f1 {
  background-color: #f11b20;
}
.box-bg-border {
  border: 1px solid #979797 !important;
}
.box-botoom-border {
  border-bottom: 1px solid #999999;
}
.count-box {
  margin-left: 54rpx;
  width: 166rpx;
  height: 50rpx;
  border-radius: 10rpx;
  border: 1px solid #cccccc;
}
.count-row {
  width: 55rpx;
  height: 50rpx;
}
.count-row2 {
  width: 55rpx;
  height: 50rpx;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
}
.buy-comfirm-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 106rpx;
}
</style>