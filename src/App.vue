<script>
export default {
  globalData: {
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    userNo: "",
    model: "",
  },
  onLaunch: function () {
    this.getUpdate();
    this.userNo = uni.getStorageSync("userno");
    // this.loginInfo();
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.model = res.model;
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.height, //胶囊按钮与顶部的距离
          navHeight =
            statusBarHeight +
            menuButtonObject.height +
            (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  onShow: function () {},
  onHide: function () {},
  methods: {
    getUpdate() {
      const updateManager = uni.getUpdateManager();
      // updateManager.onCheckForUpdate(function (res) {
      //   console.log(res.hasUpdate);
      // });
      // 下载新版本
      updateManager.onUpdateReady(function () {
        uni.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res) {
            if (res.confirm) {
              // 重启应用
              updateManager.applyUpdate();
            }
          },
        });
      });
      // 新版本下载失败
      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
        uni.showModal({
          title: "已经有新版本了",
          content: "新版本已经上线，请您删除当前小程序，重新搜索打开",
        });
      });
    },
    // loginInfo() {
    //   const _this = this;
    //   toast.showLoading("登录中");
    //   uni.login({
    //     provider: "weixin",
    //     success: function (loginRes) {
    //       _this.$api
    //         .userLoginGetOpenId({
    //           code: loginRes.code,
    //           type: 1,
    //         })
    //         .then(async (res) => {
    //           uni.hideLoading();
    //           uni.setStorageSync("opId", res.data.openid);
    //           uni.setStorageSync("sessionKey", res.data.sessionKey);
    //           if (res.data.token) uni.setStorageSync("token", res.data.token);
    //           if(res.data.user)uni.setStorageSync("userno", res.data.user.userno);
    //         });
    //     },
    //   });
    // },
  },
};
</script>

<style>
/*每个页面公共css */
@import "./styles/common.css";
@import "./styles/iconfont/iconfont.css";
page {
  height: 100%;
  color: #333333;
}
.nav-position {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
}
</style>
