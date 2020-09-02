<template>
  <div id="follow-container">
    <!-- 关注tab 选项 -->
    <div class="follow-top-label fl-al">
      <div class="follow-label-check fl-co" @tap="labelCheck('left')">
        <text class="fz-14" :class="[checkType==='left'?'':'fc-999']">收藏</text>
        <div
          class="follow-check"
          :class="[checkType==='left'?'follow-check-color1':'follow-check-color2']"
        ></div>
      </div>
      <div class="follow-label-check fl-co" @tap="labelCheck('right')">
        <text class="fz-14" :class="[checkType==='right'?'':'fc-999']">赞过</text>
        <div
          class="follow-check"
          :class="[checkType==='right'?'follow-check-color1':'follow-check-color2']"
        ></div>
      </div>
    </div>
    <div class="collection-content-left">
      <div class="fl-al all-collection">
        <text class="iconfont iconjurassic_danju fz-11 fc-999"></text>
        <text class="fz-12 mr-l-4">全部收藏(2)</text>
      </div>
      <div class="note-center-box">
        <Atc v-for="item in 8" :key="item" :numIndex="item" />
      </div>
    </div>
    <div class="follow-no-more">
      <text class="fc-999 fz-12">— 没有更多啦 —</text>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkType: "left",
    };
  },
  methods: {
    labelCheck(type) {
      this.checkType = type;
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
.follow-top-label {
  width: 100%;
  height: 90rpx;
  background-color: #ffffff;
}
.follow-label-check {
  width: 50%;
}
.follow-check {
  margin-top: 8rpx;
  width: 56rpx;
  height: 4rpx;
  border-radius: 2rpx 2rpx;
}
.follow-check-color1 {
  background-color: #f11b20;
}
.follow-check-color2 {
  background-color: #ffffff;
}
.follow-no-more {
  text-align: center;
  padding: 22rpx 0;
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
</style>