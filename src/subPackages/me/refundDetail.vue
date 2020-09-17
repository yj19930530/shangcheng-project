<template>
  <div class="refund-container">
    <div class="zhan-box"></div>
    <div class="refund-top-timer fl-al">
      <text class="fz-12 fc-fff mr-l-30" v-if="returnData.authState===0">等待商家处理</text>
      <text class="fz-12 fc-fff mr-l-30" v-if="returnData.authState===1">退款成功</text>
      <text class="fz-12 fc-fff mr-l-30" v-if="returnData.authState===-1">退款关闭</text>
      <!-- <text class="fz-12 fc-fff mr-t-20 mr-l-30">还剩1天23小时57分</text> -->
    </div>
    <div class="refund-text-box fl-al" v-if="returnData.authState!==1">
      <text class="mr-l-20 fz-14" v-if="returnData.authState===0">您已成功发起退款申请，请耐心等待商家处理</text>
      <text class="mr-l-20 fz-14" v-if="returnData.authState===-1">您已成功发起退款申请由于不符合要求已被驳回</text>
    </div>
    <div class="refund-goods-row fl-cen" v-for="(item,index) in returnData.orderGoods" :key="index">
      <image class="refund-left-img" :src="httpImg+item.pic" />
      <div class="refund-right-box mr-l-60">
        <text class="fz-15">{{item.name}}</text>
        <div class="fl-bt mr-t-10">
          <text class="fz-14 fc-999">已选{{item.skuType}}</text>
          <text class="fz-14 fc-999">x1</text>
        </div>
        <text class="mr-t-10 fz-17">总价：￥{{item.amount}}</text>
      </div>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">{{returnData.returnReason}}：</text>
      <text class="fz-17">不想要了</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款金额：</text>
      <text class="fz-17">￥{{returnData.returnAmount}}</text>
    </div>
    <div class="refund-item-box fl-al">
      <text class="fz-15 mr-l-30">退款说明：</text>
      <text class="fz-15">{{returnData.remark}}</text>
    </div>
    <div class="upload-pingzheng mr-t-30">
      <text class="fz-15 mr-l-30">上传凭证</text>
      <div class="mr-l-40 mr-t-40 img-list-content">
        <div class="ping-img-box">
          <image
            mode="aspectFill"
            v-for="(img,inx) in returnData.returnImg"
            :key="inx"
            class="ping-img-item mr-r-20"
            :src="httpDetailImg+img"
          />
        </div>
      </div>
    </div>
    <div class="submit-btn-box fl-cen" @tap="closeRetrun" v-if="returnData.authState===0">
      <text class="fz-20 fc-fff fw-bold">撤销申请</text>
    </div>
    <div class="submit-btn-box fl-cen" @tap="submitBtnHandle" v-if="returnData.authState===-1">
      <text class="fz-20 fc-fff fw-bold">重新申请</text>
    </div>
  </div>
</template>
<script>
const { toast } = require("../../utils/index");
const { httpImg, httpDetailImg } = require("../../config/develop");
export default {
  data() {
    return {
      index: 0,
      reasonList: [],
      orderId: "",
      orderData: {},
      frontReturnNo: "",
      returnData: {},
      httpImg: httpImg,
      httpDetailImg: httpDetailImg,
    };
  },
  onLoad(obj) {
    this.frontReturnNo = obj.id;
    this.getReturnData();
  },
  methods: {
    // 获取退款详情
    async getReturnData() {
      const { data } = await this.$api.findOneReturnApply({
        returnNo: this.frontReturnNo,
      });
      this.returnData = data;
      this.returnData.returnImg = data.returnImgUrls.split(",");
    },
    closeRetrun() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否要撤销订单",
        success: async function (res) {
          if (res.confirm) {
            toast.showLoading("撤销中");
            await _this.$api.cancelReturnApply({
              returnNo: _this.returnData.returnNo,
            });
            toast.showToast("撤销成功");
            uni.navigateBack();
          }
        },
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
.zhan-box {
  height: 20rpx;
  background-color: #f8f8f8;
}
.refund-container {
  padding-bottom: 108rpx;
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
.refund-top-timer {
  width: 100%;
  height: 90rpx;
  background: linear-gradient(to right, #333333, #666666);
}
.refund-text-box {
  width: 100%;
  height: 80rpx;
  background-color: #f8f8f8;
}
</style>