<template>
  <div class="wuliu-container">
    <div class="wuliu-top-detail fl-al">
      <image class="mr-l-50 wuliu-icon" src="../../static/shop/car.png" />
      <div class="mr-l-60">
        <div class="fl-al">
          <text class="fz-14 fc-999">承运公司：</text>
          <text class="fz-14 fc-333 mr-l-10">{{wlName}}</text>
        </div>
        <div class="fl-al mr-t-10">
          <text class="fz-14 fc-999">快递单号：</text>
          <text class="fz-14 fc-333 mr-l-10">{{wlId}}</text>
        </div>
      </div>
    </div>
    <div class="step-box-style">
      <div class="step-title fl-al">
        <text class="fz-14 mr-l-30">订单跟踪</text>
      </div>
      <uni-steps active-color="#F11B20" :options="liList" direction="column" :active="active"></uni-steps>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wlId: "",
      wlName: "",
      liList: [],
      active: 0,
    };
  },
  onLoad(obj) {
    this.wlId = obj.id;
    this.wlName = obj.name;
    this.getWlData();
  },
  methods: {
    // 获取物流详情
    async getWlData() {
      const { data } = await this.$api.getKuaidiInfo({
        lid: this.wlId,
        kdCompany: this.wlName,
      });
      data.Traces.forEach((item) => {
        this.liList.push({
          title: item.AcceptStation,
          desc: item.AcceptTime,
        });
      });
      this.active = this.liList.length-1;
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
.wuliu-container {
  padding-top: 20rpx;
}
.wuliu-top-detail {
  width: 100%;
  height: 194rpx;
  background-color: #fff;
}
.wuliu-icon {
  width: 88rpx;
  height: 88rpx;
}
.step-box-style {
  margin-top: 20rpx;
  background-color: #ffffff;
}
.step-title {
  width: 100%;
  height: 90rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
</style>