<script>
import Vue from "vue";
export default {
  globalData: {
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
  },
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
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
