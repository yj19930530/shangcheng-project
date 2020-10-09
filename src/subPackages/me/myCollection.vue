<template>
  <div id="person-detail-container">
    <!-- 頭部 -->
    <div class="detail-top-content">
      <div class="fl-bt">
        <div class="user-img-box fl-al">
          <image class="detail-user-img" :src="form.avatarUrl" />
          <text class="mr-l-30 fz-15">{{form.nickName}}</text>
        </div>
        <div class="fl-cen follow-btn">
          <text class="fz-12">已关注</text>
        </div>
      </div>
      <div class="mr-t-50 fl-bt">
        <div class="fl-co detail-has-opt">
          <text class="fz-17 fw-bold">{{follow}}</text>
          <text class="fz-13 fc-999">关注</text>
        </div>
        <div class="fl-co detail-has-opt">
          <text class="fz-17 fw-bold">{{fans}}</text>
          <text class="fz-13 fc-999">粉丝</text>
        </div>
        <div class="fl-co detail-has-opt">
          <text class="fz-17 fw-bold">{{collection}}</text>
          <text class="fz-13 fc-999">收藏</text>
        </div>
      </div>
    </div>
    <!-- tab 切換 -->
    <div class="fl-cen mr-t-30 mr-b-10">
      <div class="fl-co" @tap="checkFunc('left')">
        <text class="fz-14" :class="[checkType==='left'?'fc-333':'fc-999']">动态</text>
        <div
          class="heng-style"
          :class="[checkType==='left'?'heng-style-color1':'heng-style-color2']"
        ></div>
      </div>
      <div class="fl-co mr-left-132" @tap="checkFunc('center')">
        <text class="fz-14" :class="[checkType==='center'?'fc-333':'fc-999']">收藏</text>
        <div
          class="heng-style"
          :class="[checkType==='center'?'heng-style-color1':'heng-style-color2']"
        ></div>
      </div>
      <div class="fl-co mr-left-132" @tap="checkFunc('right')">
        <text class="fz-14" :class="[checkType==='right'?'fc-333':'fc-999']">赞过</text>
        <div
          class="heng-style"
          :class="[checkType==='right'?'heng-style-color1':'heng-style-color2']"
        ></div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="collection-content-left">
      <div class="fl-al all-collection">
        <text class="iconfont iconjurassic_danju fz-11 fc-999"></text>
        <text class="fz-12 mr-l-4">全部动态(2)</text>
      </div>
      <div class="note-center-box">
        <Atc v-for="item in 8" :key="item" :numIndex="item" />
      </div>
    </div>
    <div class="follow-no-more">
      <text class="fc-999 fz-12">— 没有更多啦 —</text>
    </div>
    <!-- <div class="no-data-content">
        <image class="no-data-img" src="../../static/notdata.png" />
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkType: "left",
      userId: 0, // 用户id
      follow: 0, // 关注
      fans: 0, // 粉丝
      collection: 0, // 收藏
      form: {
        avatarUrl: "",
        nickName: "",
      },
    };
  },
  onLoad(obj) {
    this.opId = uni.getStorageSync("opId");
    this.userId = obj.id;
    this.getUserinfo();
  },
  methods: {
    // 获取用户
    async getUserinfo() {
      const { data } = await this.$api.getUserInfo({
        openid: this.opId,
      });
      this.userId = data.id;
      this.form.avatarUrl = data.avatarUrl;
      this.form.nickName = data.nickName;
      this.follow = data.attentions ? data.attentions.length : 0;
      this.fans = data.fans ? data.fans.length : 0;
      this.collection = data.lsc ? data.lsc.length : 0;
    },
    checkFunc(type) {
      this.checkType = type;
    },
  },
};
</script>
<style scoped>
.detail-top-content {
  padding-top: 10rpx;
  width: 100%;
  height: 288rpx;
  background-color: #ffffff;
  border-radius: 0 0 100rpx 100rpx;
}
.detail-user-img {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}
.user-img-box {
  margin-left: 60rpx;
}
.follow-btn {
  margin-right: 60rpx;
  width: 128rpx;
  height: 52rpx;
  border-radius: 26rpx 26rpx 26rpx 0;
  border: 1px solid #333333;
}
.detail-has-opt {
  width: 33.3%;
}
.heng-style {
  margin-top: 8rpx;
  width: 56rpx;
  height: 4rpx;
  border-radius: 2rpx 2rpx;
}
.heng-style-color1 {
  background-color: #f11b20;
}
.heng-style-color2 {
  background-color: #f8f8f8;
}
.mr-left-132 {
  margin-left: 132rpx;
}
/* 瀑布流布局 */
.note-center-box {
  column-count: 2;
  column-gap: 1;
}
.collection-content-left {
  margin: auto;
  width: 710rpx;
}
.all-collection {
  width: 100%;
  height: 84rpx;
}
.follow-no-more {
  text-align: center;
  padding: 22rpx 0;
}
</style>
<style>
page {
  background-color: #f8f8f8;
}
</style>