<template>
  <div class="water-item-content" @tap="openWecat">
    <image
      mode="aspectFill"
      class="water-item-img"
      :src="httpImg + detailData.gimg"
    />
    <div class="water-item-describe">
      <div class="fz-15 box-heigth-style">
        <div class="text-lang-dian">{{ detailData.gtitle }}</div>
      </div>
      <div>
        <text class="fz-17 fw-bold fc-f1">¥{{ detailData.bprice }}</text>
        <text v-if="detailData.price4" class="fz-14 fc-999 mr-l-20 text-through"
          >¥{{ detailData.price4 }}</text
        >
      </div>
    </div>
  </div>
</template>
<script>
import { httpDetailImg, httpImg } from "../../config/develop";
export default {
  data() {
    return {
      httpImg: httpImg, // 图片路径
      httpDetailImg: httpDetailImg, // 图片路径
    };
  },
  props: {
    objData: {
      type: Object,
      default: {},
    },
  },
  computed: {
    detailData() {
      return this.objData;
    },
  },
  onLoad() {
    this.userNo = uni.getStorageSync("userno");
  },
  methods: {
    openWecat() {
      uni.navigateTo({
        url: `/subPackages/home/shopDetail?gId=${this.detailData.gid}`,
      });
    },
  },
};
</script>
<style scoped>
.water-item-content {
  margin-bottom: 30rpx;
  width: 332rpx;
  height: 490rpx;
  background-color: #ffffff;
}

.water-item-img {
  width: 332rpx;
  height: 332rpx;
}

.water-item-describe {
  padding: 14rpx 20rpx;
}

.text-through {
  text-decoration: line-through;
}

.box-heigth-style {
  height: 60rpx;
}
</style>
