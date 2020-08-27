<template>
  <div class="add-address-container">
    <div class="address-input-row fl-bt">
      <text class="fz-15 mr-l-30">收货人</text>
      <input
        maxlength="12"
        type="text"
        class="fz-15 input-width-style mr-r-30"
        placeholder="请填写收货人姓名"
      />
    </div>
    <div class="address-input-row fl-bt">
      <text class="fz-15 mr-l-30">手机号码</text>
      <input
        maxlength="11"
        type="text"
        class="fz-15 input-width-style mr-r-30"
        placeholder="请填写收货人手机号码"
      />
    </div>
    <picker @change="bindPickerChange" :value="addressVal" mode="region">
      <div class="address-input-row fl-bt">
        <text class="fz-15 mr-l-30">所在地区</text>
        <div class="input-width-style mr-r-30 fl-bt">
          <view
            class="uni-input fz-15"
            :class="[addressVal==='省市区县、乡等'?'fc-999':'fc-333']"
          >{{addressVal}}</view>
          <image class="dizhi-icon" src="../../static/me/dizhi.png" />
        </div>
      </div>
    </picker>
    <div class="address-detail-box">
      <text class="fz-15 mr-l-30 mr-t-30">详细地址</text>
      <textarea
        maxlength="300"
        class="input-width-style2 fz-15 mr-t-30 mr-r-30"
        v-model="textareaVal"
        placeholder="请填写详细地址"
      />
    </div>
    <div class="address-input-row fl-al mr-t-20" @tap="checkHandle">
      <image class="check-icon" v-if="isDefault" src="../../static/shop/yse.png" />
      <image class="check-icon" v-else src="../../static/shop/no.png" />
      <text class="fz-15">设置为默认地址</text>
    </div>
    <div class="add-address-btn fl-cen" @tap="saveAndUse">
      <text class="fz-20 fc-fff fw-bold">保存并使用</text>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addressVal: "省市区县、乡等",
      textareaVal: "",
      isDefault: false,
    };
  },
  methods: {
    bindPickerChange(val) {
      this.addressVal = val.detail.value.join(",");
    },
    checkHandle() {
      this.isDefault = !this.isDefault;
    },
    saveAndUse() {
      console.log("使用地址");
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
.add-address-container {
  padding-top: 20rpx;
}
.address-input-row {
  width: 100%;
  height: 108rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f8f8f8;
}
.input-width-style {
  width: 540rpx;
}
.input-width-style2 {
  width: 540rpx;
  height: 156rpx;
  margin-bottom: 10rpx;
}
.dizhi-icon {
  width: 38rpx;
  height: 38rpx;
}
.address-detail-box {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.check-icon {
  margin: 0 37rpx;
  width: 30rpx;
  height: 30rpx;
}
.add-address-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 108rpx;
  z-index: 999;
  background: linear-gradient(to right, #333333, #666666);
}
</style>