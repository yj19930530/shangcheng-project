<template>
  <div class="address-container">
    <div class="swipe-action-width">
      <div class="fl-fo" v-for="(item, index) in addressList" :key="index">
        <div class="heng-box-style"></div>
        <uni-swipe-action>
          <uni-swipe-action-item
            :options="goodsOption"
            @click="swipeClick(item)"
          >
            <div class="fl-fc address-edit-box">
              <div class="fl-bt address-top-box" @tap="editAddressType(item)">
                <image class="address-icon" src="../../static/shop/dizhi.png" />
                <div class="fl-fc">
                  <div class="fz-15 fw-bold address-title text-lang-dian">
                    {{ item.provinceName }}{{ item.cityName
                    }}{{ item.countyName }}{{ item.detailInfo }}
                  </div>
                  <div class="fl-al mr-t-10">
                    <text class="fz-15">{{ item.userName }}</text>
                    <text class="fz-15 mr-l-50">{{ item.telNumber }}</text>
                  </div>
                </div>
                <text
                  class="iconfont iconziyuan fz-17 fc-999 mr-r-20"
                  @tap.native.stop="editAddress2(item.id)"
                ></text>
                <div class="default-icon fl-cen" v-if="item.isdefault === 1">
                  <text class="fz-11 fc-fff">默认</text>
                </div>
              </div>
              <image class="heng-style" src="../../static/shop/heng.png" />
            </div>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </div>
    </div>

    <div
      v-if="!addressList.length"
      class="fl-cen"
      :class="[iPhoneType === -1 ? '' : 'dianzi-style']"
    >
      <text class="fz-15 fc-999 mr-t-30">没有地址</text>
    </div>
    <div
      class="add-address-btn fl-cen"
      @tap="editAddress"
      :class="[iPhoneType === -1 ? '' : 'dianzi-style']"
    >
      <text class="fz-20 fc-fff fw-bold">新增地址</text>
    </div>
  </div>
</template>
<script>
const { toast, common } = require("../../utils/index");
export default {
  data() {
    return {
      addressList: [],
      iPhoneType: -1,
      goodsOption: [
        {
          text: "删除",
          style: {
            backgroundColor: "#A4423F",
          },
        },
      ],
    };
  },
  onShareAppMessage() {
    return {
      path: `/pages/page/home`,
    };
  },
  computed: {
    phoneModel() {
      return getApp().globalData.model;
    },
  },
  onShow() {
    let t = common.iPhoneReturn(this.phoneModel);
    this.iPhoneType = t ? -1 : 0;
    this.getAddressData();
  },
  methods: {
    // 删除
    async swipeClick(row) {
      await this.$api.deleteAddress({
        id: row.id,
      });
      this.getAddressData();
    },
    // 修改默认地址
    async editAddressType(row) {
      if (row.isdefault === 1) return;
      toast.showLoading("加载中");
      await this.$api.editDefaultAddress({
        id: row.id,
        isdefault: 1,
      });
      uni.hideLoading();
      this.getAddressData();
    },
    // 获取收货地址列表
    async getAddressData() {
      toast.showLoading("加载中");
      const { data } = await this.$api.getAddressList();
      this.addressList = data;
      uni.hideLoading();
    },
    // 新增地址
    editAddress() {
      uni.navigateTo({
        url: "/subPackages/me/addGoodsAdress",
      });
    },
    // 修改地址
    editAddress2(id) {
      uni.navigateTo({
        url: `/subPackages/me/addGoodsAdress?id=${id}`,
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
.swipe-action-width {
  margin: auto;
  width: 710rpx;
}
.address-container {
  padding-top: 10rpx;
  padding-bottom: 128rpx;
}
.address-edit-box {
  overflow: hidden;
  width: 710rpx;
  height: 160rpx;
  background-color: #fff;
}
.address-title {
  width: 540rpx;
}
.address-icon {
  margin-left: 24rpx;
  width: 30rpx;
  height: 39rpx;
}
.address-top-box {
  position: relative;
  height: 152rpx;
}
.heng-style {
  margin-left: -20rpx;
  width: 750rpx;
  height: 8rpx;
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
.default-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 82rpx;
  height: 30rpx;
  border-radius: 10rpx 0 20rpx 0;
  background-color: #7e6b5a;
}
.heng-box-style {
  width: 100%;
  height: 20rpx;
  background-color: #f8f8f8;
}
.dianzi-style {
  margin-bottom: 48rpx;
}
</style>