<template>
  <div class="comment-container">
    <div class="fl-al comment-top-box">
      <text class="mr-l-40 fz-15 fw-bold">描述相符</text>
      <div class="mr-l-30">
        <image
          v-for="item in cStar"
          :key="item"
          @tap="starRowHandle2(item)"
          class="start-icon-style"
          src="../../static/shop/starchoose.png"
        />
        <image
          v-for="item in star"
          @tap="starRowHandle(item)"
          :key="item"
          class="start-icon-style"
          src="../../static/shop/star.png"
        />
      </div>
    </div>
    <div class="comment-input-box">
      <textarea
        :fixed="true"
        :adjust-position="true"
        :show-confirm-bar="true"
        placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买 的他们吧！"
        maxlength="300"
        :auto-height="false"
        class="comment-content-input fz-14"
        v-model="commentValue"
        @confirm="getText"
      />
      <div class="camerer-box-style">
        <div class="choose-img-box" v-for="item in 5" :key="item">
          <image class="choose-img-style" mode="aspectFit" src="../../static/me/me-bg.png" />
          <image class="cloose-icon" src="../../static/shop/delete.png" />
        </div>
        <div class="comment-img-list">
          <image class="xiangji-icon" src="../../static/me/xiangji.png" />
          <text class="fz-12 fc-999 mr-t-10">添加图片</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cStar: 0,
      star: 5,
    };
  },
  methods: {
    // 点赞 星星
    starRowHandle(i) {
      this.star = this.star - (i + 1);
      this.cStar = this.cStar + (i + 1);
    },
    starRowHandle2(i) {
      if (this.cStar === i + 1) {
        this.cStar = 0;
        this.star = 5;
        return;
      }
      this.cStar = i + 1;
      this.star = 5 - (i + 1);
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
.comment-container {
  background-color: #fff;
}
.comment-top-box {
  width: 100%;
  height: 108rpx;
  border-top: 1rpx solid #f8f8f8;
  border-bottom: 1rpx solid #f8f8f8;
}
.start-icon-style {
  margin-left: 8rpx;
  width: 40rpx;
  height: 40rpx;
}
.comment-input-box {
  padding: 12rpx 40rpx 10rpx;
}
.comment-content-input {
  width: 100%;
  height: 200rpx;
}
.comment-img-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
  width: 160rpx;
  height: 160rpx;
  border: 1rpx dashed #cccccc;
}
.xiangji-icon {
  margin-top: 28rpx;
  width: 80rpx;
  height: 58rpx;
}
.choose-img-box {
  position: relative;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  width: 160rpx;
  height: 160rpx;
  background-color: #000;
}
.choose-img-style {
  width: 100%;
  height: 100%;
}
.cloose-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 30rpx;
  height: 30rpx;
}
.camerer-box-style {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
</style>