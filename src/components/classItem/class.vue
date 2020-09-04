<template>
  <div class="row-details-box fl-fc" @tap="navToDetail(dataRow.gId)">
    <image class="row-details-img" :src="httpImg+dataRow.gImg" />
    <div class="row-details-bottom">
      <div class="fz-15 title-height">{{dataRow.gName}}</div>
      <div class="mr-t-40">
        <text class="fc-f1 fz-17 fw-bold">¥{{dataRow.bPrice}}</text>
        <text class="fz-14 fc-999 td-text mr-l-20">¥{{dataRow.price4}}</text>
      </div>
    </div>
  </div>
</template>
<script>
import { httpImg } from "../../config/develop";
export default {
  data() {
    return {
      httpImg: httpImg, // 图片路径
    };
  },
  props: {
    objItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    dataRow() {
      return this.objItem;
    },
  },
  methods: {
    navToDetail(gId) {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${gId}`,
      });
    },
  },
};
</script>
<style scoped>
.row-details-box {
  margin-top: 30rpx;
  width: 332rpx;
  height: 544rpx;
  border-radius: 10rpx;
  background-color: #ffffff;
}
.row-details-img {
  width: 100%;
  height: 332rpx;
}
.row-details-bottom {
  padding: 16rpx 20rpx 20rpx;
}
.title-height {
  height: 84rpx;
}
</style>