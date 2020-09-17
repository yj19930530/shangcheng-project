<template>
  <div class="refund-container">
    <div class="zhan-box"></div>
    <div class="refund-goods-row fl-cen" v-for="(item,index) in orderData.items" :key="index">
      <image class="refund-left-img" :src="httpImg+item.pic" />
      <div class="refund-right-box mr-l-60">
        <text class="fz-15">{{item.name}}</text>
        <div class="fl-bt mr-t-10">
          <text class="fz-14 fc-999">已选{{item.propertiesValue}}</text>
          <text class="fz-14 fc-999">x{{item.qty}}</text>
        </div>
        <text class="mr-t-10 fz-17">总价：¥{{item.basePrice}}</text>
      </div>
    </div>
    <picker @change="bindPickerChange" :value="index" :range="reasonList">
      <div class="refund-item-box fl-bt">
        <text class="fz-15 mr-l-30">退款原因</text>
        <div class="uni-input fl-al mr-r-20">
          <text class="fz-15 fc-999">{{reasonList[index]}}</text>
          <text class="iconfont iconyoujiantou fz-15 fc-999"></text>
        </div>
      </div>
    </picker>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款金额：</text>
      <text class="fz-17 fc-f1">¥{{totalPrice}}</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款说明：</text>
      <input v-model="orderRefund.remark" class="refund-input-style fz-15" placeholder="选填" />
    </div>
    <div class="upload-pingzheng mr-t-30">
      <text class="fz-15 mr-l-30">上传凭证</text>
      <div class="mr-l-40 mr-t-40 img-list-content">
        <div class="ping-img-box" v-for="(item,index) in imgList" :key="index">
          <image class="ping-img-item" mode="aspectFill" :src="item.imgPath" />
          <image
            class="delete-img-style"
            src="../../static/shop/delete.png"
            @tap="deleteImg(index)"
          />
        </div>
        <div class="fl-co img-choose-box" @tap="uploadPing" v-if="imgList.length<6">
          <image class="xiangji-icon" src="../../static/me/xiangji.png" />
          <text class="fz-12 fc-999">上传凭证</text>
        </div>
      </div>
    </div>
    <div class="submit-btn-box fl-cen" @tap="submitBtnHandle">
      <text class="fz-20 fc-fff fw-bold">提交</text>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
const { httpImg } = require("../../config/develop");
export default {
  data() {
    return {
      index: "",
      reasonList: ["商品无货", "不想要了", "地址信息填写错误"],
      oid: "",
      totalPrice: 0,
      orderData: {},
      httpImg: httpImg,
      orderRefund: {
        orderNo: "",
        applyUserNo: "",
        returnReason: "", //退款原因
        remark: "", // 退款说明
        returnAmount: "", // 申请退款金额
        imgUrls: "",
      },
      imgList: [],
    };
  },
  onLoad(obj) {
    this.oid = obj.id;
    const userno = common.getData("userno");
    this.orderRefund.applyUserNo = userno;
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getOrderInfo({
        id: this.oid,
      });
      data.items.forEach((item) => {
        this.totalPrice += item.qty * item.basePrice;
      });
      this.orderData = data;
      this.orderRefund.orderNo = data.soId;
      this.orderRefund.returnAmount = this.totalPrice;
      uni.hideLoading();
    },
    // 删除
    deleteImg(i) {
      this.imgList.splice(i, 1);
    },
    bindPickerChange(e) {
      this.index = e.target.value;
      this.orderRefund.returnReason = this.reasonList[this.index];
    },
    submitBtnHandle() {
      if (this.orderRefund.returnReason === "")
        return toast.showToast("请选择退款原因");
      toast.showLoading("提交中");
      let imgArr = [];
      this.imgList.forEach((item) => {
        imgArr.push(item.imgObj);
      });
      this.orderRefund.imgUrls = imgArr.join(",");
      if (this.orderRefund.imgUrls === "") return toast.showToast("请上传凭证");
      this.$api
        .payWechatRefund(this.orderRefund)
        .then((res) => {
          uni.navigateBack();
          uni.hideLoading();
        })
        .catch(() => {
          uni.hideLoading();
        });
    },
    // 上传凭证
    async uploadPing() {
      const imgObj = await common.updataImg(6, "商品详情初始化");
      this.imgList = this.imgList.concat(imgObj);
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
.zhan-box {
  height: 20rpx;
  background-color: #f8f8f8;
}
.refund-container {
  padding-top: 20rpx;
  padding-bottom: 70rpx;
  background-color: #fff;
}
.refund-left-img {
  width: 186rpx;
  height: 186rpx;
  border-radius: 20rpx;
}
.refund-goods-row {
  width: 100%;
  height: 234rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.refund-right-box {
  width: 380rpx;
  display: flex;
  flex-direction: column;
}
.refund-item-box {
  width: 100%;
  height: 108rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.refund-input-style {
  width: 70%;
}
.xiangji-icon {
  width: 80rpx;
  height: 58rpx;
  margin-bottom: 16rpx;
}
.img-choose-box {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  width: 160rpx;
  height: 160rpx;
  border: 1rpx dashed #cccccc;
}
.upload-pingzheng {
  padding-bottom: 18rpx;
}
.ping-img-box {
  position: relative;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}
.ping-img-item {
  width: 160rpx;
  height: 160rpx;
}
.delete-img-style {
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  right: 0;
  top: 0;
}
.img-list-content {
  display: flex;
  flex-wrap: wrap;
}
.submit-btn-box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 108rpx;
  background: linear-gradient(to right, #333333, #666666);
}
</style>