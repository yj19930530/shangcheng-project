<template>
  <div id="msg-container">
    <div class="msg-item-content fl-bt" v-for="item in 4" :key="item" @tap="detailToPath">
      <div class="msg-left-img mr-l-20">
        <image class="msg-img-style" src="../../static/me/me-bg.png" />
        <div class="yuandian"></div>
      </div>
      <div class="msg-right-content">
        <text class="fz-15">系统推送</text>
        <div class="text-lang-dian">
          <text class="fz-12 fc-999">恭喜您！您有一份价值588元的订单已经下单成功了恭喜您！您有一份价值588元的订单已经下单成功了</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    detailToPath() {
      uni.navigateTo({
        url: "/subPackages/me/msgDetail",
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
#msg-container {
  margin-top: 20rpx;
}
.msg-left-img {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.msg-img-style {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.msg-item-content {
  width: 100%;
  height: 136rpx;
  background-color: #ffffff;
  border-bottom: 1px solid #f8f8f8;
}
.yuandian {
  position: absolute;
  right: 0rpx;
  top: 0rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: #f11b20;
}
.msg-right-content {
  width: 620rpx;
}
</style>