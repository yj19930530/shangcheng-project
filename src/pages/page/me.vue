<template>
  <div class="me-container">
    <!-- 头部展示栏 -->
    <div class="me-detail-content">
      <image class="me-detail-bg" src="../../static/me/me-bg.png" />
      <div class="me-detail-center">
        <div class="fl-bt de-center-box">
          <div class="fl-al">
            <image class="me-detail-header" :src="form.avatarUrl" @tap="NavPathTo('we')" />
            <text class="fz-15 fc-fff mr-l-30">{{form.nickName}}</text>
            <text class="iconfont iconziyuan fz-17 fc-fff mr-l-20" @tap="NavPathTo('edit')"></text>
          </div>
          <text class="iconfont iconyoujiantou fc-fff fz-14 mr-r-60" @tap="NavPathTo('edit')"></text>
        </div>
        <div class="me-other-box fl-bt">
          <div class="fl-co" @tap="NavPathTo('guan')">
            <text class="fz-17 fc-fff fw-bold">{{follow}}</text>
            <text class="fz-13 fc-fff mr-t-6">关注</text>
          </div>
          <div class="fl-co" @tap="NavPathTo('fans')">
            <text class="fz-17 fc-fff fw-bold">{{fans}}</text>
            <text class="fz-13 fc-fff mr-t-6">粉丝</text>
          </div>
          <div class="fl-co" @tap="NavPathTo('cang')">
            <text class="fz-17 fc-fff fw-bold">{{collection}}</text>
            <text class="fz-13 fc-fff mr-t-6">收藏</text>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单 icon  -->
    <div class="oder-content">
      <div class="oder-top-box fl-bt">
        <text class="fz-12 mr-l-40">我的订单</text>
        <div class="mr-r-40" @tap="NavPathTo('order')">
          <text class="fz-12 fc-666">查看全部订单</text>
          <text class="iconfont iconyoujiantou fc-999 fz-10 mr-l-10"></text>
        </div>
      </div>
      <div class="icon-box-check fl-bt">
        <div class="fl-co" @tap="NavPathTo('pay')">
          <image class="icon-img-style" src="../../static/me/dfk.png" />
          <text class="fz-12 fc-666 mr-t-20">待付款</text>
        </div>
        <div class="fl-co" @tap="NavPathTo('huo')">
          <image class="icon-img-style" src="../../static/me/dfh.png" />
          <text class="fz-12 fc-666 mr-t-20">待发货</text>
        </div>
        <div class="fl-co" @tap="NavPathTo('shou')">
          <image class="icon-img-style" src="../../static/me/dsh.png" />
          <text class="fz-12 fc-666 mr-t-20">待收货</text>
        </div>
        <div class="fl-co" @tap="NavPathTo('ping')">
          <image class="icon-img-style" src="../../static/me/dpj.png" />
          <text class="fz-12 fc-666 mr-t-20">待评价</text>
        </div>
      </div>
    </div>
    <!-- 其他功能 -->
    <div class="other-content">
      <div class="fl-bt other-item-box" @tap="NavPathTo('dizhi')">
        <div class="fl-al mr-l-20">
          <image class="icon-left-style" src="../../static/me/dizhi.png" />
          <text class="fz-15 mr-l-10">收货地址</text>
        </div>
        <text class="iconfont iconyoujiantou fz-15 fc-999 mr-r-20"></text>
      </div>
      <button open-type="contact" class="fl-bt other-item-box2">
        <div class="fl-al mr-l-20">
          <image class="icon-left-style" src="../../static/me/kefu.png" />
          <text class="fz-15 mr-l-10">联系客服</text>
        </div>
        <text class="iconfont iconyoujiantou fz-15 fc-999 mr-r-20"></text>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        avatarUrl: "",
        nickName: "-",
      },
      follow: 0, // 关注
      fans: 0, // 粉丝
      collection: 0, // 收藏
      userId: 0,
    };
  },
  onShow() {
    this.getUserinfo();
  },
  methods: {
    // 获取用户
    async getUserinfo() {
      const { data } = await this.$api.getUserInfo();
      this.userId = data.id;
      this.form.avatarUrl = data.avatarUrl;
      this.form.nickName = data.nickName;
      this.follow = data.attentions ? data.attentions.length : 0;
      this.fans = data.fans ? data.fans.length : 0;
      this.collection = data.lsc ? data.lsc.length : 0;
    },
    NavPathTo(name) {
      switch (name) {
        case "order": {
          uni.navigateTo({
            url: "/subPackages/me/orderCenter?type=all",
          });
          break;
        }
        case "edit": {
          uni.navigateTo({
            url: "/subPackages/me/personEdit",
          });
          break;
        }
        case "guan": {
          uni.navigateTo({
            url: "/subPackages/me/myFollow",
          });
          break;
        }
        case "fans": {
          uni.navigateTo({
            url: "/subPackages/me/myFans",
          });
          break;
        }
        case "cang": {
          uni.navigateTo({
            url: "/subPackages/me/collection",
          });
          break;
        }
        case "pay": {
          uni.navigateTo({
            url: "/subPackages/me/orderCenter?type=待填写",
          });
          break;
        }
        case "huo": {
          uni.navigateTo({
            url: "/subPackages/me/orderCenter?type=已付款待审核",
          });
          break;
        }
        case "shou": {
          uni.navigateTo({
            url: "/subPackages/me/orderCenter?type=已发货",
          });
          break;
        }
        case "ping": {
          uni.navigateTo({
            url: "/subPackages/me/orderCenter?type=已审核待打印",
          });
          break;
        }
        case "dizhi": {
          uni.navigateTo({
            url: "/subPackages/me/goodsArdressList",
          });
          break;
        }
        case "we": {
          uni.navigateTo({
            url: `/subPackages/me/myCollection?id=${this.userId}`,
          });
          break;
        }
        default: {
          break;
        }
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
.me-detail-content {
  position: relative;
  width: 100%;
  height: 488rpx;
}
.me-detail-bg {
  width: 100%;
  height: 100%;
}
.me-detail-center {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.me-other-box {
  margin: 50rpx auto 0;
  width: 592rpx;
}
.me-detail-header {
  margin-left: 34rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
}
.de-center-box {
  margin-top: 144rpx;
}
.oder-content {
  position: relative;
  top: -50rpx;
  width: 100%;
  height: 274rpx;
  border-radius: 44rpx 44rpx 0 0;
  background-color: #fff;
}
.oder-top-box {
  margin: auto;
  width: 710rpx;
  height: 82rpx;
  border-bottom: 1rpx solid #eeeeee;
}
.icon-box-check {
  margin: 32rpx auto 0;
  width: 634rpx;
}
.icon-img-style {
  width: 52rpx;
  height: 48rpx;
}
.other-content {
  position: relative;
  top: -24rpx;
  background-color: #fff;
}
.icon-left-style {
  width: 36rpx;
  height: 36rpx;
}
.other-item-box {
  width: 100%;
  height: 120rpx;
  border-bottom: 1rpx solid #f8f8f8;
}
.other-item-box2 {
  padding: 0 !important;
  width: 100%;
  height: 120rpx;
  border-bottom: 1rpx solid #f8f8f8;
  background-color: #fff;
}
</style>