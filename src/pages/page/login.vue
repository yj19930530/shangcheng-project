<template>
  <view class="fl-co login-box">
    <image class="login-img" src="../../static/login-img.png" />
    <button
      class="mr-t-10 login-btn fc-fff fz-14 fl-cen"
      open-type="getUserInfo"
      @getuserinfo="getUserData"
      type="default"
    >用户授权获取信息</button>
    <view class="fl-cen mr-t-20">
      <view class="yuandian"></view>
      <text class="fc-43 fz-12 mr-l-20 mr-r-20">授权登录</text>
      <view class="yuandian"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    const opId = uni.getStorageSync("opId");
    if (opId) {
      uni.switchTab({
        url: "/pages/page/home",
      });
    }
  },
  methods: {
    // 用户授权登录
    getUserData(data) {
      const _this = this;
      if (!data.detail.userInfo) return;
      const userData = data.detail.userInfo;
      let loginCode = "";
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          if (~res.provider.indexOf("weixin")) {
            uni.login({
              provider: "weixin",
              success: function (loginRes) {
                _this.$api
                  .userLoginGetOpenId({
                    code: loginRes.code,
                  })
                  .then((res) => {
                    let opId = "";
                    if (res.data) {
                      opId = res.data.openid;
                    } else {
                      opId = res.message;
                      _this.$api.addUserInfo({
                        openid: opId,
                        nickName: userData.nickName,
                        avatarUrl: userData.avatarUrl,
                        gender: userData.gender,
                      });
                    }
                    uni.setStorageSync("opId", opId);
                    uni.switchTab({
                      url: "/pages/page/home",
                    });
                  });
              },
            });
          }
        },
      });
    },
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