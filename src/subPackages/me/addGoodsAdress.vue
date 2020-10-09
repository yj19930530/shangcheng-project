<template>
  <div class="add-address-container">
    <div class="address-input-row fl-bt">
      <text class="fz-15 mr-l-30">收货人</text>
      <input
        name="userName"
        maxlength="12"
        v-model="form.userName"
        type="text"
        class="fz-15 input-width-style mr-r-30"
        placeholder="请填写收货人姓名"
      />
    </div>
    <div class="address-input-row fl-bt">
      <text class="fz-15 mr-l-30">手机号码</text>
      <input
        name="telNumber"
        v-model="form.telNumber"
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
        name="detailInfo"
        maxlength="300"
        class="input-width-style2 fz-15 mr-t-30 mr-r-30"
        v-model="form.detailInfo"
        placeholder="请填写详细地址"
      />
    </div>
    <div class="address-input-row fl-al mr-t-20" @tap="checkHandle">
      <image class="check-icon" v-if="form.isdefault===1" src="../../static/shop/yse.png" />
      <image class="check-icon" v-else src="../../static/shop/no.png" />
      <text class="fz-15">设置为默认地址</text>
    </div>
    <div class="add-address-btn fl-cen" @tap="editAndUse" v-if="editType">
      <text class="fz-20 fc-fff fw-bold">修改</text>
    </div>
    <div class="add-address-btn fl-cen" @tap="saveAndUse" v-else>
      <text class="fz-20 fc-fff fw-bold">保存并使用</text>
    </div>
  </div>
</template>
<script>
const graceChecker = require("../../utils/graceChecker");
const { toast, common } = require("../../utils/index");
export default {
  data() {
    return {
      addressVal: "省市区县、乡等",
      form: {
        userName: "", // 姓名
        telNumber: "", // 电话
        cityName: "", // 城市
        countyName: "", // 区
        detailInfo: "", // 地址
        isdefault: 0, // 是否默认
        provinceName: "", //省
      },
      rules: [
        {
          name: "userName",
          checkType: "notnull",
          errorMsg: "请输入姓名",
        },
        {
          name: "telNumber",
          checkType: "phoneno",
          errorMsg: "请输入正确的电话号码",
        },
        {
          name: "detailInfo",
          checkType: "notnull",
          errorMsg: "请填写详细地址",
        },
      ],
      editType: false,
    };
  },
  onLoad(data) {
    if (data.id) {
      this.editType = true;
      this.getAddressInfo(data.id);
    }
  },
  methods: {
    // 获取地址详情
    async getAddressInfo(id) {
      toast.showLoading("加载中");
      const { data } = await this.$api.getAddressList({
        id: id,
      });
      this.form = common.objAss(this.form, data[0]);
      this.addressVal = `${this.form.provinceName},${this.form.cityName},${this.form.countyName}`;
      uni.hideLoading();
    },
    // 选择地区
    bindPickerChange(val) {
      this.form.provinceName = val.detail.value[0];
      this.form.cityName = val.detail.value[1];
      this.form.countyName = val.detail.value[2];
      this.addressVal = val.detail.value.join(",");
    },
    // 切换默认
    checkHandle() {
      if (this.form.isdefault === 1) {
        this.form.isdefault = 0;
      } else {
        this.form.isdefault = 1;
      }
    },
    // 保存
    saveAndUse() {
      const val = graceChecker.check(this.form, this.rules);
      if (val) {
        if (this.addressVal === "省市区县、乡等")
          return toast.showToast("请选择所在地区");
        toast.showLoading("添加中");
        this.$api
          .addAddress(this.form)
          .then((res) => {
            if (res.state === 200) {
              toast.showToast("添加成功");
              uni.navigateBack({
                delta: 1,
              });
            }
            uni.hideLoading();
          })
          .catch(() => {
            uni.hideLoading();
          });
      } else {
        toast.showToast(graceChecker.error);
      }
    },
    editAndUse() {
      const val = graceChecker.check(this.form, this.rules);
      if (val) {
        if (this.addressVal === "省市区县、乡等")
          return toast.showToast("请选择所在地区");
        toast.showLoading("修改中");
        this.$api
          .editAddressData(this.form)
          .then((res) => {
            if (res.state === 200) {
              toast.showToast("修改成功");
              uni.navigateBack({
                delta: 1,
              });
            }
            uni.hideLoading();
          })
          .catch(() => {
            uni.hideLoading();
          });
      } else {
        toast.showToast(graceChecker.error);
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
.add-address-container {
  padding-top: 20rpx;
}
.address-input-row {
  width: 100%;
  height: 108rpx;
  background-color: #fff;
  border-bottom: 1px solid #f8f8f8;
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