<template>
  <div class="buy-item-box">
    <div class="fl-al">
      <image class="buy-header-img" :src="userImgUrl+detailData.publishAvatarUrl" />
      <text class="fz-14">{{detailData.publishUserNickName}}</text>
    </div>
    <div class="buy-text-box">
      <text class="fz-14">{{detailData.content}}</text>
    </div>
    <div class="buy-show-img" v-if="showObj.imageUrl.length">
      <image
        mode="aspectFill"
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
const { httpDetailImg, userImgUrl } = require("../../config/develop");
export default {
  data() {
    return {
      httpDetailImg: httpDetailImg,
      userImgUrl: userImgUrl,
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
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #fff;
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
}
.show-img-item {
  margin-right: 20rpx;
  margin-top: 20rpx;
  width: 156rpx;
  height: 156rpx;
  border-radius: 20rpx;
}
</style>