<template>
  <view class="fl-co login-box">
    <image class="login-img" src="../../static/login-img.png" />
    <button
      class="mr-t-10 login-btn fc-fff fz-14 fl-cen"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      用户授权获取信息
    </button>
    <view class="fl-cen mr-t-20">
      <view class="yuandian"></view>
      <text class="fc-43 fz-12 mr-l-20 mr-r-20">授权登录</text>
      <view class="yuandian"></view>
    </view>
  </view>
</template>
<script>
const { toast } = require("../../utils/index");
export default {
  data() {
    return {
      sessionKey: "",
    };
  },
  onLoad() {
    this.sessionKey = uni.getStorageSync("sessionKey");
  },
  methods: {
    // 用户授权登录
    getPhoneNumber(e) {
      const _this = this;
      toast.showLoading("登录中");
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          _this.$api
            .userLoginGetOpenId({
              code: loginRes.code,
              type: 1,
            })
            .then(async (res) => {
              uni.setStorageSync("opId", res.data.openid);
              _this.$api
                .addUserInfo({
                  iv: e.detail.iv,
                  sessionKey: res.data.sessionKey,
                  data: e.detail.encryptedData,
                })
                .then((res) => {
                  uni.hideLoading();
                  uni.setStorageSync("token", res.data.token);
                  uni.setStorageSync("userno", res.data.user.userno);
                  uni.switchTab({
                    url: "/pages/page/home",
                  });
                })
                .catch(() => {
                  uni.hideLoading();
                });
            });
        },
      });
    },
    // getUserData(data) {
    //   const _this = this;
    //   if (!data.detail.userInfo) return;
    //   const userData = data.detail.userInfo;
    //   let loginCode = "";
    //   uni.getProvider({
    //     service: "oauth",
    //     success: function (res) {
    //       if (~res.provider.indexOf("weixin")) {
    //         uni.login({
    //           provider: "weixin",
    //           success: function (loginRes) {
    //             _this.$api
    //               .userLoginGetOpenId({
    //                 code: loginRes.code,
    //                 type: 1,
    //               }).then(async (res) => {
    //                 console.log(res.data,1)
    //                 let opId = "",
    //                   dataObj = null,
    //                   token = "",
    //                   userInfo = null;
    //                 if (res.state !== 500) {
    //                   opId = res.data.openid;
    //                   dataObj = res.data.user;
    //                   token = res.data.token;
    //                 } else {
    //                   opId = res.data.openid;
    //                   const { data } = await _this.$api.addUserInfo({
    //                     openid: opId,
    //                     nickName: userData.nickName,
    //                     avatarUrl: userData.avatarUrl,
    //                     gender: userData.gender,
    //                   });
    //                   dataObj = data.user;
    //                   token = data.token;
    //                 }
    //                 uni.setStorageSync("opId", opId);
    //                 uni.setStorageSync("userno", dataObj.userno);
    //                 uni.setStorageSync("userInfo", dataObj);
    //                 uni.setStorageSync("token", token);
    //                 uni.switchTab({
    //                   url: "/pages/page/home",
    //                 });
    //               });
    //           },
    //         });
    //       }
    //     },
    //   });
    // },
  },
};
</script>
<style scoped>
.login-btn {
  width: 292rpx;
  height: 50rpx;
  background: linear-gradient(to right, #333333, #666666);
  border-radius: 25rpx 25rpx;
}
.login-img {
  width: 414rpx;
  height: 316rpx;
}
.yuandian {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: #626262;
}
.login-box {
  margin-top: -100rpx;
  height: 100%;
}
</style>