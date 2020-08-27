<template>
  <div class="note-item-box" @tap="actDetailHandle">
    <image
      class="note-item-img"
      :class="[index===0?'note-item-height':'']"
      src="../../static/me/me-bg.png"
    />
    <div class="note-item-bot">
      <text class="fz-12">自从用了初印象之后，其他的护肤品可基本上都是摆设</text>
      <div class="fl-bt mr-t-10">
        <div class="fl-al">
          <image class="note-item-header" src="../../static/me/me-bg.png" />
          <text class="fz-10 fc-999 mr-l-10">初印象</text>
        </div>
        <div class="fl-al">
          <text class="iconfont iconweibiaoti-- fc-999 fz-14"></text>
          <text class="fz-10 fc-999 mr-l-10">808</text>
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
  props: {
    numIndex: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    index() {
      return this.numIndex;
    },
  },
  methods: {
    actDetailHandle() {
      uni.navigateTo({
        url: "/subPackages/me/atcDetail",
      });
    },
  },
};
</script>
<style scoped>
.note-item-box {
  break-inside: avoid;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 20rpx;
  width: 342rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  box-shadow: 0 0 2rpx #999;
}
.note-item-height {
  height: 346rpx !important;
}
.note-item-img {
  width: 100%;
  height: 342rpx;
  height: 460rpx;
}
.note-item-bot {
  padding: 10rpx 18rpx 20rpx 18rpx;
}
.note-item-header {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}
</style>