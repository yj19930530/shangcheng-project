<template>
  <div class="buy-item-box">
    <div class="fl-al">
      <image class="buy-header-img" :src="detailData.publishAvatarUrl" />
      <text class="fz-14">{{detailData.publishUserNickName}}</text>
    </div>
    <div class="buy-text-box">
      <text class="fz-14">{{detailData.content}}</text>
    </div>
    <div class="buy-show-img">
      <image
        class="show-img-item"
        v-for="(item,index) in detailData.imageUrl"
        :key="index"
        :src="httpDetailImg+item"
        @tap="prewImgFunc(index,detailData.imageUrl)"
      />
    </div>
  </div>
</template>
<script>
const { httpDetailImg } = require("../../config/develop");
export default {
  data() {
    return {
      httpDetailImg: httpDetailImg,
    };
  },
  props: {
    showObj: {
      type: Object,
      default: {},
    },
  },
  computed: {
    detailData() {
      this.showObj.imageUrl = this.showObj.imageUrl.split(",");
      return this.showObj;
    },
  },
  methods: {
    prewImgFunc(index, list) {
      let arrList = [];
      list.forEach((item) => {
        arrList.push(this.httpDetailImg + item);
      });
      uni.previewImage({
        current: index,
        urls: arrList,
        longPressActions: {},
      });
    },
  },
};
</script>
<style scoped>
.buy-item-box {
  padding-top: 20rpx;
}
.buy-header-img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 14rpx;
}
.buy-text-box {
  margin-top: 16rpx;
}
.buy-show-img {
  display: flex;
  flex-wrap: wrap;
  margin-top: 14rpx;
}
.show-img-item {
  margin-right: 20rpx;
  margin-top: 20rpx;
  width: 156rpx;
  height: 156rpx;
  border-radius: 20rpx;
}
</style>